import { all, takeEvery, put } from "redux-saga/effects";

import { GET_ESCALATION_TYPE } from "../../action/types";
import { escalationTypeSuccess, escalationTypeFailure } from "../../action";
import API from "../../../utils/api";

function* getEscalationTypeRequest() {
  try {
    const res = yield API.get("/escalation-types/");
    if (res.data.meta.code === 1) {
      yield put(escalationTypeSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(escalationTypeFailure(res));
    }
  } catch (e) {
    yield put(escalationTypeFailure());
  }
}

export function* watchGetEscalationTypeAPI() {
  yield takeEvery(GET_ESCALATION_TYPE, getEscalationTypeRequest);
}

export default function* rootSaga() {
  yield all([watchGetEscalationTypeAPI()]);
}
