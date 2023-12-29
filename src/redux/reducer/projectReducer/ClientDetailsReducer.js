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
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  clientDetail: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CLIENT_DETAIL:
      return { ...state, loading: true };
    case GET_CLIENT_DETAIL_SUCCESS:
      return { ...state, loading: false, clientDetail: action.payload };
    case GET_CLIENT_DETAIL_FAILURE:
      return { ...state, loading: false, clientDetail: action.payload };

    case ADD_EDIT_CLIENT_DETAIL:
      return { ...state, loading: true };
    case ADD_EDIT_CLIENT_DETAIL_SUCCESS:
      return { ...state, loading: false };
    case ADD_EDIT_CLIENT_DETAIL_FAILURE:
      return { ...state, loading: false };

    case ADD_COMPANY:
      return { ...state, loading: true };
    case ADD_COMPANY_SUCCESS:
      return { ...state, loading: false };
    case ADD_COMPANY_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};
