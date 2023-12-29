import validator from "validator";

function validateBasicInfo(data) {
  const errors = {};

  if (validator.isEmpty(data.firstName))
    errors.firstName = "Please enter the first name.";
  if (validator.isEmpty(data.middleName))
    errors.middleName = "Please enter the middle name.";
  if (validator.isEmpty(data.lastName))
    errors.lastName = "Please enter the last name.";
  if (validator.isEmpty(data.joiningDate))
    errors.joiningDate = "Please enter the joining Date.";
  if (validator.isEmpty(data.dob)) errors.dob = "Please enter the birth date.";
  if (validator.isEmpty(data.designation.toString()))
    errors.designation = "Please select the designation.";
  if (validator.isEmpty(data.department.toString()))
    errors.department = "Please select the department.";

  if (validator.isEmpty(data.companyEmailID.trim()))
    errors.companyEmailID = "Please enter the company email Id.";
  else if (
    !validator.matches(data.companyEmailID, /^\w+([-+.']\w+)*\w+(\.[-.]\w+)*$/)
  )
    errors.companyEmailID = "Please enter valid company email Id.";

  if (validator.isEmpty(data.personalEmailID.trim()))
    errors.personalEmailID = "Please enter the personal email Id.";
  else if (!validator.isEmail(data.personalEmailID))
    errors.personalEmailID = "Please enter valid personal email Id.";

  if (validator.isEmpty(data.mobileNo))
    errors.mobileNo = "Please enter the mobile no.";
  else if (data.mobileNo.length !== 11)
    errors.mobileNo = "Please enter valid mobile no.";

  if (validator.isEmpty(data.gender.toString()))
    errors.gender = "Please select the gender.";
  if (validator.isEmpty(data.bloodGroup.toString()))
    errors.bloodGroup = "Please select the blood group.";
  if (validator.isEmpty(data.reportingTo.toString()))
    errors.reportingTo = "Please select the reporting to.";

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateBasicInfo;
