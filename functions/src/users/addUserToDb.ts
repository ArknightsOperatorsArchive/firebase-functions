import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import User from "../../types/User";

export const addUserToDbUponCreation = functions.auth
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
