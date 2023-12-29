import {
  ADD_EDIT_COMPANY_DOCUMENT,
  ADD_EDIT_COMPANY_DOCUMENT_SUCCESS,
  ADD_EDIT_COMPANY_DOCUMENT_FAILURE,
  PUBLISH_COMPANY_DOCUMENT,
  PUBLISH_COMPANY_DOCUMENT_SUCCESS,
  PUBLISH_COMPANY_DOCUMENT_FAILURE,
  TOGGLE_COMPANY_DOCUMENT,
  TOGGLE_COMPANY_DOCUMENT_SUCCESS,
  TOGGLE_COMPANY_DOCUMENT_FAILURE,
  GET_COMPANY_DOCUMENT,
  GET_COMPANY_DOCUMENT_SUCCESS,
  GET_COMPANY_DOCUMENT_FAILURE,
  DELETE_COMPANY_DOCUMENT,
  DELETE_COMPANY_DOCUMENT_SUCCESS,
  DELETE_COMPANY_DOCUMENT_FAILURE,
} from "./types";

export const addEditCompanyDocument = (payload) => ({
  type: ADD_EDIT_COMPANY_DOCUMENT,
  payload,
});
export const addEditCompanyDocumentSuccess = (payload) => ({
  type: ADD_EDIT_COMPANY_DOCUMENT_SUCCESS,
  payload,
});
export const addEditCompanyDocumentFailure = () => ({
  type: ADD_EDIT_COMPANY_DOCUMENT_FAILURE,
});

export const publishCompanyDocument = (payload) => ({
  type: PUBLISH_COMPANY_DOCUMENT,
  payload,
});
export const publishCompanyDocumentSuccess = (payload) => ({
  type: PUBLISH_COMPANY_DOCUMENT_SUCCESS,
  payload,
});
export const publishCompanyDocumentFailure = () => ({
  type: PUBLISH_COMPANY_DOCUMENT_FAILURE,
});

export const toggleCompanyDocument = (payload) => ({
  type: TOGGLE_COMPANY_DOCUMENT,
  payload,
});
export const toggleCompanyDocumentSuccess = (payload) => ({
  type: TOGGLE_COMPANY_DOCUMENT_SUCCESS,
  payload,
});
export const toggleCompanyDocumentFailure = () => ({
  type: TOGGLE_COMPANY_DOCUMENT_FAILURE,
});

export const getCompanyDocument = () => ({
  type: GET_COMPANY_DOCUMENT,
});
export const getCompanyDocumentSuccess = (payload) => ({
  type: GET_COMPANY_DOCUMENT_SUCCESS,
  payload,
});
export const getCompanyDocumentFailure = () => ({
  type: GET_COMPANY_DOCUMENT_FAILURE,
});

export const deleteCompanyDocument = (payload) => ({
  type: DELETE_COMPANY_DOCUMENT,
  payload,
});
export const deleteCompanyDocumentSuccess = (payload) => ({
  type: DELETE_COMPANY_DOCUMENT_SUCCESS,
  payload,
});
export const deleteCompanyDocumentFailure = () => ({
  type: DELETE_COMPANY_DOCUMENT_FAILURE,
});
