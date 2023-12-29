import {
  GET_PLATFORM_TYPES,
  GET_PLATFORM_TYPES_SUCCESS,
  GET_PLATFORM_TYPES_FAILURE,
} from "../types";

export const platformType = () => ({
  type: GET_PLATFORM_TYPES,
});

export const platformTypeSuccess = (payload) => ({
  type: GET_PLATFORM_TYPES_SUCCESS,
  payload,
});

export const platformTypeFailure = () => ({
  type: GET_PLATFORM_TYPES_FAILURE,
});
