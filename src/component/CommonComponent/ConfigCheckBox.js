import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  // getConfigEmployeeData,
  updateConfigEmployeeData,
} from "../../redux/action";
import { useDispatch } from "react-redux";

const ConfigCheckBox = ({ name, className, id, data, load, dataLength }) => {
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dataLength.includes(id)) {
      setIsChecked(false);
    }
  }, [load]);

  useEffect(() => {
    data?.access_designation.map((itm) => {
      if (itm === id) {
        setIsChecked(true);
      }
    });
    data?.access_employee.map((itm) => {
      if (itm === id) {
        setIsChecked(true);
      }
    });
  }, [data]);

  const handleChange = (e, employeeId) => {
    //setIsChecked(!isChecked);
    const status = isChecked ? 0 : 1;
    const payload = {
      employee_id: employeeId,
      access_id: e.target.id,
      status,
    };
    dispatch(
      updateConfigEmployeeData({
        data: payload,
        callback: () => {
          //dispatch(getConfigEmployeeData());
        },
      })
    );
  };
  return (
    <>
      <input
        type="checkbox"
        id={id}
        //className={`${className}`}
        className={
          data?.access_designation.filter((itm) => itm === id).length > 0
            ? `${className} pointer-none`
            : `${className}
  `
        }
        name={name}
        checked={isChecked}
        onChange={(e) => handleChange(e, data.id, data)}
        disabled={
          data?.access_designation.filter((itm) => itm === id).length > 0
        }
      />
    </>
  );
};

ConfigCheckBox.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.number,
  data: PropTypes.object,
  load: PropTypes.bool,
  dataLength: PropTypes.array,
};

export default ConfigCheckBox;
