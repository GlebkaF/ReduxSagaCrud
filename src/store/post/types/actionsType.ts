import { detailPost, post } from "./storeType";
import { CLEAR_STATE } from "../../storeAction";

export interface deletePostAction {
  type: "DELETE_POST_REQUEST";
  id: number;
}

export interface createPostAction {
  type: "CREATE_POST_REQUEST";
  formData: any;
}

export interface editPostAction {
  type: "EDIT_POST_REQUEST";
  formData: any;
  id: number;
}

export interface getPost {
  type: "GET_POST_REQUEST";
  id: number;
}

export interface getPosts {
  type: "GET_POSTS_REQUEST";
  page: number;
}

/*export interface postsLoading {
  type: "POSTS_LOADING";
  page: number;
}

export interface postsFailure {
  type: "POSTS_FAILURE";
}*/

// For Reducers

export interface gotPost {
  type: "GOT_POST";
  detailPost: detailPost;
}

export interface createdPostAction {
  type: "CREATED_POST";
  post: post;
}

export interface editedPostAction {
  type: "EDITED_POST";
  //post: post;
}

export interface deletedPostAction {
  type: "DELETED_POST";
  id: number;
}

export interface gotPosts {
  type: "GOT_POSTS";
  post: post[];
  totalPage: number;
}

export interface postLoading {
  type: "POST_LOADING_REQUEST";
  page: number;
}

export interface postsLoading {
  type: "POSTS_LOADING";
}

/*export interface postFailure {
  type: "POST_FAILURE";
  error: string | null;
}*/

export interface postsFailure {
  type: "POSTS_FAILURE";
  error: string | null;
}

export interface postsSuccess {
  type: "POSTS_SUCCESS";
}

export interface clearDetailPost {
  type: "CLEAR_DETAILPOST";
  detailPost: null;
}

export type clearState = {
  type: typeof CLEAR_STATE;
};

export const actionIds = {
  DELETE_POST_REQUEST: "DELETE_POST_REQUEST",
  CREATE_POST_REQUEST: "CREATE_POST_REQUEST",
  EDIT_POST_REQUEST: "EDIT_POST)REQUEST",
  GET_POST_REQUEST: "GET_POST_REQUEST",
  GET_POSTS_REQUEST: "GET_POSTS_REQUEST",
  POSTS_LOADING: "POSTS_LOADING",
  POST_LOADING_REQUEST: "POST_LOADING_REQUEST",
  POSTS_FAILURE: "POSTS_FAILURE",
  CLEAR_DETAILPOST: "CLEAR_DETAILPOST",
};
