import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";

import {
  Button,
  Input,
  InputGroup,
  Loader,
  SearchableSelect,
} from "../CommonComponent";
import validateBasicInfo from "../../validation/employeeValidation/basic-info";
import {
  createEmployeeBasicInfo,
  departmentType,
  designationType,
  getEmployeeBasicInfo,
  newEmployeeCode,
  reportingToType,
} from "../../redux/action";
import {
  ADMIN_DEPT,
  BLOOD_GROUP,
  DESIGN_DEPT,
  GENDER,
  HR_DEPT,
  MANAGEMENT_DEPT,
  MARKETING_DEPT,
  MOBILE_DEPT,
  NETWORKING_DEPT,
  QA_DEPT,
  SALES_DEPT,
  SUPER_ADMIN_DEPT,
  WEB_DEPT,
} from "../../utils/constant";
import {
  capitalize,
  formatPhoneNumber,
  getLocalStorageItem,
  prefixWithZero,
  setLocalStorageItem,
  WarningToast,
} from "../../utils/helper";

const BasicInfo = ({
  setIsCompleted,
  isCompleted,
  setPageList,
  pageList,
  location,
}) => {
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [reportingTo, setReportingTo] = useState([]);
  const [profileForm, setProfileForm] = useState({
    employeeCode: "",
    firstName: "",
    middleName: "",
    lastName: "",
    joiningDate: "",
    dob: "",
    designation: "",
    department: "",
    profileImage: "",
    companyEmailID: "",
    personalEmailID: "",
    mobileNo: "",
    gender: "",
    bloodGroup: "",
    reportingTo: "",
  });
  const [maxDate, setMaxDate] = useState("");
  const [error, setError] = useState({});

  const profile = useRef();
  const dispatch = useDispatch();

  const department_types = useSelector(
    (state) => state.DepartmentType.departmentArray
  );
  const designation_types = useSelector(
    (state) => state.DesignationType.designationArray
  );
  const employeeCode = useSelector(
    (state) => state.EmployeeBasicInfo.employeeCode
  );
  const loading = useSelector((state) => state.EmployeeBasicInfo.loading);
  const employeeDetails = useSelector(
    (state) => state.EmployeeBasicInfo.employeeDetails
  );

  useEffect(() => {
    getMaxDate();
    if (getLocalStorageItem("employee_id")) {
      dispatch(
        getEmployeeBasicInfo({
          id: getLocalStorageItem("employee_id"),
        })
      );
    } else if (location?.state?.id) {
      dispatch(
        getEmployeeBasicInfo({
          id: location?.state?.id,
        })
      );
    } else {
      dispatch(newEmployeeCode());
    }
  }, [dispatch, location?.state?.id]);

  useEffect(() => {
    if (employeeDetails) {
      setProfileForm((prevState) => ({
        ...prevState,
        employeeCode: employeeDetails?.employee_code.slice(3),
        firstName: employeeDetails?.first_name,
        middleName: employeeDetails?.middle_name,
        lastName: employeeDetails?.last_name,
        joiningDate: moment(employeeDetails?.join_date).format("YYYY-MM-DD"),
        dob: moment(employeeDetails?.dob).format("YYYY-MM-DD"),
        designation: employeeDetails?.designationType.id.toString(),
        department: employeeDetails?.departmentType.id.toString(),
        profileImage: employeeDetails?.profile_image,
        companyEmailID: employeeDetails?.email_id.slice(
          0,
          employeeDetails?.email_id?.indexOf("@")
        ),
        personalEmailID: employeeDetails?.personal_email_id,
        mobileNo: formatPhoneNumber(employeeDetails?.mobile_no),
        gender: employeeDetails?.gender,
        bloodGroup: employeeDetails?.blood_group,
        reportingTo: employeeDetails?.reporting_to?.toString(),
        employee_id: employeeDetails?.id,
        image: employeeDetails?.image,
      }));

      setPageList([
        pageList[0],
        ...pageList?.slice(1).map((itm) => {
          return {
            ...itm,
            label: `${employeeDetails?.first_name} ${employeeDetails?.last_name} (${employeeDetails?.employee_code})`,
          };
        }),
      ]);
      if (!isCompleted) {
        setIsCompleted(!isCompleted);
      }
    }
  }, [employeeDetails]);

  useEffect(() => {
    if (employeeCode) {
      setProfileForm((prevState) => ({
        ...prevState,
        employeeCode: employeeCode.slice(3),
      }));
    }
  }, [employeeCode]);

  useEffect(() => {
    if (department_types?.length > 0) {
      let data = department_types.map((itm) => ({
        label: itm.name,
        value: itm.id,
      }));
      setDepartments(data);
    } else {
      dispatch(departmentType());
    }
  }, [department_types]);

  useEffect(() => {
    if (designation_types?.length > 0) {
      const data = designation_types.map((itm) => ({
        deptId: itm?.department_id,
        label: itm?.name,
        value: itm?.id,
      }));
      let newArr = [];
      data.map((d) => {
        if (profileForm.department.toString() === d.deptId.toString()) {
          return newArr.push(d);
        }
      });
      setDesignations(newArr);
    } else {
      dispatch(designationType());
    }
  }, [designation_types, profileForm.department]);

  useEffect(() => {
    if (profileForm.department) {
      let param;
      const dept =
        typeof profileForm.department === "number"
          ? profileForm.department
          : parseInt(profileForm.department);
      if (dept === MANAGEMENT_DEPT) {
        param = MANAGEMENT_DEPT;
      }
      if (dept === SALES_DEPT) {
        param = `${MANAGEMENT_DEPT},${SALES_DEPT}`;
      }
      if (dept === MARKETING_DEPT) {
        param = `${MANAGEMENT_DEPT},${MARKETING_DEPT}`;
      }
      if (dept === HR_DEPT) {
        param = `${MANAGEMENT_DEPT},${HR_DEPT}`;
      }
      if (dept === ADMIN_DEPT) {
        param = `${MANAGEMENT_DEPT},${HR_DEPT},${ADMIN_DEPT}`;
      }
      if (dept === WEB_DEPT) {
        param = `${MANAGEMENT_DEPT},${WEB_DEPT}`;
      }
      if (dept === MOBILE_DEPT) {
        param = `${MANAGEMENT_DEPT},${MOBILE_DEPT}`;
      }
      if (dept === QA_DEPT) {
        param = `${MANAGEMENT_DEPT},${QA_DEPT}`;
      }
      if (dept === DESIGN_DEPT) {
        param = `${MANAGEMENT_DEPT},${DESIGN_DEPT}`;
      }
      if (dept === NETWORKING_DEPT) {
        param = `${MANAGEMENT_DEPT},${NETWORKING_DEPT}`;
      }
      if (dept === SUPER_ADMIN_DEPT) {
        param = `${MANAGEMENT_DEPT}`;
      }

      let payload = {
        departments: param,
        is_interview: "",
      };
      dispatch(
        reportingToType({
          form: payload,
          callback: (data) => {
            let list = data.map((itm) => ({
              label: `${itm?.first_name} ${itm?.last_name}`,
              value: itm.id,
            }));
            setReportingTo(list);
          },
        })
      );
    }
  }, [profileForm.department]);

  const uploadProfile = () => {
    profile.current.click();
  };

  const profileChangeHandler = (e) => {
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) {
      return;
    }

    const [type] = fileObj.type.split("/");
    if (!type || type !== "image") {
      toast.warn(<WarningToast msg="Filetype is invalid." />);
      return null;
    }

    setProfileForm((prevState) => ({
      ...prevState,
      profileImage: fileObj?.type,
      imageFile: fileObj,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateBasicInfo(profileForm);
    if (isValid) {
      let payload = {
        employee_code: `MI-${prefixWithZero(profileForm?.employeeCode, 3)}`,
        first_name: profileForm?.firstName,
        middle_name: profileForm?.middleName,
        last_name: profileForm?.lastName,
        dob: profileForm?.dob,
        join_date: profileForm?.joiningDate,
        designation_id: parseInt(profileForm?.designation),
        department_id: parseInt(profileForm?.department),
        email_id: profileForm?.companyEmailID?.includes("@mindinventory.com")
          ? profileForm.companyEmailID
          : `${profileForm.companyEmailID}@mindinventory.com`,
        personal_email_id: profileForm?.personalEmailID,
        mobile_no: profileForm.mobileNo.replace(" ", ""),
        gender: parseInt(profileForm.gender),
        blood_group: profileForm.bloodGroup,
        reporting_to: parseInt(profileForm.reportingTo),
        status: 2,
      };
      if (profileForm.profileImage) {
        payload = { ...payload, profile_image: profileForm.profileImage };
      }
      if (profileForm?.employee_id) {
        payload = { ...payload, id: profileForm?.employee_id };
      }
      dispatch(
        createEmployeeBasicInfo({
          form: payload,
          callback: (data) => {
            if (data?.id) {
              setLocalStorageItem("employee_id", data?.id);
              setPageList([
                pageList[0],
                ...pageList?.slice(1).map((itm) => {
                  return {
                    ...itm,
                    label: `${employeeDetails?.first_name} ${employeeDetails?.last_name} (${employeeDetails?.employee_code})`,
                  };
                }),
              ]);
              setProfileForm({
                ...profileForm,
                employee_id: data?.id,
              });
              if (!isCompleted) {
                setIsCompleted(!isCompleted);
              }
              if (data?.image_upload_url) {
                axios
                  .put(data?.image_upload_url?.uploadURL, profileForm.imageFile)
                  .then((r) => r);
              }
              dispatch(
                getEmployeeBasicInfo({
                  id: getLocalStorageItem("employee_id") || location?.state?.id,
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

  const changeHandler = (e, name) => {
    if (e.target) {
      const { name, value } = e.target;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setProfileForm((prevState) => ({
        ...prevState,
        [name]:
          name === "firstName" || name === "middleName" || name === "lastName"
            ? capitalize(value)
            : value,
      }));
    } else {
      const { value } = e;
      if (name === "department") {
        setProfileForm((prevState) => ({
          ...prevState,
          designation: "",
          reportingTo: "",
        }));
      }
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setProfileForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const allowNumberOnly = (event) => {
    let charCode = event.target.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      event.target.value = event.target.value.replace(/[^0-9.-]/g, "");
    } else {
      event.target.value = event.target.value.replace(/[^0-9. ]/g, "");
    }
    setProfileForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const allowEmployeeCodeNumberOnly = (event) => {
    let charCode = event.target.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
    } else {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }

    setProfileForm((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const getMaxDate = () => {
    let date = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18);
    let yyyy = date.getFullYear();
    let month = date.getMonth();
    let _date = date.getDate();
    let mm = month < 10 ? `0${month}` : month;
    let dd = _date < 10 ? `0${_date}` : _date;
    setMaxDate(`${yyyy}-${mm}-${dd}`);
  };

  return (
    <div className="my-2">
      {loading && <Loader />}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          <div className="col-md-6 col-lg-6 col-12 my-auto">
            <div className="form-group row align-items-center">
              <div className="">
                <InputGroup
                  type="text"
                  name="employeeCode"
                  label="Employee code (Auto generated)"
                  prepend={true}
                  prependText="MI -"
                  className="border-left-radius-0 border-left-none"
                  placeholder="001"
                  maxLength="3"
                  value={profileForm?.employeeCode}
                  onKeyUp={(e) => allowEmployeeCodeNumberOnly(e)}
                  onChange={(e) => changeHandler(e)}
                  disabled={
                    !!(
                      getLocalStorageItem("employee_id") || location?.state?.id
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-12 pt-3">
            {profileForm?.imageFile ? (
              <div className="text-center">
                <input
                  type="file"
                  accept="image/*"
                  name="profileImage"
                  className="d-none"
                  id="file"
                  ref={profile}
                  onChange={profileChangeHandler}
                />
                <img
                  className="img-fluid profile-img"
                  src={URL.createObjectURL(profileForm?.imageFile)}
                  alt=""
                  onClick={uploadProfile}
                />
              </div>
            ) : profileForm?.image ? (
              <div className="text-center">
                <input
                  type="file"
                  accept="image/*"
                  name="profileImage"
                  className="d-none"
                  id="file"
                  ref={profile}
                  onChange={profileChangeHandler}
                />
                <img
                  className="img-fluid profile-img"
                  src={profileForm?.image}
                  alt=""
                  onClick={uploadProfile}
                />
              </div>
            ) : (
              <div className="d-flex flex-column mt-2">
                <input
                  type="file"
                  accept="image/*"
                  name="profileImage"
                  className="d-none"
                  id="file"
                  ref={profile}
                  onChange={profileChangeHandler}
                />
                <div className="profile-image mx-auto" onClick={uploadProfile}>
                  <i className="fa fa-user" aria-hidden={true} />
                </div>
                <label
                  htmlFor="uploadPhoto"
                  className="col-form-label mx-auto f-20"
                >
                  Upload photo
                </label>
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-6 col-12">
            <div className="form-group row my-2">
              <Input
                type="text"
                className=""
                name="firstName"
                value={profileForm.firstName}
                onChange={changeHandler}
                error={error?.firstName}
                maxLength="100"
                label="First name"
                isRequired={true}
              />
            </div>
            <div className="form-group row my-2">
              <Input
                type="text"
                className=""
                name="middleName"
                value={profileForm.middleName}
                onChange={changeHandler}
                error={error?.middleName}
                maxLength="100"
                label="Middle name"
                isRequired={true}
              />
            </div>
            <div className="form-group row my-2">
              <Input
                type="text"
                className=""
                name="lastName"
                value={profileForm.lastName}
                onChange={(e) => changeHandler(e)}
                error={error?.lastName}
                maxLength="100"
                label="Last name"
                isRequired={true}
              />
            </div>
            <div className="form-group row my-2">
              <Input
                type="date"
                className="pr-0"
                name="dob"
                label="Birth date"
                isRequired={true}
                max={maxDate}
                value={profileForm.dob}
                onChange={(e) => changeHandler(e)}
                error={error?.dob}
              />
            </div>
            <div className="form-group row my-2">
              <Input
                type="date"
                className="pr-0"
                name="joiningDate"
                min="2011-01-01"
                value={profileForm.joiningDate}
                onChange={(e) => changeHandler(e)}
                error={error?.joiningDate}
                label="Joining date"
                isRequired={true}
              />
            </div>
            <div className="form-group row my-2">
              <SearchableSelect
                options={departments}
                className="p-0"
                value={profileForm.department}
                onChange={(e) => changeHandler(e, "department")}
                error={error?.department}
                label="Department"
                isRequired={true}
              />
            </div>
            <div className="form-group row my-2">
              <SearchableSelect
                options={designations}
                className="p-0"
                value={profileForm.designation}
                onChange={(e) => changeHandler(e, "designation")}
                error={error?.designation}
                label="Designation"
                isRequired={true}
                disabled={!profileForm.department}
              />
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-12">
            <div className="form-group row my-2">
              <InputGroup
                type="text"
                name="companyEmailID"
                append={true}
                appendText="@mindinventory.com"
                className="border-right-radius-0 border-right-none"
                value={profileForm.companyEmailID}
                disabled={
                  !!(getLocalStorageItem("employee_id") || location?.state?.id)
                }
                onChange={(e) => changeHandler(e)}
                error={error?.companyEmailID}
                label="Company email ID"
                isRequired={true}
              />
            </div>
            <div className="form-group row my-2">
              <Input
                type="email"
                name="personalEmailID"
                className=""
                value={profileForm.personalEmailID}
                onChange={(e) => changeHandler(e)}
                error={error?.personalEmailID}
                label="Personal email ID"
                isRequired={true}
              />
            </div>
            <div className="form-group row my-2">
              <InputGroup
                type="tel"
                name="mobileNo"
                prepend={true}
                prependText="+91"
                className="border-left-radius-0 border-left-none"
                value={formatPhoneNumber(profileForm.mobileNo)}
                onChange={(e) => changeHandler(e)}
                onKeyUp={(e) => allowNumberOnly(e)}
                error={error?.mobileNo}
                pattern="[0-9]{5} [0-9]{5}"
                label="Mobile number"
                isRequired
              />
            </div>
            <div className="form-group row my-2">
              <SearchableSelect
                options={GENDER}
                value={profileForm.gender}
                className="p-0"
                onChange={(e) => changeHandler(e, "gender")}
                error={error?.gender}
                label="Gender"
                isRequired
              />
            </div>
            <div className="form-group row my-2">
              <SearchableSelect
                options={BLOOD_GROUP}
                value={profileForm.bloodGroup}
                className="p-0"
                onChange={(e) => changeHandler(e, "bloodGroup")}
                error={error?.bloodGroup}
                type="string"
                label="Blood group"
                isRequired
              />
            </div>
            <div className="form-group row my-2">
              <SearchableSelect
                options={reportingTo}
                value={profileForm.reportingTo}
                className="p-0"
                onChange={(e) => changeHandler(e, "reportingTo")}
                error={error?.reportingTo}
                label="Reporting to"
                isRequired
                disabled={!profileForm.department}
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button text="Submit" type="submit" className="mt-5" />
        </div>
      </form>
    </div>
  );
};

BasicInfo.propTypes = {
  isCompleted: PropTypes.bool,
  setIsCompleted: PropTypes.func,
  pageList: PropTypes.array,
  setPageList: PropTypes.func,
  location: PropTypes.object,
};

export default BasicInfo;
