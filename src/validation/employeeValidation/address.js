import validator from "validator";

function validateAddress(data) {
  const errors = {};

  if (validator.isEmpty(data.presentAddress))
    errors.presentAddress = "Please enter the address.";

  if (validator.isEmpty(data.presentTown))
    errors.presentTown = "Please enter the town/city.";

  if (validator.isEmpty(data.presentStateId.toString()))
    errors.presentStateId = "Please select the state.";

  if (validator.isEmpty(data.presentPinCode))
    errors.presentPinCode = "Please enter the pin code.";
  else if (data.presentPinCode.length !== 6)
    errors.presentPinCode = "Please enter valid pin code.";

  if (validator.isEmpty(data.presentMobileNumber))
    errors.presentMobileNumber = "Please enter the mobile no.";
  else if (data.presentMobileNumber.length !== 11)
    errors.presentMobileNumber = "Please enter valid mobile no.";

  if (validator.isEmpty(data.permanentAddress))
    errors.permanentAddress = "Please enter the address.";

  if (validator.isEmpty(data.permanentTown))
    errors.permanentTown = "Please enter the town/city.";

  if (validator.isEmpty(data.permanentStateId.toString()))
    errors.permanentStateId = "Please select the state.";

  if (validator.isEmpty(data.permanentPinCode))
    errors.permanentPinCode = "Please enter pin code.";
  else if (data.permanentPinCode.length !== 6)
    errors.permanentPinCode = "Please enter valid pin code.";

  if (validator.isEmpty(data.permanentMobileNumber))
    errors.permanentMobileNumber = "Please enter the mobile no.";
  else if (data.permanentMobileNumber.length !== 11)
    errors.permanentMobileNumber = "Please enter valid mobile no.";

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateAddress;
