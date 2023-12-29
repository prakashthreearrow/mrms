import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import {
  Button,
  CreatableSelect,
  Input,
  Loader,
  SearchableSelect,
  Textarea,
} from "../CommonComponent";
import {
  addCompany,
  addEditClientDetails,
  countryType,
  getClientCompanyList,
  getClientDetails,
} from "../../redux/action";
import validateClientDetail from "../../validation/projectValidation/client-details";
import { getLocalStorageItem } from "../../utils/helper";
import PropTypes from "prop-types";

const ClientDetail = ({ location }) => {
  const [clientDetailForm, setClientDetailForm] = useState({
    companyName: "",
    clientOwner: "",
    address: "",
    phoneCountryCode: "",
    country: "",
    email: "",
    phone: "",
    keyContact1: "",
    keyPhone1CountryCode: "",
    keyPhone1: "",
    keyEmail1: "",
    keyContact2: "",
    keyPhone2CountryCode: "",
    keyPhone2: "",
    keyEmail2: "",
  });
  const [country, setCountry] = useState([]);
  const [company, setCompany] = useState([]);
  const [error, setError] = useState({});

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.ClientDetail.loading);
  const country_type = useSelector((state) => state.Country.countryArray);
  const company_list = useSelector(
    (company) => company.ClientCompanyList.clientCompanyList
  );
  const client_data = useSelector((state) => state.ClientDetail.clientDetail);

  useEffect(() => {
    if (getLocalStorageItem("project_id")) {
      dispatch(
        getClientDetails({
          id: getLocalStorageItem("project_id"),
        })
      );
    } else if (location?.state?.id) {
      dispatch(
        getClientDetails({
          id: location?.state?.id,
        })
      );
    }
  }, []);

  useEffect(() => {
    setClientDetailForm((prevState) => ({
      ...prevState,
      companyName: client_data?.company_id ? client_data?.company_id : "",
      clientOwner: client_data?.projectClientCompany?.owner
        ? client_data.projectClientCompany?.owner
        : "",
      phoneCountryCode:
        client_data?.projectClientCompany?.country_code ?? "+91",
      keyPhone1CountryCode: client_data?.ckc_1_country_code ?? "+91",
      keyPhone2CountryCode: client_data?.ckc_2_country_code ?? "+91",
      address: client_data?.projectClientCompany?.address
        ? client_data?.projectClientCompany?.address
        : "",
      country: client_data?.projectClientCompany?.country
        ? client_data?.projectClientCompany?.country
        : "",
      email: client_data?.projectClientCompany?.email
        ? client_data?.projectClientCompany?.email
        : "",
      phone:
        (client_data?.projectClientCompany?.country_code ?? "+91") +
        (client_data?.projectClientCompany?.phone ?? ""),
      keyContact1: client_data?.client_key_contact_1
        ? client_data?.client_key_contact_1
        : "",
      keyPhone1:
        (client_data?.ckc_1_country_code ?? "+91") +
        (client_data?.ckc_1_phone ?? ""),
      keyEmail1: client_data?.ckc_1_email ? client_data?.ckc_1_email : "",
      keyContact2: client_data?.client_key_contact_2
        ? client_data?.client_key_contact_2
        : "",
      keyPhone2:
        (client_data?.ckc_2_country_code ?? "+91") +
        (client_data?.ckc_2_phone ?? ""),
      keyEmail2: client_data?.ckc_2_email ? client_data?.ckc_2_email : "",
    }));
  }, [client_data]);

  useEffect(() => {
    if (country_type?.length > 0) {
      let country_drop = country_type.map((itm) => ({
        label: itm?.name,
        value: itm?.name,
      }));
      setCountry(country_drop);
    } else {
      dispatch(countryType());
    }
  }, [country_type]);

  useEffect(() => {
    if (company_list?.length > 0) {
      let company_drop = company_list.map((itm) => ({
        label: itm?.company_name,
        value: itm?.id,
      }));
      setCompany(company_drop);
    } else {
      dispatch(getClientCompanyList());
    }
  }, [company_list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { errors, isValid } = validateClientDetail(clientDetailForm);
    if (isValid) {
      let payload = {
        //id: client_data?.client_id ? client_data?.client_id : "",
        id: clientDetailForm.companyName,
        owner: clientDetailForm.clientOwner,
        address: clientDetailForm.address,
        country_code: clientDetailForm.phoneCountryCode,
        ckc_1_country_code: clientDetailForm.keyPhone1CountryCode,
        ckc_2_country_code: clientDetailForm.keyPhone2CountryCode,
        country: clientDetailForm.country,
        email: clientDetailForm.email,
        phone: clientDetailForm.phone.slice(
          clientDetailForm.phoneCountryCode?.length
        ),
        client_key_contact_1: clientDetailForm.keyContact1,
        ckc_1_phone: clientDetailForm.keyPhone1.slice(
          clientDetailForm.keyPhone1CountryCode?.length
        ),
        ckc_1_email: clientDetailForm.keyEmail1,
        client_key_contact_2: clientDetailForm.keyContact2,
        ckc_2_phone: clientDetailForm.keyPhone2.slice(
          clientDetailForm.keyPhone2CountryCode?.length
        ),
        ckc_2_email: clientDetailForm.keyEmail2,
        project_id:
          parseInt(getLocalStorageItem("project_id")) || location?.state?.id,
      };
      if (payload) {
        dispatch(
          addEditClientDetails({
            form: payload,
            callback: () => {
              dispatch(
                getClientDetails({
                  id:
                    parseInt(getLocalStorageItem("project_id")) ||
                    location?.state?.id,
                })
              );
              dispatch(getClientCompanyList());
            },
          })
        );
      }
    } else {
      setError(errors);
    }
  };

  const handleChange = (e, name) => {
    if (e.target) {
      const { name, value } = e.target;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setClientDetailForm((prevState) => ({ ...prevState, [name]: value }));
    } else {
      const { value } = e;
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      setClientDetailForm((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handlePhoneChange = (keyCode, keyPhone, value, data) => {
    setError((prevState) => ({
      ...prevState,
      [keyCode]: "",
      [keyPhone]: "",
    }));

    setClientDetailForm((prevState) => ({
      ...prevState,
      [keyCode]: data.dialCode,
      [keyPhone]: value,
    }));
  };

  const handleCreateChange = (newValue, actionMeta, name) => {
    setError((prevState) => ({
      ...prevState,
      [name]: "",
    }));
    if (actionMeta.action === "create-option") {
      dispatch(
        addCompany({
          form: {
            name: newValue.value,
          },
          callback: (data) => {
            dispatch(getClientCompanyList());
            setClientDetailForm((prevState) => ({
              ...prevState,
              [name]: data.id,
            }));
          },
        }),
        setClientDetailForm({
          companyName: "",
          clientOwner: "",
          address: "",
          phoneCountryCode: "",
          country: "",
          email: "",
          phone: "",
          keyContact1: "",
          keyPhone1CountryCode: "",
          keyPhone1: "",
          keyEmail1: "",
          keyContact2: "",
          keyPhone2CountryCode: "",
          keyPhone2: "",
          keyEmail2: "",
        })
      );
    } else {
      setError((prevState) => ({
        ...prevState,
        [name]: "",
      }));
      let company_data = company_list.find((o) => o.id === newValue.value);
      setClientDetailForm((prevState) => {
        return {
          ...prevState,
          address: company_data?.address,
          clientOwner: company_data?.owner,
          country: company_data?.country,
          email: company_data?.email,
          phoneCountryCode: company_data?.country_code,
          phone: company_data?.phone,
        };
      });
      setClientDetailForm((prevState) => ({
        ...prevState,
        [name]: newValue.value,
      }));
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="my-2 client-details">
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-6 col-12">
              <div className="form-group row my-2">
                <CreatableSelect
                  options={company}
                  type="string"
                  className="p-0"
                  value={clientDetailForm?.companyName || ""}
                  error={error?.companyName}
                  onChange={(newValue, actionMeta) =>
                    handleCreateChange(newValue, actionMeta, "companyName")
                  }
                  label="Company name"
                  isRequired
                />
              </div>
              <div className="form-group row my-2">
                <Input
                  type="text"
                  name="clientOwner"
                  value={clientDetailForm?.clientOwner || ""}
                  onChange={handleChange}
                  label="Client owner"
                />
              </div>
              <div className="form-group row my-2">
                <Textarea
                  type="text"
                  name="address"
                  value={clientDetailForm?.address || ""}
                  onChange={handleChange}
                  label="Address"
                />
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-12">
              <div className="form-group row my-2">
                <SearchableSelect
                  options={country}
                  className="p-0"
                  type="string"
                  value={clientDetailForm.country || ""}
                  onChange={(e) => handleChange(e, "country")}
                  label="Country"
                />
              </div>
              <div className="form-group row my-2">
                <Input
                  type="email"
                  name="email"
                  value={clientDetailForm?.email || ""}
                  error={error?.email}
                  onChange={(e) => handleChange(e)}
                  label="Email"
                />
              </div>
              <div className="form-group row my-2">
                <label htmlFor="phone" className="col-form-label">
                  Phone
                </label>
                <PhoneInput
                  name="phoneCountryCode"
                  containerClass="phone-country-code-input"
                  inputClass="form-control"
                  value={clientDetailForm.phone || ""}
                  onChange={(...rest) =>
                    handlePhoneChange("phoneCountryCode", "phone", ...rest)
                  }
                  autoFormat
                />
                {error && <div className="invalid">{error.phone}</div>}
              </div>
            </div>
          </div>
          <div className="mt-4 mb-4 horizontal-line" />
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-6 col-12">
              <div className="form-group row my-2">
                <Input
                  type="text"
                  name="keyContact1"
                  value={clientDetailForm?.keyContact1}
                  onChange={handleChange}
                  label="Client key contact-1"
                />
              </div>
              <div className="form-group row my-2">
                <label htmlFor="keyPhone1" className="col-form-label">
                  Phone
                </label>
                <PhoneInput
                  name="keyPhone1CountryCode"
                  containerClass="phone-country-code-input"
                  inputClass="form-control"
                  value={clientDetailForm.keyPhone1 || ""}
                  onChange={(...rest) =>
                    handlePhoneChange(
                      "keyPhone1CountryCode",
                      "keyPhone1",
                      ...rest
                    )
                  }
                  autoFormat
                />
                {error && <div className="invalid">{error.keyPhone1}</div>}
              </div>
              <div className="form-group row my-2">
                <Input
                  type="text"
                  name="keyEmail1"
                  error={error?.keyEmail1}
                  value={clientDetailForm?.keyEmail1}
                  onChange={handleChange}
                  label="Email"
                />
              </div>
            </div>

            <div className="col-md-6 col-lg-6 col-12">
              <div className="form-group row my-2">
                <Input
                  type="text"
                  name="keyContact2"
                  value={clientDetailForm?.keyContact2}
                  onChange={handleChange}
                  label="Client key contact-2"
                />
              </div>
              <div className="form-group row my-2">
                <label htmlFor="keyPhone2" className="col-form-label">
                  Phone
                </label>
                <PhoneInput
                  name="keyPhone2CountryCode"
                  containerClass="phone-country-code-input"
                  inputClass="form-control"
                  value={clientDetailForm.keyPhone2 || ""}
                  onChange={(...rest) =>
                    handlePhoneChange(
                      "keyPhone2CountryCode",
                      "keyPhone2",
                      ...rest
                    )
                  }
                  autoFormat
                />
                {error && <div className="invalid">{error.keyPhone2}</div>}
              </div>
              <div className="form-group row my-2">
                <Input
                  type="email"
                  name="keyEmail2"
                  error={error?.keyEmail2}
                  value={clientDetailForm?.keyEmail2}
                  onChange={handleChange}
                  label="Email"
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
    </>
  );
};

ClientDetail.propTypes = {
  location: PropTypes.object,
};

export default ClientDetail;
