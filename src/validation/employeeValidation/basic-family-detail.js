import validator from "validator";

function validateFamilyDetails(data) {
  const errors = {};
  if (validator.isEmpty(data.marital_status.toString()))
    errors.marital_status = "Please select the marital status.";
  if (validator.isEmpty(data.father_name))
    errors.father_name = "Please enter the father's name.";
  if (validator.isEmpty(data.mother_name))
    errors.mother_name = "Please enter the mother's name.";

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateFamilyDetails;
