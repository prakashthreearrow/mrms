import validator from "validator";

function validateResetPassword(data) {
  const errors = {};

  if (validator.isEmpty(data.password.trim()))
    errors.password = "Please enter password.";
  if (validator.isEmpty(data.confirmPassword.trim()))
    errors.confirmPassword = "Please confirm your password.";
  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateResetPassword;
