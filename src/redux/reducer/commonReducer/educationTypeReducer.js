import {
  EDUCATION_TYPE,
  EDUCATION_TYPE_SUCCESS,
  EDUCATION_TYPE_FAILURE,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  educationTypeArray: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case EDUCATION_TYPE:
      return { ...state, loading: true };
    case EDUCATION_TYPE_SUCCESS:
      return { ...state, educationTypeArray: action.payload, loading: false };
    case EDUCATION_TYPE_FAILURE:
      return { ...state, loading: false, educationTypeArray: action.payload };
    default:
      return state;
  }
};
