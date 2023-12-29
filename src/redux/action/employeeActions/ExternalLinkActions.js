import {
  ADD_EDIT_EXTERNAL_LINK_USER,
  ADD_EDIT_EXTERNAL_LINK_USER_SUCCESS,
  ADD_EDIT_EXTERNAL_LINK_USER_FAILURE,
  GET_USER_EXTERNAL_LINK,
  GET_USER_EXTERNAL_LINK_SUCCESS,
  GET_USER_EXTERNAL_LINK_FAILURE,
} from "../types";

export const addEditExternalLinkUser = (payload) => ({
  type: ADD_EDIT_EXTERNAL_LINK_USER,
  payload,
});

export const addEditExternalLinkUserSuccess = () => ({
  type: ADD_EDIT_EXTERNAL_LINK_USER_SUCCESS,
});

export const addEditExternalLinkUserFailure = () => ({
  type: ADD_EDIT_EXTERNAL_LINK_USER_FAILURE,
});

export const getUserExternalLink = (payload) => ({
  type: GET_USER_EXTERNAL_LINK,
  payload,
});

export const getUserExternalLinkSuccess = (payload) => ({
  type: GET_USER_EXTERNAL_LINK_SUCCESS,
  payload,
});

export const getUserExternalLinkFailure = (payload) => ({
  type: GET_USER_EXTERNAL_LINK_FAILURE,
  payload,
});
