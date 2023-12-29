import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import logo from "../assets/images/large-mi-logo.svg";
import { Button, Input, Loader } from "../component/CommonComponent";
import validateForgotPassword from "../validation/forgot-password";
import { forgotPassword } from "../redux/action";

const ForgotPassword = () => {
  const [form, setForm] = useState({
    email: "",
  });
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useSelector((state) => state.ForgotPassword.loading);

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
    const { errors, isValid } = validateForgotPassword(form);
    if (isValid) {
      dispatch(
        forgotPassword({
          form,
          callback: () => history.push("/login"),
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
            <div className="col-12 col-md-5 login-detail px-5 py-4">
              <div className="d-block text-center mb-5 text-center">
                <img src={logo} className="img-fluid mx-auto" alt="logo" />
                <p className="text-white f-18 my-2">Forgot your password?</p>
              </div>
              <form
                id="forgetPasswordForm"
                className="mx-xl-5"
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className="form-group">
                  <Input
                    name="email"
                    value={form?.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter email"
                    error={error?.email}
                  />
                </div>
                <div className="text-center">
                  <Button
                    text="Send"
                    type="submit"
                    className="mt-4"
                    disabled={loading}
                  />
                </div>
                <Link to="/login">
                  <p className="mt-3 mb-0 text-white text-center cursor-pointer">
                    Back to login
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

export default ForgotPassword;
