import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebarr from "../Sidebar";
import swal from "sweetalert";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

const UpdateBusinessBanner = () => {
  const [name, setname] = useState();
  const [subjobcategory_image, setjobcetegory_image] = useState(null);
  const [categorydata, setcategorydata] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const Navigate = useNavigate();
  let token = secureLocalStorage.getItem("adminidtoken");
  let category_id = secureLocalStorage.getItem("categoryid");

  useEffect(() => {
    getcategorydetails();
  }, []);

  let getcategorydetails = () => {
    setIsLoading(true);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/api/business_banner_details/${category_id}`,
        options
      )
      .then((res) => {
        setcategorydata(res.data.data);
        setjobcetegory_image(res.data.data?.image);
        setname(res.data.data?.title);
      })
      .catch((error) => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  let editdata = () => {
    swal({
      title: "Banner Update Successfully",
      text: "Banner inserted sucessfully",
      icon: "success",
      buttons: true,
    });
  };

  const editcetagory = (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const formData = new FormData();
    formData.append("bannerId", category_id);
    formData.append("title", name);
    formData.append("image", subjobcategory_image);

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/update_business_banner`,
        formData,
        options
      )
      .then((res) => {
        toast.success(res?.data?.msg || "Banner Update Successfully");
        setTimeout(() => {
          Navigate("/businessBanner");
        }, 3000);
        editdata();
      })
      .catch((error) => {})
      .finally(() => {
        setIsUpdating(false);
      });
    setname("");
    setjobcetegory_image(null);
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
                Banner Update
              </h2>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body" style={{ textAlign: "left" }}>
                    {isLoading ? (
                      <div className="text-center py-4">
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
                              <div className="form-group lang_form">
                                <label className="title-color">
                                  Banner Name
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
                            <div className="form-group w-100">
                              <center>
                                {subjobcategory_image ? (
                                  <img
                                    className="upload-img-view"
                                    id="viewer"
                                    src={
                                      subjobcategory_image instanceof File
                                        ? URL.createObjectURL(
                                            subjobcategory_image
                                          )
                                        : `${process.env.REACT_APP_API_KEY}uploads/admin/${subjobcategory_image}`
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
                                Banner Logo
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
                          <button
                            type="submit"
                            className="btn btn--primary"
                            disabled={isUpdating}
                          >
                            {isUpdating ? (
                              <>
                                <span
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Updating...
                              </>
                            ) : (
                              "Update"
                            )}
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

export default UpdateBusinessBanner;
