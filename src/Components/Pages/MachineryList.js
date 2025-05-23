import React, { useEffect, useState } from "react";
import "../sidebar.css";
import Header from "../Header";
import { Link, useNavigate } from "react-router-dom";
import Sidebarr from "../Sidebar";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import swal from "sweetalert";
import Pagination from "react-js-pagination"; // Import the Pagination component
import { ColorRing } from "react-loader-spinner";

const MachineryList = () => {
  const [machineryList, setMachineryList] = useState([]);
  const [count, setCount] = useState();
  const [filterMachineryList, setFilterMachineryList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  let token = secureLocalStorage.getItem("adminidtoken");
  
  

  let BlockCustomer = () => {
    swal({
      title: "Customer Status Changed",
      icon: "success",
    });
  };

  
  

  let unblock = (item) => {
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/user_account_block_unblock`,
        { userID: item },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        BlockCustomer();
        getProductList();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getProductList();
  }, [0]);

  let getProductList = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/get_business_service`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setCount(res?.data?.data.length);
        setMachineryList(res?.data?.data);
        setFilterMachineryList(res?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const result = machineryList.filter(
      (item) =>
        item?.firstName?.toLowerCase().includes(searchTerm) ||
        item?.lastName?.toLowerCase().includes(searchTerm) ||
        item?.email?.toLowerCase().includes(searchTerm) ||
        item?.phone?.toLowerCase().includes(searchTerm)
    );
    setFilterMachineryList(result);
    setActivePage(1);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const renderServiceData = (data, index) => {
  const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
  const user = data.userId;

  return (
    <tr key={index}>
      <td>{adjustedIndex}</td>

      {/* Profile */}
      <td>
        <div
          onClick={() => navigate("/userDetails", { state: { id: user._id } })}
          className="title-color hover-c1 d-flex align-items-center gap-10"
        >
          <img
            src={
              user?.profile_image?.trim()
                ? `${process.env.REACT_APP_API_KEY}uploads/users/${user.profile_image}`
                : "https://6valley.6amtech.com/public/assets/back-end/img/placeholder/user.png"
            }
            className="avatar rounded-circle"
            alt="profile"
            width={40}
          />
          <span>{user?.first_name} {user?.last_name || ""}</span>
        </div>
      </td>

      {/* Contact Info */}
      <td>
        <div className="mb-1">
          <strong>
            <a className="title-color hover-c1" href={`mailto:${user?.email}`}>
              {user?.email}
            </a>
          </strong>
        </div>
        <a className="title-color hover-c1" href={`tel:${user?.phone}`}>
          {user?.phone}
        </a>
      </td>

      {/* Address */}
      <td title={user?.address}>
        {user?.address?.length > 20 ? `${user?.address.slice(0, 20)}...` : user?.address || "N/A"}
      </td>

      {/* User Stats */}
      <td>{user?.experience || "0"} yr</td>
      <td>{user?.total_projects_done || "0"}</td>
      <td>{user?.rating || "0"}</td>
      <td>
        {user?.verify_profile === "true" ? (
          <span className="badge bg-success">Yes</span>
        ) : (
          <span className="badge bg-secondary">No</span>
        )}
      </td>

      {/* Service Fields */}
      <td>{data?.service_title || "N/A"}</td>
      <td>{data?.categoryId?.name || "N/A"}</td>
      <td title={data?.description}>
        {data?.description?.length > 20 ? `${data.description.slice(0, 20)}...` : data?.description || "N/A"}
      </td>
      <td>{data?.qty || "0"}</td>
      <td>₹{data?.price || "0"}</td>
      <td>
        {data?.service_image ? (
          <img
            src={`${process.env.REACT_APP_API_KEY}uploads/users/${data.service_image}`}
            alt="Service"
            width={50}
            className="rounded"
          />
        ) : (
          "No Image"
        )}
      </td>

      {/* Registered At */}
      <td>{user?.createdAt?.slice(0, 10)} {user?.createdAt?.slice(11, 16)}</td>

      {/* Block / Unblock */}
      <td>
        <div onClick={() => unblock(user._id)} className="text-center">
          {user?.block_status === 1 ? (
            <div className="btn btn-primary">Unblock</div>
          ) : (
            <div className="btn btn-danger">Block</div>
          )}
        </div>
      </td>

      {/* View Button */}
      <td>
        <div className="d-flex justify-content-center gap-2">
          <Link
            to="/userDetails"
            state={{ id: user._id }}
            title="View"
            className="btn btn-outline-info btn-sm square-btn"
          >
            <i className="fa fa-eye" aria-hidden="true"></i>
          </Link>
        </div>
      </td>
    </tr>
  );
};


  return (
    <div>
      {/* <Header /> */}
      <div
        className="container row"
        style={{
          paddingLeft: "0px",
          paddingRight: "0px",
          marginLeft: "0px",
        }}
      >
        <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3 mb-5">
            <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
              <img
                width={20}
                src="https://6valley.6amtech.com/public/assets/back-end/img/customer.png"
                alt=""
              />
              Machinery List
              <span className="badge badge-soft-dark radius-50">{count}</span>
            </h2>
          </div>
          <div className="card mb-5">
            <div className="px-3 py-4">
              <div className="row gy-2 align-items-center justify-content-between">
                <div className="col-sm-8 col-md-6 col-lg-4">
                  <form>
                    <div className="input-group input-group-merge input-group-custom">
                      <div className="input-group-prepend">
                        <div className="input-group-text">
                          <i class="fa fa-search" aria-hidden="true"></i>
                        </div>
                      </div>
                      <input
                        onChange={handleFilter}
                        type="search"
                        name="searchValue"
                        className="form-control"
                        placeholder="Search here......"
                        aria-label="Search orders"
                      />
                      <button type="submit" className="btn btn--primary">
                        Search
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="table-responsive datatable-custom">
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
              ) : filterMachineryList.length > 0 ? (
                <table
                  style={{ textAlign: "left" }}
                  className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                >
                  <thead className="thead-light thead-50 text-capitalize">
                    <tr>
                      <th>SL</th>
                      <th style={{ paddingRight: "120px" }}>Profile</th>
                      <th >Contact Info</th>
                      <th>Address</th>
                      <th>Experience</th>
                      <th>Projects</th>
                      <th>Rating</th>
                      <th>Verified</th>
                      <th>Service Title</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Service Image</th>
                      <th>Registered At</th>
                      <th className="text-center">Block / Unblock</th>
                      <th className="text-center">View</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filterMachineryList
                      .slice(
                        (activePage - 1) * itemsPerPage,
                        activePage * itemsPerPage
                      )
                      .map((user, index) => renderServiceData(user, index))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center p-4">
                  <img
                    className="mb-3 w-160"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/empty-state-icon/default.png"
                    alt="Image Description"
                  />
                  <p className="mb-0 order-stats__subtitle">No Data found</p>
                </div>
              )}

              {!loading && filterMachineryList.length > itemsPerPage && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={filterMachineryList.length}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </div>
              )}
            </div>

            <div className="table-responsive mt-4">
              <div className="px-4 d-flex justify-content-lg-end"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MachineryList;
