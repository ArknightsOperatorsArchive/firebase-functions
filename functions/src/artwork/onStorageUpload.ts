import * as functions from "firebase-functions";
import admin = require("firebase-admin");

export const updateArtworkDetailsOnFileCreation = functions.storage
  .object()
  .onFinalize(async (object) => {
    const filePath = object.name;

    if (filePath) {
      // Path is structured like
      // /projects/${projectId}/artwork/${artworkId}
      const splittedFilePath = filePath.split("/");

      const projectId = splittedFilePath[1];
      const artworkId = splittedFilePath[3];

      const artworkRef = admin
        .firestore()
        .collection("projects")
        .doc(projectId)
        .collection("artworks")
        .doc(artworkId);

      const artwork = await artworkRef.get();

      // If file does not exist in database we delete the file
      if (!artwork.exists) {
        await admin.storage().bucket().file(filePath).delete();

        await artworkRef.update({
          fileExists: false,
        });
        throw new functions.https.HttpsError(
          "not-found",
          "Artwork does not exist in firestore, deleting artwork"
        );
      }

      await artworkRef.update({
        fileExists: true,
      });
    }
  });

export const updateArtworkDetailsOnFileDeletion = functions.storage
  .object()
  .onDelete(async (object) => {
    const filePath = object.name;

    if (filePath) {
      // Path is structured like
      // /projects/${projectId}/artwork/${artworkId}
      const splittedFilePath = filePath.split("/");

      const projectId = splittedFilePath[1];
      const artworkId = splittedFilePath[3];

      const artworkRef = admin
        .firestore()
        .collection("projects")
        .doc(projectId)
        .collection("artworks")
        .doc(artworkId);

      const artwork = await artworkRef.get();

      // If file does not exist in database we delete the file
      if (!artwork.exists) {
        await admin.storage().bucket().file(filePath).delete();

        await artworkRef.update({
          fileExists: false,
        });
        throw new functions.https.HttpsError(
          "not-found",
          "Artwork does not exist in firestore, deleting artwork"
        );
      }

      await artworkRef.update({
        fileExists: false,
      });
    }
  });
