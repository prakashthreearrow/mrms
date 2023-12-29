import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import {
  Button,
  Input,
  InputGroup,
  Textarea,
  SearchableSelect,
} from "../CommonComponent";
import validateAddress from "../../validation/employeeValidation/address";
import { formatPhoneNumber, getLocalStorageItem } from "../../utils/helper";
import { addEditAddress, getAddress, stateType } from "../../redux/action";

const Address = ({ location }) => {
  const [addressForm, setAddressForm] = useState({
    presentAddress: "",
    presentTown: "",
    presentStateId: "",
    presentPinCode: "",
    presentMobileNumber: "",
    permanentAddress: "",
    permanentTown: "",
    permanentStateId: "",
    permanentPinCode: "",
    permanentMobileNumber: "",
  });
  const [isSameAddress, setSameAddress] = useState(false);
  const [error, setError] = useState({});
  const [state, setState] = useState([]);

  const dispatch = useDispatch();

  const address_data = useSelector((state) => state.AddressInfo.AddressDetail);
  const state_type = useSelector((state) => state.StateType.stateTypeArray);

  useEffect(() => {
    if (getLocalStorageItem("employee_id")) {
      dispatch(getAddress(getLocalStorageItem("employee_id")));
    } else if (location?.state?.id) {
      dispatch(getAddress(location?.state?.id));
    }
  }, [dispatch, location?.state?.id]);

  useEffect(() => {
    if (state_type?.length > 0) {
      let state_drop = state_type.map((itm) => ({
        label: itm?.name,
        value: itm?.id,
      }));
      setState(state_drop);
    } else {
      dispatch(stateType());
    }
  }, [state_type, dispatch]);

  useEffect(() => {
    setAddressForm((prevState) => ({
      ...prevState,
      presentAddress: address_data?.present_address
        ? address_data?.present_address
        : "",
      presentTown: address_data?.present_town ? address_data?.present_town : "",
      presentStateId: address_data?.present_state_id.toString()
        ? address_data?.present_state_id.toString()
        : "",
      presentPinCode: address_data?.present_pincode
        ? address_data?.present_pincode
        : "",
      presentMobileNumber: address_data?.present_mobile_no
        ? formatPhoneNumber(address_data?.present_mobile_no)
        : "",
      permanentAddress: address_data?.permanent_address
        ? address_data?.permanent_address
        : "",
      permanentTown: address_data?.permanent_town
        ? address_data?.permanent_town
        : "",
      permanentStateId: address_data?.permanent_state_id.toString()
        ? address_data?.permanent_state_id.toString()
        : "",
      permanentPinCode: address_data?.permanent_pincode
        ? address_data?.permanent_pincode
        : "",
      permanentMobileNumber: address_data?.permanent_mobile_no
        ? formatPhoneNumber(address_data?.permanent_mobile_no)
        : "",
    }));
    setSameAddress(!!address_data?.is_same_address);
  }, [address_data]);

  const handleChange = (e, name) => {
    if (e.target) {
      const { name, value } = e.target;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setAddressForm((prevState) => ({ ...prevState, [name]: value }));
    } else {
      const { value } = e;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setAddressForm((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleToggle = () => {
    setSameAddress((prevValue) => !prevValue);
    if (isSameAddress) {
      setAddressForm((prevState) => ({
        ...prevState,
        permanentAddress: addressForm?.presentAddress,
        permanentTown: addressForm?.presentTown,
        permanentStateId: addressForm?.presentStateId,
        permanentPinCode: addressForm?.presentPinCode,
        permanentMobileNumber: addressForm?.presentMobileNumber,
      }));
      setError((prevState) => ({
        ...prevState,
        permanentAddress: addressForm?.presentAddress
          ? ""
          : prevState.permanentAddress,
        permanentTown: addressForm?.presentTown ? "" : prevState.permanentTown,
        permanentStateId: addressForm?.presentStateId
          ? ""
          : prevState.permanentStateId,
        permanentPinCode: addressForm?.presentPinCode
          ? ""
          : prevState.permanentPinCode,
        permanentMobileNumber: addressForm?.presentMobileNumber
          ? ""
          : prevState.permanentMobileNumber,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateAddress(addressForm);
    if (isValid) {
      let payload = {
        employee_id:
          parseInt(getLocalStorageItem("employee_id")) || location?.state?.id,
        present_address: addressForm?.presentAddress,
        present_town: addressForm?.presentTown,
        present_state_id: addressForm?.presentStateId,
        present_pincode: addressForm?.presentPinCode.replace(" ", ""),
        present_mobile_no: addressForm?.presentMobileNumber.replace(" ", ""),
        permanent_address: addressForm?.permanentAddress,
        permanent_town: addressForm?.permanentTown,
        permanent_state_id: addressForm?.permanentStateId,
        permanent_pincode: addressForm?.permanentPinCode.replace(" ", ""),
        permanent_mobile_no: addressForm?.permanentMobileNumber.replace(
          " ",
          ""
        ),
        is_same_address: isSameAddress ? 1 : 0,
      };
      if (address_data) {
        payload = { ...payload, id: address_data?.id };
      }
      dispatch(
        addEditAddress({
          form: payload,
          callback: () =>
            dispatch(
              getAddress(
                getLocalStorageItem("employee_id") || location?.state?.id
              )
            ),
        })
      );
    } else {
      setError(errors);
    }
  };

  const allowNumberOnly = (event) => {
    let charCode = event.target.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      event.target.value = event.target.value.replace(/[^0-9.-]/g, "");
    } else {
      event.target.value = event.target.value.replace(/[^0-9. ]/g, "");
    }
    if (isSameAddress && event.target.name === "presentMobileNumber") {
      setAddressForm((prevState) => ({
        ...prevState,
        presentMobileNumber: event.target.value,
        permanentMobileNumber: event.target.value,
      }));
    } else {
      setAddressForm((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    }
  };

  return (
    <div className="my-2">
      <form onSubmit={handleSubmit}>
        <div className="row justify-content-center">
          <div className="col-md-5 col-lg-5 col-11 mt-sm-4">
            <div className="row pt-3 pb-3 text-uppercase text-center ">
              <h4>Present Address</h4>
            </div>
            <div className="form-group row">
              <Textarea
                placeholder="Enter address"
                name="presentAddress"
                value={addressForm?.presentAddress || ""}
                error={error?.presentAddress}
                onChange={(e) => {
                  if (isSameAddress) {
                    setError((prevState) => ({
                      ...prevState,
                      presentAddress: "",
                      permanentAddress: "",
                    }));
                    setAddressForm((prevState) => ({
                      ...prevState,
                      presentAddress: e.target.value,
                      permanentAddress: e.target.value,
                    }));
                  } else {
                    handleChange(e);
                  }
                }}
                isRequired
                label="Address"
              />
            </div>
            <div className="form-group row my-2">
              <Input
                type="text"
                id="city"
                name="presentTown"
                value={addressForm?.presentTown || ""}
                error={error?.presentTown}
                onChange={(e) => {
                  if (isSameAddress) {
                    setError((prevState) => ({
                      ...prevState,
                      presentTown: "",
                      permanentTown: "",
                    }));
                    setAddressForm((prevState) => ({
                      ...prevState,
                      presentTown: e.target.value,
                      permanentTown: e.target.value,
                    }));
                  } else {
                    handleChange(e);
                  }
                }}
                isRequired
                label="Town/City"
              />
            </div>
            <div className="form-group row my-2">
              <SearchableSelect
                options={state}
                className="p-0"
                value={addressForm?.presentStateId || ""}
                onChange={(e) => {
                  if (isSameAddress) {
                    setError((prevState) => ({
                      ...prevState,
                      presentStateId: "",
                      permanentStateId: "",
                    }));
                    setAddressForm((prevState) => ({
                      ...prevState,
                      presentStateId: e.value,
                      permanentStateId: e.value,
                    }));
                  } else {
                    handleChange(e, "presentStateId");
                  }
                }}
                error={error?.presentStateId}
                isRequired
                label="State"
              />
            </div>
            <div className="form-group row my-2">
              <Input
                type="text"
                id="pinCode"
                name="presentPinCode"
                value={addressForm?.presentPinCode || ""}
                error={error?.presentPinCode}
                maxLength="6"
                onChange={(e) => {
                  if (isSameAddress) {
                    setError((prevState) => ({
                      ...prevState,
                      presentPinCode: "",
                      permanentPinCode: "",
                    }));
                    setAddressForm((prevState) => ({
                      ...prevState,
                      presentPinCode: e.target.value,
                      permanentPinCode: e.target.value,
                    }));
                  } else {
                    handleChange(e);
                  }
                }}
                onKeyUp={(e) => allowNumberOnly(e)}
                isRequired
                label="Pin code"
              />
            </div>
            <div className="form-group row my-2">
              <InputGroup
                type="tel"
                prepend={true}
                prependText="+91"
                id="presentMobileNumber"
                name="presentMobileNumber"
                className="border-left-radius-0 border-left-none"
                value={
                  formatPhoneNumber(addressForm?.presentMobileNumber) || ""
                }
                onChange={(e) => {
                  if (isSameAddress) {
                    setError((prevState) => ({
                      ...prevState,
                      presentMobileNumber: "",
                      permanentMobileNumber: "",
                    }));
                    setAddressForm((prevState) => ({
                      ...prevState,
                      presentMobileNumber: e.target.value,
                      permanentMobileNumber: e.target.value,
                    }));
                  } else {
                    handleChange(e);
                  }
                }}
                onKeyUp={(e) => allowNumberOnly(e)}
                error={error?.presentMobileNumber}
                pattern="[0-9]{5} [0-9]{5}"
                isRequired
                label="Phone number"
              />
            </div>
          </div>
          <div className="col-1 mt-5 d-md-block d-none">
            <div className="vertical-line col-md-6 col-lg-6 col-12 " />
          </div>
          <div className="col-md-5 col-lg-5 col-11 mt-sm-4">
            <div className="row pt-3 pb-3 text-uppercase text-center">
              <h4>Permanent Address</h4>
            </div>
            <div className="form-group row">
              <div className="col-1">
                <input
                  type="checkbox"
                  checked={isSameAddress}
                  onChange={handleToggle}
                />
              </div>
              <div className="col-11">
                <label htmlFor="sameAsPresent">Same as present address</label>
              </div>
            </div>
            <div className="form-group row">
              <Textarea
                placeholder="Enter permanent address"
                name="permanentAddress"
                value={addressForm?.permanentAddress}
                error={error?.permanentAddress}
                onChange={(e) => handleChange(e)}
                disabled={isSameAddress}
                isRequired
                label="Address"
              />
            </div>
            <div className="form-group row my-2">
              <Input
                type="text"
                id="city"
                name="permanentTown"
                value={addressForm?.permanentTown}
                error={error?.permanentTown}
                onChange={(e) => handleChange(e)}
                disabled={isSameAddress}
                isRequired
                label="Town/City"
              />
            </div>
            <div className="form-group row my-2">
              <SearchableSelect
                options={state}
                className="p-0"
                value={addressForm?.permanentStateId}
                error={error?.permanentStateId}
                onChange={(e) => handleChange(e, "permanentStateId")}
                disabled={isSameAddress}
                isRequired
                label="State"
              />
            </div>
            <div className="form-group row my-2">
              <Input
                type="text"
                id="pinCode"
                name="permanentPinCode"
                value={addressForm?.permanentPinCode}
                error={error?.permanentPinCode}
                maxLength="6"
                onChange={(e) => handleChange(e)}
                onKeyUp={(e) => allowNumberOnly(e)}
                disabled={isSameAddress}
                isRequired
                label="Pin code"
              />
            </div>
            <div className="form-group row my-2">
              <InputGroup
                type="tel"
                prepend={true}
                prependText="+91"
                id="permanentMobileNumber"
                name="permanentMobileNumber"
                className="border-left-radius-0 border-left-none"
                value={formatPhoneNumber(addressForm?.permanentMobileNumber)}
                onChange={(e) => handleChange(e)}
                onKeyUp={(e) => allowNumberOnly(e)}
                error={error?.permanentMobileNumber}
                pattern="[0-9]{5} [0-9]{5}"
                disabled={isSameAddress}
                isRequired
                label="Phone number"
              />
            </div>
          </div>
        </div>
        <div className="text-center">
          <Button
            text="Save"
            type="submit"
            onClick={handleSubmit}
            className="mt-5"
          />
        </div>
      </form>
    </div>
  );
};

Address.propTypes = {
  location: PropTypes.object,
};

export default Address;
