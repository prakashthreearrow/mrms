import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import validator from "validator";

import { Button, Input, Loader } from "../CommonComponent";
import {
  addEditExternalLinkUser,
  getUserExternalLink,
} from "../../redux/action";
import { getLocalStorageItem } from "../../utils/helper";
import validateExternalLink from "../../validation/employeeValidation/externalLinks";

const ExternalLinks = ({ location }) => {
  const [externalLinksData, setExternalLinksData] = useState([]);
  const [error, setError] = useState([]);

  const externalLinksList = useSelector(
    (state) => state.ExternalLink.externalLinksArray
  );
  const loading = useSelector((state) => state.ExternalLink.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (getLocalStorageItem("employee_id")) {
      dispatch(
        getUserExternalLink({
          id: getLocalStorageItem("employee_id"),
        })
      );
    } else if (location?.state?.id) {
      dispatch(
        getUserExternalLink({
          id: location?.state?.id,
        })
      );
    }
  }, []);

  useEffect(() => {
    setExternalLinksData(externalLinksList);
  }, [externalLinksList]);

  const handleChange = (e, index, data) => {
    const tmpArray = [...externalLinksData];
    tmpArray[index].link = e.target.value;
    setExternalLinksData(tmpArray);
    if (data.link && !!validator.isURL(data.link)) {
      setError([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors } = validateExternalLink(externalLinksData);
    let payloadData = [...externalLinksData];
    let newPayloadData = payloadData.map((d) => {
      let newD = { ...d };
      delete newD.name;
      return newD;
    });
    let payload = {
      employee_id:
        parseInt(getLocalStorageItem("employee_id")) || location?.state?.id,
      data: newPayloadData,
    };
    if (isValid) {
      dispatch(
        addEditExternalLinkUser({
          form: payload,
          callback: () =>
            dispatch(
              getUserExternalLink({
                id:
                  parseInt(getLocalStorageItem("employee_id")) ||
                  location?.state?.id,
              })
            ),
        })
      );
    } else {
      setError(errors);
    }
  };
  return (
    <>
      {loading && <Loader />}
      <div className="my-4 my-md-5">
        <form className="row" onSubmit={handleSubmit}>
          {externalLinksData?.length &&
            externalLinksData?.map((data, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="col-12 col-md-6 col-lg-5 col-xl-5 mx-auto py-1">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <Input
                          type="text"
                          name={data.name}
                          value={data.link}
                          error={error[index]}
                          label={data.name}
                          onChange={(e) => handleChange(e, index, data)}
                        />
                      </div>
                      <button
                        type="button"
                        className="external-link-button align-self-start"
                        disabled={!data.link || !validator.isURL(data.link)}
                        onClick={() => {
                          window.open(
                            `${
                              data.link.split("/").includes("https:")
                                ? data.link
                                : `https://${data.link}`
                            }`,
                            "_blank"
                          );
                        }}
                      >
                        <i
                          className={`fa fa-${data.name.toLowerCase()} f-18 px-2 px-md-3 pt-4 mt-4 external-link-icon ${
                            data.link && !!validator.isURL(data.link)
                              ? "font-red cursor-pointer"
                              : "text-secondary"
                          } ${error[index] && ""}`}
                        />
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          <div className="text-center">
            <Button
              text="Submit"
              type="submit"
              className="mt-5"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </>
  );
};

ExternalLinks.propTypes = {
  location: PropTypes.object,
  scrollRef: PropTypes.any,
};

export default ExternalLinks;
