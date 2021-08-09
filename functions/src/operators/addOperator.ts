import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import AKOperator from "../../types/AKOperators";
import User from "../../types/User";

export const addAkOperator = functions.https.onCall(
  async (data: AKOperator, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User not authenticated"
      );
    }
    const uid = context.auth.uid;

    const userDetails = await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .get();
    const userData = userDetails.data() as User;
    if (!userData) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User not authenticated"
      );
    }

    if (!userData.isAdmin) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User is not authorised"
      );
    }

    const query = await admin
      .firestore()
      .collection("operators")
      .where("name", "==", data.name)
      .get();
    if (query.size > 0) {
      throw new functions.https.HttpsError(
        "already-exists",
        "Operator already exists"
      );
    }
    return admin.firestore().collection("operators").doc().set({
      name: data.name,
      class: data.class,
    });
  }
);
