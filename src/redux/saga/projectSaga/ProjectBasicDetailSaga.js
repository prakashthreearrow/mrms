import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";
import React from "react";

import {
  GET_PROJECT_BASIC_DETAIL,
  ADD_EDIT_PROJECT_BASIC_DETAIL,
} from "../../action/types";
import {
  getProjectBasicDetailSuccess,
  getProjectBasicDetailFailure,
  addEditProjectBasicDetailSuccess,
  addEditProjectBasicDetailFailure,
} from "../../action";
import API from "../../../utils/api";
import { ErrorToast, SuccessToast } from "../../../utils/helper";

function* getProjectBasicDetailRequest(action) {
  try {
    const res = yield API.get(
      `project/get-project-basic-details?id=${action.payload.id}`
    );
    if (res.data.meta.code === 1) {
      yield put(getProjectBasicDetailSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(getProjectBasicDetailFailure(res.data.data));
    }
  } catch (e) {
    yield put(getProjectBasicDetailFailure(e));
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

function* addEditProjectBasicDetailRequest(action) {
  try {
    const res = yield API.post(
      `project/add-edit-basic-details/`,
      action.payload.form
    );
    if (res.data.meta.code === 1) {
      yield put(addEditProjectBasicDetailSuccess(res?.data?.data));
      yield call(action.payload.callback, res?.data?.data);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(addEditProjectBasicDetailFailure(res));
      toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(addEditProjectBasicDetailFailure(e));
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

export function* watchGetProjectBasicDetailAPI() {
  yield takeEvery(GET_PROJECT_BASIC_DETAIL, getProjectBasicDetailRequest);
}

export function* watchAddEditProjectBasicDetailAPI() {
  yield takeEvery(
    ADD_EDIT_PROJECT_BASIC_DETAIL,
    addEditProjectBasicDetailRequest
  );
}

export default function* rootSaga() {
  yield all([
    watchGetProjectBasicDetailAPI(),
    watchAddEditProjectBasicDetailAPI(),
  ]);
}
