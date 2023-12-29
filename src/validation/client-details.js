import validator from "validator";

function validateClientDetail(data) {
  const errors = {};

  if (validator.isEmpty(data.companyName.toString()))
    errors.companyName = "Please enter the company name.";

  if (data.email) {
    if (!validator.isEmail(data.email))
      errors.email = "Please enter valid email Id.";
  }

  if (data.keyEmail1) {
    if (!validator.isEmail(data.keyEmail1))
      errors.keyEmail1 = "Please enter valid email Id.";
  }

  if (data.keyEmail2) {
    if (!validator.isEmail(data.keyEmail2))
      errors.keyEmail2 = "Please enter valid email Id.";
  }

  if (data.phoneCountryCode) {
    if (data.phone) {
      let phoneNumber = data.phoneCountryCode + " " + data.phone;
      if (!phoneNumber.match("([+]?\\d{1,2}[.-\\s]?)?(\\d{3}[.-]?){2}\\d{4}"))
        errors.phone = "Please enter valid phone number.";
    }
  }

  if (data.keyPhone1CountryCode) {
    if (data.keyPhone1) {
      let phoneNumber = data.keyPhone1CountryCode + " " + data.keyPhone1;
      if (!phoneNumber.match("([+]?\\d{1,2}[.-\\s]?)?(\\d{3}[.-]?){2}\\d{4}"))
        errors.keyPhone1 = "Please enter valid phone number.";
    }
  }

  if (data.keyPhone2CountryCode) {
    if (data.keyPhone2) {
      let phoneNumber = data.keyPhone2CountryCode + " " + data.keyPhone2;
      if (!phoneNumber.match("([+]?\\d{1,2}[.-\\s]?)?(\\d{3}[.-]?){2}\\d{4}"))
        errors.keyPhone2 = "Please enter valid phone number.";
    }
  }

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateClientDetail;
