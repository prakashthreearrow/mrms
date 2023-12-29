import React from "react";
import PropTypes from "prop-types";

const CheckBox = ({ name, className, id, label, onChange, checked }) => {
  return (
    <>
      <input
        type="checkbox"
        className={`${className}`}
        name={name}
        checked={checked}
        onChange={onChange}
        id={id}
      />
      <label className="mx-2" htmlFor={id}>
        {label}
      </label>
    </>
  );
};

CheckBox.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default CheckBox;
