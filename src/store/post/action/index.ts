import {
  deletePostActionCreator,
  createPostActionCreator,
  editPostActionCreator,
  getPostsActionCreator,
  getPostActionCreator,
} from "../types/actionsCreatorsTypes";

export const deletePost: deletePostActionCreator = (id) => {
  return {
    type: "DELETE_POST_REQUEST",
    id,
  };
};

export const createPost: createPostActionCreator = (formData) => {
  return {
    type: "CREATE_POST_REQUEST",
    formData,
  };
};

export const editPost: editPostActionCreator = (formData, id) => {
  return {
    type: "EDIT_POST_REQUEST",
    formData,
    id,
  };
};

export const getPost: getPostActionCreator = (id) => {
  return {
    type: "GET_POST_REQUEST",
    id,
  };
};

export const getPosts: getPostsActionCreator = (page) => {
  return {
    type: "GET_POSTS_REQUEST",
    page,
  };
};
