import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { ColorRing } from "react-loader-spinner";

const UpdateFreelancerSubCategory = () => {
  const [subcategory_image, setsubcategory_image] = useState();
  const [french_subcategory_name, setfrench_subcategory_name] = useState();
  const [categorydata, setCategoryData] = useState();
  const [categoryId, setCategoryId] = useState();
  const [categorylist, setCategoryList] = useState();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const Navigate = useNavigate();
  const token = secureLocalStorage.getItem("adminidtoken");
  const subcategory_id = secureLocalStorage.getItem("subcategoryid");

  useEffect(() => {
    Promise.all([getSubCategoryData(), getFreelancerCategoryList()])
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  const getSubCategoryData = () => {
    return axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/api/admin_subcate_details_free/${subcategory_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setCategoryData(res.data.data);
        setCategoryId(res.data.data.category_id._id);
        setfrench_subcategory_name(res.data.data.sub_cate_name);
      });
  };

  const getFreelancerCategoryList = () => {
    return axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/admin_all_category_freelancer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCategoryList(res.data.data);
      });
  };

  const editData = () => {
    swal({
      title: "Subcategory Updated Successfully",
      text: "Subcategory updated successfully",
      icon: "success",
      buttons: true,
    });
  };

  const editSubCetagory = (e) => {
    e.preventDefault();
    setUpdating(true);

    const formData = new FormData();
    formData.append("subcatId", categorydata?._id);
    formData.append("category_id", categoryId);
    formData.append("sub_cate_name", french_subcategory_name);
    if (subcategory_image) {
      formData.append("sub_cat_image", subcategory_image);
    }

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/admin_update_subcategory_free`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setUpdating(false);
        editData();
        setTimeout(() => {
          Navigate("/freelancerSubCategory");
        }, 3000);
      })
      .catch((error) => {
        console.log("error", error);
        setUpdating(false);
      });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="loading"
          wrapperClass="magnifying-glass-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    );
  }

  return (
    <div className="container row" style={{ paddingLeft: 0, paddingRight: 0, marginLeft: 0 }}>
      <div className="col-lg-3 col-md-4">{/* Sidebar (optional) */}</div>

      <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
        <div className="mt-3 mb-5">
          <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
            <h2 className="h1 mb-0">
              <img
                src="https://6valley.6amtech.com/public/assets/back-end/img/brand-setup.png"
                className="mb-1 mr-1"
                alt=""
              />
              Sub Sub Category Update
            </h2>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body" style={{ textAlign: "left" }}>
                  <form onSubmit={editSubCetagory}>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group w-100">
                          <label className="title-color">
                            Select Category <span className="text-danger">*</span>
                          </label>
                          <select
                            value={categoryId}
                            className="form-control"
                            required
                            onChange={(e) => setCategoryId(e.target.value)}
                          >
                            <option value="" disabled>Select category</option>
                            {categorylist?.map((cat) => (
                              <option key={cat?._id} value={cat?._id}>
                                {cat?.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="form-group lang_form">
                          <label className="title-color">
                            Subsubcategory Name (FR) <span className="text-danger">*</span>
                          </label>
                          <input
                            value={french_subcategory_name}
                            onChange={(e) => setfrench_subcategory_name(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder={categorydata?.sub_cate_name}
                          />
                        </div>

                        <label className="title-color">
                          Subsubcategory Logo <span className="text-danger">*</span>
                        </label>
                        <div className="custom-file text-left">
                          <input
                            onChange={(e) => setsubcategory_image(e.target.files[0])}
                            type="file"
                            className="custom-file-input"
                            accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                          />
                          <label className="custom-file-label">Choose File</label>
                        </div>
                      </div>

                      <div className="col-lg-6 mt-4 mt-lg-0 from_part_2">
                        <div className="form-group">
                          <center>
                            {subcategory_image ? (
                              <img
                                className="upload-img-view"
                                src={URL.createObjectURL(subcategory_image)}
                                alt="preview"
                              />
                            ) : (
                              <img
                                className="upload-img-view"
                                src={`${process.env.REACT_APP_API_KEY}uploads/admin/${categorydata?.sub_cat_image}`}
                                alt="existing"
                              />
                            )}
                          </center>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex flex-wrap gap-2 justify-content-end">
                      <button type="submit" className="btn btn--primary" disabled={updating}>
                        {updating ? (
                          <div className="d-flex align-items-center gap-2">
                            <span>Updating...</span>
                            <ColorRing
                              visible={true}
                              height="20"
                              width="20"
                              ariaLabel="updating"
                              wrapperClass="spinner-small"
                              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
                            />
                          </div>
                        ) : (
                          "Update"
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
  );
};

export default UpdateFreelancerSubCategory;
