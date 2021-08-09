import * as functions from "firebase-functions";
import admin = require("firebase-admin");

import { getUserInfo } from "./users/getUser";
import { addUserToDbUponCreation } from "./users/addUserToDb";
import { getAkOperators } from "./operators/getOperators";
import { addAkOperator } from "./operators/addOperator";
import { deleteAkOperator } from "./operators/deleteOperators";

admin.initializeApp(functions.config().firebase);

export const addUserInDatabaseUponCreation = addUserToDbUponCreation;

export const getUser = getUserInfo;

export const getOperators = getAkOperators;

export const addOperator = addAkOperator;

export const deleteOperator = deleteAkOperator;
