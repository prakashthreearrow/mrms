import React from "react";
import PropTypes from "prop-types";

const ToggleSwitch = ({ checked, onClick }) => {
  return (
    <div>
      <div className="switch row">
        <input type="checkbox" id="toggleAll" checked={checked} readOnly />
        <label htmlFor="toggleAll" onClick={onClick} />
      </div>
    </div>
  );
};

ToggleSwitch.propTypes = {
  onClick: PropTypes.func,
  checked: PropTypes.any,
};

export default ToggleSwitch;
