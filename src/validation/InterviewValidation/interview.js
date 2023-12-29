import validator from "validator";

function validateInterview(data) {
  const errors = {};

  if (validator.isEmpty(data.title.toString()))
    errors.title = "Please enter the title.";

  if (data.skills.length === 0) errors.skills = "Please select skills.";
  //if (validator.isEmpty(data.skills)) errors.skills = "Please select skills.";

  // if (validator.isEmpty(data.noOfResources))
  //   errors.noOfResources = "Please enter the number of resources.";

  if (validator.isEmpty(data.interviewDate))
    errors.interviewDate = "Please select interview date.";

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateInterview;
