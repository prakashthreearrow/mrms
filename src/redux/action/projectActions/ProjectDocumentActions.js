import {
  GET_PROJECT_DOCUMENT,
  GET_PROJECT_DOCUMENT_SUCCESS,
  GET_PROJECT_DOCUMENT_FAILURE,
  ADD_EDIT_PROJECT_DOCUMENT,
  ADD_EDIT_PROJECT_DOCUMENT_SUCCESS,
  ADD_EDIT_PROJECT_DOCUMENT_FAILURE,
  DELETE_PROJECT_DOCUMENT,
  DELETE_PROJECT_DOCUMENT_SUCCESS,
  DELETE_PROJECT_DOCUMENT_FAILURE,
} from "../types";

export const getProjectDocument = (payload) => ({
  type: GET_PROJECT_DOCUMENT,
  payload,
});

export const getProjectDocumentSuccess = (payload) => ({
  type: GET_PROJECT_DOCUMENT_SUCCESS,
  payload,
});

export const getProjectDocumentFailure = (payload) => ({
  type: GET_PROJECT_DOCUMENT_FAILURE,
  payload,
});

export const addEditProjectDocument = (payload) => ({
  type: ADD_EDIT_PROJECT_DOCUMENT,
  payload,
});

export const addEditProjectDocumentSuccess = (payload) => ({
  type: ADD_EDIT_PROJECT_DOCUMENT_SUCCESS,
  payload,
});

export const addEditProjectDocumentFailure = () => ({
  type: ADD_EDIT_PROJECT_DOCUMENT_FAILURE,
});

export const deleteProjectDocument = (payload) => ({
  type: DELETE_PROJECT_DOCUMENT,
  payload,
});

export const deleteProjectDocumentSuccess = (payload) => ({
  type: DELETE_PROJECT_DOCUMENT_SUCCESS,
  payload,
});

export const deleteProjectDocumentFailure = (payload) => ({
  type: DELETE_PROJECT_DOCUMENT_FAILURE,
  payload,
});
