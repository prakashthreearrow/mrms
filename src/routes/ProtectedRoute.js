import React, { useState, useRef } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { getLocalStorageItem } from "../utils/helper";
import { Header, Sidebar } from "../component/Layout";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const [isShow, setShow] = useState(true);

  const mainScroll = useRef();

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
            <Route
              {...rest}
              render={(props) =>
                getLocalStorageItem("token") ? (
                  <Component {...props} scrollRef={mainScroll} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.object,
  rest: PropTypes.object,
};

export default ProtectedRoute;
