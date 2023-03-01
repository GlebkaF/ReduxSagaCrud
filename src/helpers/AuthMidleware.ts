import { useSelector } from "react-redux";
import { useEffect } from "react";
import { requestValidAccessToken } from "../http";
import { selectRouter } from "../store/post/reducers/postReducer";

type Props = {
  children: string | JSX.Element | JSX.Element[] | any;
};

const AuthMiddleware = ({ children }: Props) => {
  const { location } = useSelector(selectRouter);
  const route = location.pathname;
  useEffect(() => {
    requestValidAccessToken();
  }, [route]);

  return children;
};

export default AuthMiddleware;
