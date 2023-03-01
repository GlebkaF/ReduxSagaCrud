import {
  put,
  call,
  StrictEffect,
  takeLatest,
  select,
} from "redux-saga/effects";
import Cookies from "js-cookie";
import { LOCATION_CHANGE } from "connected-react-router";
import { apiClient } from "../../../http";
import * as api from "../../../http/endPoint";
import { AxiosResponse } from "axios";
import { gotTags } from "../types/actionsType";
import { selectRouter } from "../../post/reducers/postReducer";

// watchers

function* tagSaga(): Generator<StrictEffect> {
  yield takeLatest(LOCATION_CHANGE, watchTagsSaga);
}

// workers

function* getTagsWorker() {
  try {
    const response: AxiosResponse = yield call(
      apiClient.get,
      `${api.GET_TAGS}`
    );

    switch (response.status) {
      case 200:
        const data: gotTags = {
          type: "GOT_TAGS",
          tags: response.data,
        };

        yield put(data);
    }
  } catch (error: any) {
    const { message } = error;
    if (message === "Request failed with status code 401") {
      console.log("Пожалуйста, авторизуйтесь");
      if (Cookies.get("refreshToken")) {
        yield put({ type: "GET_TAGS" });
      }
    }
  }
}

export function* watchTagsSaga() {
  const { location } = yield select(selectRouter);
  const { pathname } = location;
  const path = pathname;
  if (path === "/dashboard" && Cookies.get("refreshToken")) {
    yield call(getTagsWorker);
  } else return;
}

export default tagSaga;
