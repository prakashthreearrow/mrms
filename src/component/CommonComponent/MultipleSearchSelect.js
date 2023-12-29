import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const MultipleSearchSelect = ({
  className,
  options,
  disabled,
  onChange,
  error,
  value,
  isClearable,
  isRequired,
  label,
}) => {
  const tmpArray = [];
  value &&
    value.length > 0 &&
    value.map((itm) => {
      const find = options.find((item) => item.value === itm);
      tmpArray.push(find);
    });
  return (
    <>
      <div>
        {isRequired && <span className="astric">&#42;</span>}
        <label className="col-form-label">{label}</label>
      </div>
      <div className="position-relative">
        <Select
          isMulti
          className={`${className} form-select ${error ? "error" : ""}`}
          classNamePrefix="react-select"
          value={tmpArray}
          isDisabled={disabled}
          isSearchable={true}
          options={options}
          onChange={onChange}
          isClearable={isClearable}
        />
        {error && <div className="invalid">{error}</div>}
      </div>
    </>
  );
};

MultipleSearchSelect.propTypes = {
  className: PropTypes.string,
  value: PropTypes.any,
  options: PropTypes.array,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string,
  type: PropTypes.string,
  isClearable: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
};

export default MultipleSearchSelect;
