import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  departmentType,
  getConfigData,
  getConfigDesignationData,
} from "../../redux/action";
import ConfigDesgCheckBox from "../../component/CommonComponent/ConfigDesgCheckBox";

const ConfigAdminDesignation = () => {
  const dispatch = useDispatch();
  const configData = useSelector((state) => state.ConfigReducer);
  const [configDesgAccessData, setConfigDesgAccessData] = useState([]);
  const [load, setLoad] = useState(false);
  const [dataLength, setDataLength] = useState([]);
  const loading = useSelector(
    (state) => state.ConfigDesignationReducer.loading
  );
  const configDesgData = useSelector(
    (state) => state.ConfigDesignationReducer.configDesignationData
  );
  const [configColumnData, setConfigColumnData] = useState([]);

  useEffect(() => {
    if (configDesgData?.length > 0) {
      setLoad(!load);
      setConfigDesgAccessData(configDesgData);
    } else {
      dispatch(
        getConfigDesignationData({
          callback: () => {},
        })
      );
    }
  }, [configDesgData]);

  useEffect(() => {
    dispatch(getConfigData());
    dispatch(departmentType());
  }, []);

  useEffect(() => {
    if (configData) {
      setConfigColumnData(configData?.configColumnData);
      let dArr = [];
      for (var i = 1; i <= configData?.configColumnData?.length; i++) {
        dArr.push(i);
      }
      setDataLength(dArr);
    }
  }, [configData]);

  return (
    <div className="row table-data my-3">
      <div className="col-12">
        <div className="table-wrap">
          {!loading && (
            <table className="table f-14">
              <thead>
                <tr>
                  <th>Dept/Desg</th>
                  {configColumnData?.map((itm, index) => (
                    <th key={index}>
                      <p className="mb-0">{itm.name}</p>
                      {itm.type === "sidebar" && <p className="mb-0">(s)</p>}
                      {itm.type === "button" && <p className="mb-0">(b)</p>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {configDesgAccessData?.length > 0 ? (
                  configDesgAccessData?.map((data, index) => {
                    {/*eslint-disable*/}
                    return (
                      <>
                        {/*eslint-disable*/}
                        <tr key={index} className={"table-active"}>
                          <th colSpan="16">{data?.department_name}</th>
                        </tr>
                        {data?.data.length > 0
                          ? data?.data.map((d, indexx) => {
                              return (
                                <tr key={indexx}>
                                  <td>{d.designation_name}</td>
                                  <td>
                                    <ConfigDesgCheckBox
                                      id={1}
                                      data={d}
                                      load={load}
                                      dataLength={dataLength.filter(
                                        (x) =>
                                          !d?.access_ids
                                            .includes(x)
                                      )}
                                    />
                                  </td>
                                  <td>
                                    <ConfigDesgCheckBox
                                      id={2}
                                      data={d}
                                      load={load}
                                      dataLength={dataLength.filter(
                                        (x) =>
                                          !d?.access_ids
                                            .includes(x)
                                      )}
                                    />
                                  </td>
                                  <td>
                                    <ConfigDesgCheckBox
                                      id={3}
                                      data={d}
                                      load={load}
                                      dataLength={dataLength.filter(
                                        (x) =>
                                          !d?.access_ids
                                            .includes(x)
                                      )}
                                    />
                                  </td>
                                  <td>
                                    <ConfigDesgCheckBox
                                      id={4}
                                      data={d}
                                      load={load}
                                      dataLength={dataLength.filter(
                                        (x) =>
                                          !d?.access_ids
                                            .includes(x)
                                      )}
                                    />
                                  </td>
                                  <td>
                                    <ConfigDesgCheckBox
                                      id={5}
                                      data={d}
                                      load={load}
                                      dataLength={dataLength.filter(
                                        (x) =>
                                          !d?.access_ids
                                            .includes(x)
                                      )}
                                    />
                                  </td>
                                  <td>
                                    <ConfigDesgCheckBox
                                      id={6}
                                      data={d}
                                      load={load}
                                      dataLength={dataLength.filter(
                                        (x) =>
                                          !d?.access_ids
                                            .includes(x)
                                      )}
                                    />
                                  </td>
                                  <td>
                                    <ConfigDesgCheckBox
                                      id={7}
                                      data={d}
                                      load={load}
                                      dataLength={dataLength.filter(
                                        (x) =>
                                          !d?.access_ids
                                            .includes(x)
                                      )}
                                    />
                                  </td>
                                  <td>
                                    <ConfigDesgCheckBox
                                      id={8}
                                      data={d}
                                      load={load}
                                      dataLength={dataLength.filter(
                                        (x) =>
                                          !d?.access_ids
                                            .includes(x)
                                      )}
                                    />
                                  </td>
                                  <td>
                                    <ConfigDesgCheckBox
                                      id={9}
                                      data={d}
                                      load={load}
                                      dataLength={dataLength.filter(
                                        (x) =>
                                          !d?.access_ids
                                            .includes(x)
                                      )}
                                    />
                                  </td>
                                  <td>
                                    <ConfigDesgCheckBox
                                      id={10}
                                      data={d}
                                      load={load}
                                      dataLength={dataLength.filter(
                                        (x) =>
                                          !d?.access_ids
                                            .includes(x)
                                      )}
                                    />
                                  </td>
                                  <td>
                                    <ConfigDesgCheckBox
                                      id={11}
                                      data={d}
                                      load={load}
                                      dataLength={dataLength.filter(
                                        (x) =>
                                          !d?.access_ids
                                            .includes(x)
                                      )}
                                    />
                                  </td>
                                  <td>
                                    <ConfigDesgCheckBox
                                      id={12}
                                      data={d}
                                      load={load}
                                      dataLength={dataLength.filter(
                                        (x) =>
                                          !d?.access_ids
                                            .includes(x)
                                      )}
                                    />
                                  </td>
                                  <td>
                                    <ConfigDesgCheckBox
                                      id={13}
                                      data={d}
                                      load={load}
                                      dataLength={dataLength.filter(
                                        (x) =>
                                          !d?.access_ids
                                            .includes(x)
                                      )}
                                    />
                                  </td>
                                  <td>
                                    <ConfigDesgCheckBox
                                      id={14}
                                      data={d}
                                      load={load}
                                      dataLength={dataLength.filter(
                                        (x) =>
                                          !d?.access_ids
                                            .includes(x)
                                      )}
                                    />
                                  </td>
                                  <td>
                                    <ConfigDesgCheckBox
                                      id={15}
                                      data={d}
                                      load={load}
                                      dataLength={dataLength.filter(
                                        (x) =>
                                          !d?.access_ids
                                            .includes(x)
                                      )}
                                    />
                                  </td>

                                  {/*{d.access_ids.length > 0*/}
                                  {/*  ? d?.access_ids.map((d) => {*/}
                                  {/*      return (*/}
                                  {/*        <td key={index}>*/}
                                  {/*          <th>{d}</th>*/}
                                  {/*        </td>*/}
                                  {/*      );*/}
                                  {/*    })*/}
                                  {/*  : ""}*/}
                                </tr>
                              );
                            })
                          : ""}
                      </>
                    );
                  })
                ) : (
                  <tr>
                    <td className="fw-bolder">No data found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigAdminDesignation;
