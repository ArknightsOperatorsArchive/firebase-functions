import * as functions from "firebase-functions";
import admin = require("firebase-admin");

import { getUserInfo } from "./users/getUser";
import { addUserToDbUponCreation } from "./users/addUserToDb";
import { getAkOperators } from "./operators/getOperators";

admin.initializeApp(functions.config().firebase);

export const addUserInDatabaseUponCreation = addUserToDbUponCreation;

export const getUser = getUserInfo;

export const getOperators = getAkOperators;
