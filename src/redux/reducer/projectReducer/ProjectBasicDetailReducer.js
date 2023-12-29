import {
  GET_PROJECT_BASIC_DETAIL,
  GET_PROJECT_BASIC_DETAIL_SUCCESS,
  GET_PROJECT_BASIC_DETAIL_FAILURE,
  RESET_PROJECT_BASIC_DETAIL,
  ADD_EDIT_PROJECT_BASIC_DETAIL,
  ADD_EDIT_PROJECT_BASIC_DETAIL_SUCCESS,
  ADD_EDIT_PROJECT_BASIC_DETAIL_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  projectDetail: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PROJECT_BASIC_DETAIL:
      return { ...state, loading: true };
    case GET_PROJECT_BASIC_DETAIL_SUCCESS:
      return { ...state, loading: false, projectDetail: action.payload };
    case GET_PROJECT_BASIC_DETAIL_FAILURE:
      return { ...state, loading: false, projectDetail: action.payload };

    case ADD_EDIT_PROJECT_BASIC_DETAIL:
      return { ...state, loading: true };
    case ADD_EDIT_PROJECT_BASIC_DETAIL_SUCCESS:
      return { ...state, loading: false };
    case ADD_EDIT_PROJECT_BASIC_DETAIL_FAILURE:
      return { ...state, loading: false };

    case RESET_PROJECT_BASIC_DETAIL:
      return { ...state, projectDetail: null };

    default:
      return state;
  }
};
