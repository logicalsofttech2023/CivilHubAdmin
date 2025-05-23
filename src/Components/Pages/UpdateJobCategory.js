import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebarr from "../Sidebar";
import swal from "sweetalert";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const UpdateJobCategory = () => {
  const [name, setname] = useState("");
  const [subjobcategory_image, setjobcetegory_image] = useState(null);
  const [categorydata, setcategorydata] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const Navigate = useNavigate();
  let token = secureLocalStorage.getItem("adminidtoken");
  let category_id = secureLocalStorage.getItem("categoryid");

  useEffect(() => {
    getcategorydetails();
  }, []);

  const getcategorydetails = () => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/api/admin_jobcate_details/${category_id}`,
        options
      )
      .then((res) => {
        setcategorydata(res.data.data);
        setjobcetegory_image(res.data.data?.image);
        setname(res.data.data?.name);
      })
      .catch((error) => {
        toast.error("Failed to fetch category details.");
      });
  };

  const editdata = () => {
    swal({
      title: "Category Updated Successfully",
      text: "The job category has been updated.",
      icon: "success",
      buttons: true,
    });
  };

  const editcetagory = (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loader

    const formData = new FormData();
    formData.append("jobcategoryId", category_id);
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
        `${process.env.REACT_APP_API_KEY}admin/api/admin_jobcate_update`,
        formData,
        options
      )
      .then((res) => {
        toast.success(res?.data?.msg || "Category Updated Successfully");
        editdata();
        setTimeout(() => {
          Navigate("/jobcetegory");
        }, 2000);
      })
      .catch((error) => {
        toast.error("Failed to update category.");
      })
      .finally(() => {
        setIsLoading(false); // Hide loader
        setname("");
        setjobcetegory_image(null);
      });
  };

  return (
    <div>
      <Toaster />
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
                  alt="icon"
                />
                Jobcategory Update
              </h2>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <form onSubmit={editcetagory}>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group lang_form">
                            <label className="title-color">
                              Jobcategory Name
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
                                      ? URL.createObjectURL(subjobcategory_image)
                                      : `${process.env.REACT_APP_API_KEY}uploads/admin/${subjobcategory_image}`
                                  }
                                  alt="Uploaded"
                                />
                              ) : (
                                <img
                                  src="bussiness-man.png"
                                  className="upload-img-view"
                                  alt="Default"
                                />
                              )}
                            </center>
                            <label className="title-color mt-3">
                              Jobcategory Logo{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <div className="form-control custom-file text-left">
                              <input
                                onChange={(e) =>
                                  setjobcetegory_image(e.target.files[0])
                                }
                                type="file"
                                className="custom-file-input"
                                accept=".jpg,.png,.jpeg,.gif,.bmp,.tif,.tiff|image/*"
                                
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
                          {isLoading ? "Updating..." : "Update"}
                        </button>
                      </div>
                    </form>
                    {isLoading && (
                      <div className="text-center mt-3">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
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

export default UpdateJobCategory;
