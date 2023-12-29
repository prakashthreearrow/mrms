import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { NavLink, useHistory } from "react-router-dom";

import { removeLocalStorageItem } from "../../utils/helper";
import { getSidebar } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = ({ isShow }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sidebarData = useSelector((state) => state?.Sidebar.sidebarData);

  useEffect(() => {
    dispatch(getSidebar());
  }, []);

  const handleLogOut = () => {
    removeLocalStorageItem("token");
    removeLocalStorageItem("userData");
    history.push("/login");
  };

  return (
    <>
      <div
        className={`${
          isShow ? "sidebar" : "sidebar inactive"
        } position-relative`}
      >
        <ul className="sidebar-list">
          {sidebarData &&
            sidebarData.map((itm) => {
              if (itm.type === "sidebar") {
                return (
                  <li key={itm?.name}>
                    <NavLink to={itm?.path} activeClassName="active">
                      <i className={itm?.icon} />
                      <span>{itm?.name}</span>
                    </NavLink>
                  </li>
                );
              }
            })}
        </ul>
        <div className="logout" onClick={handleLogOut}>
          <ul>
            <li>
              <a>
                <i className="fa fa-power-off" />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  isShow: PropTypes.bool,
  setShow: PropTypes.func,
};

export default Sidebar;
