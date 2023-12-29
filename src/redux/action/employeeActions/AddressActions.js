import {
  GET_ADDRESS,
  GET_ADDRESS_SUCCESS,
  GET_ADDRESS_FAILURE,
  ADD_EDIT_ADDRESS,
  ADD_EDIT_ADDRESS_SUCCESS,
  ADD_EDIT_ADDRESS_FAILURE,
} from "../types";

export const getAddress = (payload) => ({
  type: GET_ADDRESS,
  payload,
});

export const getAddressSuccess = (payload) => ({
  type: GET_ADDRESS_SUCCESS,
  payload,
});

export const getAddressFailure = (payload) => ({
  type: GET_ADDRESS_FAILURE,
  payload,
});

export const addEditAddress = (payload) => ({
  type: ADD_EDIT_ADDRESS,
  payload,
});

export const addEditAddressSuccess = (payload) => ({
  type: ADD_EDIT_ADDRESS_SUCCESS,
  payload,
});

export const addEditAddressFailure = () => ({
  type: ADD_EDIT_ADDRESS_FAILURE,
});
