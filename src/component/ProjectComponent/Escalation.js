import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

import {
  Button,
  CheckBox,
  DeletePopup,
  Input,
  Loader,
  SearchableSelect,
  Textarea,
} from "../CommonComponent";
import { RESOLVED_TYPE } from "../../utils/constant";
import validateEscalation from "../../validation/projectValidation/escalation";
import {
  addEditEscalation,
  deleteEscalation,
  getEscalation,
  getEscalationType,
} from "../../redux/action";
import { getLocalStorageItem, removeErrors } from "../../utils/helper";

const Escalation = ({ location, scrollRef }) => {
  const [escalationForm, setEscalationForm] = useState({
    subject: "",
    type: "",
    concern: "",
    dateReported: "",
    raisedBy: "",
    resolved: "No",
    action: "",
  });
  const [error, setError] = useState({});
  const [escalation, setEscalation] = useState([]);
  const [resolve, setResolve] = useState(false);
  const [escalationData, setEscalationData] = useState([]);
  const [deleteID, setDeleteID] = useState(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [isViewOpen, setViewOpen] = useState(false);
  const [viewData, setViewData] = useState(null);

  const dispatch = useDispatch();
  const escalationType = useSelector(
    (escalation) => escalation.EscalationType.escalationArray
  );
  const escalationDetail = useSelector(
    (escalationData) => escalationData.Escalation.escalationDetail
  );
  const loading = useSelector((state) => state.Escalation.loading);

  useEffect(() => {
    if (escalationDetail) {
      setEscalationData(escalationDetail);
    }
  }, [escalationDetail]);

  useEffect(() => {
    if (escalationType?.length > 0) {
      let escalation_drop = escalationType.map((itm) => ({
        label: itm?.type,
        value: itm?.type,
      }));
      setEscalation(escalation_drop);
    } else {
      dispatch(getEscalationType());
    }
  }, [escalationType]);

  useEffect(() => {
    if (getLocalStorageItem("project_id")) {
      dispatch(
        getEscalation({
          id: getLocalStorageItem("project_id"),
        })
      );
    } else if (location?.state?.id) {
      dispatch(
        getEscalation({
          id: location?.state?.id,
        })
      );
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateEscalation(escalationForm);
    if (isValid) {
      let payload = {
        id: escalationForm?.id,
        project_id: getLocalStorageItem("project_id") || location?.state?.id,
        subject: escalationForm.subject,
        escalation_type: escalationForm.type,
        concern: escalationForm.concern ? escalationForm.concern : "",
        reported_date: escalationForm.dateReported
          ? escalationForm.dateReported
          : "",
        raised_by: escalationForm.raisedBy ? escalationForm.raisedBy : "",
        resolved:
          escalationForm.resolved === "Yes"
            ? 1
            : 0 || escalationForm.resolved === true
            ? 1
            : 0,
        actions_taken: escalationForm.action ? escalationForm.action : "",
      };
      if (payload.resolved === 0) {
        payload = {
          ...payload,
          actions_taken: "",
        };
      }
      dispatch(
        addEditEscalation({
          form: payload,
          callback: (data) => {
            if (data?.id) {
              dispatch(
                getEscalation({
                  id: getLocalStorageItem("project_id") || location?.state?.id,
                })
              );
            }
            setEscalationForm({
              subject: "",
              type: "",
              concern: "",
              dateReported: "",
              raisedBy: "",
              resolved: "No",
              action: "",
            });
            setResolve(false);
            setViewOpen(false);
          },
        })
      );
    } else {
      setError(errors);
    }
  };

  const handleChange = (e, name) => {
    if (e.target) {
      const value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      const { name } = e.target;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setEscalationForm((prevState) => ({ ...prevState, [name]: value }));
    } else {
      e.label === "Yes" ? setResolve(true) : setResolve(false);
      const { value } = e;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setEscalationForm((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const editHandler = (itm) => {
    scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    setEscalationForm({
      id: itm?.id,
      subject: itm?.subject,
      type: itm.escalation_type,
      concern: itm.concern,
      dateReported: itm.reported_date
        ? moment(itm.reported_date).format("YYYY-MM-DD")
        : "",
      raisedBy: itm.raised_by,
      resolved:
        (itm.resolved === true ? "Yes" : "No") ||
        (itm.resolved === "Yes" ? setResolve(true) : setResolve(false)),
      action: itm.actions_taken,
    });
    itm.resolved === false ? setResolve(false) : setResolve(true);
    setError(removeErrors(error));
  };
  const handleDeletePopup = (id) => {
    setDeleteID(id);
    setDeleteOpen(true);
  };
  const handleDelete = () => {
    setDeleteOpen(false);
    dispatch(
      deleteEscalation({
        id: deleteID,
        callback: () => {
          setDeleteID(false);
          dispatch(
            getEscalation({
              id: getLocalStorageItem("project_id") || location?.state?.id,
            })
          );
        },
      })
    );
  };

  const handleViewPopup = (data) => {
    setViewData(data);
    setViewOpen(true);
    setEscalationForm({
      id: data?.id,
      subject: data.subject,
      type: data.escalation_type,
      concern: data.concern,
      dateReported: data.reported_date
        ? moment(data.reported_date).format("YYYY-MM-DD")
        : "",
      raisedBy: data.raised_by,
      resolved: data.resolved === true,
      action: data.actions_taken
        ? data.actions_taken
        : escalationForm.actions_taken,
    });
    data.resolved === false ? setResolve(false) : setResolve(true);
  };

  return (
    <div className="my-2">
      {loading && <Loader />}
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-6 col-12">
            <div className="form-group row my-2">
              <Input
                type="text"
                className="pr-0"
                name="subject"
                value={escalationForm?.subject || ""}
                error={error.subject}
                onChange={(e) => handleChange(e)}
                label="Subject"
                isRequired
              />
            </div>
            <div className="form-group row my-2">
              <SearchableSelect
                className="p-0"
                type="string"
                options={escalation}
                value={escalationForm?.type || ""}
                error={error.type}
                onChange={(e) => handleChange(e, "type")}
                label="Type"
                isRequired
              />
            </div>
            <div className="form-group row my-2">
              <Textarea
                type="text"
                name="concern"
                value={escalationForm?.concern || ""}
                error={error.concern}
                onChange={(e) => handleChange(e)}
                isRequired
                label="Concern"
              />
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-12">
            <div className="form-group row my-2">
              <Input
                type="date"
                className="pr-0"
                name="dateReported"
                value={escalationForm?.dateReported || ""}
                onChange={(e) => handleChange(e)}
                label="Date reported"
              />
            </div>
            <div className="form-group row my-2">
              <Input
                type="text"
                className="pr-0"
                name="raisedBy"
                value={escalationForm?.raisedBy || ""}
                onChange={(e) => handleChange(e)}
                label="Raised by"
              />
            </div>
            <div className="form-group row my-2">
              <SearchableSelect
                options={RESOLVED_TYPE}
                className="p-0"
                type="string"
                value={escalationForm?.resolved || ""}
                error={error.resolved}
                onChange={(e) => handleChange(e, "resolved")}
                label="Resolved"
              />
            </div>
            {resolve ? (
              <div className="form-group row my-2">
                <Textarea
                  type="text"
                  name="action"
                  value={escalationForm?.action || ""}
                  onChange={(e) => handleChange(e)}
                  label="Actions taken to resolve"
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="text-center">
          <Button text="Submit" type="submit" className="mt-5" />
        </div>
      </form>
      <div className="row mt-4">
        <div className="col-12">
          <div className="table-wrap">
            <table className="table f-14">
              <thead>
                <tr className="text-secondary">
                  <th scope="col">Raised by</th>
                  <th scope="col">Type</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Date</th>
                  <th scope="col">Resolved</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {escalationData?.length > 0 ? (
                  escalationData?.map((data, index) => {
                    return (
                      <tr
                        key={index}
                        className={index % 2 ? "" : "table-active"}
                      >
                        <td>{data.raised_by ? data.raised_by : "-"}</td>
                        <td>{data.escalation_type}</td>
                        <td>{data.subject}</td>
                        <td>
                          {data.reported_date
                            ? moment(data.reported_date).format("ll")
                            : "-"}
                        </td>
                        <td>{data.resolved === true ? "Yes" : "No"}</td>
                        <td>
                          <i
                            className="fa fa-edit f-18 cursor-pointer mx-2"
                            onClick={() => editHandler(data)}
                          />
                          <i
                            className="fa fa-trash-o f-18 cursor-pointer mx-2"
                            onClick={() => handleDeletePopup(data.id)}
                          />
                          <i
                            className="fa fa-eye f-18 cursor-pointer mx-2"
                            onClick={() => handleViewPopup(data)}
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6">
                      You haven&apos;t added any escalation yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isDeleteOpen && (
        <DeletePopup
          isDeleteOpen={isDeleteOpen}
          setDeleteOpen={setDeleteOpen}
          handleDelete={handleDelete}
        />
      )}
      {isViewOpen && (
        <div
          className={`modal fade ${
            isViewOpen ? "show d-block bg-blur" : "d-none"
          }`}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-red text-white border-bottom-0">
                <h5 className="modal-title">Escalation</h5>
                <i
                  className="fa fa-close cursor-pointer"
                  onClick={() => setViewOpen(false)}
                />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-12">
                      <div className="row my-2">
                        <label className="f-bold">Subject</label>
                        <div className="my-1">
                          <label>{viewData.subject}</label>
                        </div>
                      </div>
                      <div className="row my-2">
                        <label className="f-bold">Type</label>
                        <div className="my-1">
                          <label>{viewData.escalation_type}</label>
                        </div>
                      </div>
                      <div className="row my-2">
                        <label className="f-bold">Concern</label>
                        <div className="my-1">
                          <label>{viewData.concern}</label>
                        </div>
                      </div>
                      {viewData.raised_by ? (
                        <div className="row my-2">
                          <label className="f-bold">Raised by</label>
                          <div>
                            <label>{viewData.raised_by}</label>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="form-group row my-2">
                        <label
                          htmlFor="resolved"
                          className="col-form-label f-bold"
                        >
                          Resolved
                        </label>
                        <div>
                          <CheckBox
                            name="resolved"
                            id="resolved"
                            checked={escalationForm?.resolved}
                            className={"mt-1"}
                            onChange={(e) => handleChange(e)}
                            label={"Mark as resolved"}
                          />
                        </div>
                      </div>
                      {escalationForm?.resolved === true ? (
                        <div className="form-group row my-2">
                          <label
                            htmlFor="action"
                            className="col-form-label f-bold"
                          >
                            Actions taken to resolve
                          </label>
                          <div>
                            <Textarea
                              type="text"
                              name="action"
                              value={escalationForm?.action || ""}
                              onChange={(e) => handleChange(e)}
                            />
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <Button
                    text="Submit"
                    type="submit"
                    className="mt-1"
                    onClick={handleSubmit}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Escalation.propTypes = {
  location: PropTypes.object,
  scrollRef: PropTypes.any,
};

export default Escalation;
