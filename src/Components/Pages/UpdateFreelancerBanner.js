import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebarr from "../Sidebar";
import swal from "sweetalert";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

const UpdateFreelancerBanner = () => {
  const [name, setName] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [categoryData, setCategoryData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const token = secureLocalStorage.getItem("adminidtoken");
  const categoryId = secureLocalStorage.getItem("categoryid");

  useEffect(() => {
    getBannerDetails();
  }, []);

  const getBannerDetails = () => {
    setIsLoading(true);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/api/freelancer_banner_details/${categoryId}`,
        options
      )
      .then((res) => {
        const data = res.data.data;
        setCategoryData(data);
        setBannerImage(data?.image);
        setName(data?.title);
      })
      .catch(() => {
        toast.error("Failed to load banner details");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const showSuccessAlert = () => {
    swal({
      title: "Banner Updated Successfully",
      text: "The freelancer banner has been updated.",
      icon: "success",
      buttons: true,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("bannerId", categoryId);
    formData.append("title", name);
    formData.append("image", bannerImage);

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/update_freelancer_banner`,
        formData,
        options
      )
      .then((res) => {
        toast.success(res?.data?.msg || "Banner updated successfully");
        showSuccessAlert();
        setTimeout(() => {
          navigate("/freelancerBanner");
        }, 2000);
      })
      .catch(() => {
        toast.error("Failed to update banner");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
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
    );
  }

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
                    <form onSubmit={handleUpdate}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">
                            Banner Title <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Banner Title"
                            required
                          />
                        </div>

                        <div className="col-md-6 mb-3 text-center">
                          <label className="form-label">Banner Image</label>
                          <div className="mb-2">
                            {bannerImage ? (
                              <img
                                src={
                                  bannerImage instanceof File
                                    ? URL.createObjectURL(bannerImage)
                                    : `${process.env.REACT_APP_API_KEY}uploads/admin/${bannerImage}`
                                }
                                alt="Preview"
                                className="img-fluid rounded shadow-sm"
                                style={{ maxHeight: "150px" }}
                              />
                            ) : (
                              <img
                                src="/bussiness-man.png"
                                alt="Default"
                                className="img-fluid rounded shadow-sm"
                                style={{ maxHeight: "150px" }}
                              />
                            )}
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            onChange={(e) => setBannerImage(e.target.files[0])}
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                              />
                              Updating...
                            </>
                          ) : (
                            "Update Banner"
                          )}
                        </button>
                      </div>
                    </form>
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

export default UpdateFreelancerBanner;
