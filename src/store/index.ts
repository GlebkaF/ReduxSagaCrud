import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "connected-react-router";
import rootReducer from "./rootReducer";
import { history } from "./rootReducer";
import { rootSaga } from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();
const enhancers = composeWithDevTools(
  applyMiddleware(routerMiddleware(history), sagaMiddleware, logger)
);

const store = createStore(rootReducer, enhancers);

sagaMiddleware.run(rootSaga);

export default store;
