import {
  GET_CONFIG_DESIGNATION_DATA,
  GET_CONFIG_DESIGNATION_DATA_SUCCESS,
  GET_CONFIG_DESIGNATION_DATA_FAILURE,
  UPDATE_CONFIG_DESIGNATION_DATA,
  UPDATE_CONFIG_DESIGNATION_DATA_SUCCESS,
  UPDATE_CONFIG_DESIGNATION_DATA_FAILURE,
} from "../types";

export const getConfigDesignationData = (payload) => ({
  type: GET_CONFIG_DESIGNATION_DATA,
  payload,
});

export const getConfigDesignationDataSuccess = (payload) => ({
  type: GET_CONFIG_DESIGNATION_DATA_SUCCESS,
  payload,
});

export const getConfigDesignationDataFailure = (payload) => ({
  type: GET_CONFIG_DESIGNATION_DATA_FAILURE,
  payload,
});

export const updateConfigDesignationData = (payload) => ({
  type: UPDATE_CONFIG_DESIGNATION_DATA,
  payload,
});

export const updateConfigDesignationDataSuccess = (payload) => ({
  type: UPDATE_CONFIG_DESIGNATION_DATA_SUCCESS,
  payload,
});

export const updateConfigDesignationDataFailure = (payload) => ({
  type: UPDATE_CONFIG_DESIGNATION_DATA_FAILURE,
  payload,
});
