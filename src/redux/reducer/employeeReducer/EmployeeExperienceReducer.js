import {
  GET_EMPLOYEE_EXPERIENCE,
  GET_EMPLOYEE_EXPERIENCE_SUCCESS,
  GET_EMPLOYEE_EXPERIENCE_FAILURE,
  ADD_EDIT_EMPLOYEE_EXPERIENCE,
  ADD_EDIT_EMPLOYEE_EXPERIENCE_SUCCESS,
  ADD_EDIT_EMPLOYEE_EXPERIENCE_FAILURE,
  DELETE_EMPLOYEE_EXPERIENCE,
  DELETE_EMPLOYEE_EXPERIENCE_SUCCESS,
  DELETE_EMPLOYEE_EXPERIENCE_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  ExperienceArray: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_EXPERIENCE:
      return { ...state, loading: true };
    case GET_EMPLOYEE_EXPERIENCE_SUCCESS:
      return { ...state, loading: false, ExperienceArray: action.payload };
    case GET_EMPLOYEE_EXPERIENCE_FAILURE:
      return { ...state, loading: false, ExperienceArray: action.payload };

    case ADD_EDIT_EMPLOYEE_EXPERIENCE:
      return { ...state, loading: true };
    case ADD_EDIT_EMPLOYEE_EXPERIENCE_SUCCESS:
      return { ...state, loading: false };
    case ADD_EDIT_EMPLOYEE_EXPERIENCE_FAILURE:
      return { ...state, loading: false };

    case DELETE_EMPLOYEE_EXPERIENCE:
      return { ...state, loading: true };
    case DELETE_EMPLOYEE_EXPERIENCE_SUCCESS:
      return { ...state, loading: false };
    case DELETE_EMPLOYEE_EXPERIENCE_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};
