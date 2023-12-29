import validator from "validator";

function validateChangePassword(data) {
  const errors = {};

  if (validator.isEmpty(data.oldPassword.trim()))
    errors.oldPassword = "Please enter old password.";

  if (validator.isEmpty(data.newPassword.trim()))
    errors.newPassword = "Please enter new password.";

  if (validator.isEmpty(data.confirmPassword.trim()))
    errors.confirmPassword = "Please confirm your password.";
  else if (!validator.equals(data.newPassword, data.confirmPassword)) {
    errors.confirmPassword = "New password and confirm password do not match.";
  }
  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateChangePassword;
