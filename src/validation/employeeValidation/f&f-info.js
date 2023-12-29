import validator from "validator";

function validateFFInfo(data) {
  const errors = {};
  // if(validator.isEmpty(data.reasonForLeaving)) errors.reasonForLeaving = 'Please enter the reason for leaving.';
  if (validator.isEmpty(data.resignationDate))
    errors.resignationDate = "Please enter the resignation date.";
  if (validator.isEmpty(data.lastWorkingDate))
    errors.lastWorkingDate = "Please enter the last working date.";

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateFFInfo;
