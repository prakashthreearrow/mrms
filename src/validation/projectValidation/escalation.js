import validator from "validator";

function validateEscalation(data) {
  const errors = {};

  if (validator.isEmpty(data.subject))
    errors.subject = "Please enter the subject.";

  if (validator.isEmpty(data.type.toString()))
    errors.type = "Please select the type.";

  if (validator.isEmpty(data.concern))
    errors.concern = "Please enter the concern.";

  if (validator.isEmpty(data.resolved.toString()))
    errors.resolved = "Please select the resolved type.";

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateEscalation;
