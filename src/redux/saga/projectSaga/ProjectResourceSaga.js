import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import React from "react";

import {
  GET_PROJECT_RESOURCE,
  ADD_EDIT_PROJECT_RESOURCE,
  DELETE_PROJECT_RESOURCE,
  POST_SEND_INTIMATION_TO_TEAM,
} from "../../action/types";
import {
  getProjectResourceSuccess,
  getProjectResourceFailure,
  addEditProjectResourceSuccess,
  addEditProjectResourceFailure,
  deleteProjectResourceSuccess,
  deleteProjectResourceFailure,
  sendIntimationToTeamSuccess,
  sendIntimationToTeamFailure,
} from "../../action";
import API from "../../../utils/api";
import { ErrorToast, SuccessToast } from "../../../utils/helper";

function* addEditProjectResourceRequest(action) {
  try {
    const res = yield API.post(
      "/project/add-edit-project-resource",
      action.payload.form
    );
    if (res.data.meta.code === 1) {
      yield put(addEditProjectResourceSuccess(res?.data?.data));
      yield call(action.payload.callback, res?.data?.data);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(addEditProjectResourceFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(addEditProjectResourceFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

function* getProjectResourceRequest(action) {
  try {
    const res = yield API.get(
      `/project/get-project-resources?id=${action.payload.id}`
    );
    if (res.data.meta.code === 1) {
      yield put(getProjectResourceSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(getProjectResourceFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(getProjectResourceFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

function* deleteProjectResourceRequest(action) {
  try {
    const res = yield API.delete(
      `/project/delete-project-resource?id=${action.payload.id}`
    );
    if (res.data.meta.code === 1) {
      yield put(deleteProjectResourceSuccess());
      yield call(action.payload.callback);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(deleteProjectResourceFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(deleteProjectResourceFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

function* sendIntimationToTeamRequest(action) {
  try {
    const res = yield API.post("/project/send-intimation", action.payload.form);
    if (res.data.meta.code === 1) {
      yield put(sendIntimationToTeamSuccess());
      yield call(action.payload.callback);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(sendIntimationToTeamFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(sendIntimationToTeamFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

export function* watchAddEditProjectResourceAPI() {
  yield takeEvery(ADD_EDIT_PROJECT_RESOURCE, addEditProjectResourceRequest);
}

export function* watchGetProjectResourceAPI() {
  yield takeEvery(GET_PROJECT_RESOURCE, getProjectResourceRequest);
}

export function* watchDeleteProjectResourceAPI() {
  yield takeEvery(DELETE_PROJECT_RESOURCE, deleteProjectResourceRequest);
}

export function* watchSendIntimationToTeamAPI() {
  yield takeEvery(POST_SEND_INTIMATION_TO_TEAM, sendIntimationToTeamRequest);
}

export default function* rootSaga() {
  yield all([
    watchAddEditProjectResourceAPI(),
    watchGetProjectResourceAPI(),
    watchDeleteProjectResourceAPI(),
    watchSendIntimationToTeamAPI(),
  ]);
}
