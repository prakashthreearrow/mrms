import validator from "validator";
import { validatePhone } from "../../utils/helper";

function validateClientDetail(data) {
  const errors = {};

  if (validator.isEmpty(data.companyName.toString()))
    errors.companyName = "Please enter the company name.";

  if (data.email) {
    if (!validator.isEmail(data.email))
      errors.email = "Please enter valid email Id.";
  }

  if (data.phoneCountryCode) {
    const { phoneCountryCode, phone } = data;
    if (phone.slice(phoneCountryCode.length) > 0) {
      const isValidPhone = validatePhone(phoneCountryCode, phone);
      if (!isValidPhone) errors.phone = "Please enter valid phone number.";
    }
  }

  if (data.keyPhone1CountryCode) {
    const { keyPhone1CountryCode, keyPhone1 } = data;
    if (keyPhone1.slice(keyPhone1CountryCode.length) > 0) {
      const isValidPhone = validatePhone(keyPhone1CountryCode, keyPhone1);
      if (!isValidPhone) errors.keyPhone1 = "Please enter valid phone number.";
    }
  }

  if (data.keyPhone2CountryCode) {
    const { keyPhone2CountryCode, keyPhone2 } = data;
    if (keyPhone2.slice(keyPhone2CountryCode.length) > 0) {
      const isValidPhone = validatePhone(keyPhone2CountryCode, keyPhone2);
      if (!isValidPhone) errors.keyPhone2 = "Please enter valid phone number.";
    }
  }

  if (data.keyEmail1) {
    if (!validator.isEmail(data.keyEmail1))
      errors.keyEmail1 = "Please enter valid email Id.";
  }

  if (data.keyEmail2) {
    if (!validator.isEmail(data.keyEmail2))
      errors.keyEmail2 = "Please enter valid email Id.";
  }

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateClientDetail;
