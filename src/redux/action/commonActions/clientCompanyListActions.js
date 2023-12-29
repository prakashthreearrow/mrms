import {
  GET_CLIENT_COMPANY_LIST,
  GET_CLIENT_COMPANY_LIST_SUCCESS,
  GET_CLIENT_COMPANY_LIST_FAILURE,
} from "../types";

export const getClientCompanyList = () => ({
  type: GET_CLIENT_COMPANY_LIST,
});

export const getClientCompanyListSuccess = (payload) => ({
  type: GET_CLIENT_COMPANY_LIST_SUCCESS,
  payload,
});

export const getClientCompanyListFailure = () => ({
  type: GET_CLIENT_COMPANY_LIST_FAILURE,
});
