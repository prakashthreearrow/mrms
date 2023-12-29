import {
  ADD_EDIT_CLIENT_DETAIL,
  ADD_EDIT_CLIENT_DETAIL_FAILURE,
  ADD_EDIT_CLIENT_DETAIL_SUCCESS,
  GET_CLIENT_DETAIL,
  GET_CLIENT_DETAIL_FAILURE,
  GET_CLIENT_DETAIL_SUCCESS,
  ADD_COMPANY,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAILURE,
} from "../types";

export const getClientDetails = (payload) => ({
  type: GET_CLIENT_DETAIL,
  payload,
});
export const getClientDetailsSuccess = (payload) => ({
  type: GET_CLIENT_DETAIL_SUCCESS,
  payload,
});
export const getClientDetailsFailure = (payload) => ({
  type: GET_CLIENT_DETAIL_FAILURE,
  payload,
});

export const addEditClientDetails = (payload) => ({
  type: ADD_EDIT_CLIENT_DETAIL,
  payload,
});
export const addEditClientDetailsSuccess = (payload) => ({
  type: ADD_EDIT_CLIENT_DETAIL_SUCCESS,
  payload,
});
export const addEditClientDetailsFailure = () => ({
  type: ADD_EDIT_CLIENT_DETAIL_FAILURE,
});

export const addCompany = (payload) => ({
  type: ADD_COMPANY,
  payload,
});
export const addCompanySuccess = () => ({
  type: ADD_COMPANY_SUCCESS,
});
export const addCompanyFailure = () => ({
  type: ADD_COMPANY_FAILURE,
});
