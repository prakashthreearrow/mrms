import React from "react";
import { all, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";

import API from "../../../utils/api";
import { ErrorToast } from "../../../utils/helper";
import { GET_PROJECT_COUNT } from "../../action/types";
import { getProjectCountFailure, getProjectCountSuccess } from "../../action";

function* getProjectCountRequest() {
  try {
    const res = yield API.get("project/review-count");
    if (res.data.meta.code === 1) {
      yield put(yield put(getProjectCountSuccess(res?.data)));
    } else if (res.data.meta.code === 0) {
      yield put(getProjectCountFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(getProjectCountFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

export function* watchGetProjectCountAPI() {
  yield takeEvery(GET_PROJECT_COUNT, getProjectCountRequest);
}

export default function* rootSaga() {
  yield all([watchGetProjectCountAPI()]);
}
