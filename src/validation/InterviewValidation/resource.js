import validator from "validator";

function validateInterviewResource(data) {
  const errors = {};

  if (validator.isEmpty(data.resource.toString()))
    errors.resource = "Please select the resource.";

  if (
    !validator.isEmpty(data.recordingURL) &&
    !validator.isURL(data?.recordingURL)
  )
    errors.recordingURL = "Please enter valid url.";

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateInterviewResource;
