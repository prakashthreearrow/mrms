import {
  GET_CLIENT_COMPANY_LIST,
  GET_CLIENT_COMPANY_LIST_SUCCESS,
  GET_CLIENT_COMPANY_LIST_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  clientCompanyList: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CLIENT_COMPANY_LIST:
      return { ...state, loading: true };
    case GET_CLIENT_COMPANY_LIST_SUCCESS:
      return { ...state, loading: false, clientCompanyList: action.payload };
    case GET_CLIENT_COMPANY_LIST_FAILURE:
      return { ...state, loading: false, clientCompanyList: action.payload };
    default:
      return state;
  }
};
