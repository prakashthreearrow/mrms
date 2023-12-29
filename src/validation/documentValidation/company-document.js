import validator from "validator";

function validateCompanyDocument(data) {
  const errors = {};

  if (validator.isEmpty(data.documentName))
    errors.documentName = "Please enter the document name.";

  if (validator.isEmpty(data.publish))
    errors.publish = "Please select the publish type.";

  if (validator.isEmpty(data.docFile))
    errors.docFile = "Please select the document file.";

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateCompanyDocument;
