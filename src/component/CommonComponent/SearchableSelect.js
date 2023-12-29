import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const SearchableSelect = ({
  className,
  options,
  disabled,
  onChange,
  error,
  value,
  type,
  isClearable,
  label,
  isRequired,
  isFlag,
}) => {
  const tmpValue =
    type === "string"
      ? options?.find((itm) => itm.value === value)
      : options?.find((itm) => itm.value === parseInt(value));
  return (
    <>
      {!isFlag && (
        <div>
          {isRequired && <span className="astric">&#42;</span>}
          <label className="col-form-label">{label}</label>
        </div>
      )}
      <div className="position-relative">
        <Select
          className={`${className} form-select ${error ? "error" : ""}`}
          classNamePrefix="react-select"
          value={tmpValue || ""}
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

SearchableSelect.propTypes = {
  className: PropTypes.string,
  value: PropTypes.any,
  options: PropTypes.array,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  error: PropTypes.string,
  type: PropTypes.string,
  isClearable: PropTypes.bool,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  isFlag: PropTypes.bool,
};

export default SearchableSelect;
