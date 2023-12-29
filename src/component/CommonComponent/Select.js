import React from "react";
import PropTypes from "prop-types";

const Select = ({
  className,
  options,
  disabled,
  onChange,
  error,
  value,
  name,
}) => {
  return (
    <div className="position-relative">
      <select
        className={`${className} form-select ${error ? "error" : ""}`}
        disabled={disabled}
        onChange={onChange}
        value={value}
        name={name}
        data-live-search="true"
      >
        <option disabled>Please Select</option>
        {options &&
          options?.map((option, index) => (
            <option key={index} data-token={option.label} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      {error && <div className="invalid">{error}</div>}
    </div>
  );
};

Select.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  options: PropTypes.array,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string,
  name: PropTypes.string,
};

export default Select;
