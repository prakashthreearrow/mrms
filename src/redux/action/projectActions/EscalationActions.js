import {
  GET_ESCALATION,
  GET_ESCALATION_SUCCESS,
  GET_ESCALATION_FAILURE,
  ADD_EDIT_ESCALATION,
  ADD_EDIT_ESCALATION_SUCCESS,
  ADD_EDIT_ESCALATION_FAILURE,
  DELETE_ESCALATION,
  DELETE_ESCALATION_SUCCESS,
  DELETE_ESCALATION_FAILURE,
} from "../types";

export const getEscalation = (payload) => ({
  type: GET_ESCALATION,
  payload,
});

export const getEscalationSuccess = (payload) => ({
  type: GET_ESCALATION_SUCCESS,
  payload,
});

export const getEscalationFailure = (payload) => ({
  type: GET_ESCALATION_FAILURE,
  payload,
});

export const addEditEscalation = (payload) => ({
  type: ADD_EDIT_ESCALATION,
  payload,
});

export const addEditEscalationSuccess = (payload) => ({
  type: ADD_EDIT_ESCALATION_SUCCESS,
  payload,
});

export const addEditEscalationFailure = () => ({
  type: ADD_EDIT_ESCALATION_FAILURE,
});

export const deleteEscalation = (payload) => ({
  type: DELETE_ESCALATION,
  payload,
});

export const deleteEscalationSuccess = (payload) => ({
  type: DELETE_ESCALATION_SUCCESS,
  payload,
});

export const deleteEscalationFailure = () => ({
  type: DELETE_ESCALATION_FAILURE,
});
