import { FC, useRef } from "react";
import { loginRequest } from "../store/auth/actions";
import { connect } from "react-redux";

const Login: FC<{}> = (props: any) => {
  const emailRef: any = useRef();
  const passwordRef: any = useRef();

  const callback = (data: any) => {
    console.log("login");
  };

  const login = () => {
    const formData = new FormData();
    formData.append("email", emailRef.current.value);
    formData.append("password", passwordRef.current.value);
    let data: any = {
      formData,
      callback,
    };
    props.login(data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5 mx-auto card mt-5 p-5">
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              placeholder="name@example.com"
              ref={emailRef}
            />
            <label htmlFor="email">Email address</label>
          </div>
          <div className="form-floating mt-3">
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              placeholder="password"
              ref={passwordRef}
            />
            <label htmlFor="password">Email address</label>
          </div>
          <button
            onClick={() => {
              login();
            }}
            className="w-100 btn btn-lg btn-warning mt-3"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  login: (params: any) => dispatch(loginRequest(params)),
});

export default connect(null, mapDispatchToProps)(Login);
