import validator from "validator";

function validateProjectBasicDetail(data) {
  const errors = {};

  if (validator.isEmpty(data.projectName))
    errors.projectName = "Please enter the project name.";

  if (validator.isEmpty(data.projectType.toString()))
    errors.projectType = "Please select the project type.";

  if (validator.isEmpty(data.projectStatus.toString()))
    errors.projectStatus = "Please select the project status.";

  if (
    data?.projectType === "Fixed cost" ||
    data?.projectType === "Hourly bucket"
  ) {
    if (validator.isEmpty(data.estimatedScope.toString()))
      errors.estimatedScope =
        "Estimated initial scope should not starts with 0.";
  }

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateProjectBasicDetail;
