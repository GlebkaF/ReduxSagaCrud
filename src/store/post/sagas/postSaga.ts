import {
  takeEvery,
  put,
  call,
  StrictEffect,
  takeLatest,
  select,
  fork,
  take,
} from "redux-saga/effects";
import Cookies from "js-cookie";
import { LOCATION_CHANGE } from "connected-react-router";
import { actionIds, getPosts, getPost } from "../types/actionsType";
import { apiClient } from "../../../http";
import * as api from "../../../http/endPoint";
import { AxiosResponse } from "axios";
import {
  deletedPostAction,
  gotPosts,
  gotPost,
  editPostAction,
  createPostAction,
  deletePostAction,
} from "../types/actionsType";
import { selectPosts } from "../reducers/postReducer";

// watchers

function* postSaga(): Generator<StrictEffect> {
  yield fork(routeChangeSaga);
  yield takeEvery(actionIds.CREATE_POST_REQUEST, createPostWorker);
  yield takeEvery(actionIds.DELETE_POST_REQUEST, deletePostWorker);
  yield takeEvery(actionIds.EDIT_POST_REQUEST, editPostWorker);
  yield takeLatest(actionIds.GET_POST_REQUEST, getPostDetailWorker);
  yield takeLatest(actionIds.POST_LOADING_REQUEST, getPostsWorker);
}

// workers

function* createPostWorker({ formData }: createPostAction) {
  try {
    const response: AxiosResponse = yield call(
      apiClient.post,
      api.CREATE_POST,
      formData
    );
    yield put({
      type: "POSTS_LOADING",
    });
    switch (response.status) {
      case 200:
        const { page } = yield select(selectPosts);
        yield put({ type: "POST_LOADING_REQUEST", page: page });
        yield put({ type: "POSTS_SUCCESS" });
    }
  } catch (error: any) {
    const { message } = error;
    switch (message) {
      case "Request failed with status code 422":
        yield put({
          type: "POSTS_FAILURE",
          error: "Пожалуйста, проверьте правильность ввода данных",
        });
        break;
      case "Request failed with status code 400":
        yield put({
          type: "POSTS_FAILURE",
          error: "Пожалуйста, заполните обязательные поля",
        });
        break;
      case "Request failed with status code 401":
        console.log("Пожалуйста, авторизуйтесь");
        //console.error("Пожалуйста, авторизуйтесь");
        break;
    }
  }
}

function* editPostWorker({ formData, id }: editPostAction) {
  try {
    const response: AxiosResponse = yield call(
      apiClient.post,
      api.EDIT_POST(id),
      formData
    );
    yield put({
      type: "POSTS_LOADING",
    });
    switch (response.status) {
      case 200:
        const { page } = yield select(selectPosts);
        yield put({ type: "POST_LOADING_REQUEST", page: page });
        yield put({ type: "POSTS_SUCCESS" });
    }
  } catch (error: any) {
    const { message } = error;
    switch (message) {
      case "Request failed with status code 422":
        yield put({
          type: "POSTS_FAILURE",
          error: "Пожалуйста, проверьте правильность ввода данных",
        });
        break;
      case "Request failed with status code 400":
        yield put({
          type: "POSTS_FAILURE",
          error: "Пожалуйста, заполните обязательные поля",
        });
        break;
      case "Request failed with status code 404":
        yield put({
          type: "POSTS_FAILURE",
          error: "Пост не найден",
        });
        break;
      case "Request failed with status code 401":
        console.error("Пожалуйста, авторизуйтесь");
        break;
    }
  }
}

function* deletePostWorker({ id }: deletePostAction) {
  try {
    const response: AxiosResponse = yield call(
      apiClient.delete,
      api.DELETE_POST(id)
    );
    yield put({
      type: "POSTS_LOADING",
    });
    switch (response.status) {
      case 200:
        const data: deletedPostAction = {
          type: "DELETED_POST",
          id,
        };
        yield put(data);
        yield put({ type: "POSTS_SUCCESS" });
    }
  } catch (error: any) {
    const { message } = error;
    switch (message) {
      case "Request failed with status code 400":
        yield put({
          type: "POSTS_FAILURE",
          error: "Пожалуйста, заполните обязательные поля",
        });
        break;
      case "Request failed with status code 404":
        yield put({
          type: "POSTS_FAILURE",
          error: "Пост не найден",
        });
        break;
      case "Request failed with status code 401":
        console.error("Пожалуйста, авторизуйтесь");
        break;
    }
  }
}

function* getPostDetailWorker({ id }: getPost) {
  try {
    const response: AxiosResponse = yield call(apiClient.get, api.GET_POST(id));
    yield put({
      type: "POSTS_LOADING",
    });
    switch (response.status) {
      case 200:
        const data: gotPost = {
          type: "GOT_POST",
          detailPost: response.data,
        };
        yield put(data);
        yield put({ type: "POSTS_SUCCESS" });
    }
  } catch (error: any) {
    const { message } = error;
    switch (message) {
      case "Request failed with status code 404":
        yield put({
          type: "POSTS_FAILURE",
          error: "Пост не найден",
        });
        break;
      case "Request failed with status code 401":
        console.log("Пожалуйста, авторизуйтесь");
       // console.error("Пожалуйста, авторизуйтесь");
        break;
    }
  }
}

function* getPostsWorker({ page }: getPosts) {
  try {
    const response: AxiosResponse = yield call(
      apiClient.get,
      api.GET_POSTS(page)
    );

    //@ts-ignore
    const totalPage = response.headers.get("X-Pagination-Page-Count");

    yield put({
      type: "POSTS_LOADING",
    });
    switch (response.status) {
      case 200:
        const data: gotPosts = {
          type: "GOT_POSTS",
          post: response.data,
          totalPage: Number(totalPage),
        };
        yield put(data);
        yield put({ type: "POSTS_SUCCESS" });
    }
  } catch (error: any) {
    const { message } = error;
    switch (message) {
      case "Request failed with status code 401":
        console.log("Пожалуйста, авторизуйтесь");
        //console.error("Пожалуйста, авторизуйтесь");
        break;
    }
  }
}

export function* routeChangeSaga() {
  while (true) {
    const {
      payload: { location },
    } = yield take(LOCATION_CHANGE);

    if (location.pathname === "/dashboard" && Cookies.get("refreshToken")) {
      const { page } = yield select(selectPosts);
      yield put({
        type: "POST_LOADING_REQUEST",
        page: page,
      });
    }

    if (location.pathname.includes("/post") === false) {
      yield put({
        type: "CLEAR_DETAILPOST",
      });
    }
  }
}

export default postSaga;
