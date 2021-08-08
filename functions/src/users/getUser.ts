import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import User from "../../types/User";

export const getUserInfo = functions.https.onCall((_, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User not authenticated"
    );
  }
  const uid = context.auth.uid;
  return admin
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
      const data = doc.data() as User;
      console.log(`Got user ${uid}: ${JSON.stringify(data)}`);
      return data;
    })
    .catch((err) => {
      console.log(err);
      throw new functions.https.HttpsError("unknown", err);
    });
});
