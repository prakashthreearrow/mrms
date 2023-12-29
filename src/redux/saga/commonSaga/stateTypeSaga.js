import { all, takeEvery, put } from "redux-saga/effects";

import { GET_STATE_TYPES } from "../../action/types";
import { stateTypeSuccess, stateTypeFailure } from "../../action";
import API from "../../../utils/api";

function* getStateTypeRequest() {
  try {
    const res = yield API.get("/state-list");
    if (res.data.meta.code === 1) {
      yield put(stateTypeSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(stateTypeFailure(res));
    }
  } catch (e) {
    yield put(stateTypeFailure());
  }
}

export function* watchGetStateTypeAPI() {
  yield takeEvery(GET_STATE_TYPES, getStateTypeRequest);
}

export default function* rootSaga() {
  yield all([watchGetStateTypeAPI()]);
}
