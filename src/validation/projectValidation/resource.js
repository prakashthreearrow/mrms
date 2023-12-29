import validator from "validator";

function validateResource(data) {
  const errors = {};

  if (validator.isEmpty(data.role.toString()))
    errors.role = "Please select the role.";

  if (validator.isEmpty(data.resource.toString()))
    errors.resource = "Please select the resource.";

  if (validator.isEmpty(data.startDate))
    errors.startDate = "Please enter the start date.";

  if (validator.isEmpty(data.releaseDate))
    errors.releaseDate = "Please enter the estimated release date.";

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateResource;
