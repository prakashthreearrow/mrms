import {
  ADD_EDIT_EXTERNAL_LINK_USER,
  ADD_EDIT_EXTERNAL_LINK_USER_SUCCESS,
  ADD_EDIT_EXTERNAL_LINK_USER_FAILURE,
  GET_USER_EXTERNAL_LINK,
  GET_USER_EXTERNAL_LINK_SUCCESS,
  GET_USER_EXTERNAL_LINK_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  externalLinksArray: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_EDIT_EXTERNAL_LINK_USER:
      return { ...state, loading: true };
    case ADD_EDIT_EXTERNAL_LINK_USER_SUCCESS:
      return { ...state, loading: false };
    case ADD_EDIT_EXTERNAL_LINK_USER_FAILURE:
      return { ...state, loading: false };

    case GET_USER_EXTERNAL_LINK:
      return { ...state, loading: true };
    case GET_USER_EXTERNAL_LINK_SUCCESS:
      return { ...state, externalLinksArray: action.payload, loading: false };
    case GET_USER_EXTERNAL_LINK_FAILURE:
      return { ...state, externalLinksArray: action.payload, loading: false };

    default:
      return state;
  }
};
