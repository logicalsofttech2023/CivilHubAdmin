import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "react-js-pagination";
import { ColorRing } from "react-loader-spinner";

const TenderSubCategory = () => {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [serviceCategoryList, setServiceCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const [totalCategories, setTotalCategories] = useState(0);
  const token = secureLocalStorage.getItem("adminidtoken");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryImage, setCategoryImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    setFilteredCategories(categoriesList);
  }, [categoriesList]);

  useEffect(() => {
    fetchCategories();
    getServiceCategoryList();
  }, []);

  const fetchCategories = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/all_tender_sub_cate`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res?.data?.data || [];
        setCategoriesList(data);
        setTotalCategories(data.length);
      })
      .catch((error) => {
        toast.error("Failed to fetch categories list");
      })
      .finally(() => setLoading(false));
  };

  let getServiceCategoryList = () => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/api/all_tender_category`,
        options
      )
      .then((res) => {
        setServiceCategoryList(res.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategoryImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", categoryName);
    formData.append("tendercat_id", selectedCategory);
    if (categoryImage) {
      formData.append("image", categoryImage);
    }
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/add_tender_sub_category`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        toast.success(res?.data?.msg || "Category added successfully");
        swal("Success", "Category added successfully", "success");
        setCategoryName("");
        fetchCategories();
      })
      .catch(() => {
        toast.error("Failed to add category");
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = categoriesList.filter((item) =>
      item.name?.toLowerCase().includes(searchTerm)
    );
    setFilteredCategories(filtered);
    setActivePage(1);
  };

  const handleDeleteCategory = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, this category cannot be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        axios
          .get(
            `${process.env.REACT_APP_API_KEY}admin/api/tender_sub_cate_delete/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then(() => {
            toast.success("Category deleted successfully");
            fetchCategories();
          })
          .catch(() => {
            toast.error("Failed to delete category");
          });
      }
    });
  };

  const toggleCategoryStatus = (id) => {
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/activeDeactive_category`,
        { categoryId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        toast.success(res?.data?.message || "Status updated");
        fetchCategories();
      })
      .catch(() => {
        toast.error("Failed to update status");
      });
  };

  const handleEditCategory = (id) => {
    navigate("/updateTenderSubCategory", {
      state: { categoryId: id },
    });
  };

  const renderCategoryRow = (category, index) => {
    const serial = (activePage - 1) * itemsPerPage + index + 1;
    const isActive = category?.acrtive_status !== 0;

    return (
      <tr key={category._id}>
        <td>{serial}</td>
        <td className="text-center">
          <Link
            // to="/updateBusinessCategory"
            // state={{ categoryId: category._id }}
            className="title-color hover-c1 d-flex align-items-center gap-10"
          >
            {!category?.image ? (
              <img
                src="bussiness-man.png"
                className="avatar rounded-circle"
                alt="default avatar"
                width={40}
              />
            ) : (
              <img
                src={`${process.env.REACT_APP_API_KEY}uploads/admin/${category?.image}`}
                className="avatar rounded-circle"
                alt="category avatar"
                width={40}
                onError={(e) =>
                  (e.target.src =
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAKlBMVEX09PTMzMz39/fi4uLJycno6Ojd3d3t7e3GxsbU1NTx8fHPz8/l5eXZ2dlvAcswAAACO0lEQVR4nO3a23KkIBRAUTziDfH/f3dEo42XpEUr8diz11OqZ1LlDgLaagwAAAAAAAAAAAAAAAAAAAAAAAAAQAO54O5jX5EqL0/LK105XXZJeffxR6Sx12Jso2ZspKyvtWRZnWupkeF42rPGHC0xLgxMV50WJpy9O2IyxJw/TyTXFGM+OCZ1F1QcI87nvjAJPYpjymGFaorjNWpjXDttn8fnkNYYmVsy64/WaI0pokuB1h38baUx0kZXKO3RE01pjFlcb5Y7MVIV2890xrh3MVI1md98qDPm7chUjbXZemVQGrOYM5uDDuPS19r1qq01xv+0msm8CS1rlMbEt5x2PTfEvDahxaBpjTFuqtncOsYtyxq1Mf21WWbrum7XX7j0LfF8imsUx4hUvnBhnY7/x2u+TKJbBr0xu8Rtv7/J5398WMxOi513z4fFVPvfq33VPCDGvebEzriMYzOeaepjxHfTevZdy3wtoD1GfGubavzx25aQEMZGeUzf0n8y1Cz3yi2jPUb8+GdvnLxrCQ2qY75ahprVvv+4mLkl1LxpUR9TZAkPa5THJLUojyl+nvBPihnX5M+IkcRxUR1j0kp0x7jkh87E/C5iiPkDc0xqi+pbgCKZ0Rtz6lUzrTGn6Iq59rqJKIsJi1jj0yfMyDchRstbTZJ4qbyn1RJj4mdM59Tb57Z3ke7qa42dmoGZFqST+nNs7yn7fcQVuT8pT3oH6k980EvaAAAAAAAAAAAAAAAAAAAAAAAAAPC/+gfuih4I4TnKzgAAAABJRU5ErkJggg==")
                }
              />
            )}
          </Link>
        </td>
        <td>{category?.title}</td>
        <td>{category?.tendercat_id?.title || "N/A"}</td>
        <td>{new Date(category?.updatedAt).toLocaleString()}</td>
        <td>
          <label className="switcher">
            <input
              type="checkbox"
              className="switcher_input"
              checked={isActive}
              onChange={() => toggleCategoryStatus(category._id)}
            />
            <span className="switcher_control" />
          </label>
        </td>
        <td>
          <div className="d-flex gap-10 justify-content-center">
            <button
              className="btn btn-outline--primary btn-sm"
              title="Edit"
              onClick={() => handleEditCategory(category._id)}
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              title="Delete"
              onClick={() => handleDeleteCategory(category._id)}
            >
              <i className="fa fa-trash-o" aria-hidden="true" />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <Toaster />
      <div
        className="container row"
        style={{ paddingLeft: "0px", marginLeft: "0px" }}
      >
        <div className="col-lg-3 col-md-4" />
        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3">
            <div className="mb-3">
              <h2 className="h1 mb-0 d-flex gap-10">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/brand-setup.png"
                  alt=""
                />
                Tender Sub Categories
              </h2>
            </div>

            {/* Add Category Form */}
            <div className="card mb-4">
              <div className="card-body">
                <form onSubmit={handleAddCategory}>
                  <div className="row">
                    <div className="col-lg-6">
                      <label className="title-color">
                        Category Name <span className="text-danger">*</span>{" "}
                        (EN)
                      </label>
                      <input
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Enter new category"
                        required
                      />
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
                        onChange={(e) => setSelectedCategory(e.target.value)}
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
                        <label className="form-label">Category Image</label>
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
                                  onClick={() => {
                                    setPreviewImage(null);
                                    // Clear the file input if needed
                                  }}
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
                  <div className="d-flex justify-content-end mt-3">
                    <button
                      type="submit"
                      className="btn btn--primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Adding...
                        </>
                      ) : (
                        "Add Category"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Category List */}
            <div className="card">
              <div className="px-3 py-4">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h5 className="text-capitalize d-flex gap-1">
                      Category List
                      <span className="badge badge-soft-dark radius-50 fz-12">
                        {totalCategories}
                      </span>
                    </h5>
                  </div>
                  <div className="col-md-4">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-search" />
                        </span>
                      </div>
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Search categories..."
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                {loading ? (
                  <div className="d-flex justify-content-center p-5">
                    <ColorRing
                      visible={true}
                      height="80"
                      width="80"
                      color="#e15b64"
                      glassColor="#c0efff"
                    />
                  </div>
                ) : filteredCategories.length > 0 ? (
                  <table className="table table-hover table-borderless table-thead-bordered table-nowrap">
                    <thead className="thead-light">
                      <tr>
                        <th>Sr.No</th>
                        <th>Category Image</th>
                        <th>Category Name</th>
                        <th>Sub Category Name</th>
                        <th>Date/Time</th>
                        <th>Status</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCategories
                        .slice(
                          (activePage - 1) * itemsPerPage,
                          activePage * itemsPerPage
                        )
                        .map(renderCategoryRow)}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center p-4">
                    <img
                      className="mb-3 w-160"
                      src="https://6valley.6amtech.com/public/assets/back-end/img/empty-state-icon/default.png"
                      alt="No Data"
                    />
                    <p>No categories found</p>
                  </div>
                )}
              </div>

              {filteredCategories.length > itemsPerPage && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={filteredCategories.length}
                    onChange={setActivePage}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenderSubCategory;
