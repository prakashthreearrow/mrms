import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Breadcrumb,
  Button,
  Input,
  Loader,
} from "../component/CommonComponent";
import validateChangePassword from "../validation/change-password";
import { changePassword } from "../redux/action";

const pageList = [
  {
    label: "Change Password",
  },
];

const ChangePassword = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showOldPassword, setOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.ChangePassword.loading);

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
    const { errors, isValid } = validateChangePassword(form);
    e.preventDefault();
    if (isValid) {
      let payload = {
        current_password: form?.oldPassword,
        new_password: form?.newPassword,
      };
      dispatch(
        changePassword({
          form: payload,
          callback: () => {
            setForm({
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            });
          },
        })
      );
    } else {
      setError(errors);
    }
  };
  return (
    <>
      {loading && <Loader />}
      <div className="row pb-0">
        <div className="">
          <Breadcrumb pageList={pageList} />
        </div>
      </div>
      <hr className="red my-1" />
      <div className="row mt-lg-5 mt-3">
        <div className="col-md-6 col-lg-6 col-12 mx-auto">
          <form className="mx-xl-5" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group row my-2">
              <Input
                name="oldPassword"
                value={form?.oldPassword}
                onChange={handleChange}
                type={`${showOldPassword ? "text" : "password"}`}
                error={error?.oldPassword}
                showPassword={showOldPassword}
                setShowPassword={setOldPassword}
                showIcon={!!form?.oldPassword}
                label="Old password"
                isRequired
              />
            </div>
            <div className="form-group row my-2">
              <Input
                name="newPassword"
                value={form?.newPassword}
                onChange={handleChange}
                type={`${showPassword ? "text" : "password"}`}
                error={error?.newPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showIcon={!!form?.newPassword}
                label="New password"
                isRequired
              />
            </div>
            <div className="form-group row my-2">
              <Input
                name="confirmPassword"
                value={form?.confirmPassword}
                onChange={handleChange}
                type={`${showConfirmPassword ? "text" : "password"}`}
                error={error?.confirmPassword}
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
                showIcon={!!form?.confirmPassword}
                label="Confirm password"
                isRequired
              />
            </div>
            <div className="text-center">
              <Button text="Change password" type="submit" className="mt-5" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

ChangePassword.propTypes = {};

export default ChangePassword;
