import React, { useEffect, useState } from "react";
import Header from "../Header";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import Sidebarr from "../Sidebar";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import Pagination from "react-js-pagination";
import toast, { Toaster } from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

const FreelancerSubCategory = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  let subcetagoryedit = () => {
    navigate("/updateFreelancerSubCategory");
  };

  const [categoryId, setCategoryId] = useState();

  const [subcetegory_name, setSubCategoryName] = useState();
  const [subcategory_image, setSubCetegoryImage] = useState();
  const [categorylist, setCategoryList] = useState();
  const [subcategorylist, setSubCategoryList] = useState([]);
  const [filteredCategoryList, setFilteredCategoryList] = useState([]);
  const [count, setCount] = useState();
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  let token = secureLocalStorage.getItem("adminidtoken");

  let cetagoryedit = () => {
    navigate("/editsubsubcetagory");
  };

  let addCategoryData = () => {
    swal({
      title: "Subcategory added Successfully",
      text: "Subcategory inserted sucessfully",
      icon: "success",
      buttons: true,
    });
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category_id", categoryId);
    formData.append("sub_cate_name", subcetegory_name);
    formData.append("sub_cat_image", subcategory_image);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/admin_addfreelancer_subcategoy`,
        formData,
        options
      )
      .then((res) => {
        toast.success(res?.data?.msg || "Subcetegory Add Successfully");
        addCategoryData();
        getFreelancerCategoryList();
        getSubCategory();
      })
      .catch((error) => {
        console.log(error);
      });
    setCategoryId("");
    setSubCategoryName("");
    setSubCetegoryImage("");
  };

  useEffect(() => {
    getFreelancerCategoryList();
  }, [0]);
  let getFreelancerCategoryList = () => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/api/admin_all_category_freelancer`,
        options
      )
      .then((res) => {
        setCategoryList(res.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getSubCategory();
  }, [0]);
  let getSubCategory = () => {
    setLoading(true);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/api/admin_all_sub_cate_free`,
        options
      )
      .then((res) => {
        setCount(res?.data?.data?.length);
        setSubCategoryList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  let DeleteSubCategory = (item) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this subcategory!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let deleteSubCategory = () => {
          let data = {
            subcatId: item,
          };

          const options = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          axios
            .post(
              `${process.env.REACT_APP_API_KEY}admin/api/admin_delete_subcate_free`,
              data,
              options
            )
            .then((res) => {
              getSubCategory();
              swal("Poof! Your subcategory  has been deleted!", {
                icon: "success",
              });
            })
            .catch((error) => {
              swal("Poof! Your subcategory  has been not deleted!", {
                icon: "error",
              });
            });
        };
        deleteSubCategory();
      } else {
        swal("Your subcategory is safe!");
      }
    });
  };

  useEffect(() => {
    setFilteredCategoryList(subcategorylist);
  }, [subcategorylist]);

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const result = subcategorylist.filter(
      (item) =>
        item.subcetegory_name.toLowerCase().includes(searchTerm) ||
        item.french_subcategory_name.toLowerCase().includes(searchTerm)
    );
    setFilteredCategoryList(result);
    setActivePage(1);
  };
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const renderSubcategoryData = (data, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr key={index}>
        <td>{adjustedIndex}</td>
        <td className="text-center">
          <Link
            // to="/Customerdetails"
            onClick={() => {
              secureLocalStorage.setItem("customerid", data?._id);
            }}
            className="title-color hover-c1 d-flex align-items-center gap-10"
          >
            {!data?.sub_cat_image ? (
              <img
                src="bussiness-man.png"
                className="avatar rounded-circle"
                alt="default avatar"
                width={40}
              />
            ) : (
              <img
                src={`${process.env.REACT_APP_API_KEY}uploads/admin/${data?.sub_cat_image}`}
                className="avatar rounded-circle"
                alt="category avatar"
                width={40}
              />
            )}
          </Link>
        </td>
        <td>{data?.category_id?.name}</td>
        <td>{data?.sub_cate_name}</td>
        <td>{new Date(data?.updatedAt).toLocaleString()}</td>
        <td>
          <div className="d-flex gap-10 justify-content-center">
            <span
              className="btn btn-outline--primary btn-sm cursor-pointer edit"
              onClick={() => {
                subcetagoryedit(
                  secureLocalStorage.setItem("subcategoryid", data?._id)
                );
              }}
              title="Edit"
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </span>
            <a
              onClick={() => {
                DeleteSubCategory(data?._id);
              }}
              className="btn btn-outline-danger btn-sm cursor-pointer delete"
              title="Delete"
              id={35}
            >
              <i className="fa fa-trash-o" aria-hidden="true" />
            </a>
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div>
      <Toaster />
      {/* <Header /> */}
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
              <h2 className="h1 mb-0 d-flex gap-2">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/brand-setup.png"
                  alt
                />
                Sub Category Setup
              </h2>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <form onSubmit={handleAddCategory}>
                      <input type="hidden" />

                      <div className="row">
                        <div className=" col-lg-12 d-flex gap-3">
                          <div className="w-100">
                            <div className="form-group w-100">
                              <label
                                className="title-color"
                                htmlFor="exampleFormControlSelect1"
                              >
                                Select Category
                                <span className="text-danger">*</span>
                              </label>

                              <select
                                value={categoryId}
                                id="exampleFormControlSelect1"
                                name="parent_id"
                                className="form-control"
                                required
                                onChange={(e) => setCategoryId(e.target.value)}
                              >
                                <option value="" selected disabled>
                                  Select category
                                </option>

                                {categorylist?.map((categorydatalist) => (
                                  <option
                                    key={categorydatalist?._id}
                                    value={categorydatalist?._id}
                                  >
                                    {categorydatalist?.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="form-group  lang_form" id="en-form">
                              <label
                                className="title-color"
                                htmlFor="exampleFormControlInput1"
                              >
                                Sub category name
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                value={subcetegory_name}
                                onChange={(e) => {
                                  setSubCategoryName(e.target.value);
                                }}
                                type="text"
                                name="name[]"
                                className="form-control"
                                placeholder="New Sub Category"
                                required
                              />
                            </div>
                          </div>

                          <div className="form-group  w-100">
                            <center>
                              {subcategory_image ? (
                                <img
                                  className="upload-img-view"
                                  id="viewer"
                                  src={URL.createObjectURL(subcategory_image)}
                                  alt="image"
                                />
                              ) : (
                                <img
                                  className="upload-img-view"
                                  id="viewer"
                                  src="https://6valley.6amtech.com/public/assets/back-end/img/900x400/img1.jpg"
                                  alt="image"
                                />
                              )}
                            </center>
                            <label className="title-color mt-3">
                              Subcategory Logo
                            </label>
                            <span className="text-info">
                              <span className="text-danger">*</span>
                            </span>
                            <div className="form-control custom-file text-left">
                              <input
                                onChange={(e) => {
                                  setSubCetegoryImage(e.target.files[0]);
                                }}
                                type="file"
                                name="image"
                                className="custom-file-input"
                                accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                                required
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
                        {/* <button type="reset" className="btn btn-secondary">
                            Reset
                          </button> */}
                        <button type="submit" className="btn btn--primary">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-20 mb-5" id="cate-table">
              <div className="col-md-12">
                <div className="card">
                  <div className="px-3 py-4">
                    <div className="row align-items-center">
                      <div className="col-sm-4 col-md-6 col-lg-8 mb-2 mb-sm-0">
                        <h5 className="text-capitalize d-flex gap-2">
                          Sub category list
                          <span className="badge badge-soft-dark radius-50 fz-12">
                            {count}
                          </span>
                        </h5>
                      </div>
                      <div className="col-sm-8 col-md-6 col-lg-4">
                        <div className="input-group input-group-merge input-group-custom">
                          <input
                            type="search"
                            name="search"
                            className="form-control"
                            placeholder="Search subcategory here"
                            onChange={handleFilter}
                          />
                          <button type="submit" className="btn btn--primary">
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="table-responsive">
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
                    ) : filteredCategoryList?.length > 0 ? (
                      <table
                        style={{ textAlign: "left" }}
                        className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                      >
                        <thead className="thead-light thead-50 text-capitalize">
                          <tr>
                            <th>Sr.No</th>
                            <th>Image</th>
                            <th>Category Name</th>
                            <th>Subcategory Name</th>
                            <th>Date/Time</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredCategoryList
                            .slice(
                              (activePage - 1) * itemsPerPage,
                              activePage * itemsPerPage
                            )
                            .map((subcategorylist, index) =>
                              renderSubcategoryData(subcategorylist, index)
                            )}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-center p-4">
                        <img
                          className="mb-3 w-160"
                          src="https://6valley.6amtech.com/public/assets/back-end/img/empty-state-icon/default.png"
                          alt="Image Description"
                        />
                        <p className="mb-0 order-stats__subtitle">
                          No Subcategory found
                        </p>
                      </div>
                    )}

                    {!loading && filteredCategoryList.length > itemsPerPage && (
                      <div className="d-flex justify-content-center mt-4">
                        <Pagination
                          activePage={activePage}
                          itemsCountPerPage={itemsPerPage}
                          totalItemsCount={filteredCategoryList.length}
                          pageRangeDisplayed={5}
                          onChange={handlePageChange}
                          itemClass="page-item"
                          linkClass="page-link"
                        />
                      </div>
                    )}
                  </div>

                  <div className="table-responsive mt-4">
                    <div className="d-flex justify-content-lg-end"></div>
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

export default FreelancerSubCategory;
