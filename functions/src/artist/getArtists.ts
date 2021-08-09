import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import Artist from "../../types/Artist";

export const getProjectArtists = functions.https.onCall(() => {
  return admin
    .firestore()
    .collection("artists")
    .get()
    .then((querySnapshot) => {
      const data: Artist[] = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        data.push({
          uid: doc.id,
          displayName: docData.displayName,
          socials: docData.socials,
        });
      });
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err);
      throw new functions.https.HttpsError("unknown", err);
    });
});
