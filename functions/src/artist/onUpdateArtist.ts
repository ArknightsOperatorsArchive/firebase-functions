import * as functions from "firebase-functions";
import admin = require("firebase-admin");

export const useWildcard = functions.firestore
  .document("artists/{artistId}")
  .onWrite(async (change, context) => {
    // If we set `/users/marie` to {name: "Marie"} then
    // context.params.userId == "marie"
    // ... and ...
    // change.after.data() == {name: "Marie"}
    const artistId = context.params.artistId;

    const newData = change.after.data();

    await admin
      .firestore()
      .collection("projects/{projectId}/artworks")
      .where("artist.uid", "==", artistId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          await doc.ref.update({ ...newData });
        });
      });
  });
