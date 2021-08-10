import * as functions from "firebase-functions";
import admin = require("firebase-admin");

import User from "../../types/User";
import Artist from "../../types/Artist";

export const deleteProjectArtist = functions.https.onCall(
  async (data: Artist, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User not authenticated"
      );
    }
    const uid = context.auth.uid;

    const userDetails = await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .get();
    const userData = userDetails.data() as User;
    if (!userData) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User not authenticated"
      );
    }

    if (!userData.isAdmin) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User is not authorised"
      );
    }

    return admin.firestore().collection("artists").doc(data.uid).delete();
  }
);
