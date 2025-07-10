import React, { useEffect, useState } from "react";
import Header from "../Header";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import Sidebarr from "../Sidebar";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "react-js-pagination";
import { ColorRing } from "react-loader-spinner";

const BusinessBenefit = () => {
  let navigate = useNavigate();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [icon, setIcon] = useState(null);
  const [dataList, setDataList] = useState([]);
  const [dataFilterList, setDataFilterList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [count, setcount] = useState();
  const [isSubmit , setIsSubmit] = useState(false);

  let token = secureLocalStorage.getItem("adminidtoken");

  useEffect(() => {
    setDataFilterList(dataList);
  }, [dataList]);
  let addData = () => {

    swal({
      title: "Data added Successfully",
      text: "Data inserted sucessfully",
      icon: "success",
      buttons: true,
    });
  };
  const handleAddData = (e) => {
    setIsSubmit(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", description);
    formData.append("title", title);
    formData.append("image", icon);

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/add_business_benefit`,
        formData,
        options
      )
      .then((res) => {
        toast.success(res?.data?.msg || "data Add Successfully");
        addData();
        getData();
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {
        setIsSubmit(false);
      })

    setIcon(null);
    setTitle("");
    setDescription("");
  };

  useEffect(() => {
    getData();
  }, [0]);

  let getData = () => {
    setLoading(true);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/api/getAllBusinessBenefits`,
        options
      )
      .then((res) => {
        setcount(res?.data?.data?.length);
        setDataList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const result = dataList.filter(
      (item) =>
        item.name?.toLowerCase().includes(searchTerm) ||
        item.category_frenchName?.toLowerCase().includes(searchTerm)
    );
    setDataFilterList(result);
    setActivePage(1);
  };
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  let editData = (id) => {
    navigate("/updateBusinessBenefit", { state: { id: id } });
  };

  let handleDeleteData = (item) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const deleteIcon = () => {
          const options = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          axios
            .get(
              `${process.env.REACT_APP_API_KEY}admin/api/deleteBusinessBenefit?id=${item}`,
              options
            )
            .then((res) => {
              getData();
              swal("Poof! Your data has been deleted!", {
                icon: "success",
              });
            })
            .catch((error) => {
              console.log(error);
              swal("Something went wrong!", {
                icon: "error",
              });
            });
        };

        deleteIcon();
      } else {
        swal("Your data is safe!");
      }
    });
  };

  const activedeactive = (item) => {
    const Data = {
      categoryId: item,
    };
    let options = {
      hraders: {
        token: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/activeDeactive_category`,
        Data,
        options
      )
      .then((res) => {
        toast.success(res.data.message);
        getData();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const renderData = (data, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr key={index}>
        <td>{adjustedIndex}</td>
        <td className="text-center">
          <Link
            onClick={() => {
              secureLocalStorage.setItem("customerid", data?._id);
            }}
            className="title-color hover-c1 d-flex align-items-center gap-10"
          >
            {!data?.icon ? (
              <img
                src="bussiness-man.png"
                className="avatar rounded-circle"
                alt="default avatar"
                width={40}
              />
            ) : (
              <img
                src={`${process.env.REACT_APP_API_KEY}uploads/admin/${data?.icon}`}
                className="avatar rounded-circle"
                alt="category avatar"
                width={40}
              />
            )}
          </Link>
        </td>
        <td>{data?.title}</td>
        <td>{data?.description}</td>
        <td>{new Date(data?.updatedAt).toLocaleString()}</td>
        {data?.acrtive_status != 0 ? (
          <td>
            <form className="banner_status_form">
              <input type="hidden" />
              <input type="hidden" name="id" />
              <label className="switcher">
                <input
                  type="checkbox"
                  className="switcher_input"
                  name="status"
                  onChange={() => activedeactive(data?._id)}
                />
                <span className="switcher_control" />
              </label>
            </form>
          </td>
        ) : (
          <td>
            <form className="banner_status_form">
              <input type="hidden" />
              <input type="hidden" name="id" />
              <label className="switcher">
                <input
                  id="coupon_status9"
                  name="status"
                  defaultValue={1}
                  defaultChecked
                  type="checkbox"
                  className="switcher_input"
                  onChange={() => activedeactive(data?._id)}
                />
                <span className="switcher_control" />
              </label>
            </form>
          </td>
        )}
        <td>
          <div className="d-flex gap-10 justify-content-center">
            <span
              className="btn btn-outline--primary btn-sm cursor-pointer edit"
              onClick={() => editData(data?._id)}
              title="Edit"
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </span>
            <a
              onClick={() => {
                handleDeleteData(data?._id);
              }}
              className="btn btn-outline-danger btn-sm cursor-pointer delete"
              title="Delete"
              id={35}
            >
              <i
                className="fa fa-trash-o"
                onClick={handleDeleteData}
                aria-hidden="true"
              />
            </a>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div>
      <Toaster />
      <div
        className="container row"
        style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
      >
        <div className="col-lg-3 col-md-4" style={{ paddingLeft: "0px" }}>
          {/* <Sidebarr /> */}
        </div>

        <div
          className="col-lg-9 col-md-8"
          style={{ paddingLeft: "0px", marginTop: "60px" }}
        >
          <div className="mt-3">
            <div className="mb-3">
              <h2 className="h1 mb-0 d-flex gap-10">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/brand-setup.png"
                  alt
                />
                Business Benefit
              </h2>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <form onSubmit={handleAddData}>
                      <div className="row">
                        <div className="col-lg-12">
                          <div>
                            <div className="form-group  lang_form">
                              <label className="title-color">
                                Title
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                value={title}
                                onChange={(e) => {
                                  setTitle(e.target.value);
                                }}
                                type="text"
                                name="name[]"
                                className="form-control"
                                placeholder="New Title"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div>
                            <div className="form-group  lang_form">
                              <label className="title-color">
                                Description
                                <span className="text-danger">*</span>
                              </label>

                              <textarea
                                type="text"
                                className="form-control"
                                placeholder="New Description"
                                value={description}
                                required
                                onChange={(e) => setDescription(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group  w-100">
                            <center>
                              {icon ? (
                                <img
                                  className="upload-img-view"
                                  id="viewer"
                                  src={URL.createObjectURL(icon)}
                                  alt="image"
                                />
                              ) : (
                                <img
                                  className="upload-img-view"
                                  id="viewer"
                                  src="https://6valley.6amtech.com/public/assets/back-end/img/900x400/img1.jpg"
                                  alt="image"
                                />
                              )}
                            </center>
                            <label className="title-color mt-3">Icon</label>
                            <span className="text-info">
                              <span className="text-danger">*</span>
                            </span>
                            <div className="form-control custom-file text-left">
                              <input
                                onChange={(e) => {
                                  setIcon(e.target.files[0]);
                                }}
                                type="file"
                                name="image"
                                className="custom-file-input"
                                accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                                required
                              />

                              <label
                                className="custom-file-label"
                                htmlFor="customFileEg1"
                              >
                                Choose File
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-wrap gap-2 justify-content-end">
                        <button type="submit" disabled={isSubmit} className="btn btn--primary">
                          {isSubmit ? "Adding..." : "Add"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-20" id="cate-table">
              <div className="col-md-12">
                <div className="card">
                  <div className="px-3 py-4">
                    <div className="row align-items-center">
                      <div className="col-sm-4 col-md-6 col-lg-8 mb-2 mb-sm-0">
                        <h5 className="text-capitalize d-flex gap-1">
                          Business Benefit List
                          <span className="badge badge-soft-dark radius-50 fz-12">
                            {count}
                          </span>
                        </h5>
                      </div>

                      <div className="col-sm-8 col-md-6 col-lg-4">
                        <form>
                          <div className="input-group input-group-merge input-group-custom">
                            <div className="input-group-prepend">
                              <div className="input-group-text">
                                <i class="fa fa-search" aria-hidden="true"></i>
                              </div>
                            </div>
                            <input
                              type="search"
                              name="searchValue"
                              className="form-control"
                              placeholder="Search here...."
                              aria-label="Search orders"
                              onChange={handleFilter}
                            />
                            <button type="submit" className="btn btn--primary">
                              Search
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    {loading ? (
                      <div className="d-flex justify-content-center align-items-center p-5">
                        <ColorRing
                          visible={true}
                          height="80"
                          width="80"
                          ariaLabel="magnifying-glass-loading"
                          wrapperStyle={{}}
                          wrapperClass="magnifying-glass-wrapper"
                          glassColor="#c0efff"
                          color="#e15b64"
                        />
                      </div>
                    ) : dataFilterList.length > 0 ? (
                      <table
                        style={{ textAlign: "left" }}
                        className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                      >
                        <thead className="thead-light thead-50 text-capitalize">
                          <tr>
                            <th>Sr.No</th>
                            <th className="text-center">Icon</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Date/Time</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataFilterList
                            .slice(
                              (activePage - 1) * itemsPerPage,
                              activePage * itemsPerPage
                            )
                            .map((seller, index) => renderData(seller, index))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-center p-4">
                        <img
                          className="mb-3 w-160"
                          src="https://6valley.6amtech.com/public/assets/back-end/img/empty-state-icon/default.png"
                          alt="Image Description"
                        />
                        <p className="mb-0 order-stats__subtitle">
                          No Category found
                        </p>
                      </div>
                    )}

                    {!loading && dataFilterList.length > itemsPerPage && (
                      <div className="d-flex justify-content-center mt-4">
                        <Pagination
                          activePage={activePage}
                          itemsCountPerPage={itemsPerPage}
                          totalItemsCount={dataFilterList.length}
                          pageRangeDisplayed={5}
                          onChange={handlePageChange}
                          itemClass="page-item"
                          linkClass="page-link"
                        />
                      </div>
                    )}
                  </div>

                  <div className="table-responsive mt-4">
                    <div className="d-flex justify-content-lg-end"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default BusinessBenefit;