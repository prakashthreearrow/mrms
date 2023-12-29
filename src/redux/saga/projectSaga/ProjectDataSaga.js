import React from "react";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

import API from "../../../utils/api";
import { ErrorToast, SuccessToast } from "../../../utils/helper";
import { DELETE_PROJECT, GET_PROJECT } from "../../action/types";
import {
  deleteProjectFailure,
  deleteProjectSuccess,
  getProjectFailure,
  getProjectSuccess,
} from "../../action";

function* getProjectRequest(actions) {
  try {
    const res = yield API.post(
      "project/get-project-list",
      actions.payload.form
    );
    if (res.data.meta.code === 1) {
      yield put(yield put(getProjectSuccess(res?.data)));
      if (actions.payload.callback) {
        yield call(actions.payload.callback);
      }
    } else if (res.data.meta.code === 0) {
      yield put(getProjectFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(getProjectFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

function* deleteProjectRequest(actions) {
  try {
    const res = yield API.post("delete-project", actions.payload.form);
    if (res.data.meta.code === 1) {
      yield put(deleteProjectSuccess());
      yield call(actions.payload.callback);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(deleteProjectFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(deleteProjectFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

export function* watchGetProjectAPI() {
  yield takeEvery(GET_PROJECT, getProjectRequest);
}

export function* watchDeleteProjectAPI() {
  yield takeEvery(DELETE_PROJECT, deleteProjectRequest);
}

export default function* rootSaga() {
  yield all([watchGetProjectAPI(), watchDeleteProjectAPI()]);
}
