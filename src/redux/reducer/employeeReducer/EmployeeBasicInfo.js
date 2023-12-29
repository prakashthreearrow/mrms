import {
  CREATE_EMPLOYEE_BASIC_INFO,
  CREATE_EMPLOYEE_BASIC_INFO_SUCCESS,
  CREATE_EMPLOYEE_BASIC_INFO_FAILURE,
  NEW_EMPLOYEE_CODE,
  NEW_EMPLOYEE_CODE_SUCCESS,
  NEW_EMPLOYEE_CODE_FAILURE,
  GET_EMPLOYEE_BASIC_INFO,
  GET_EMPLOYEE_BASIC_INFO_SUCCESS,
  GET_EMPLOYEE_BASIC_INFO_FAILURE,
  RESET_EMPLOYEE_BASIC_INFO,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  employeeCode: null,
  employeeDetails: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case CREATE_EMPLOYEE_BASIC_INFO:
      return { ...state, loading: true };
    case CREATE_EMPLOYEE_BASIC_INFO_SUCCESS:
      return { ...state, loading: false };
    case CREATE_EMPLOYEE_BASIC_INFO_FAILURE:
      return { ...state, loading: false };

    case NEW_EMPLOYEE_CODE:
      return { ...state, loading: true };
    case NEW_EMPLOYEE_CODE_SUCCESS:
      return { ...state, employeeCode: action.payload, loading: false };
    case NEW_EMPLOYEE_CODE_FAILURE:
      return { ...state, loading: false, employeeCode: action.payload };

    case GET_EMPLOYEE_BASIC_INFO:
      return { ...state, loading: true };
    case GET_EMPLOYEE_BASIC_INFO_SUCCESS:
      return { ...state, loading: false, employeeDetails: action.payload };
    case GET_EMPLOYEE_BASIC_INFO_FAILURE:
      return { ...state, loading: false, employeeDetails: action.payload };

    case RESET_EMPLOYEE_BASIC_INFO:
      return { ...state, employeeDetails: null };

    default:
      return state;
  }
};
