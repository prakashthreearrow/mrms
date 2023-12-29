import {
  GET_RESOURCE,
  GET_RESOURCE_SUCCESS,
  GET_RESOURCE_FAILURE,
  ADD_EDIT_RESOURCE,
  ADD_EDIT_RESOURCE_SUCCESS,
  ADD_EDIT_RESOURCE_FAILURE,
  DELETE_RESOURCE,
  DELETE_RESOURCE_SUCCESS,
  DELETE_RESOURCE_FAILURE,
} from "../types";

export const getResource = (payload) => ({
  type: GET_RESOURCE,
  payload,
});

export const getResourceSuccess = (payload) => ({
  type: GET_RESOURCE_SUCCESS,
  payload,
});

export const getResourceFailure = (payload) => ({
  type: GET_RESOURCE_FAILURE,
  payload,
});

export const addEditResource = (payload) => ({
  type: ADD_EDIT_RESOURCE,
  payload,
});

export const addEditResourceSuccess = (payload) => ({
  type: ADD_EDIT_RESOURCE_SUCCESS,
  payload,
});

export const addEditResourceFailure = () => ({
  type: ADD_EDIT_RESOURCE_FAILURE,
});

export const deleteResource = (payload) => ({
  type: DELETE_RESOURCE,
  payload,
});

export const deleteResourceSuccess = (payload) => ({
  type: DELETE_RESOURCE_SUCCESS,
  payload,
});

export const deleteResourceFailure = () => ({
  type: DELETE_RESOURCE_FAILURE,
});
