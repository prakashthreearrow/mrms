import {
  GET_SKILL_MATRIX,
  GET_SKILL_MATRIX_FAILURE,
  GET_SKILL_MATRIX_SUCCESS,
} from "../types";

export const getSkillMatrix = (payload) => ({
  type: GET_SKILL_MATRIX,
  payload,
});

export const getSkillMatrixSuccess = (payload) => ({
  type: GET_SKILL_MATRIX_SUCCESS,
  payload,
});

export const getSkillMatrixFailure = (payload) => ({
  type: GET_SKILL_MATRIX_FAILURE,
  payload,
});
