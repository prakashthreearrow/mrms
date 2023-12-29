import React from "react";
import CreatableSelect from "react-select/creatable";
import PropTypes from "prop-types";

const CreateSelect = ({
  className,
  options,
  disabled,
  onChange,
  error,
  value,
  type,
  isClearable,
  isRequired,
  label,
}) => {
  const tmpValue =
    type === "string"
      ? options?.find((itm) => itm.value === value)
      : options?.find((itm) => itm.value === parseInt(value));
  return (
    <>
      <div>
        {isRequired && <span className="astric">&#42;</span>}
        <label className="col-form-label">{label}</label>
      </div>
      <div className="position-relative">
        <CreatableSelect
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

CreateSelect.propTypes = {
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

export default CreateSelect;
