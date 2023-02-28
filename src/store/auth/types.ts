import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REFRESH_REQUEST,
  REFRESH_SUCCESS,
  REFRESH_FAILURE,
} from "./actionTypes";

import { CLEAR_STATE } from "../storeAction";

export interface IAuth {
  accessToken: string;
  refreshToken: string;
  accessExpiredAt: number;
  refreshExpiredAt: number;
}

export interface AuthState {
  pending: boolean;
  accessToken: string;
  refreshToken: string;
  accessExpiredAt: number;
  refreshExpiredAt: number;
  error: string | null;
}

export interface LoginPayload {
  formData: any;
  callback: any;
}

export interface LoginSuccessPayload {
  accessToken: string;
  refreshToken: string;
  accessExpiredAt: number;
  refreshExpiredAt: number;
}

export interface LoginFailurePayload {
  error: string;
}

export interface LoginRequest {
  type: typeof LOGIN_REQUEST;
  payload: LoginPayload;
}

export type LoginSuccess = {
  type: typeof LOGIN_SUCCESS;
  payload: LoginSuccessPayload;
};

export type LoginFailure = {
  type: typeof LOGIN_FAILURE;
  payload: LoginFailurePayload;
};

export interface RefreshPayload {
  formData: any;
}

export interface RefreshSuccessPayload {
  accessToken: string;
  refreshToken: string;
  accessExpiredAt: number;
  refreshExpiredAt: number;
}

export interface RefreshFailurePayload {
  error: string;
}

export interface RefreshRequest {
  type: typeof REFRESH_REQUEST;
  payload: RefreshPayload;
}

export type RefreshSuccess = {
  type: typeof REFRESH_SUCCESS;
  payload: RefreshSuccessPayload;
};

export type RefreshFailure = {
  type: typeof REFRESH_FAILURE;
  payload: RefreshFailurePayload;
};

export type clearState = {
  type: typeof CLEAR_STATE;
};

export type AuthActions =
  | LoginRequest
  | LoginSuccess
  | LoginFailure
  | RefreshRequest
  | RefreshSuccess
  | RefreshFailure
  | clearState;
