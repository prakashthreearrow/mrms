import React from "react";
import { useHistory } from "react-router-dom";

import logo from "../assets/images/mind-logo.png";

const NotFound = () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.push("/dashboard");
  };

  return (
    <>
      <section className="not-found">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10 col-md-5">
              <div className="text-center">
                <img src={logo} className="img-fluid mx-auto w-25" alt="logo" />
                <h1 className="">404</h1>
                <h2 className="">
                  We are sorry, but the page you requested was not found.
                </h2>
                <div className="container text-center d-flex justify-content-center mt-4">
                  <button
                    className="btn btn-outline-info home-btn"
                    onClick={handleGoBack}
                  >
                    Go back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
