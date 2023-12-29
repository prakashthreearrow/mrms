import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import PropTypes from "prop-types";

import {
  Button,
  DeletePopup,
  Input,
  InputGroup,
  SearchableSelect,
} from "../CommonComponent";
import validateFamilyDetails from "../../validation/employeeValidation/basic-family-detail";
import validateEmergencyContactDetails from "../../validation/employeeValidation/emergency-contact-detail";
import {
  addEditEmergencyContact,
  createFamilyDetails,
  deleteEmergencyContacts,
  emergencyContacts,
  getFamilyDetail,
} from "../../redux/action";
import {
  formatPhoneNumber,
  getLocalStorageItem,
  removeErrors,
} from "../../utils/helper";
import { MARITAL_STATUS, RELATION_TYPE } from "../../utils/constant";

const FamilyDetails = ({ location, scrollRef }) => {
  const [basicFamilyDetailsForm, setBasicFamilyDetailsForm] = useState({
    mother_name: "",
    father_name: "",
    marital_status: "",
    spouse_name: "",
    marriage_date: "",
  });
  const [emergencyContactForm, setEmergencyContactForm] = useState({
    name: "",
    mobile_no: "",
    relation_type: "",
  });
  const [emergencyContactsData, setEmergencyContactsData] = useState([]);
  const [deleteID, setDeleteID] = useState(null);
  const [error, setError] = useState({});
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const dispatch = useDispatch();

  const family_detail = useSelector((state) => state.FamilyDetail.FamilyDetail);
  const emergency_contacts_data = useSelector(
    (state) => state.FamilyDetail.EmergencyContactsArray
  );

  useEffect(() => {
    if (getLocalStorageItem("employee_id")) {
      dispatch(getFamilyDetail(getLocalStorageItem("employee_id")));
      dispatch(emergencyContacts(getLocalStorageItem("employee_id")));
    } else if (location?.state?.id) {
      dispatch(getFamilyDetail(location?.state?.id));
      dispatch(emergencyContacts(location?.state?.id));
    }
  }, []);

  useEffect(() => {
    let data = emergency_contacts_data?.map((itm) => ({
      name: itm?.name ? itm?.name : "",
      relation_type: itm?.relation_type ? itm?.relation_type : "",
      mobile_no: itm?.mobile_no ? itm?.mobile_no : "",
      id: itm?.id ? itm?.id : "",
    }));
    setEmergencyContactsData(data);
  }, [emergency_contacts_data]);

  useEffect(() => {
    setBasicFamilyDetailsForm((prevState) => ({
      ...prevState,
      mother_name: family_detail?.mother_name ? family_detail?.mother_name : "",
      father_name: family_detail?.father_name ? family_detail?.father_name : "",
      marital_status: family_detail?.marital_status
        ? family_detail?.marital_status
        : "",
      spouse_name: family_detail?.spouse_name ? family_detail?.spouse_name : "",
      marriage_date: family_detail?.marriage_date
        ? moment(family_detail?.marriage_date).format("YYYY-MM-DD")
        : "",
    }));
  }, [family_detail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateFamilyDetails(basicFamilyDetailsForm);
    if (isValid) {
      let payload = {
        employee_id:
          parseInt(getLocalStorageItem("employee_id")) || location?.state?.id,
        marital_status: basicFamilyDetailsForm?.marital_status,
        father_name: basicFamilyDetailsForm?.father_name,
        mother_name: basicFamilyDetailsForm?.mother_name,
        spouse_name: basicFamilyDetailsForm?.spouse_name,
      };
      if (basicFamilyDetailsForm?.marriage_date) {
        payload = {
          ...payload,
          marriage_date: basicFamilyDetailsForm?.marriage_date,
        };
      }
      dispatch(createFamilyDetails({ form: payload }));
    } else {
      setError(errors);
    }
  };

  const changeHandler = (e, name) => {
    if (e.target) {
      const { name, value } = e.target;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setBasicFamilyDetailsForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      const { value } = e;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setBasicFamilyDetailsForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    const { errors, isValid } =
      validateEmergencyContactDetails(emergencyContactForm);
    let payload;

    if (isValid) {
      payload = {
        employee_id:
          parseInt(getLocalStorageItem("employee_id")) || location?.state?.id,
        mobile_no: emergencyContactForm?.mobile_no.replace(" ", ""),
        name: emergencyContactForm?.name,
        relation_type: emergencyContactForm?.relation_type,
      };
      if (emergency_contacts_data) {
        payload = { ...payload, id: emergencyContactForm?.id };
      }
      dispatch(
        addEditEmergencyContact({
          form: payload,
          callback: () =>
            dispatch(
              emergencyContacts(
                getLocalStorageItem("employee_id") || location?.state?.id
              )
            ),
        })
      );
      setEmergencyContactForm({
        name: "",
        mobile_no: "",
        relation_type: "",
      });
    } else {
      setError(errors);
    }
  };

  const changeHandlerAdd = (e, name) => {
    if (e.target) {
      let { name, value } = e.target;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setEmergencyContactForm((prevState) => ({ ...prevState, [name]: value }));
    } else {
      const { value } = e;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setEmergencyContactForm((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const allowNumberOnly = (event) => {
    let charCode = event.target.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      event.target.value = event.target.value.replace(/[^0-9.-]/g, "");
    } else {
      event.target.value = event.target.value.replace(/[^0-9. ]/g, "");
    }
    setEmergencyContactForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleEdit = (id) => {
    scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    emergencyContactsData.map((itm) => {
      if (id === itm.id) {
        setEmergencyContactForm({
          name: itm.name,
          mobile_no:
            itm.mobile_no.substring(0, 5) +
            " " +
            itm.mobile_no.substring(5, itm.mobile_no.length),
          relation_type: itm.relation_type,
          id: itm.id,
        });
      }
    });
    setError(removeErrors(error));
  };

  const handleDeletePopup = (id) => {
    setDeleteID(id);
    setDeleteOpen(true);
  };

  const handleDelete = () => {
    dispatch(
      deleteEmergencyContacts({
        form: { id: deleteID },
        callback: () => {
          setDeleteOpen(false);
          dispatch(
            emergencyContacts(
              getLocalStorageItem("employee_id") || location?.state?.id
            )
          );
        },
      })
    );
  };

  return (
    <>
      <div className="family-details my-2">
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-5 col-11">
            <form onSubmit={handleSubmit} className="mt-5">
              <div className="form-group row">
                <Input
                  type="text"
                  name="mother_name"
                  value={basicFamilyDetailsForm.mother_name || ""}
                  onChange={(e) => changeHandler(e)}
                  error={error?.mother_name}
                  isRequired
                  label="Mother's name"
                />
              </div>
              <div className="form-group row">
                <Input
                  type="text"
                  name="father_name"
                  value={basicFamilyDetailsForm.father_name || ""}
                  onChange={(e) => changeHandler(e)}
                  error={error?.father_name}
                  isRequired
                  label="Father's name"
                />
              </div>
              <div className="form-group row my-2">
                <SearchableSelect
                  options={MARITAL_STATUS}
                  className="p-0"
                  value={basicFamilyDetailsForm.marital_status}
                  onChange={(e) => changeHandler(e, "marital_status")}
                  error={error?.marital_status}
                  type="string"
                  isRequired
                  label="Marital status"
                />
              </div>
              {basicFamilyDetailsForm.marital_status === "Married" && (
                <>
                  <div className="form-group row my-2">
                    <Input
                      type="text"
                      name="spouse_name"
                      value={basicFamilyDetailsForm.spouse_name || ""}
                      onChange={(e) => changeHandler(e)}
                      label="Spouse's name"
                    />
                  </div>
                  <div className="form-group row my-2">
                    <Input
                      type="date"
                      max={moment().format("YYYY-MM-DD")}
                      className="form-control pr-0"
                      name="marriage_date"
                      value={basicFamilyDetailsForm.marriage_date || ""}
                      onChange={(e) => changeHandler(e)}
                      error={error?.marriage_date}
                      label="Marriage anniversary"
                    />
                  </div>
                </>
              )}
              <div className="text-center">
                <Button
                  text="Save"
                  type="submit"
                  className="mt-lg-5 mt-sm-3 mt-2"
                />
              </div>
            </form>
          </div>
          <div className="col-1 mt-5 d-md-block d-none">
            <div className="vertical-line col-md-6 col-lg-6 col-12 " />
          </div>
          <div className="col-md-5 col-lg-5 col-11 mt-sm-4">
            <form onSubmit={handleSubmitAdd}>
              <div className="row pt-3 pb-lg-3 pb-sm-3 pb-xs-1 text-uppercase text-center">
                <h4>EMERGENCY CONTACTS</h4>
              </div>
              <div className="form-group row">
                <Input
                  type="text"
                  name="name"
                  value={emergencyContactForm.name}
                  onChange={(e) => changeHandlerAdd(e)}
                  error={error?.name}
                  isRequired
                  label="Name"
                />
              </div>
              <div className="form-group row my-2">
                <InputGroup
                  type="tel"
                  name="mobile_no"
                  prepend={true}
                  prependText="+91"
                  className="border-left-radius-0 border-left-none"
                  value={formatPhoneNumber(emergencyContactForm.mobile_no)}
                  onChange={(e) => changeHandlerAdd(e)}
                  onKeyUp={(e) => allowNumberOnly(e)}
                  error={error?.mobile_no}
                  pattern="[0-9]{5} [0-9]{5}"
                  isRequired
                  label="Mobile number"
                />
              </div>
              <div className="form-group row my-2">
                <SearchableSelect
                  options={RELATION_TYPE}
                  className="p-0"
                  value={emergencyContactForm.relation_type}
                  onChange={(e) => changeHandlerAdd(e, "relation_type")}
                  error={error?.relation_type}
                  type="string"
                  label="Relationship"
                  isRequired
                />
              </div>
              <div className="text-center">
                <Button
                  text={"Submit"}
                  type="submit"
                  onClick={handleSubmitAdd}
                  className="mt-lg-5 mt-sm-3 mt-2"
                />
              </div>
            </form>
          </div>
          <div className="mb-5">
            <div className="row pt-3 pb-3 mt-3 text-uppercase text-center">
              <h4 className="table-title">EMERGENCY CONTACTS</h4>
            </div>
            <div className="table-wrap">
              <table className={`table`}>
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Relationship</th>
                    <th scope="col">Mobile No.</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {emergencyContactsData?.length > 0 ? (
                    emergencyContactsData.map((data, index) => {
                      return (
                        <tr
                          key={index}
                          className={index % 2 ? "" : "table-active"}
                        >
                          <td>{data.name}</td>
                          <td>{data.relation_type}</td>
                          <td>
                            {data.mobile_no.substring(0, 5) +
                              " " +
                              data.mobile_no.substring(
                                5,
                                data.mobile_no.length
                              )}
                          </td>
                          <td>
                            <i
                              className="fa fa-edit f-18 cursor-pointer mx-2"
                              onClick={() => handleEdit(data.id)}
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
                        You haven&apos;t added any emergency contacts yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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
    </>
  );
};

FamilyDetails.propTypes = {
  location: PropTypes.object,
  scrollRef: PropTypes.any,
};

export default FamilyDetails;
