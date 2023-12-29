import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const Breadcrumb = ({
  pageList,
  isButton,
  buttonText,
  onButtonClick,
  buttonClassName,
}) => {
  const history = useHistory();

  const handleClick = (value) => {
    history.push(value);
  };
  return (
    <nav aria-label="breadcrumb" className="d-flex justify-content-between">
      <ol className="breadcrumb my-auto">
        {pageList &&
          pageList?.length > 0 &&
          pageList?.map((page, index) => {
            return (
              <li
                key={index}
                className={`breadcrumb-item mb-0 f-18 f-bold ${
                  page?.path ? "cursor-pointer font-red" : ""
                }`}
                onClick={() => handleClick(page?.path)}
              >
                <span className="">{page?.label}</span>
              </li>
            );
          })}
      </ol>
      {isButton && (
        <button
          type="button"
          className={buttonClassName}
          onClick={onButtonClick}
        >
          {buttonText}
        </button>
      )}
    </nav>
  );
};
Breadcrumb.propTypes = {
  pageList: PropTypes.array,
  isButton: PropTypes.bool,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
  buttonClassName: PropTypes.string,
};

export default Breadcrumb;
