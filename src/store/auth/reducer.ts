import { RootState } from "../rootReducer";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REFRESH_REQUEST,
  REFRESH_SUCCESS,
  REFRESH_FAILURE,
} from "./actionTypes";
import { CLEAR_STATE } from "../storeAction";
import { AuthActions, AuthState } from "./types";

const initialState: AuthState = {
  pending: false,
  accessToken: "",
  refreshToken: "",
  accessExpiredAt: 0,
  refreshExpiredAt: 0,
  error: null,
};

const reducers = (state = initialState, action: AuthActions) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        pending: false,
        accessToken: "",
        refreshToken: "",
        accessExpiredAt: 0,
        refreshExpiredAt: 0,
        error: action.payload.error,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        pending: false,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        accessExpiredAt: action.payload.accessExpiredAt,
        refreshExpiredAt: action.payload.refreshExpiredAt,
        error: null,
      };

    case REFRESH_REQUEST:
      return {
        ...state,
        pending: true,
        // Вот тут можно было ставить флаг refreshTokenRequest
      };
    case REFRESH_FAILURE:
      return {
        ...state,
        pending: false,
        accessToken: "",
        refreshToken: "",
        accessExpiredAt: 0,
        refreshExpiredAt: 0,
        error: action.payload.error,
      };
    case REFRESH_SUCCESS:
      return {
        // А вот тут обнулять его
        ...state,
        pending: false,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        accessExpiredAt: action.payload.accessExpiredAt,
        refreshExpiredAt: action.payload.refreshExpiredAt,
        error: null,
      };
    case CLEAR_STATE:
      return {
        ...initialState,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducers;

//selectors

export const selectAuth = (state: RootState) => state.auth;
export const selectRefreshExp = (state: RootState) =>
  state.auth.refreshExpiredAt;
