import validator from "validator";

function validateSkill(data) {
  const errors = {};

  if (validator.isEmpty(data.skillType.toString()))
    errors.skillType = "Please select the skill type.";
  if (validator.isEmpty(data.skillLevel.toString()))
    errors.skillLevel = "Please select the skill level.";
  if (validator.isEmpty(data.yearOfExperience))
    errors.yearOfExperience = "Please enter the years of experience.";
  else if (!validator.matches(data.yearOfExperience, /^[0-9]+(\.[0-9]{1,2})?$/))
    errors.yearOfExperience = "Please enter valid type of year of experience.";
  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateSkill;
