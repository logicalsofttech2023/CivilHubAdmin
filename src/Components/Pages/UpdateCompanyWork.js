import React, { useEffect, useState } from "react";
import Header from "../Header";
import swal from "sweetalert";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebarr from "../Sidebar";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "react-js-pagination";
import { ColorRing } from "react-loader-spinner";

const UpdateCompanyWork = () => {
  let navigate = useNavigate();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [icon, setIcon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  let token = secureLocalStorage.getItem("adminidtoken");
  const location = useLocation();
  const id = location.state?.id || "";

  let updateData = () => {
    swal({
      title: "Data updated Successfully",
      text: "Data updated sucessfully",
      icon: "success",
      buttons: true,
    });
  };
  const handleUpdateData = (e) => {
    setIsSubmit(true);

    e.preventDefault();
    const formData = {
      title: title,
      description: description,
    };

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/updateCompanyWork?id=${id}`,
        formData,
        options
      )
      .then((res) => {
        toast.success(res?.data?.msg || "data Update Successfully");
        updateData();
        setTimeout(() => {
          navigate("/companyWork");
        }, 2000);
        
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsSubmit(false);
      });
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
        `${process.env.REACT_APP_API_KEY}admin/api/getCompanyWorkById?id=${id}`,
        options
      )
      .then((res) => {
        setTitle(res?.data?.data?.title);
        setDescription(res?.data?.data?.description);
        
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
                Update Company Work
              </h2>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <form onSubmit={handleUpdateData}>
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
                        
                      </div>
                      <div className="d-flex flex-wrap gap-2 justify-content-end">
                        <button type="submit" className="btn btn--primary">
                          {isSubmit ? "Updating..." : "Update"}
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

      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default UpdateCompanyWork;
