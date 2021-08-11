import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import Project from "../../types/Project";

export const getAkProjects = functions.https.onCall(() => {
  return admin
    .firestore()
    .collection("projects")
    .get()
    .then((querySnapshot) => {
      const data: Project[] = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        data.push({
          uid: doc.id,
          projectTitle: docData.projectTitle,
          released: docData.released,
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
