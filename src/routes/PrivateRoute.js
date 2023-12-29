import React, { useState, useRef, useEffect } from "react";
import { Route, Redirect, useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { getLocalStorageItem } from "../utils/helper";
import { Header, Sidebar } from "../component/Layout";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isShow, setShow] = useState(true);

  const mainScroll = useRef();
  const location = useLocation();
  const history = useHistory();

  const sidebarData = useSelector((state) => state?.Sidebar.sidebarData);

  useEffect(() => {
    if (!getLocalStorageItem("token")) {
      history.push("/login");
    }
  }, []);

  return (
    <>
      <div className="container-main">
        {getLocalStorageItem("token") && (
          <Header isShow={isShow} setShow={setShow} />
        )}
        <div className="main">
          {getLocalStorageItem("token") && <Sidebar isShow={isShow} />}

          <div
            className={isShow ? "page-content" : "page-content-full"}
            ref={mainScroll}
          >
            {sidebarData && (
              <Route
                {...rest}
                render={(props) =>
                  getLocalStorageItem("token") ? (
                    <>
                      {sidebarData?.find(
                        (itm) =>
                          itm.path === `/${location.pathname.split("/")[1]}`
                      ) ? (
                        <Component {...props} scrollRef={mainScroll} />
                      ) : (
                        <Redirect to="/dashboard" />
                      )}
                    </>
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.object,
  rest: PropTypes.object,
};

export default PrivateRoute;
