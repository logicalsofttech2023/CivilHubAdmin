import React, { useEffect, useState } from "react";
import Header from "../Header";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import Sidebarr from "../Sidebar";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "react-js-pagination";
import { ColorRing } from "react-loader-spinner";

const MainPowerSubCategoryList = () => {
  let navigate = useNavigate();
  const [name, setname] = useState();
  const [subjobcategory_image, setjobcetegory_image] = useState(null);
  const [categorylist, setcategorylist] = useState([]);
  const [filteredCategoryList, setFilteredCategoryList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setcount] = useState();
  const [serviceCategoryList, setServiceCategoryList] = useState([]);
  const [serviceCategoryId , setServiceCategoryId] = useState();

  let token = secureLocalStorage.getItem("adminidtoken");
  useEffect(() => {
    setFilteredCategoryList(categorylist);
  }, [categorylist]);
  let addcategorydata = () => {
    swal({
      title: "Main Power Sub Category added Successfully",
      text: "Main Power Sub Category inserted successfully",
      icon: "success",
      buttons: true,
    });
  };
  const categorydatahandle = (e) => {
    setIsLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("power_category_id", serviceCategoryId);
    formData.append("sub_cate_name", name);
    formData.append("mainsub_cat_image", subjobcategory_image);

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/admin_addmain_power_subcategoy
 `,
        formData,
        options
      )
      .then((res) => {
        toast.success(res?.data?.msg || "Main Power Sub Category Add Successfully");
        addcategorydata();
        getbannerlist();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getbannerlist();
    getAllServiceCategoryList();
  }, []);

  let getbannerlist = () => {
    setLoading(true);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/api/admin_all_sub_cate_main_power`,
        options
      )
      .then((res) => {
        console.log(res);
        
        setcount(res?.data?.data?.length);
        setcategorylist(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  let getAllServiceCategoryList = () => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/api/all_main_power_category`,
        options
      )
      .then((res) => {
        setServiceCategoryList(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const result = categorylist.filter(
      (item) =>
        item.name?.toLowerCase().includes(searchTerm) ||
        item.category_frenchName?.toLowerCase().includes(searchTerm)
    );
    setFilteredCategoryList(result);
    setActivePage(1);
  };
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  let cetagoryedit = () => {
    navigate("/updateMainPowerCategory");
  };

  let deletesubcategory = (item) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        let deletebannerimage = () => {
          let bannerdata = {
            categoryId: item,
          };

          const options = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          axios
            .post(
              `${process.env.REACT_APP_API_KEY}admin/api/service_category_delete`,
              bannerdata,
              options
            )
            .then((res) => {
              getbannerlist();
            })
            .catch((error) => {
              console.log(error);
            });
        };
        deletebannerimage();
        swal("Poof! Your Main Power Sub category  has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your Main Power Sub category is safe!");
      }
    });
  };
  const activedeactive = (item) => {
    const Data = {
      categoryId: item,
    };
    let options = {
      hraders: {
        token: token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/activeDeactive_category`,
        Data,
        options
      )
      .then((res) => {
        toast.success(res.data.message);
        getbannerlist();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderCategoryData = (categorydata, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    return (
      <tr key={index}>
        <td>{adjustedIndex}</td>
        <td className="text-center">
          <Link
            // to="/Customerdetails"
            onClick={() => {
              secureLocalStorage.setItem("customerid", categorydata?._id);
            }}
            className="title-color hover-c1 d-flex align-items-center gap-10"
          >
            {!categorydata?.mainsub_cat_image ? (
              <img
                src="bussiness-man.png"
                className="avatar rounded-circle"
                alt="default avatar"
                width={40}
              />
            ) : (
              <img
                src={`${process.env.REACT_APP_API_KEY}uploads/admin/${categorydata?.mainsub_cat_image}`}
                className="avatar rounded-circle"
                alt="category avatar"
                width={40}
              />
            )}
          </Link>
        </td>
        {/* <td>{categorydata?.maincategoryId?.mainname}</td> */}
        <td>{categorydata?.sub_cate_name}</td>
        <td>{categorydata?.power_category_id.name}</td>
        <td>{new Date(categorydata?.updatedAt).toLocaleString()}</td>
        {categorydata?.acrtive_status != 0 ? (
          <td>
            <form className="banner_status_form">
              <input type="hidden" />
              <input type="hidden" name="id" />
              <label className="switcher">
                <input
                  type="checkbox"
                  className="switcher_input"
                  name="status"
                  onChange={() => activedeactive(categorydata?._id)}
                />
                <span className="switcher_control" />
              </label>
            </form>
          </td>
        ) : (
          <td>
            <form className="banner_status_form">
              <input type="hidden" />
              <input type="hidden" name="id" />
              <label className="switcher">
                <input
                  id="coupon_status9"
                  name="status"
                  defaultValue={1}
                  defaultChecked
                  type="checkbox"
                  className="switcher_input"
                  onChange={() => activedeactive(categorydata?._id)}
                />
                <span className="switcher_control" />
              </label>
            </form>
          </td>
        )}
        <td>
          <div className="d-flex gap-10 justify-content-center">
            <span
              className="btn btn-outline--primary btn-sm cursor-pointer edit"
              onClick={() => {
                cetagoryedit(
                  secureLocalStorage.setItem("categoryid", categorydata?._id)
                );
              }}
              title="Edit"
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </span>
            <a
              onClick={() => {
                deletesubcategory(categorydata?._id);
              }}
              className="btn btn-outline-danger btn-sm cursor-pointer delete"
              title="Delete"
              id={35}
            >
              <i
                className="fa fa-trash-o"
                onClick={deletesubcategory}
                aria-hidden="true"
              />
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
              <h2 className="h1 mb-0 d-flex gap-10">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/brand-setup.png"
                  alt
                />
                Main Power Sub Category
              </h2>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <form onSubmit={categorydatahandle}>
                      <div className="row">
                        <div className="col-lg-6">
                          <div>
                            <div className="form-group  lang_form">
                              <label className="title-color">
                                Main Power Sub Category Name
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                value={name}
                                onChange={(e) => {
                                  setname(e.target.value);
                                }}
                                type="text"
                                name="name[]"
                                className="form-control"
                                placeholder="New Category"
                                required
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="form-group lang_form">
                            <label className="title-color">
                              Select Main Power Category{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <select
                              onChange={(e) =>
                                setServiceCategoryId(e.target.value)
                              }
                              className="form-control"
                              value={serviceCategoryId}
                              required
                            >
                              <option value="">
                                Select Main Power Category
                              </option>
                              {serviceCategoryList &&
                                serviceCategoryList.map((item) => (
                                  <option key={item._id} value={item._id}>
                                    {item.name}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group  w-100">
                            <center>
                              {subjobcategory_image ? (
                                <img
                                  className="upload-img-view"
                                  id="viewer"
                                  src={URL.createObjectURL(
                                    subjobcategory_image
                                  )}
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
                              Main Power Sub Category Logo
                            </label>
                            <span className="text-info">
                              <span className="text-danger">*</span>
                            </span>
                            <div className="form-control custom-file text-left">
                              <input
                                onChange={(e) => {
                                  setjobcetegory_image(e.target.files[0]);
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
                        <button type="submit" className="btn btn--primary">
                          {isLoading ? "Loading..." : "Add Category"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-20" id="cate-table">
              <div className="col-md-12">
                <div className="card">
                  <div className="px-3 py-4">
                    <div className="row align-items-center">
                      <div className="col-sm-4 col-md-6 col-lg-8 mb-2 mb-sm-0">
                        <h5 className="text-capitalize d-flex gap-1">
                          Main Power Sub Category list
                          <span className="badge badge-soft-dark radius-50 fz-12">
                            {count}
                          </span>
                        </h5>
                      </div>

                      <div className="col-sm-8 col-md-6 col-lg-4">
                        <form>
                          <div className="input-group input-group-merge input-group-custom">
                            <div className="input-group-prepend">
                              <div className="input-group-text">
                                <i class="fa fa-search" aria-hidden="true"></i>
                              </div>
                            </div>
                            <input
                              type="search"
                              name="searchValue"
                              className="form-control"
                              placeholder="Search here...."
                              aria-label="Search orders"
                              onChange={handleFilter}
                            />
                            <button type="submit" className="btn btn--primary">
                              Search
                            </button>
                          </div>
                        </form>
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
                    ) : filteredCategoryList.length > 0 ? (
                      <table
                        style={{ textAlign: "left" }}
                        className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                      >
                        <thead className="thead-light thead-50 text-capitalize">
                          <tr>
                            <th>Sr.No</th>
                            <th className="text-center">Image</th>
                            {/* <th>Main Category </th> */}
                            <th>Main Power Sub Category Name</th>
                            <th>Main Power Category Name</th>
                            <th>Date/Time</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredCategoryList
                            .slice(
                              (activePage - 1) * itemsPerPage,
                              activePage * itemsPerPage
                            )
                            .map((seller, index) =>
                              renderCategoryData(seller, index)
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
                          No Category found
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

      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default MainPowerSubCategoryList;
