import validator from "validator";

function validateExternalLink(data) {
  const errors = [];

  data.map((data, index) => {
    if (!!data.link && !validator.isURL(data.link)) {
      errors[index] = "Please enter valid link.";
    } else {
      errors[index] = "";
    }
  });

  return { errors, isValid: errors.filter((error) => error.length).length < 1 };
}

export default validateExternalLink;
