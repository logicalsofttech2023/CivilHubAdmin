import React, { useEffect, useState } from "react";
import Header from "../Header";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import Sidebarr from "../Sidebar";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "react-js-pagination";
import { ColorRing } from "react-loader-spinner";
import Editor from "./Editor";

const ServiceList = () => {
  let navigate = useNavigate();
  const [blogsList, setBlogsList] = useState([]);
  const [filterBlogsList, setFilterBlogsList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5;
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(false);

  let token = secureLocalStorage.getItem("adminidtoken");

  useEffect(() => {
    setFilterBlogsList(blogsList);
  }, [blogsList]);

  useEffect(() => {
    getAllBlogs();
  }, [0]);

  let getAllBlogs = () => {
    setLoading(true);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/admin_all_blogs`, options)
      .then((res) => {
        console.log(res);
        setCount(res?.data?.data?.length);
        setBlogsList(res.data.data);
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const result = blogsList.filter(
      (item) =>
        item.name?.toLowerCase().includes(searchTerm) ||
        item.category_frenchName?.toLowerCase().includes(searchTerm)
    );
    setFilterBlogsList(result);
    setActivePage(1);
  };
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const activedeactive = (item) => {
    const Data = {
      categoryId: item,
    };
    let options = {
      headers: {
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
        getAllBlogs();
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("Something went wrong");
      });
  };

  const renderBlogData = (data, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr key={index}>
        <td>{adjustedIndex}</td>
        <td className="text-center">
          <Link
            // to="/Customerdetails"
            onClick={() => {
              secureLocalStorage.setItem("customerid", data?._id);
            }}
            className="title-color hover-c1 d-flex align-items-center gap-10"
          >
            {!data?.image ? (
              <img
                src="bussiness-man.png"
                className="avatar rounded-circle"
                alt="default avatar"
                width={40}
              />
            ) : (
              <img
                src={`${process.env.REACT_APP_API_KEY}uploads/admin/${data?.image}`}
                className="avatar rounded-circle"
                alt="category avatar"
                width={40}
              />
            )}
          </Link>
        </td>
        <td>{data?.title}</td>
        <td>{data?.description.replace(/<\/?[^>]*>?/g, "").slice(0, 20)}</td>
        <td>{data?.other_name}</td>
        <td>{data?.date}</td>
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
            <Link
              to="/blogDetail"
              state={{ blogId: data._id }}
              title="View"
              className="btn btn-outline-info btn-sm square-btn"
            >
              <i className="fa fa-eye" aria-hidden="true"></i>
            </Link>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div>
      <Toaster />
      {/* <Header /> */}
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
                Business Product
              </h2>
            </div>

            <div className="row mt-20" id="cate-table">
              <div className="col-md-12">
                <div className="card">
                  <div className="px-3 py-4">
                    <div className="row align-items-center">
                      <div className="col-sm-4 col-md-6 col-lg-8 mb-2 mb-sm-0">
                        <h5 className="text-capitalize d-flex gap-1">
                          Business Product list
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
                    ) : filterBlogsList.length > 0 ? (
                      <table
                        style={{ textAlign: "left" }}
                        className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                      >
                        <thead className="thead-light thead-50 text-capitalize">
                          <tr>
                            <th>Sr.No</th>
                            <th className="text-center">Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Author Name</th>
                            <th>Date</th>
                            <th>Create Date</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterBlogsList
                            .slice(
                              (activePage - 1) * itemsPerPage,
                              activePage * itemsPerPage
                            )
                            .map((seller, index) =>
                              renderBlogData(seller, index)
                            )}
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
                          No Blogs found
                        </p>
                      </div>
                    )}

                    <div className="d-flex justify-content-center mt-4">
                      {filterBlogsList.length > itemsPerPage && (
                        <Pagination
                          activePage={activePage}
                          itemsCountPerPage={itemsPerPage}
                          totalItemsCount={filterBlogsList.length}
                          pageRangeDisplayed={5}
                          onChange={handlePageChange}
                          itemClass="page-item"
                          linkClass="page-link"
                        />
                      )}
                    </div>
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

export default ServiceList;
