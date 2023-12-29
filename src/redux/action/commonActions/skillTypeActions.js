import {
  GET_SKILL_TYPES,
  GET_SKILL_TYPES_SUCCESS,
  GET_SKILL_TYPES_FAILURE,
} from "../types";

export const getSkillType = () => ({
  type: GET_SKILL_TYPES,
});

export const getSkillTypeSuccess = (payload) => ({
  type: GET_SKILL_TYPES_SUCCESS,
  payload,
});

export const getSkillTypeFailure = () => ({
  type: GET_SKILL_TYPES_FAILURE,
});
