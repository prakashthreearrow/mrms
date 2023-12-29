import { all, takeEvery, put } from "redux-saga/effects";

import { GET_DOCUMENT_TYPES } from "../../action/types";
import { getDocumentTypeSuccess, getDocumentTypeFailure } from "../../action";
import API from "../../../utils/api";

function* getDocumentTypeRequest() {
  try {
    const res = yield API.get("/document-types");
    if (res.data.meta.code === 1) {
      yield put(getDocumentTypeSuccess(res?.data?.data));
    } else if (res.data.meta.code === 0) {
      yield put(getDocumentTypeFailure(res));
    }
  } catch (e) {
    yield put(getDocumentTypeFailure());
  }
}

export function* watchGetDocumentTypeAPI() {
  yield takeEvery(GET_DOCUMENT_TYPES, getDocumentTypeRequest);
}

export default function* rootSaga() {
  yield all([watchGetDocumentTypeAPI()]);
}
