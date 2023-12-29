import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import {
  Breadcrumb,
  Button,
  DeletePopup,
  Input,
  ToggleSwitch,
} from "../../component/CommonComponent";
import {
  deleteCompanyDocument,
  getCompanyDocument,
  publishCompanyDocument,
  toggleCompanyDocument,
} from "../../redux/action";
import WarningImg from "../../assets/images/warning.png";
import ConfirmPopup from "../../component/CommonComponent/ConfirmPopup";

const pageList = [
  {
    label: "Documents",
  },
];

const Document = () => {
  const [docList, setDocumentList] = useState([]);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [isPublishOpen, setPublishOpen] = useState(false);
  const [publishData, setPublishData] = useState({});
  const [search, setSearch] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.CompanyDocument.data);

  useEffect(() => {
    dispatch(getCompanyDocument());
  }, []);
  useEffect(() => {
    if (data) {
      setDocumentList(data);
    }
    return () => {
      setDocumentList([]);
    };
  }, [data]);

  const handleSearch = (e) => {
    e.preventDefault();
    const includeColumns = ["name"];
    const lowercasedValue = search.toLowerCase().trim();
    if (lowercasedValue === "") setDocumentList(data);
    else {
      const tmpData = [...docList];
      const filteredData = tmpData.filter((node) => {
        return Object.keys(node).some((key) =>
          includeColumns.includes(key)
            ? node[key].toString().toLowerCase().includes(lowercasedValue)
            : false
        );
      });
      setDocumentList(filteredData);
    }
  };

  const handleAddDocumentRedirection = async () => {
    history.push({ pathname: "/document/add-edit-document" });
  };

  const handleEditRedirection = (propData) => {
    history.push({
      pathname: "/document/add-edit-document",
      state: {
        propData,
      },
    });
  };

  const handleDelete = () => {
    setDeleteOpen(false);
    dispatch(
      deleteCompanyDocument({
        form: deleteID,
        callback: () => {
          setDeleteOpen(false);
          dispatch(getCompanyDocument());
        },
      })
    );
  };

  const handleDeletePopup = (id) => {
    setDeleteID(id);
    setDeleteOpen(true);
  };

  const handleToggle = (data) => {
    setPublishData(data);
    if (data.published) {
      let payload = {
        id: data.id,
        published: 0,
      };
      dispatch(
        toggleCompanyDocument({
          form: payload,
          callback: () => {
            setPublishData({});
            dispatch(getCompanyDocument());
          },
        })
      );
    } else {
      setPublishData(data);
      setPublishOpen(true);
    }
  };

  const handleWithoutEmailSubmit = () => {
    let payload = {
      id: publishData.id,
      published: 1,
    };
    dispatch(
      toggleCompanyDocument({
        form: payload,
        callback: () => {
          setPublishData({});
          dispatch(getCompanyDocument());
          setPublishOpen(false);
        },
      })
    );
  };

  const handleWithEmailSubmit = () => {
    let payload = {
      document: publishData.fileName,
      name: publishData.name,
      mimeType: publishData.mimeType,
    };
    dispatch(
      toggleCompanyDocument({
        form: {
          id: publishData.id,
          published: 1,
        },
        callback: () => {
          dispatch(
            publishCompanyDocument({
              form: payload,
              callback: () => {
                dispatch(getCompanyDocument());
              },
            })
          );
          setPublishData({});
          setPublishOpen(false);
        },
      })
    );
  };

  const handleView = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="holiday">
      <div className="row pb-0">
        <div className="">
          <Breadcrumb
            pageList={pageList}
            isButton={true}
            buttonText="Add Document"
            buttonClassName="breadcrumb-button"
            onButtonClick={handleAddDocumentRedirection}
          />
        </div>
      </div>
      <hr className="red my-1" />
      <form onSubmit={handleSearch}>
        <div className="row mt-3 search-section">
          <div className="col-md-3 col-lg-3 col-7">
            <div className="form-group row my-2">
              <Input
                type="text"
                name="search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                label="Document name"
              />
            </div>
          </div>
          <div className="col-md-2 col-lg-2 col-2">
            <Button
              text="Search"
              type="submit"
              className="search-btn"
              onClick={handleSearch}
            />
          </div>
        </div>
      </form>
      <div className="row mt-4">
        <div className="col-12">
          <div className="table-wrap">
            <table className="table f-14">
              <thead>
                <tr className="text-secondary">
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Uploaded on</th>
                  <th scope="col">Published</th>
                  <th scope="col">Comment</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {docList ? (
                  docList.map((data, index) => (
                    <tr key={index} className={index % 2 ? "" : "table-active"}>
                      <td>{index + 1}</td>
                      <td>{data.name}</td>
                      <td>{moment(data.createdAt).format("ll")}</td>
                      <td>
                        <ToggleSwitch
                          checked={data.published}
                          // onClick={() => handlePublishPopup(data)}
                          onClick={() => handleToggle(data)}
                        />
                      </td>
                      <td className="text-wrap">
                        {data.comment ? data.comment : "-"}{" "}
                      </td>
                      <td>
                        <i
                          className="fa fa-edit f-18 cursor-pointer mx-2"
                          onClick={() => handleEditRedirection(data)}
                        />
                        <i
                          className="fa fa-trash-o f-18 cursor-pointer mx-2"
                          onClick={() => handleDeletePopup(data.id)}
                        />
                        <i
                          className="fa fa-eye f-18 cursor-pointer mx-2"
                          onClick={() => handleView(data.document)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No data found.</td>
                  </tr>
                )}
              </tbody>
            </table>
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
      {isPublishOpen && false && (
        <div
          className={`modal fade ${
            isPublishOpen ? "show d-block bg-blur" : "d-none"
          }`}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header text-white bg-red border-bottom-0">
                <h5 className="modal-title">Confirm</h5>
                <i
                  className="fa fa-close cursor-pointer"
                  onClick={() => setPublishOpen(false)}
                />
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-1 align-self-center">
                    <img src={WarningImg} alt="WarningImg" />
                  </div>
                  <div className="col-11">
                    Are you sure you want to publish the document? <br />
                    Publishing the document will send an email to all the
                    employees with the document attached.
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setPublishOpen(false)}
                >
                  NO
                </button>
                <Button
                  text="YES"
                  // onClick={() => handlePublishConfirmation()}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {isPublishOpen && (
        <ConfirmPopup
          isConfirmPopup={isPublishOpen}
          setConfirmPopup={setPublishOpen}
          handleWithEmailSubmit={handleWithEmailSubmit}
          handleWithoutEmailSubmit={handleWithoutEmailSubmit}
          question="Are you sure you want to publish the document and notify everyone?"
        />
      )}
    </div>
  );
};

export default Document;
