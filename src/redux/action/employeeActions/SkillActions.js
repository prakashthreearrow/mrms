import {
  ADD_EDIT_USER_SKILL,
  ADD_EDIT_USER_SKILL_SUCCESS,
  ADD_EDIT_USER_SKILL_FAILURE,
  GET_USER_SKILL,
  GET_USER_SKILL_SUCCESS,
  GET_USER_SKILL_FAILURE,
  DELETE_USER_SKILL,
  DELETE_USER_SKILL_SUCCESS,
  DELETE_USER_SKILL_FAILURE,
} from "../types";

//add or edit user skill
export const addEditUserSkill = (payload) => ({
  type: ADD_EDIT_USER_SKILL,
  payload,
});

export const addEditUserSkillSuccess = () => ({
  type: ADD_EDIT_USER_SKILL_SUCCESS,
});

export const addEditUserSkillFailure = () => ({
  type: ADD_EDIT_USER_SKILL_FAILURE,
});

//delete user skill
export const deleteUserSkill = (payload) => ({
  type: DELETE_USER_SKILL,
  payload,
});

export const deleteUserSkillSuccess = () => ({
  type: DELETE_USER_SKILL_SUCCESS,
});

export const deleteUserSkillFailure = () => ({
  type: DELETE_USER_SKILL_FAILURE,
});

//get user skill
export const getUserSkill = (payload) => ({
  type: GET_USER_SKILL,
  payload,
});

export const getUserSkillSuccess = (payload) => ({
  type: GET_USER_SKILL_SUCCESS,
  payload,
});

export const getUserSkillFailure = (payload) => ({
  type: GET_USER_SKILL_FAILURE,
  payload,
});
