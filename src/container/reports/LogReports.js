import React, { useEffect, useState } from "react";
import { Breadcrumb } from "../../component/CommonComponent";
import moment from "moment";
import { getLocalStorageItem } from "../../utils/helper";

const pageList = [
  {
    label: "Reports",
    path: "/reports",
  },
  {
    label: "Log Reports",
  },
];

const LogReports = () => {
  const [daysInMonth, setDaysInMonth] = useState();
  const [currentMonth, setCurrentMonth] = useState();
  const [currentYear, setCurrentYear] = useState();

  useEffect(() => {
    const currentM = moment().format("MM");
    const currentY = moment().format("YYYY");
    const temp = currentYear + "-" + currentM;
    const numOfDaysInMonth = moment(temp, "YYYY-MM").daysInMonth();
    setCurrentMonth(currentM);
    setCurrentYear(currentY);
    setDaysInMonth(numOfDaysInMonth);
  }, [currentYear]);

  const getDayOfDate = (day) => {
    const dayFormat = currentYear + "-" + currentMonth + "-" + day;
    return moment(dayFormat).format("dd");
  };

  return (
    <>
      <div className="row">
        <div className="">
          <Breadcrumb pageList={pageList} />
        </div>
      </div>
      <hr className="red my-1" />
      <div className="my-5 table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              {daysInMonth &&
                [...Array(daysInMonth)].map((value, index) => (
                  <th
                    key={index}
                    className={`py-2 ${
                      ["Su", "Sa"].includes(getDayOfDate(index + 1)) &&
                      "bg-gray"
                    }`}
                  >
                    {index < 9 ? "0" + (index + 1) : index + 1}
                    <p className="mb-0 mt-1 text-uppercase">
                      {getDayOfDate(index + 1)}
                    </p>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            <tr className="table-active">
              <th className="px-3 py-3">
                {JSON.parse(getLocalStorageItem("userData")).first_name}{" "}
                {JSON.parse(getLocalStorageItem("userData")).last_name}
              </th>
              {daysInMonth &&
                [...Array(daysInMonth)].map((value, index) => (
                  <th
                    key={index}
                    className={`text-center px-4 py-3 ${
                      ["Su", "Sa"].includes(getDayOfDate(index + 1)) &&
                      "custom-padding"
                    }`}
                  >
                    {["Su", "Sa"].includes(getDayOfDate(index + 1)) ? "" : "8H"}
                  </th>
                ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LogReports;
