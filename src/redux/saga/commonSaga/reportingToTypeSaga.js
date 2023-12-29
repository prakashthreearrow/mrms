import { all, takeEvery, put, call } from "redux-saga/effects";

import { REPORTING_TO_TYPE } from "../../action/types";
import { reportingToTypeSuccess, reportingToTypeFailure } from "../../action";
import API from "../../../utils/api";

function* reportingToTypeRequest(action) {
  try {
    const res = yield API.get(
      `${
        action.payload.form.is_interview
          ? `report-to-list?is_interview=${action.payload.form.is_interview}`
          : action.payload.form.departments
          ? `report-to-list?departments=${action.payload.form.departments}`
          : action.payload.form.reporting_to_only
          ? `report-to-list?reporting_to_only=${action.payload.form.reporting_to_only}`
          : action.payload.form.designations
          ? `report-to-list?designations=${action.payload.form.designations}`
          : "report-to-list"
      }`
    );
    if (res.data.meta.code === 1) {
      yield put(reportingToTypeSuccess(res?.data?.data));
      if (action.payload.callback) {
        yield call(action.payload.callback(res?.data?.data));
      }
    } else if (res.data.meta.code === 0) {
      yield put(reportingToTypeFailure(res));
    }
  } catch (e) {
    yield put(reportingToTypeFailure());
  }
}

export function* watchReportingToTypeAPI() {
  yield takeEvery(REPORTING_TO_TYPE, reportingToTypeRequest);
}

export default function* rootSaga() {
  yield all([watchReportingToTypeAPI()]);
}
