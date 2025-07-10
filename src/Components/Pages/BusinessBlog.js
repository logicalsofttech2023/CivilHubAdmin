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

const BusinessBlog = () => {
  let navigate = useNavigate();
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [date, setDate] = useState();
  const [othername, setOthername] = useState();
  const [blogImage, setBlogImage] = useState(null);
  const [blogsList, setBlogsList] = useState([]);
  const [filterBlogsList, setFilterBlogsList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5;
  const [count, setCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  let token = secureLocalStorage.getItem("adminidtoken");

  useEffect(() => {
    setFilterBlogsList(blogsList);
  }, [blogsList]);

  let addBlogData = () => {
    swal({
      title: "Blog added Successfully",
      text: "Blog inserted sucessfully",
      icon: "success",
      buttons: true,
    });
  };
  const handleAddBlog = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", text);
    formData.append("date", date);
    formData.append("other_name", othername);
    formData.append("image", blogImage);

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/add_bussiness_blog`,
        formData,
        options
      )
      .then((res) => {
        console.log(res);
        toast.success(res?.data?.msg || "Blog Added Successfully");
        addBlogData();
        getAllBlogs();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
      .get(`${process.env.REACT_APP_API_KEY}admin/api/all_bussiness_blog`, options)
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

  const handleBlogEdit = (blogId) => {
    navigate("/updateBusinessBlog", {
      state: {
        blogId: blogId,
      },
    });
  };

  let handleDeleteBlog = (item) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this blog!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let handleDeleteBlogImage = () => {
          let bannerdata = {
            blogId: item,
          };

          const options = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          axios
            .get(
              `${process.env.REACT_APP_API_KEY}admin/api/bussiness_blog_delete/${item}`,
              
              options
            )
            .then((res) => {
              getAllBlogs();
            })
            .catch((error) => {
              console.log("error", error);
              toast.error("Something went wrong");
            });
        };
        handleDeleteBlogImage();
        swal("Poof! Your blog  has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your blog is safe!");
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
            <span
              className="btn btn-outline--primary btn-sm cursor-pointer edit"
              onClick={() => {
                handleBlogEdit(data?._id);
              }}
              title="Edit"
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </span>
            <Link
              onClick={() => {
                handleDeleteBlog(data?._id);
              }}
              className="btn btn-outline-danger btn-sm cursor-pointer delete"
              title="Delete"
              id={35}
            >
              <i
                className="fa fa-trash-o"
                onClick={handleDeleteBlog}
                aria-hidden="true"
              />
            </Link>

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
                Blogs
              </h2>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <form onSubmit={handleAddBlog}>
                      <div className="row">
                        <div className="card-body">
                          <div className="form-group">
                            <div className="row">
                              <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
                                <div className="form-group mb-3">
                                  <label
                                    htmlFor="name"
                                    className="title-color text-capitalize"
                                  >
                                    Title
                                  </label>
                                  <textarea
                                    type="text"
                                    className="form-control"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
                                <div className="form-group mb-3">
                                  <label
                                    htmlFor="name"
                                    className="title-color text-capitalize"
                                  >
                                    Description
                                  </label>
                                  <Editor value={text} onChange={setText} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div>
                            <div className="form-group  lang_form">
                              <label className="title-color">
                                Blogs Date
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                value={date}
                                onChange={(e) => {
                                  setDate(e.target.value);
                                }}
                                type="date"
                                name="name[]"
                                className="form-control"
                                placeholder="Enter Date"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div>
                            <div className="form-group  lang_form">
                              <label className="title-color">
                                Auther Name
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                value={othername}
                                onChange={(e) => {
                                  setOthername(e.target.value);
                                }}
                                type="text"
                                name="name[]"
                                className="form-control"
                                placeholder="Enter Name"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group  w-100">
                            <center>
                              {blogImage ? (
                                <img
                                  className="upload-img-view"
                                  id="viewer"
                                  src={URL.createObjectURL(blogImage)}
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
                            <label className="title-color mt-3">
                              Blogs Logo
                            </label>
                            <span className="text-info">
                              <span className="text-danger">*</span>
                            </span>
                            <div className="form-control custom-file text-left">
                              <input
                                onChange={(e) => {
                                  setBlogImage(e.target.files[0]);
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
                        <button
                          type="submit"
                          className="btn btn--primary"
                          disabled={isLoading}
                        >
                          {isLoading ? "Submitting..." : "Submit"}
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
                          Blogs list
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

export default BusinessBlog;
