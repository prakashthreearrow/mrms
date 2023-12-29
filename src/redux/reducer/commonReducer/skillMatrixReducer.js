import {
  GET_SKILL_MATRIX,
  GET_SKILL_MATRIX_FAILURE,
  GET_SKILL_MATRIX_SUCCESS,
} from "../../action/types";

const INIT_STATE = {
  loading: false,
  skillMatrixArray: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SKILL_MATRIX:
      return { ...state, loading: true };
    case GET_SKILL_MATRIX_SUCCESS:
      return { ...state, skillMatrixArray: action.payload, loading: false };
    case GET_SKILL_MATRIX_FAILURE:
      return { ...state, loading: false, skillMatrixArray: action.payload };
    default:
      return state;
  }
};
