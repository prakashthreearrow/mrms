import React from "react";

import MILogo from "../../assets/images/large-mi-logo.svg";

const Loader = () => {
  return (
    <div className="loader">
      <div>
        <img src={MILogo} alt="Logo" />
        {/*<div className="loader-component"/>*/}
        <ul>
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
      </div>
    </div>
  );
};

export default Loader;
