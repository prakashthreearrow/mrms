import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import logo from "../assets/images/large-mi-logo.svg";
import validateLogin from "../validation/login";
import { Button, Input, Loader } from "../component/CommonComponent";
import { loginUser } from "../redux/action";
import { getLocalStorageItem } from "../utils/helper";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useSelector((state) => state.Login.loading);

  useEffect(() => {
    if (getLocalStorageItem("token") && getLocalStorageItem("userData")) {
      history.push("/dashboard");
    }
  }, [history]);

  const handleChange = (e) => {
    setError((prevState) => ({
      ...prevState,
      [e.target.name]: "",
    }));
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateLogin(form);
    if (isValid) {
      dispatch(
        loginUser({
          form,
          callback: () => history.push("/dashboard"),
        })
      );
    } else {
      setError(errors);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <section className="login-main">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10 col-md-5 login-detail px-5 py-4">
              <div className="d-block text-center mb-5">
                <img src={logo} className="img-fluid mx-auto" alt="logo" />
                <p className="text-white f-18 my-2">Login to MRMS</p>
              </div>
              <form className="mx-xl-5" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group mb-4">
                  <Input
                    name="email"
                    value={form?.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter email"
                    error={error?.email}
                  />
                </div>
                <div className="form-group">
                  <Input
                    name="password"
                    value={form?.password}
                    onChange={handleChange}
                    type={`${showPassword ? "text" : "password"}`}
                    placeholder="Enter password"
                    error={error?.password}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    showIcon={!!form?.password}
                  />
                </div>
                <div className="text-center">
                  <Button text="Login" type="submit" className="mt-5" />
                </div>
                <Link to="/forgot-password">
                  <p className="mt-3 mb-0 text-white text-center cursor-pointer">
                    Forgot password?
                  </p>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
