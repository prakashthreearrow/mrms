import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import React from "react";

import {
  GET_PROJECT_CHANGE_REQUEST,
  ADD_EDIT_PROJECT_CHANGE_REQUEST,
  DELETE_PROJECT_CHANGE_REQUEST,
} from "../../action/types";
import {
  getProjectChangeRequestSuccess,
  getProjectChangeRequestFailure,
  addEditProjectChangeRequestSuccess,
  addEditProjectChangeRequestFailure,
  deleteProjectChangeRequestSuccess,
  deleteProjectChangeRequestFailure,
} from "../../action";
import API from "../../../utils/api";
import { ErrorToast, SuccessToast } from "../../../utils/helper";

function* addEditProjectChangeRequest(action) {
  try {
    const res = yield API.post(
      `project/add-edit-change-request`,
      action.payload.form
    );
    if (res.data.meta.code === 1) {
      yield put(addEditProjectChangeRequestSuccess(res?.data?.data));
      yield call(action.payload.callback, res?.data?.data);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(addEditProjectChangeRequestFailure(res));
      toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(addEditProjectChangeRequestFailure(e));
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

function* getProjectChangeRequest(action) {
  try {
    const res = yield API.get(`project/get-cr-list?id=${action.payload.id}`);
    if (res.data.meta.code === 1) {
      yield put(getProjectChangeRequestSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(getProjectChangeRequestFailure(res.data.data));
    }
  } catch (e) {
    yield put(getProjectChangeRequestFailure(e));
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

function* deleteProjectChangeRequest(action) {
  try {
    const res = yield API.delete(`project/delete-cr?id=${action.payload.id}`);
    if (res.data.meta.code === 1) {
      yield put(deleteProjectChangeRequestSuccess(res?.data?.data));
      yield call(action.payload.callback);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(deleteProjectChangeRequestFailure(res.data.data));
    }
  } catch (e) {
    yield put(deleteProjectChangeRequestFailure(e));
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

export function* watchAddEditProjectChangeRequestAPI() {
  yield takeEvery(ADD_EDIT_PROJECT_CHANGE_REQUEST, addEditProjectChangeRequest);
}

export function* watchGetProjectChangeRequestAPI() {
  yield takeEvery(GET_PROJECT_CHANGE_REQUEST, getProjectChangeRequest);
}

export function* watchDeleteProjectChangeRequestAPI() {
  yield takeEvery(DELETE_PROJECT_CHANGE_REQUEST, deleteProjectChangeRequest);
}

export default function* rootSaga() {
  yield all([
    watchAddEditProjectChangeRequestAPI(),
    watchGetProjectChangeRequestAPI(),
    watchDeleteProjectChangeRequestAPI(),
  ]);
}
