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

    console.log(artistId, JSON.stringify(newData));
    await admin
      .firestore()
      .collectionGroup("artworks")
      .where("artist.uid", "==", artistId)
      .get()
      .then((querySnapshot) => {
        console.log(JSON.stringify(querySnapshot));
        querySnapshot.forEach(async (doc) => {
          await doc.ref.update({ ...newData });
        });
      });
  });
