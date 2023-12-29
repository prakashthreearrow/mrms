import React, { useEffect, useState } from "react";
import moment from "moment";
import { CSSTransition } from "react-transition-group";
import { useDispatch } from "react-redux";

import {
  Breadcrumb,
  Input,
  SearchableSelect,
} from "../../component/CommonComponent";
import { RESULT_TYPE } from "../../utils/constant";
import { reportingToType } from "../../redux/action";

const pageList = [
  {
    label: "Reports",
    path: "/reports",
  },
  {
    label: "Interview Reports",
  },
];

const InterviewReports = () => {
  const [interviewResourceList, setInterviewResourceList] = useState([]);
  const dispatch = useDispatch();

  // const interviewResource = useSelector(
  //   (state) => state.ReportingToType.reportingToArray
  // );

  useEffect(() => {
    let payload = {
      departments: "",
      is_interview: true,
    };
    dispatch(
      reportingToType({
        form: payload,
        callback: (data) => {
          let list = data.map((itm) => ({
            label: itm.first_name + " " + itm.last_name,
            value: itm?.id,
          }));
          setInterviewResourceList(list);
        },
      })
    );
  }, []);

  const changeHandler = () => {};

  const handleSearch = () => {};

  return (
    <>
      <div className="row">
        <div className="">
          <Breadcrumb pageList={pageList} />
        </div>
        <hr className="red my-1" />

        <CSSTransition in timeout={300} classNames="filter" unmountOnExit>
          <form
            onSubmit={handleSearch}
            className="form-content pb-3 px-4 mt-3 pt-2"
          >
            <div className="form-group row mb-1">
              <div className="col-lg-6 col-md-6 col-12">
                <SearchableSelect
                  options={interviewResourceList}
                  type="string"
                  className="p-0"
                  //value={searchCriteria?.resource}
                  onChange={(e) => changeHandler(e, "resource")}
                  label="Resource"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <SearchableSelect
                  options={RESULT_TYPE}
                  type="string"
                  className="p-0"
                  //value={searchCriteria?.result}
                  onChange={(e) => changeHandler(e, "result")}
                  label="Client Name"
                />
              </div>
            </div>
            <div className="form-group row mb-1">
              <div className="col-lg-6 col-md-6 col-12">
                <Input
                  type="date"
                  className="pr-0 d-inline-block"
                  name="interviewFrom"
                  min="2011-01-01"
                  //value={searchCriteria.interviewFrom}
                  onChange={(e) => changeHandler(e, "interview_from")}
                  label="Interview from"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <Input
                  type="date"
                  className="pr-0 d-inline-block"
                  name="interviewTo"
                  max={moment().format("YYYY-MM-DD")}
                  //value={searchCriteria.interviewTo}
                  onChange={(e) => changeHandler(e, "interview_to")}
                  label="To"
                />
              </div>
            </div>
            <div className="d-md-flex justify-content-end mt-2">
              <div className="mt-2">
                {/*<Button*/}
                {/*  text="Search"*/}
                {/*  type="submit"*/}
                {/*  className={searchBtnDisabled ? "btn-disabled" : ""}*/}
                {/*  disabled={searchBtnDisabled}*/}
                {/*  onClick={handleSearch}*/}
                {/*/>*/}
              </div>
            </div>
          </form>
        </CSSTransition>

        <div className="my-5 table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Client</th>
                <th>Date</th>
                <th>Resource</th>
                <th>Pending</th>
                <th>Pass</th>
                <th>Fail</th>
                <th>Skills</th>
                <th>Action</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </>
  );
};

export default InterviewReports;
