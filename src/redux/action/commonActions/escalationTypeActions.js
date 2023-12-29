import {
  GET_ESCALATION_TYPE,
  GET_ESCALATION_TYPE_SUCCESS,
  GET_ESCALATION_TYPE_FAILURE,
} from "../types";

export const getEscalationType = () => ({
  type: GET_ESCALATION_TYPE,
});

export const escalationTypeSuccess = (payload) => ({
  type: GET_ESCALATION_TYPE_SUCCESS,
  payload,
});

export const escalationTypeFailure = () => ({
  type: GET_ESCALATION_TYPE_FAILURE,
});
