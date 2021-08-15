import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import User from "../../types/User";

export const deleteArtworkFromProject = functions.https.onCall(
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

    if (!data.artworkId) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Please provide a artworkId"
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
    const docRef = admin
      .firestore()
      .collection("projects")
      .doc(data.projectId)
      .collection("artworks")
      .doc(data.artworkId);

    const doc = await docRef.get();
    if (!doc.exists) {
      throw new functions.https.HttpsError(
        "not-found",
        "Artwork cannot be found."
      );
    }
    return await docRef.delete();
  }
);
