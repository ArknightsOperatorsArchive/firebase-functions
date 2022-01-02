import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import Artwork from "../../types/Artwork";
import User from "../../types/User";

export const getArtworksForProject = functions.https.onCall(
  async (data, context) => {

    if (!data.projectId) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Please provide a projectId"
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
            artists: docData.artists || [],
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

export const getArtworkById = functions.https.onCall(async (data) => {
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

export const getArtworksByOperatorClass = functions.https.onCall(
  async (data) => {
    if (!data.projectId) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Please provide a projectId"
      );
    }

    if (!data.operatorClass) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Please provide a operatorClass"
      );
    }

    return admin
      .firestore()
      .collection("projects")
      .doc(data.projectId)
      .collection("artworks")
      .where("operator.class", "==", data.operatorClass)
      .get()
      .then((querySnapshot) => {
        const data: Artwork[] = [];
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          data.push({
            uid: doc.id,
            artist: docData.artist,
            artists: docData.artists || [],
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
