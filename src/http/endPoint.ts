//auth
export const LOGIN = "/auth/token-generate";
export const REFRESH = "/auth/token-refresh";

//authors
export const GET_AUTHORS = "/manage/authors";

//tags
export const GET_TAGS = "/manage/tags";

//posts
export const CREATE_POST = "/manage/posts/add";
export const EDIT_POST = (id: number) => `/manage/posts/edit?id=${id}`;
export const DELETE_POST = (id: number) => `/manage/posts/remove?id=${id}`;
export const GET_POST = (id: number) => `/manage/posts/detail?id=${id}`;
export const GET_POSTS = (page: number) => `/manage/posts/default?page=${page}`;
