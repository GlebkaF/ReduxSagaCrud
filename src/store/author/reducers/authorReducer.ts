import { Reducer } from "redux";
import { RootState } from "../../rootReducer";
import {
  gotAuthors,
  authorsFailure,
  authorsSuccess,
  authorsLoading,
} from "../types/actionsType";
import authors from "../types/storeType";

type actions = gotAuthors | authorsFailure | authorsSuccess | authorsLoading;

const initialState: authors = {
  author: [],
  error: null,
  loading: false,
  success: false,
};

const authorReducer: Reducer<authors, actions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "AUTHORS_LOADING":
      return { ...state, loading: true, success: false };
    case "AUTHORS_SUCCESS":
      return { ...state, loading: false, success: true, error: null };
    case "AUTHORS_FAILURE":
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case "GOT_AUTHORS":
      return {
        ...state,
        author: action.author,
        loading: false,
        success: true,
        error: null,
      };
    default:
      return state;
  }
};

export default authorReducer;

export const getAllAuthors = (state: RootState) => state.authors.author;
