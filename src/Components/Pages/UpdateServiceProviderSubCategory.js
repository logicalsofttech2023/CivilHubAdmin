import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

const UpdateServiceProviderSubCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [serviceCategoryList, setServiceCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = secureLocalStorage.getItem("adminidtoken");
  const [categoryImage, setCategoryImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const location = useLocation();
  const categoryId = location.state?.categoryId || "";
  console.log(categoryId);
  

  useEffect(() => {
    fetchCategoryDetails();
    getServiceCategoryList();
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
        `${process.env.REACT_APP_API_KEY}admin/api/service_provider_sub_cat_details/${categoryId}`,
        options
      )
      .then((res) => {
        console.log(res.data.data?.serviceprovidercat_id._id);
        setCategoryName(res.data.data?.title || "");
        setSelectedCategory(res.data.data?.serviceprovidercat_id._id || "");
        setPreviewImage(
          res.data.data?.image
            ? `${process.env.REACT_APP_API_KEY}uploads/admin/${res.data.data.image}`
            : ""
        );
      })
      .catch((error) => {
        console.error("Error fetching category details:", error);
        toast.error("Failed to load category details");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  let getServiceCategoryList = () => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/api/all_provider_service_cat`,
        options
      )
      .then((res) => {
        
        setServiceCategoryList(res.data.data);
      })
      .catch((error) => {
        console.log("error", error);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setCategoryImage(null);
    setPreviewImage("");
    // Clear the file input
    const fileInput = document.getElementById("categoryImageUpload");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    console.log(selectedCategory);
    
    formData.append("serviceprovidersubcatId", categoryId);
    formData.append("serviceprovidercat_id", selectedCategory);
    formData.append("title", categoryName);
    if (categoryImage) {
      formData.append("image", categoryImage);
    }

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/update_service_provider_sub_cat`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        toast.success(res?.data?.msg || "Category Updated Successfully");
        showSuccessMessage();
        setTimeout(() => {
          navigate("/serviceProviderSubCategory");
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
                Update Service Provider Sub Category
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

                          <div className="col-lg-6">
                            <label
                              className="title-color"
                              htmlFor="exampleFormControlSelect1"
                            >
                              Select Category
                              <span className="text-danger">*</span>
                            </label>

                            <select
                              value={selectedCategory}
                              id="exampleFormControlSelect1"
                              name="parent_id"
                              className="form-control"
                              required
                              onChange={(e) =>
                                setSelectedCategory(e.target.value)
                              }
                            >
                              <option value="" selected disabled>
                                Select category
                              </option>

                              {serviceCategoryList?.map((data) => (
                                <option key={data?._id} value={data?._id}>
                                  {data?.title}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group mb-3">
                              <label className="form-label">
                                Category Image
                              </label>
                              <div className="image-upload-container">
                                <div className="image-preview-wrapper mb-2">
                                  {previewImage ? (
                                    <div className="position-relative d-inline-block w-100">
                                      <img
                                        src={previewImage}
                                        alt="Category Preview"
                                        className="upload-img-view img-thumbnail"
                                        style={{
                                          width: "100%",
                                          height: "200px",
                                          objectFit: "cover",
                                          borderRadius: "4px",
                                        }}
                                      />
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
                                        onClick={handleRemoveImage}
                                        style={{ padding: "0.15rem 0.3rem" }}
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ) : (
                                    <div
                                      className="d-flex align-items-center justify-content-center bg-light"
                                      style={{
                                        width: "100%",
                                        height: "200px",
                                        borderRadius: "4px",
                                        border: "1px dashed #ddd",
                                      }}
                                    >
                                      <span className="text-muted">
                                        No image selected
                                      </span>
                                    </div>
                                  )}
                                </div>

                                <div className="input-group">
                                  <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    id="categoryImageUpload"
                                  />
                                  <label
                                    className="input-group-text btn btn-outline-secondary"
                                    htmlFor="categoryImageUpload"
                                    style={{ cursor: "pointer" }}
                                  >
                                    Browse
                                  </label>
                                </div>
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

export default UpdateServiceProviderSubCategory;
