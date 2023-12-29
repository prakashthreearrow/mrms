import validator from "validator";

function validateProjectMilestone(data) {
  const errors = {};

  if (validator.isEmpty(data.milestoneName))
    errors.milestoneName = "Please enter the milestone name.";

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateProjectMilestone;
