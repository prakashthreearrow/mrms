import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  updateConfigDesignationData,
  //getConfigDesignationData,
} from "../../redux/action";
import { useDispatch } from "react-redux";

const ConfigDesgCheckBox = ({ id, data, load, dataLength }) => {
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (dataLength.includes(id)) {
      setIsChecked(false);
    }
  }, [load]);

  useEffect(() => {
    data?.access_ids.map((itm) => {
      if (itm === id) {
        setIsChecked(true);
      }
    });
    //setIsChecked(!isChecked);
  }, [data]);

  const handleChange = (e, id, data) => {
    e.preventDefault();
    setIsChecked(!isChecked);
    let payload = {
      designation_id: parseInt(data.designation_id),
      access_id: id,
      status: e.target.checked ? 1 : 0,
    };
    dispatch(
      updateConfigDesignationData({
        data: payload,
        callback: () => {
          //dispatch(getConfigDesignationData());
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
        checked={isChecked}
        onChange={(e) => handleChange(e, id, data)}
      />
    </>
  );
};

ConfigDesgCheckBox.propTypes = {
  id: PropTypes.number,
  data: PropTypes.object,
  load: PropTypes.bool,
  dataLength: PropTypes.array,
};

export default ConfigDesgCheckBox;
