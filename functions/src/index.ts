import * as functions from "firebase-functions";
import admin = require("firebase-admin");

import { getUserInfo } from "./users/getUser";
import { addUserToDbUponCreation } from "./users/addUserToDb";

import {
  getAkOperators,
  getAkOperatorsByClass,
} from "./operators/getOperators";
import { addAkOperator } from "./operators/addOperator";
import { deleteAkOperator } from "./operators/deleteOperators";

import { getProjectArtists } from "./artist/getArtists";
import { addProjectArtists } from "./artist/addArtists";
import { deleteProjectArtist } from "./artist/deleteArtist";
import { updateProjectArtist } from "./artist/updateArtist";
import { getAkProjects } from "./projects/getProjects";
import { addArtworkToProject } from "./artwork/addArtwork";
import {
  getArtworkById,
  getArtworksByOperatorClass,
  getArtworksForProject,
} from "./artwork/getArtwork";
import {
  updateArtworkDetailsOnFileCreation,
  updateArtworkDetailsOnFileDeletion,
} from "./artwork/onStorageUpload";
import { deleteArtworkFromProject } from "./artwork/deleteArtwork";
import { updateArtworkDetails } from "./artwork/updateArtwork";
import { useWildcard } from "./artist/onUpdateArtist";

admin.initializeApp(functions.config().firebase);

export const addUserInDatabaseUponCreation = addUserToDbUponCreation;

export const getUser = getUserInfo;

export const getOperators = getAkOperators;

export const getOperatorsByClass = getAkOperatorsByClass;

export const addOperator = addAkOperator;

export const deleteOperator = deleteAkOperator;

export const getArtists = getProjectArtists;

export const addArtists = addProjectArtists;

export const deleteArtists = deleteProjectArtist;

export const updateArtist = updateProjectArtist;

export const getProjects = getAkProjects;

export const addArtworks = addArtworkToProject;

export const getArtworksByClass = getArtworksByOperatorClass;

export const getAllArtworks = getArtworksForProject;

export const getArtwork = getArtworkById;

export const deleteArtwork = deleteArtworkFromProject;

export const updateArtwork = updateArtworkDetails;

export const updateArtworkOnFileCreation = updateArtworkDetailsOnFileCreation;

export const updateArtworkOnFileDeletion = updateArtworkDetailsOnFileDeletion;

export const updateArtworkArtistDetailsOnArtistChange = useWildcard;
