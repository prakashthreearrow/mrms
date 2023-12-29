import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import logo from "../assets/images/large-mi-logo.svg";
import { Button, Input, Loader } from "../component/CommonComponent";
import validateResetPassword from "../validation/reset-password";
import { ErrorToast } from "../utils/helper";
import { resetPassword } from "../redux/action";

const ResetPassword = () => {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const loading = useSelector((state) => state.ForgotPassword.loading);

  const handleChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setError((prevState) => ({
      ...prevState,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateResetPassword(form);
    if (isValid) {
      if (form.password !== form.confirmPassword) {
        toast.error(<ErrorToast msg="Passwords do not match." />);
        return null;
      } else {
        let payload = {
          new_password: form?.password,
          token: location?.pathname?.slice(
            location.pathname.lastIndexOf("/") + 1
          ),
        };
        dispatch(
          resetPassword({
            form: payload,
            callback: () => {
              setForm({
                password: "",
                confirmPassword: "",
              });
              history.push("/login");
            },
          })
        );
      }
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
                <p className="text-white f-18 my-2">Reset your password</p>
              </div>
              <form className="mx-xl-5" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group mb-4">
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
                <div className="form-group">
                  <Input
                    name="confirmPassword"
                    value={form?.confirmPassword}
                    onChange={handleChange}
                    type={`${showConfirmPassword ? "text" : "password"}`}
                    placeholder="Confirm password"
                    error={error?.confirmPassword}
                    showPassword={showConfirmPassword}
                    setShowPassword={setShowConfirmPassword}
                    showIcon={!!form?.confirmPassword}
                  />
                </div>
                <div className="text-center">
                  <Button text="Send" type="submit" className="mt-4" />
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

export default ResetPassword;
