import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebarr from "../Sidebar";
import swal from "sweetalert";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";
const UpdateFreelancerCategory = () => {
  const [name, setname] = useState();
  const [categorydata, setcategorydata] = useState();
  const Navigate = useNavigate();
  let token = secureLocalStorage.getItem("adminidtoken");
  const location = useLocation();
  const { categoryId } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    getcategorydetails();
  }, [0]);

  let getcategorydetails = () => {
    setLoading(true);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/api/admin_category_freelancer_details/${categoryId}`,
        options
      )
      .then((res) => {
        setcategorydata(res.data.data);
        setname(res.data.data?.name);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  let editdata = () => {
    swal({
      title: "Category Update Successfully",
      text: "Category inserted sucessfully",
      icon: "success",
      buttons: true,
    });
  };

  const editcetagory = (e) => {
    e.preventDefault();
    setUpdating(true);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const cetegory = {
      categoryId: categoryId,
      name: name,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/admin_update_category_freelancer`,
        cetegory,
        options
      )
      .then((res) => {
        toast.success(res?.data?.msg || "Category Updated Successfully");
        setTimeout(() => {
          Navigate("/freelancerCategory");
        }, 3000);
        editdata();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Update failed!");
      })
      .finally(() => {
        setUpdating(false);
        setname("");
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
                Category Update
              </h2>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body" style={{ textAlign: "left" }}>
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
                    ) : (
                      <form onSubmit={editcetagory}>
                        <div className="row">
                          <div className="col-lg-6">
                            <div>
                              <div className="form-group  lang_form">
                                <label className="title-color">
                                  Category Name
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
                        </div>
                        <div className="d-flex flex-wrap gap-2 justify-content-end">
                          <button type="submit" className="btn btn--primary">
                            {updating ? "Updating..." : "Update"}
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

export default UpdateFreelancerCategory;
