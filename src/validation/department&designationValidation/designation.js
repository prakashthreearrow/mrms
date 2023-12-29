import validator from "validator";

function validateDesignation(data) {
  const errors = {};

  if (validator.isEmpty(data.designation))
    errors.designation = "Please enter the designation.";

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateDesignation;
