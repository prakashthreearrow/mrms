import {
  GET_STATE_TYPES,
  GET_STATE_TYPES_SUCCESS,
  GET_STATE_TYPES_FAILURE,
} from "../types";

export const stateType = () => ({
  type: GET_STATE_TYPES,
});

export const stateTypeSuccess = (payload) => ({
  type: GET_STATE_TYPES_SUCCESS,
  payload,
});

export const stateTypeFailure = () => ({
  type: GET_STATE_TYPES_FAILURE,
});
