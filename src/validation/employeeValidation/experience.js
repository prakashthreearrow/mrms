import validator from "validator";

function validateExperience(data) {
  const errors = {};
  if (validator.isEmpty(data.employerName))
    errors.employerName = "Please enter employer name.";
  if (validator.isEmpty(data.location))
    errors.location = "Please enter the location.";
  if (data.website && !validator.isURL(data.website))
    errors.website = "Please enter valid link.";
  if (validator.isEmpty(data.startDate))
    errors.startDate = "Please enter the start date.";
  if (validator.isEmpty(data.endDate))
    errors.endDate = "Please enter the end date.";
  if (validator.isEmpty(data.designation))
    errors.designation = "Please enter the designation.";
  if (validator.isEmpty(data.document))
    errors.document = "Please select the document.";

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateExperience;
