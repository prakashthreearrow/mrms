import {
  ADD_EDIT_FF,
  ADD_EDIT_FF_FAILURE,
  ADD_EDIT_FF_SUCCESS,
  GET_FF,
  GET_FF_SUCCESS,
  GET_FF_FAILURE,
} from "../types";

export const addEditFF = (payload) => ({
  type: ADD_EDIT_FF,
  payload,
});
export const addEditFFSuccess = (payload) => ({
  type: ADD_EDIT_FF_SUCCESS,
  payload,
});
export const addEditFFFailure = () => ({
  type: ADD_EDIT_FF_FAILURE,
});
export const getFF = (payload) => ({
  type: GET_FF,
  payload,
});
export const getFFSuccess = (payload) => ({
  type: GET_FF_SUCCESS,
  payload,
});
export const getFFFailure = (payload) => ({
  type: GET_FF_FAILURE,
  payload,
});
