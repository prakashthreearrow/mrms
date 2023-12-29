import validator from "validator";

function validateDocument(data) {
  const errors = {};

  if (validator.isEmpty(data.documentName.toString()))
    errors.documentName = "Please enter the document name.";

  if (validator.isEmpty(data.documentType.toString()))
    errors.documentType = "Please select the document type.";

  if (validator.isEmpty(data.docFile))
    errors.docFile = "Please select the document file.";

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateDocument;
