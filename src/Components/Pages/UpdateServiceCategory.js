import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebarr from "../Sidebar";
import swal from "sweetalert";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

const UpdateServiceCategory = () => {
  const [name, setname] = useState();
  const [subjobcategory_image, setjobcetegory_image] = useState(null);
  const [categorydata, setcategorydata] = useState();
  const Navigate = useNavigate();
  let token = secureLocalStorage.getItem("adminidtoken");
  let category_id = secureLocalStorage.getItem("categoryid");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getcategorydetails();
  }, [0]);

  let getcategorydetails = () => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/api/service_category_details/${category_id}`,
        options
      )
      .then((res) => {
        setcategorydata(res.data.data);
        setjobcetegory_image(res.data.data?.image);
        setname(res.data.data?.name);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setFetching(false);
      });
  };

  let editdata = () => {
    swal({
      title: "Product Category Update Successfully",
      text: "Product Category inserted successfully",
      icon: "success",
      buttons: true,
    });
  };

  const editcetagory = (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryId", category_id);
    formData.append("name", name);
    formData.append("image", subjobcategory_image);

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/update_service_category`,
        formData,
        options
      )
      .then((res) => {
        toast.success(
          res?.data?.msg || "Product Service Category Update Successfully"
        );
        setTimeout(() => {
          Navigate("/productCategory");
        }, 3000);
        editdata();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Toaster />
      {/* <Header /> */}
      <div
        className="container row"
        style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
      >
        <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3 mb-5">
            <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
              <h2 className="h1 mb-0">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/brand-setup.png"
                  className="mb-1 mr-1"
                  alt
                />
                Product Category Update
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
                      <form onSubmit={editcetagory}>
                        <div className="row">
                          <div className="col-lg-6">
                            <div>
                              <div className="form-group  lang_form">
                                <label className="title-color">
                                  Product Category Name
                                  <span className="text-danger">*</span> (EN)
                                </label>
                                <input
                                  value={name}
                                  onChange={(e) => {
                                    setname(e.target.value);
                                  }}
                                  type="text"
                                  name="name[]"
                                  className="form-control"
                                  placeholder="Enter Category Name"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group  w-100">
                              <center>
                                {subjobcategory_image ? (
                                  <img
                                    className="upload-img-view"
                                    id="viewer"
                                    src={
                                      subjobcategory_image instanceof File
                                        ? URL.createObjectURL(
                                            subjobcategory_image
                                          ) // If it's a new uploaded file
                                        : `${process.env.REACT_APP_API_KEY}uploads/admin/${subjobcategory_image}` // If it's from API
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
                                Product Category Logo
                              </label>
                              <span className="text-info">
                                <span className="text-danger">*</span>
                              </span>
                              <div className="form-control custom-file text-left">
                                <input
                                  onChange={(e) => {
                                    setjobcetegory_image(e.target.files[0]);
                                  }}
                                  type="file"
                                  name="image"
                                  className="custom-file-input"
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
    </div>
  );
};

export default UpdateServiceCategory;
