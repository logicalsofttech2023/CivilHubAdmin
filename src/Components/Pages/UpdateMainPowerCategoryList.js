import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebarr from "../Sidebar";
import swal from "sweetalert";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

const UpdateMainPowerCategoryList = () => {
  const [name, setname] = useState("");
  const [subjobcategory_image, setjobcetegory_image] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const Navigate = useNavigate();
  let token = secureLocalStorage.getItem("adminidtoken");
  let category_id = secureLocalStorage.getItem("categoryid");

  useEffect(() => {
    getcategorydetails();
  }, []);

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
        setname(res.data.data?.name);
        setjobcetegory_image(res.data.data?.image);
      })
      .catch((error) => {
        toast.error("Failed to fetch category details");
      })
      .finally(() => setFetching(false));
  };

  const editdata = () => {
    swal({
      title: "Machinery Category Updated",
      text: "Machinery Category updated successfully",
      icon: "success",
      buttons: true,
    });
  };

  const editcetagory = (e) => {
    e.preventDefault();
    setLoading(true);
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
        toast.success(res?.data?.msg || "Machinery Category Updated");
        editdata();
        setTimeout(() => Navigate("/serviceCategoryList"), 2000);
      })
      .catch((error) => {
        toast.error("Failed to update category");
        console.error(error);
      })
      .finally(() => setLoading(false));
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
                Machinery Category Update
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
                            <div className="form-group lang_form">
                              <label className="title-color">
                                Machinery Category Name{" "}
                                <span className="text-danger">*</span> (EN)
                              </label>
                              <input
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="Enter Category Name"
                                required
                              />
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="form-group w-100">
                              <center>
                                {subjobcategory_image ? (
                                  <img
                                    className="upload-img-view"
                                    src={
                                      subjobcategory_image instanceof File
                                        ? URL.createObjectURL(
                                            subjobcategory_image
                                          )
                                        : `${process.env.REACT_APP_API_KEY}uploads/admin/${subjobcategory_image}`
                                    }
                                    alt="Uploaded Preview"
                                    style={{
                                      maxHeight: "120px",
                                      objectFit: "contain",
                                    }}
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
                                Machinery Category Logo{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <div className="form-control custom-file text-left">
                                <input
                                  onChange={(e) =>
                                    setjobcetegory_image(e.target.files[0])
                                  }
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

                        <div className="d-flex flex-wrap gap-2 justify-content-end mt-4">
                          <button
                            type="submit"
                            className="btn btn--primary"
                            disabled={loading}
                          >
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

export default UpdateMainPowerCategoryList;
