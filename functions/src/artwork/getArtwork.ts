import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import Artwork from "../../types/Artwork";
import User from "../../types/User";

export const getArtworksForProject = functions.https.onCall(
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
      .get()
      .then((querySnapshot) => {
        const data: Artwork[] = [];
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          data.push({
            uid: doc.id,
            artist: docData.artist,
            operator: docData.operator,
            status: docData.status,
            fileExists: docData.fileExists || false,
          });
        });
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
        throw new functions.https.HttpsError("unknown", err);
      });
  }
);

export const getArtworkById = functions.https.onCall(async (data, context) => {
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
  return doc.data();
});
