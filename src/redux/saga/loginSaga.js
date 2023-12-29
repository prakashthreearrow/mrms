import React from "react";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

import { LOGIN_USER } from "../action/types";
import { loginUserFailure, loginUserSuccess } from "../action";
import API from "../../utils/api";
import {
  ErrorToast,
  setLocalStorageItem,
  SuccessToast,
} from "../../utils/helper";

function* loginUserRequest(action) {
  try {
    const res = yield API.post("login", action.payload.form);
    if (res.data.meta.code === 1) {
      yield put(loginUserSuccess());
      yield call(
        setLocalStorageItem,
        "userData",
        JSON.stringify(res.data.data)
      );
      yield call(setLocalStorageItem, "token", res.data.meta.token);
      yield call(action.payload.callback);
      toast.success(<SuccessToast msg={res.data.meta.message} />);
    } else if (res.data.meta.code === 0) {
      yield put(loginUserFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(loginUserFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

export function* watchLoginUserAPI() {
  yield takeEvery(LOGIN_USER, loginUserRequest);
}

export default function* rootSaga() {
  yield all([watchLoginUserAPI()]);
}
