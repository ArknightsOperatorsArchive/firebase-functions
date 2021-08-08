import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import User from "../types/User";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const addUserInDatabaseUponCreation = functions.auth
  .user()
  .onCreate((user) => {
    const userDoc: User = {
      uid: user.uid,
      displayName: user.displayName || "",
      email: user.email || "",
      isAdmin: false,
    };

    admin
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set(userDoc)
      .then((writeResult) => {
        console.log("User Created result:", writeResult);
        return;
      })
      .catch((err) => {
        console.log(err);
        return;
      });
  });
