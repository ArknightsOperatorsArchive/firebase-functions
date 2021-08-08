import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import AKOperator from "../../types/AKOperators";

export const getAkOperators = functions.https.onCall(() => {
  return admin
    .firestore()
    .collection("operators")
    .get()
    .then((querySnapshot) => {
      const data: AKOperator[] = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        data.push({
          uid: doc.id,
          name: docData.name,
          class: docData.class,
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
