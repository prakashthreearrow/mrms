import validator from "validator";

function validateDepartment(data) {
  const errors = {};

  if (validator.isEmpty(data.department))
    errors.department = "Please enter the department.";

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateDepartment;
