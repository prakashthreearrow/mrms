import { all, takeEvery, put, call } from "redux-saga/effects";
import { toast } from "react-toastify";

import { ADD_EDIT_FF, GET_FF } from "../../action/types";
import {
  addEditFFSuccess,
  addEditFFFailure,
  getFFFailure,
  getFFSuccess,
} from "../../action";
import API from "../../../utils/api";
import { ErrorToast, SuccessToast } from "../../../utils/helper";
import React from "react";

function* addEditFFRequest(action) {
  try {
    const res = yield API.post("admin/create-update-fnf", action.payload.form);
    if (res.data.meta.code === 1) {
      yield put(addEditFFSuccess(res?.data?.data));
      yield call(action.payload.callback);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(addEditFFFailure(res));
      toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(addEditFFFailure(e));
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

function* getFFRequest(action) {
  try {
    const res = yield API.get(`get-fnf?id=${action.payload}`);
    if (res.data.meta.code === 1) {
      yield put(getFFSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(getFFFailure(res));
    }
  } catch (e) {
    yield put(getFFFailure(e));
    toast.error(<ErrorToast msg="Something went wrong" />);
  }
}

export function* watchAddEditFFAPI() {
  yield takeEvery(ADD_EDIT_FF, addEditFFRequest);
}

export function* watchGetFFAPI() {
  yield takeEvery(GET_FF, getFFRequest);
}

export default function* rootSaga() {
  yield all([watchGetFFAPI(), watchAddEditFFAPI()]);
}
