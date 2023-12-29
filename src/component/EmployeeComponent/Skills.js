import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  DeletePopup,
  Input,
  Loader,
  SearchableSelect,
  Textarea,
} from "../CommonComponent";
import validateSkill from "../../validation/employeeValidation/skill";
import {
  addEditUserSkill,
  deleteUserSkill,
  getSkillType,
  getUserSkill,
} from "../../redux/action";
import { SKILL_LEVEL } from "../../utils/constant";
import { getLocalStorageItem, removeErrors } from "../../utils/helper";

const Skills = ({ location, scrollRef }) => {
  const [form, setForm] = useState({
    comment: "",
    yearOfExperience: "",
    skillType: "",
    skillLevel: "",
  });

  const [error, setError] = useState({});
  const [skillType, setSkillType] = useState([]);
  const [userSKill, setUserSKill] = useState([]);
  const [deleteID, setDeleteID] = useState(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const skill_type = useSelector((state) => state.SkillType.skillTypeArray);
  const user_skill = useSelector((state) => state.Skill.userSkillArray);
  const loading = useSelector((state) => state.Skill.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    if (getLocalStorageItem("employee_id")) {
      dispatch(getUserSkill({ id: getLocalStorageItem("employee_id") }));
    } else if (location?.state?.id) {
      dispatch(getUserSkill({ id: location.state.id }));
    }
  }, []);

  useEffect(() => {
    if (skill_type?.length > 0) {
      let skill_type_opt = skill_type.map((itm) => ({
        label: itm?.name,
        value: itm?.id,
      }));
      setSkillType(skill_type_opt);
    } else {
      dispatch(getSkillType());
    }
  }, [skill_type]);

  useEffect(() => {
    setUserSKill(user_skill);
  }, [user_skill]);

  const handleChange = (e, name) => {
    if (e.target) {
      setError((prevState) => ({
        ...prevState,
        [e.target.name]: "",
      }));
      setForm((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    } else {
      const { value } = e;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const editHandler = (itm) => {
    scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    setForm({
      id: itm?.id,
      skillType: itm?.skill_type_id?.toString(),
      skillLevel: itm?.level,
      yearOfExperience: itm?.years_of_exp?.toString(),
      comment: itm?.comment || "",
    });
    setError(removeErrors(error));
  };

  const handleDeletePopup = (id) => {
    setDeleteID(id);
    setDeleteOpen(true);
  };

  const handleDelete = () => {
    dispatch(
      deleteUserSkill({
        id: deleteID,
        callback: () => {
          setDeleteOpen(false);
          setDeleteID(false);
          dispatch(
            getUserSkill({
              id: getLocalStorageItem("employee_id") || location?.state?.id,
            })
          );
        },
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateSkill(form);
    if (isValid) {
      let payload = {
        employee_id:
          parseInt(getLocalStorageItem("employee_id")) || location?.state?.id,
        skill_type_id: parseInt(form?.skillType),
        level: form?.skillLevel,
        years_of_exp: form?.yearOfExperience,
        comment: form?.comment,
      };
      if (form?.id) {
        payload = { ...payload, id: form?.id };
      }
      dispatch(
        addEditUserSkill({
          form: payload,
          callback: () => {
            setForm({
              comment: "",
              yearOfExperience: "",
              skillType: "",
              skillLevel: "",
            });
            dispatch(
              getUserSkill({
                id: getLocalStorageItem("employee_id") || location?.state?.id,
              })
            );
          },
        })
      );
    } else {
      setError(errors);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="my-2">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 col-lg-6 col-12">
              <div className="form-group row my-2">
                <SearchableSelect
                  options={skillType}
                  className="p-0"
                  value={form?.skillType}
                  onChange={(e) => handleChange(e, "skillType")}
                  error={error?.skillType}
                  isRequired
                  label="Skill type"
                />
              </div>
              <div className="form-group row my-2">
                <SearchableSelect
                  options={SKILL_LEVEL}
                  className="p-0"
                  value={form?.skillLevel}
                  onChange={(e) => handleChange(e, "skillLevel")}
                  error={error?.skillLevel}
                  type="string"
                  isRequired
                  label="Skill level"
                />
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-12">
              <div className="form-group row my-2">
                <Input
                  id="yearOfExperience"
                  name="yearOfExperience"
                  value={form?.yearOfExperience}
                  onChange={handleChange}
                  type="number"
                  placeholder="Enter years (i.e: 1, 1.5, 2 etc)"
                  error={error?.yearOfExperience}
                  isRequired
                  label="Years of experience"
                />
              </div>
              <div className="form-group row my-2">
                <Textarea
                  name="comment"
                  value={form?.comment}
                  onChange={handleChange}
                  placeholder="Enter comment"
                  error={error?.comment}
                  label="Comments"
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <Button
              text="Submit"
              type="submit"
              className="mt-5"
              disabled={loading}
            />
          </div>
        </form>

        <div className="mb-5">
          <div className="row pt-3 pb-3 mt-3 text-uppercase text-center">
            <h4 className="table-title">SKILLS</h4>
          </div>
          <div className="table-wrap">
            <table className={`table`}>
              <thead>
                <tr>
                  <th scope="col">Skill - level</th>
                  <th scope="col">Exp (yr)</th>
                  <th scope="col">Comment</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {userSKill?.length > 0 ? (
                  userSKill.map((data, index) => {
                    return (
                      <tr
                        key={index}
                        className={index % 2 ? "" : "table-active"}
                      >
                        <td>{`${data?.employeeSkillType?.name} - ${data?.level}`}</td>
                        <td>{data?.years_of_exp}</td>
                        <td className="text-wrap">
                          {data?.comment ? data?.comment : "-"}
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
                    <td colSpan="4">You haven&apos;t added any skills yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
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
    </>
  );
};

Skills.propTypes = {
  location: PropTypes.object,
  scrollRef: PropTypes.any,
};

export default Skills;
