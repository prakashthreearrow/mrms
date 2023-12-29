import {
  GET_SIDEBAR,
  GET_SIDEBAR_FAILURE,
  GET_SIDEBAR_SUCCESS,
} from "../action/types";

const INIT_STATE = {
  loading: false,
  sidebarData: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SIDEBAR:
      return { ...state, loading: true };
    case GET_SIDEBAR_SUCCESS:
      return { ...state, loading: false, sidebarData: action.payload };
    case GET_SIDEBAR_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};
