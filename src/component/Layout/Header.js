import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";

import MILogo from "../../assets/images/mi-logo.svg";
import CollapseImg from "../../assets/images/collapse.svg";
import {
  getLocalStorageItem,
  removeLocalStorageItem,
  useOutsideAlerter,
} from "../../utils/helper";
import { DropdownIcon } from "../../assets/images/vectors";

const Header = ({ isShow, setShow }) => {
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef(null);
  const history = useHistory();

  const userData = JSON.parse(getLocalStorageItem("userData"));
  useOutsideAlerter(wrapperRef, setIsOpen);

  const handleLogOut = () => {
    removeLocalStorageItem("token");
    removeLocalStorageItem("userData");
    history.push("/login");
  };

  return (
    <>
      <div className="header">
        <div className={`${isShow ? "header-logo" : "header-logo-inactive"}`}>
          <img
            className={`${isShow ? "" : "d-none"}`}
            src={MILogo}
            alt="MILogo"
          />
        </div>
        <div className="collapse-btn" onClick={() => setShow(!isShow)}>
          <img src={CollapseImg} alt="CollapseImg" />
        </div>
        <div className="profile" onClick={() => setIsOpen(!isOpen)}>
          <div className="d-flex align-items-center">
            <div className="profile-img mr-2">
              {userData?.profile_image ? (
                <img src={userData?.profile_image} alt={userData?.first_name} />
              ) : (
                <p className="user-initials text-white fw-bold text-uppercase">
                  {userData?.first_name.charAt(0)}
                  {userData?.last_name.charAt(0)}
                </p>
              )}
            </div>
            <div className="user-info d-lg-block d-none mx-2">
              <p className="f-14 f-bold px-2 m-0 text-capitalize">
                {" "}
                {userData?.first_name} {userData?.last_name}{" "}
                {`(${userData?.employee_code})`}
              </p>
              <p className="f-14 f-bold pt-0 pb-1 m-0 text-capitalize">
                ({userData?.designation})
              </p>
            </div>
            <div className="dropdown-icon">
              <img src={DropdownIcon} alt="dropdown-icon" className="mx-2" />
            </div>
          </div>
          {isOpen && (
            <div className="dropdown" ref={wrapperRef}>
              <ul className="list-unstyled p-3">
                <li>
                  <Link to="/my-profile" className="links">
                    <i className="fa fa-user" aria-hidden="true" /> My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/change-password" className="links">
                    <i className="fa fa-lock" aria-hidden="true" /> Change
                    password
                  </Link>
                </li>
                <li onClick={handleLogOut}>
                  <a className="links">
                    <i className="fa fa-sign-out" aria-hidden="true" />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

Header.propTypes = {
  isShow: PropTypes.bool,
  setShow: PropTypes.func,
};

export default Header;
