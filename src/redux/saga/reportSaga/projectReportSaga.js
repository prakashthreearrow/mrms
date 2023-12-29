import { all, put, takeEvery } from "redux-saga/effects";
import { toast } from "react-toastify";
import React from "react";

import { GET_PROJECT_REPORT } from "../../action/types";
import { getProjectReportSuccess, getProjectReportFailure } from "../../action";
import API from "../../../utils/api";
import { ErrorToast } from "../../../utils/helper";

function* getProjectReportRequest(actions) {
  try {
    const res = yield API.post(`/project/reports`, actions.payload.form);
    if (res.data.meta.code === 1) {
      yield put(getProjectReportSuccess(res?.data));
      //yield call(actions.payload.callback);
    } else if (res.data.meta.code === 0) {
      yield put(getProjectReportFailure());
      yield toast.error(<ErrorToast msg={res.data.meta.message} />);
    }
  } catch (e) {
    yield put(getProjectReportFailure());
    yield toast.error(<ErrorToast msg="Something went wrong." />);
  }
}

export function* watchGetProjectReportAPI() {
  yield takeEvery(GET_PROJECT_REPORT, getProjectReportRequest);
}

export default function* rootSaga() {
  yield all([watchGetProjectReportAPI()]);
}
