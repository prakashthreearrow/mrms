import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import PropTypes from "prop-types";

import { Button, Input, Loader, DeletePopup } from "../CommonComponent";
import validateChangeRequest from "../../validation/projectValidation/project-change-request";
import {
  addEditProjectChangeRequest,
  getProjectChangeRequest,
  deleteProjectChangeRequest,
} from "../../redux/action";
import { getLocalStorageItem, removeErrors } from "../../utils/helper";

const ChangeRequest = ({ scrollRef, location }) => {
  const [requestForm, setRequestForm] = useState({
    commentOrTitle: "",
    hours: "",
    addOn: "",
  });
  const [error, setError] = useState({});
  const [requestDocs, setRequestDocs] = useState([]);
  const [deleteID, setDeleteID] = useState(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [total, setTotal] = useState(null);

  const dispatch = useDispatch();
  const requestData = useSelector(
    (state) => state.ProjectChangeRequest.projectChangeRequest
  );
  const loading = useSelector((state) => state.ProjectChangeRequest.loading);

  useEffect(() => {
    if (requestData) {
      setRequestDocs(requestData);
      let sumTotal = 0;
      requestData?.map((data) => {
        sumTotal += data.hours;
      });
      setTotal(sumTotal);
    }
  }, [requestData]);

  useEffect(() => {
    if (getLocalStorageItem("project_id")) {
      dispatch(
        getProjectChangeRequest({
          id: getLocalStorageItem("project_id"),
        })
      );
    } else if (location?.state?.id) {
      dispatch(
        getProjectChangeRequest({
          id: location?.state?.id,
        })
      );
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateChangeRequest(requestForm);
    if (isValid) {
      let payload = {
        id: requestForm?.id,
        project_id: getLocalStorageItem("project_id") || location?.state?.id,
        hours: requestForm?.hours,
        added_on: requestForm?.addOn,
        comment: requestForm?.commentOrTitle,
      };
      dispatch(
        addEditProjectChangeRequest({
          form: payload,
          callback: () => {
            dispatch(
              getProjectChangeRequest({
                id: getLocalStorageItem("project_id") || location?.state?.id,
              })
            );
            setRequestForm({
              commentOrTitle: "",
              hours: "",
              addOn: "",
            });
          },
        })
      );
    } else {
      setError(errors);
    }
  };

  const changeHandler = (e, name) => {
    if (e.target) {
      setError((prevState) => ({
        ...prevState,
        [e.target.name]: "",
      }));
      setRequestForm((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    } else {
      const { value } = e;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setRequestForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const editHandler = (itm) => {
    scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    setRequestForm({
      id: itm?.id,
      commentOrTitle: itm?.comment,
      hours: itm?.hours,
      addOn: moment(itm?.added_on).format("YYYY-MM-DD"),
    });
    setError(removeErrors(error));
  };

  const handleDeletePopup = (id) => {
    setDeleteID(id);
    setDeleteOpen(true);
  };

  const handleDelete = () => {
    dispatch(
      deleteProjectChangeRequest({
        id: deleteID,
        callback: () => {
          setDeleteOpen(false);
          setDeleteID(false);
          dispatch(
            getProjectChangeRequest({
              id: getLocalStorageItem("project_id") || location?.state?.id,
            })
          );
        },
      })
    );
  };

  return (
    <div className="my-2">
      {loading && <Loader />}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 col-lg-6 col-12">
            <div className="form-group row my-2">
              <Input
                type="text"
                name="commentOrTitle"
                value={requestForm?.commentOrTitle}
                error={error?.commentOrTitle}
                onChange={(e) => changeHandler(e)}
                isRequired
                label="Comments/Title"
              />
            </div>
            <div className="form-group row my-2">
              <Input
                type="number"
                name="hours"
                value={requestForm.hours}
                onChange={(e) => changeHandler(e)}
                error={error?.hours}
                label="Hours"
                isRequired
              />
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-12">
            <div className="form-group row my-2">
              <Input
                type="date"
                className="pr-0"
                name="addOn"
                value={requestForm.addOn}
                onChange={(e) => changeHandler(e)}
                error={error?.addOn}
                isRequired
                label="Added on"
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button text="Submit" type="submit" className="mt-5" />
        </div>
      </form>
      <div className="mb-5 mt-4">
        <div className="row pt-3 pb-3 mt-3 text-uppercase text-center">
          <h4 className="table-title f-bold">ADDON HOURS</h4>
        </div>
        <div className="table-wrap">
          <table className={`table`}>
            <thead>
              <tr>
                <th scope="col">Amount</th>
                <th scope="col">Date</th>
                <th scope="col">Comment</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {requestDocs?.length > 0 ? (
                requestDocs?.map((data, index) => {
                  return (
                    <tr key={index} className={index % 2 ? "" : "table-active"}>
                      <td>{data?.hours ? data?.hours : "0"} Hours</td>
                      <td>{moment(data.added_on).format("ll")}</td>
                      <td className="text-wrap">{data?.comment || "-"}</td>
                      <td>
                        <i
                          className="fa fa-edit f-18 cursor-pointer mx-2"
                          onClick={() => editHandler(data)}
                        />
                        <i
                          className="fa fa-trash-o f-18 cursor-pointer mx-2"
                          onClick={() => handleDeletePopup(data.id)}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4">
                    You haven&apos;t added any change requests yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <p>
            <b>Total: </b> {total} Hours
          </p>
        </div>
      </div>
      {isDeleteOpen && (
        <DeletePopup
          isDeleteOpen={isDeleteOpen}
          setDeleteOpen={setDeleteOpen}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

ChangeRequest.propTypes = {
  scrollRef: PropTypes.any,
  location: PropTypes.object,
};

export default ChangeRequest;
