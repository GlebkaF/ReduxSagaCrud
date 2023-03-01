import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./store/rootReducer";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store/index";

import App from "./components/App/App";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Post from "./pages/Post";
import PrivateRoute from "./routers/PrivateRoute";

import AuthMiddleware from "./helpers/AuthMidleware";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ToastContainer />
        <AuthMiddleware>
          <App>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/dashboard">
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              </Route>
              <Route path="/post/:id">
                <PrivateRoute>
                  <Post />
                </PrivateRoute>
              </Route>
              <Route path="/login" exact component={Login} />
            </Switch>
          </App>
        </AuthMiddleware>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
