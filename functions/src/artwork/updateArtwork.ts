import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import User from "../../types/User";

export const updateArtworkDetails = functions.https.onCall(
  async (data, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User not authenticated"
      );
    }

    if (!data.projectId) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Please provide a projectId"
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
        "permission-denied",
        "User not authenticated"
      );
    }

    if (!userData.isAdmin) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "User is not authorised"
      );
    }

    return admin
      .firestore()
      .collection("projects")
      .doc(data.projectId)
      .collection("artworks")
      .doc(uid)
      .update({ ...data.art });
  }
);
