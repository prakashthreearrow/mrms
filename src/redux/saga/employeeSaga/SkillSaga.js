import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";

import {
  ADD_EDIT_USER_SKILL,
  DELETE_USER_SKILL,
  GET_USER_SKILL,
} from "../../action/types";
import {
  addEditUserSkillSuccess,
  addEditUserSkillFailure,
  getUserSkillSuccess,
  getUserSkillFailure,
  deleteUserSkillSuccess,
  deleteUserSkillFailure,
} from "../../action";
import API from "../../../utils/api";
import { ErrorToast, SuccessToast } from "../../../utils/helper";
import React from "react";

function* addEditUserSkillRequest(action) {
  try {
    const res = yield API.post("/admin/skill-add-edit", action.payload.form);
    if (res.data.meta.code === 1) {
      yield put(addEditUserSkillSuccess());
      yield call(action.payload.callback, res?.data?.data);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(addEditUserSkillFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(addEditUserSkillFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

function* getUserSkillRequest(action) {
  try {
    const res = yield API.get(`/get-employee-skills?id=${action.payload.id}`);
    if (res.data.meta.code === 1) {
      yield put(getUserSkillSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(getUserSkillFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(getUserSkillFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

function* deleteUserSkillRequest(action) {
  try {
    const res = yield API.delete(`/admin/skill-delete?id=${action.payload.id}`);
    if (res.data.meta.code === 1) {
      yield put(deleteUserSkillSuccess(res?.data?.data));
      yield call(action.payload.callback);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(deleteUserSkillFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(deleteUserSkillFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

export function* watchAddEditUserSkillAPI() {
  yield takeEvery(ADD_EDIT_USER_SKILL, addEditUserSkillRequest);
}

export function* watchGetUserSkillAPI() {
  yield takeEvery(GET_USER_SKILL, getUserSkillRequest);
}

export function* watchDeleteUserSkillAPI() {
  yield takeEvery(DELETE_USER_SKILL, deleteUserSkillRequest);
}

export default function* rootSaga() {
  yield all([
    watchAddEditUserSkillAPI(),
    watchGetUserSkillAPI(),
    watchDeleteUserSkillAPI(),
  ]);
}
