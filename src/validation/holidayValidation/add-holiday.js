import validator from "validator";

function validateAddHoliday(data) {
  const errors = {};
  const tmpArray = [];
  const tmpData = JSON.stringify(data);
  const tmpDataParas = JSON.parse(tmpData);
  tmpDataParas.map((itm) => {
    if (itm.name !== "") {
      itm.name = true;
    }
    if (itm.date !== "") {
      itm.date = true;
    }
  });
  errors.inputList = tmpDataParas;

  if (data && data.length > 0) {
    data.map((itm, key) => {
      if (validator.isEmpty(itm.name.trim()))
        errors.inputList[key].name = "Please enter the holiday name.";
      if (validator.isEmpty(itm.date.trim()))
        errors.inputList[key].date = "Please select the date.";
      return true;
    });
  }

  if (errors && errors.inputList) {
    errors?.inputList?.map((itm) => {
      if (itm.name === true && itm.date === true) {
        tmpArray.push({
          name: true,
          date: true,
        });
      }
    });
    if (tmpArray.length === errors?.inputList.length) {
      delete errors.inputList;
    }
  }

  return { errors, isValid: Object.keys(errors).length <= 0 };
}

export default validateAddHoliday;
