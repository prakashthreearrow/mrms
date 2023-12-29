import React, { useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";

import { parsePhoneNumber } from "libphonenumber-js";
import { COUNTRY_CODE_ARRAY } from "./constant";

export const getLocalStorageItem = (key) => localStorage.getItem(key);
export const setLocalStorageItem = (key, value) =>
  localStorage.setItem(key, value);
export const removeLocalStorageItem = (key) => localStorage.removeItem(key);

export const url =
  process.env.REACT_APP_API_ENDPOINT || "http://192.168.1.22:3002/";

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

export const validatePhone = (phoneCountryCode, phone) => {
  let isoCode;
  for (let i = 0; i < COUNTRY_CODE_ARRAY.length; i++) {
    if (COUNTRY_CODE_ARRAY[i].dialCode === "+" + phoneCountryCode) {
      isoCode = COUNTRY_CODE_ARRAY[i].isoCode;
    }
  }
  let phoneNumber = phone.slice(phoneCountryCode.length);
  let parsedNumber = parsePhoneNumber(
    phoneNumber.toString(),
    isoCode.toString()
  );
  return parsedNumber.isPossible();
};

export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const prefixWithZero = (num, size) => {
  let s = "000000000" + num;
  return s.substr(s.length - size);
};

export const formatPhoneNumber = (contact) => {
  const rawNumber = contact.split(" ").join("").split("");
  let numberString = "";
  rawNumber.forEach((number, index) => {
    if ([5].includes(index)) {
      numberString += ` ${number}`;
    } else {
      numberString += `${number}`;
    }
  });
  return numberString.slice(0, 11);
};

export const formatAadharNumber = (contact) => {
  const rawNumber = contact.split(" ").join("").split("");
  let numberString = "";
  rawNumber.forEach((number, index) => {
    if ([4, 8].includes(index)) {
      numberString += ` ${number}`;
    } else {
      numberString += `${number}`;
    }
  });
  return numberString.slice(0, 14);
};

export const ErrorToast = ({ msg }) => (
  <div>
    <svg
      width="1.0625em"
      height="1em"
      viewBox="0 0 17 16"
      className="bi bi-exclamation-triangle mb-1 mr-1"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M7.938 2.016a.146.146 0 0 0-.054.057L1.027 13.74a.176.176 0 0 0-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 0 0 .066-.017.163.163 0 0 0 .055-.06.176.176 0 0 0-.003-.183L8.12 2.073a.146.146 0 0 0-.054-.057A.13.13 0 0 0 8.002 2a.13.13 0 0 0-.064.016zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"
      />
      <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
    </svg>
    &nbsp;&nbsp;
    {msg}
  </div>
);
ErrorToast.propTypes = {
  msg: PropTypes.string,
};

export const SuccessToast = ({ msg }) => (
  <div>
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      className="bi bi-check-circle mb-1 mr-1"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
      />
      <path
        fillRule="evenodd"
        d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
      />
    </svg>
    &nbsp;&nbsp;
    {msg}
  </div>
);
SuccessToast.propTypes = {
  msg: PropTypes.string,
};

export const WarningToast = ({ msg }) => (
  <div>
    <svg
      width="1.0625em"
      height="1em"
      viewBox="0 0 17 16"
      className="bi bi-exclamation-triangle mb-1 mr-1"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M7.938 2.016a.146.146 0 0 0-.054.057L1.027 13.74a.176.176 0 0 0-.002.183c.016.03.037.05.054.06.015.01.034.017.066.017h13.713a.12.12 0 0 0 .066-.017.163.163 0 0 0 .055-.06.176.176 0 0 0-.003-.183L8.12 2.073a.146.146 0 0 0-.054-.057A.13.13 0 0 0 8.002 2a.13.13 0 0 0-.064.016zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"
      />
      <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
    </svg>
    &nbsp;&nbsp;
    {msg}
  </div>
);
WarningToast.propTypes = {
  msg: PropTypes.string,
};

export const setYears = () => {
  const completionYearArray = [];
  let startYear;
  let endYear = new Date().getFullYear();
  startYear = endYear + 1 - 30;
  let i = endYear,
    j = 31;
  for (; i > startYear, j >= 1; i--, j--) {
    completionYearArray.push({ value: i, label: i });
  }
  return completionYearArray;
};

export const experienceDifference = (startDate, endDate) => {
  const start = moment(startDate);
  const end = moment(endDate);
  const months = Math.floor(end.diff(start, "months", true));
  let year = Math.floor(months / 12);
  const month = months % 12;
  return { year: year, month: month };
};

export const totalExperience = (pastExp, currentExp) => {
  const year = pastExp.split(".")[0];
  const month = pastExp.split(".")[1];

  const _year = currentExp.split(".")[0];
  const _month = currentExp.split(".")[1];

  let totalMonth;
  let totalYear;

  totalYear = parseInt(year) + parseInt(_year);
  totalMonth = parseInt(month) + parseInt(_month);

  const extraYear = Math.floor(totalMonth / 12);
  const extraMonth = totalMonth % 12;
  if (extraYear === 1) {
    totalYear += 1;
  }
  return { year: totalYear, month: extraMonth };
};

export const useOutsideAlerter = (ref, setIsOpen) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setIsOpen]);
};

export const compareValues = (key, order = "ASC") => {
  return function innerSort(a, b) {
    const hasAProperty = Object.prototype.hasOwnProperty.call(a, key);
    const hasBProperty = Object.prototype.hasOwnProperty.call(b, key);
    if (!hasAProperty || !hasBProperty) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "DESC" ? comparison * -1 : comparison;
  };
};

export const getUniqueListBy = (arr, key) => {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
};

export const removeErrors = (obj) => {
  let newObj = { ...obj };
  for (let key in newObj) {
    newObj[key] = "";
  }
  return newObj;
};
