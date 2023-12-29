import validator from "validator";

function validateQualificationInfo(data) {
  const errors = {};

  if (validator.isEmpty(data.education.toString()))
    errors.education = "Please select the education.";
  if (validator.isEmpty(data.completionYear.toString()))
    errors.completionYear = "Please select the completion year.";
  if (validator.isEmpty(data.document))
    errors.document = "Please select the document.";
  if (validator.isEmpty(data.score)) errors.score = "Please enter the score.";

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateQualificationInfo;
