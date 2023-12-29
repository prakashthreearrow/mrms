import { GET_SIDEBAR, GET_SIDEBAR_SUCCESS, GET_SIDEBAR_FAILURE } from "./types";

export const getSidebar = () => ({
  type: GET_SIDEBAR,
});

export const getSidebarSuccess = (payload) => ({
  type: GET_SIDEBAR_SUCCESS,
  payload,
});

export const getSidebarFailure = () => ({
  type: GET_SIDEBAR_FAILURE,
});
