import { author } from "./storeType";

export interface getAuthors {
  type: "GET_AUTHORS_REQUEST";
}

// For Reducers

export interface gotAuthors {
  type: "GOT_AUTHORS";
  author: author[];
}

export interface authorsFailure {
  type: "AUTHORS_FAILURE";
  error: string;
}

export interface authorsSuccess {
  type: "AUTHORS_SUCCESS";
}

export interface authorsLoading {
  type: "AUTHORS_LOADING";
}

export const actionIds = {
  GET_AUTHORS: "GET_AUTHORS",
};
