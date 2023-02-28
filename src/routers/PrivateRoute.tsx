import { Redirect } from "react-router-dom";
import isAuthenticated from "./isAuthenticated";

type Props = {
  redirectPath?: string;
  children: JSX.Element | JSX.Element[] | any;
};

export const PrivateRoute = ({ children }: Props) => {
  const isAuth = isAuthenticated();

  if (!isAuth) {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  } else {
    return children;
  }
};

export default PrivateRoute;
