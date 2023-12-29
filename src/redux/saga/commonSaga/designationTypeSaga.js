import { all, takeEvery, put } from "redux-saga/effects";

import { DESIGNATION_TYPE } from "../../action/types";
import { designationTypeSuccess, designationTypeFailure } from "../../action";
import API from "../../../utils/api";

function* designationTypeRequest() {
  try {
    const res = yield API.get("designation-types");
    if (res.data.meta.code === 1) {
      yield put(designationTypeSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(designationTypeFailure(res));
    }
  } catch (e) {
    yield put(designationTypeFailure());
  }
}

export function* watchDegignationTypeAPI() {
  yield takeEvery(DESIGNATION_TYPE, designationTypeRequest);
}

export default function* rootSaga() {
  yield all([watchDegignationTypeAPI()]);
}
