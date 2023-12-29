import validator from "validator";

function validateChangeRequest(data) {
  const errors = {};

  if (validator.isEmpty(data.commentOrTitle))
    errors.commentOrTitle = "Please enter the comment.";

  if (validator.isEmpty(data.hours.toString()))
    errors.hours = "Please enter the hours.";

  if (validator.isEmpty(data.addOn)) errors.addOn = "Please select the date.";

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateChangeRequest;
