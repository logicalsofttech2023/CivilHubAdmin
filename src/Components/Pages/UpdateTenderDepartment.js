import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

const UpdateTenderDepartment = () => {
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = secureLocalStorage.getItem("adminidtoken");
  const location = useLocation();
  const categoryId = location.state?.categoryId || "";

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  const fetchCategoryDetails = () => {
    setIsLoading(true);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/api/get_department_details/${categoryId}`,
        options
      )
      .then((res) => {
        setCategoryName(res.data.data?.title || "");
        
      })
      .catch((error) => {
        console.error("Error fetching category details:", error);
        toast.error("Failed to load category details");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const showSuccessMessage = () => {
    swal({
      title: "Category Updated Successfully",
      text: "Category updated successfully",
      icon: "success",
      buttons: true,
    });
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    setIsLoading(true);
    const formData = {
      departmentcatId: categoryId,
      title: categoryName,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/update_department_cat`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success(res?.data?.msg || "Category Updated Successfully");
        showSuccessMessage();
        setTimeout(() => {
          navigate("/tenderDepartment");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error updating category:", error);
        toast.error("Update failed");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <Toaster />
      <div
        className="container row"
        style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
      >
        <div className="col-lg-3 col-md-4"></div>
        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3 mb-5">
            <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
              <h2 className="h1 mb-0">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/brand-setup.png"
                  className="mb-1 mr-1"
                  alt="icon"
                />
                Update Work Type Category
              </h2>
            </div>

            {isLoading ? (
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
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body" style={{ textAlign: "left" }}>
                      <form onSubmit={handleUpdateCategory}>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group lang_form">
                              <label className="title-color">
                                Category Name{" "}
                                <span className="text-danger">*</span> (EN)
                              </label>
                              <input
                                value={categoryName}
                                onChange={(e) =>
                                  setCategoryName(e.target.value)
                                }
                                type="text"
                                className="form-control"
                                placeholder="Enter Category Name"
                                required
                              />
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
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTenderDepartment;
