import { Reducer } from "redux";
import { RootState } from "../../../store/rootReducer";
import {
  createdPostAction,
  deletedPostAction,
  gotPosts,
  gotPost,
  postLoading,
  postsFailure,
  postsLoading,
  postsSuccess,
  clearDetailPost,
  clearState
} from "../types/actionsType";
import posts from "../types/storeType";

type actions =
  | createdPostAction
  | deletedPostAction
  | gotPosts
  | gotPost
  | postsFailure
  | postLoading
  | postsSuccess
  | postsLoading
  | clearDetailPost
  | clearState;

const initialState: posts = {
  page: 1,
  totalPage: 1,
  post: [],
  error: null,
  loading: false,
  success: false,
  detailPost: null,
};

const postReducer: Reducer<posts, actions> = (state = initialState, action) => {
  switch (action.type) {
    case "CREATED_POST":
      return { ...state, post: [...state.post, action.post] };
    case "DELETED_POST":
      return {
        ...state,
        post: state.post.filter((post) => post.id !== action.id),
      };
    case "POSTS_LOADING":
      return { ...state, loading: true, success: false };
    case "POSTS_SUCCESS":
      return { ...state, loading: false, success: true, error: null };
    case "POSTS_FAILURE":
      return {
        ...state,
        error: action.error,
        loading: false,
        success: false,
      };
    case "POST_LOADING_REQUEST":
      return { ...state, loading: true, success: false, page: action.page };

    case "GOT_POST":
      return {
        ...state,
        loading: false,
        success: true,
        detailPost: action.detailPost,
      };
    case "GOT_POSTS":
      return {
        ...state,
        post: action.post,
        totalPage: action.totalPage,
        loading: false,
        success: true,
        error: null,
      };
    case "CLEAR_DETAILPOST":
      return {
        ...state,
        detailPost: null,
      };
    case "CLEAR_STATE":
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default postReducer;

//selectors

export const selectPosts = (state: RootState) => state.posts;
export const getAllPosts = (state: RootState) => state.posts.post;
export const selectDetailPost = (state: RootState) => state.posts.detailPost;
export const selectPage = (state: RootState) => state.posts.page;
export const selectTotalPage = (state: RootState) => state.posts.totalPage;
export const selectRouter = (state: RootState) => state.router;
export const selectLoading = (state: RootState) => state.posts.loading;
export const selectError = (state: RootState) => state.posts.error;
