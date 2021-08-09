import * as functions from "firebase-functions";
import admin = require("firebase-admin");

import AKOperator from "../../types/AKOperators";
import User from "../../types/User";

export const deleteAkOperator = functions.https.onCall(
  async (data: AKOperator, context) => {
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

    return admin.firestore().collection("operators").doc(data.uid).delete();
  }
);
