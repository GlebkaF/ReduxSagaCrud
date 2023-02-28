import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REFRESH_REQUEST,
  REFRESH_SUCCESS,
  REFRESH_FAILURE,
} from "./actionTypes";

import {
  LoginPayload,
  LoginSuccessPayload,
  LoginRequest,
  LoginSuccess,
  LoginFailure,
  LoginFailurePayload,
  RefreshPayload,
  RefreshSuccessPayload,
  RefreshRequest,
  RefreshSuccess,
  RefreshFailure,
  RefreshFailurePayload,
} from "./types";

export const loginRequest = (payload: LoginPayload): LoginRequest => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (payload: LoginSuccessPayload): LoginSuccess => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (payload: LoginFailurePayload): LoginFailure => ({
  type: LOGIN_FAILURE,
  payload,
});

export const refreshRequest = (payload: RefreshPayload): RefreshRequest => ({
  type: REFRESH_REQUEST,
  payload,
});

export const refreshSuccess = (
  payload: RefreshSuccessPayload
): RefreshSuccess => ({
  type: REFRESH_SUCCESS,
  payload,
});

export const refreshFailure = (
  payload: RefreshFailurePayload
): RefreshFailure => ({
  type: REFRESH_FAILURE,
  payload,
});
