import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import User from "../types/User";

admin.initializeApp(functions.config().firebase);

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

export const getUser = functions.https.onCall((_, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User not authenticated"
    );
  }
  const uid = context.auth.uid;
  admin
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        throw new functions.https.HttpsError(
          "not-found",
          "User does not exist"
        );
      }
      return doc.data;
    })
    .catch((err) => {
      console.log(err);
      throw new functions.https.HttpsError("unknown", err);
    });
});
