import validator from "validator";

function validateUpdateHoliday(data) {
  const errors = {};

  if (validator.isEmpty(data.name.trim()))
    errors.name = "Please enter holiday name.";

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateUpdateHoliday;
