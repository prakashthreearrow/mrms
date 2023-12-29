import {
  GET_EMPLOYEE_DOCUMENTS,
  GET_EMPLOYEE_DOCUMENTS_SUCCESS,
  GET_EMPLOYEE_DOCUMENTS_FAILURE,
  ADD_EDIT_EMPLOYEE_DOCUMENTS,
  ADD_EDIT_EMPLOYEE_DOCUMENTS_SUCCESS,
  ADD_EDIT_EMPLOYEE_DOCUMENTS_FAILURE,
  DELETE_EMPLOYEE_DOCUMENTS,
  DELETE_EMPLOYEE_DOCUMENTS_SUCCESS,
  DELETE_EMPLOYEE_DOCUMENTS_FAILURE,
} from "../types";

//get employee documents
export const getEmployeeDocuments = (payload) => ({
  type: GET_EMPLOYEE_DOCUMENTS,
  payload,
});

export const getEmployeeDocumentsSuccess = (payload) => ({
  type: GET_EMPLOYEE_DOCUMENTS_SUCCESS,
  payload,
});

export const getEmployeeDocumentsFailure = (payload) => ({
  type: GET_EMPLOYEE_DOCUMENTS_FAILURE,
  payload,
});

//add or edit employee documents
export const addEditEmployeeDocuments = (payload) => ({
  type: ADD_EDIT_EMPLOYEE_DOCUMENTS,
  payload,
});

export const addEditEmployeeDocumentsSuccess = (payload) => ({
  type: ADD_EDIT_EMPLOYEE_DOCUMENTS_SUCCESS,
  payload,
});

export const addEditEmployeeDocumentsFailure = (payload) => ({
  type: ADD_EDIT_EMPLOYEE_DOCUMENTS_FAILURE,
  payload,
});

//delete employee documents
export const deleteEmployeeDocuments = (payload) => ({
  type: DELETE_EMPLOYEE_DOCUMENTS,
  payload,
});

export const deleteEmployeeDocumentsSuccess = (payload) => ({
  type: DELETE_EMPLOYEE_DOCUMENTS_SUCCESS,
  payload,
});

export const deleteEmployeeDocumentsFailure = (payload) => ({
  type: DELETE_EMPLOYEE_DOCUMENTS_FAILURE,
  payload,
});
