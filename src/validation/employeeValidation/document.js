import validator from "validator";

function validateDocument(data) {
  const errors = {};
  if (validator.isEmpty(data.documentType.toString()))
    errors.documentType = "Please select the document type.";
  if (data.documentType.toString() === 2) {
    if (validator.isEmpty(data.docNumber))
      errors.docNumber = "Please provide your Aadhar card number.";
    else if (
      !validator.matches(
        data.docNumber,
        /^[2-9]{1}[0-9]{3}\s{1}[0-9]{4}\s{1}[0-9]{4}$/
      )
    )
      errors.docNumber = "Please provide valid Aadhar card number.";
  }
  if (data.documentType === 3) {
    if (validator.isEmpty(data.docNumber))
      errors.docNumber = "Please provide your PAN card number.";
    else if (
      !validator.matches(data.docNumber, /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z])$/)
    )
      errors.docNumber = "Please provide valid PAN card number.";
  }
  if (validator.isEmpty(data.docFile))
    errors.docFile = "Please select the document file.";

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateDocument;
