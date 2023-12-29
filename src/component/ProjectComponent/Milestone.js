import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  Button,
  DeletePopup,
  Input,
  Loader,
  Textarea,
} from "../CommonComponent";
import validateMilestone from "../../validation/projectValidation/milestone";
import {
  addEditProjectMilestone,
  deleteProjectMilestone,
  getProjectMilestone,
} from "../../redux/action";
import { getLocalStorageItem, removeErrors } from "../../utils/helper";

const Milestone = ({ location, scrollRef }) => {
  const [milestoneForm, setMilestoneForm] = useState({
    milestoneName: "",
    comment: "",
  });
  const [error, setError] = useState({});
  const [milestoneData, setMilestoneData] = useState([]);
  const [deleteID, setDeleteID] = useState(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const dispatch = useDispatch();

  const milestoneDetail = useSelector(
    (state) => state.MilestonesDetail.projectMilestone
  );
  const loading = useSelector((state) => state.MilestonesDetail.loading);

  useEffect(() => {
    if (getLocalStorageItem("project_id")) {
      dispatch(
        getProjectMilestone({
          id: getLocalStorageItem("project_id"),
        })
      );
    } else if (location?.state?.id) {
      dispatch(
        getProjectMilestone({
          id: location?.state?.id,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (milestoneDetail) {
      setMilestoneData(milestoneDetail);
    }
  }, [milestoneDetail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError((prevState) => ({
      ...prevState,
      [name]: "",
    }));
    setMilestoneForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateMilestone(milestoneForm);
    if (isValid) {
      let payload = {
        id: milestoneForm.id,
        project_id:
          parseInt(getLocalStorageItem("project_id")) || location?.state?.id,
        name: milestoneForm.milestoneName,
        comment: milestoneForm.comment,
      };
      dispatch(
        addEditProjectMilestone({
          form: payload,
          callback: (data) => {
            if (data?.id) {
              setMilestoneForm({
                milestoneName: "",
                comment: "",
              });
              dispatch(
                getProjectMilestone({
                  id: getLocalStorageItem("project_id") || location?.state?.id,
                })
              );
            }
          },
        })
      );
    } else {
      setError(errors);
    }
  };

  const editHandler = (itm) => {
    scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    setMilestoneForm({
      id: itm?.id,
      milestoneName: itm?.name,
      comment: itm?.comment ? itm?.comment : "",
    });
    setError(removeErrors(error));
  };

  const handleDeletePopup = (id) => {
    setDeleteID(id);
    setDeleteOpen(true);
  };

  const handleDelete = () => {
    setDeleteOpen(false);
    dispatch(
      deleteProjectMilestone({
        id: deleteID,
        callback: () => {
          setDeleteID(false);
          dispatch(
            getProjectMilestone({
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
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-6 col-12">
            <div className="form-group row my-2">
              <Input
                type="text"
                name="milestoneName"
                value={milestoneForm?.milestoneName}
                error={error?.milestoneName}
                onChange={(e) => handleChange(e)}
                isRequired
                label="Milestone name"
              />
            </div>
            <div className="form-group row my-2">
              <Textarea
                type="text"
                name="comment"
                value={milestoneForm?.comment}
                onChange={(e) => handleChange(e)}
                label="Comment"
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button text="Submit" type="submit" className="mt-5 mb-4" />
        </div>
      </form>
      <div className="text-left">
        <p>
          <b>Note: </b>In case of hirebase/bucket model, add the details of
          remaining payment.
        </p>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <div className="table-wrap">
            <table className="table f-14">
              <thead>
                <tr className="text-secondary">
                  <th scope="col">Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">Comment</th>
                  <th scope="col">Date</th>
                  <th scope="col">Est. date</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {milestoneData?.length > 0 ? (
                  milestoneData?.map((data, index) => {
                    return (
                      <tr
                        key={index}
                        className={index % 2 ? "" : "table-active"}
                      >
                        <td>{data?.name}</td>
                        <td>{data?.status}</td>
                        <td className="text-wrap">{data?.comment || "-"}</td>
                        <td>{moment(data.createdAt).format("ll")}</td>
                        <td>
                          {data?.est_date_completion
                            ? moment(data.est_date_completion).format("ll")
                            : "-"}
                        </td>
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
                    <td colSpan="6">
                      You haven&apos;t added any milestone yet.
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
    </div>
  );
};

Milestone.propTypes = {
  location: PropTypes.object,
  scrollRef: PropTypes.any,
};

export default Milestone;
