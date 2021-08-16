import * as functions from "firebase-functions";
import admin = require("firebase-admin");

import Artist from "../../types/Artist";

export const useWildcard = functions.firestore
  .document("artists/{artistId}")
  .onWrite(async (change, context) => {
    // If we set `/users/marie` to {name: "Marie"} then
    // context.params.userId == "marie"
    // ... and ...
    // change.after.data() == {name: "Marie"}
    const artistId = context.params.artistId;

    const oldData = change.before.data();
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
          await doc.ref.update({ artist: newData });
        });
      });
    await admin
      .firestore()
      .collectionGroup("artworks")
      .where("artists", "array-contains", oldData)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          const data = await doc.data();
          const artists = data.artists as Artist[];

          const updatedArtists = artists.map((artist) => {
            if (artist.uid === artistId) {
              return newData;
            }
            return artist;
          });
          await doc.ref.update({
            artists: updatedArtists,
          });
        });
      });
  });
