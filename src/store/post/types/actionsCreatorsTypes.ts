import {
  deletePostAction,
  createPostAction,
  editPostAction,
  getPosts,
  getPost,
  postsSuccess,
  postsFailure,
} from "./actionsType";

export type deletePostActionCreator = (id: number) => deletePostAction;

export type createPostActionCreator = (formData: any) => createPostAction;

export type editPostActionCreator = (
  formData: any,
  id: number
) => editPostAction;

export type getPostActionCreator = (id: number) => getPost;

export type getPostsActionCreator = (page: number) => getPosts;

export type postsFailureActionCreator = (error: string | null) => postsFailure;

export type postsSuccessActionCreator = (page: number) => postsSuccess;
