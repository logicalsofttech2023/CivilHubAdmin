import React, { useEffect, useState } from "react";
import Header from "../Header";
import swal from "sweetalert";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Sidebarr from "../Sidebar";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "react-js-pagination";
import { ColorRing } from "react-loader-spinner";

const UpdateFreelancerBlog = () => {
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [date, setDate] = useState();
  const [othername, setOthername] = useState();
  const [blogImage, setBlogImage] = useState(null);
  const [blogDetails, setBlogDetails] = useState([]);
  let token = secureLocalStorage.getItem("adminidtoken");
  const location = useLocation();
  const { blogId } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const Navigate = useNavigate();

  let editdata = () => {
    swal({
      title: "Blog Update Successfully",
      text: "Blog Update sucessfully",
      icon: "success",
      buttons: true,
    });
  };
  const handleBlogUpdate = (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("blogbussiId", blogId);
    formData.append("title", title);
    formData.append("description", text);
    formData.append("date", date);

    console.log(date);

    formData.append("other_name", othername);
    if (blogImage instanceof File) {
      formData.append("image", blogImage);
    } else {
      formData.append("image", blogImage);
    }
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/bussiness_blog_update`,
        formData,
        options
      )
      .then((res) => {
        toast.success(res?.data?.msg || "Blog Update Successfully");
        setTimeout(() => {
          Navigate("/businessBlog");
        }, 3000);
        editdata();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getbannerlist();
  }, [0]);

  let getbannerlist = () => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/api/bussiness_blog_details/${blogId}`,
        options
      )
      .then((res) => {
        setBlogImage(res.data.data?.image);
        setOthername(res?.data.data?.other_name);
        setTitle(res?.data.data?.title);
        setDate(res?.data?.data?.date); // ✅ No conversion needed
        setText(res.data.data?.description);
        setBlogDetails(res.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => setFetching(false));
  };

  return (
    <div>
      <Toaster />
      <div
        className="container row"
        style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
      >
        <div className="col-lg-3 col-md-4" style={{ paddingLeft: "0px" }}></div>

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
                Blogs Update
              </h2>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body" style={{ textAlign: "left" }}>
                    {fetching ? (
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
                    ) : (
                      <form onSubmit={handleBlogUpdate}>
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
                                    <ReactQuill
                                      value={text}
                                      onChange={setText}
                                    />
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
                                  Other Name
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
                                    src={
                                      blogImage instanceof File
                                        ? URL.createObjectURL(blogImage) // If it's a new uploaded file
                                        : `${process.env.REACT_APP_API_KEY}uploads/admin/${blogImage}` // If it's from API
                                    }
                                    alt="Uploaded Image"
                                  />
                                ) : (
                                  <img
                                    src="bussiness-man.png"
                                    className="upload-img-view"
                                    alt="Default Avatar"
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
                          <button type="submit" className="btn btn--primary">
                            {loading ? "Updating..." : "Update"}
                          </button>
                        </div>
                      </form>
                    )}
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

export default UpdateFreelancerBlog;
