import { all, takeEvery, put } from "redux-saga/effects";

import { EDUCATION_TYPE } from "../../action/types";
import { educationTypeSuccess, educationTypeFailure } from "../../action";
import API from "../../../utils/api";

function* educationTypeRequest() {
  try {
    const res = yield API.get("education-types");
    if (res.data.meta.code === 1) {
      yield put(educationTypeSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(educationTypeFailure(res));
    }
  } catch (e) {
    yield put(educationTypeFailure());
  }
}

export function* watchEducationTypeAPI() {
  yield takeEvery(EDUCATION_TYPE, educationTypeRequest);
}

export default function* rootSaga() {
  yield all([watchEducationTypeAPI()]);
}
