import {
  ADD_EDIT_QUALIFICATION,
  ADD_EDIT_QUALIFICATION_FAILURE,
  ADD_EDIT_QUALIFICATION_SUCCESS,
  GET_QUALIFICATION,
  GET_QUALIFICATION_FAILURE,
  GET_QUALIFICATION_SUCCESS,
  DELETE_QUALIFICATION,
  DELETE_QUALIFICATION_FAILURE,
  DELETE_QUALIFICATION_SUCCESS,
} from "../types";

export const getQualification = (payload) => ({
  type: GET_QUALIFICATION,
  payload,
});
export const getQualificationSuccess = (payload) => ({
  type: GET_QUALIFICATION_SUCCESS,
  payload,
});
export const getQualificationFailure = (payload) => ({
  type: GET_QUALIFICATION_FAILURE,
  payload,
});

export const addEditQualification = (payload) => ({
  type: ADD_EDIT_QUALIFICATION,
  payload,
});
export const addEditQualificationSuccess = (payload) => ({
  type: ADD_EDIT_QUALIFICATION_SUCCESS,
  payload,
});
export const addEditQualificationFailure = () => ({
  type: ADD_EDIT_QUALIFICATION_FAILURE,
});

export const deleteQualification = (payload) => ({
  type: DELETE_QUALIFICATION,
  payload,
});
export const deleteQualificationSuccess = () => ({
  type: DELETE_QUALIFICATION_SUCCESS,
});
export const deleteQualificationFailure = () => ({
  type: DELETE_QUALIFICATION_FAILURE,
});
