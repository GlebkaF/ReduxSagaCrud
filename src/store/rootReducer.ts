import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";

import authReducer from "./auth/reducer";
import postReducer from "./post/reducers/postReducer";
import authorReducer from "./author/reducers/authorReducer";
import tagReducer from "./tags/reducers/tagReducer";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  authors: authorReducer,
  tags: tagReducer,
  router: connectRouter(history),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
