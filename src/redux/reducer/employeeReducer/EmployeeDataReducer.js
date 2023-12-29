import {
  GET_EMPLOYEE,
  GET_EMPLOYEE_FAILURE,
  GET_EMPLOYEE_SUCCESS,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  data: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEE:
      return { ...state, loading: true };
    case GET_EMPLOYEE_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_EMPLOYEE_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};
