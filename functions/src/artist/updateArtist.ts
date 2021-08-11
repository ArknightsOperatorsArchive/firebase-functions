import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import Artist from "../../types/Artist";
import User from "../../types/User";

export const updateProjectArtist = functions.https.onCall(
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

    const docRef = admin.firestore().collection("artists").doc(data.uid);

    const doc = await docRef.get();
    if (!doc.exists) {
      throw new functions.https.HttpsError(
        "already-exists",
        "Artist already exists"
      );
    }
    return docRef.update(data);
  }
);
