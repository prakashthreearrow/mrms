import validator from "validator";

function validateEmergencyContactDetails(data) {
  const errors = {};

  if (validator.isEmpty(data.name)) errors.name = "Please enter the name.";

  if (validator.isEmpty(data.relation_type))
    errors.relation_type = "Please select the relationship.";

  if (validator.isEmpty(data.mobile_no))
    errors.mobile_no = "Please enter the mobile no.";
  else if (data.mobile_no.length !== 11)
    errors.mobile_no = "Please enter valid mobile no.";

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateEmergencyContactDetails;
