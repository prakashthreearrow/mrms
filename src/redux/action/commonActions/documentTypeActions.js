import {
  GET_DOCUMENT_TYPES,
  GET_DOCUMENT_TYPES_SUCCESS,
  GET_DOCUMENT_TYPES_FAILURE,
} from "../types";

export const getDocumentType = () => ({
  type: GET_DOCUMENT_TYPES,
});

export const getDocumentTypeSuccess = (payload) => ({
  type: GET_DOCUMENT_TYPES_SUCCESS,
  payload,
});

export const getDocumentTypeFailure = () => ({
  type: GET_DOCUMENT_TYPES_FAILURE,
});
