import React, { useEffect, useState } from "react";
import "../sidebar.css";
import Header from "../Header";
import { Link, useNavigate } from "react-router-dom";
import Sidebarr from "../Sidebar";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import swal from "sweetalert";
import Pagination from "react-js-pagination"; // Import the Pagination component

const UserList = () => {
  const [usersList, setUsersList] = useState([]);
  const [count, setCount] = useState();

  const [filterUsersList, setFilterUsersList] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

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
        getUsersList();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getUsersList();
  }, [0]);

  let getUsersList = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/all_user_list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setCount(res?.data?.data?.length);
        setUsersList(res.data.data);
        setFilterUsersList(res.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleFilter = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const result = usersList.filter(
      (item) =>
        item?.firstName?.toLowerCase().includes(searchTerm) ||
        item?.lastName?.toLowerCase().includes(searchTerm) ||
        item?.email?.toLowerCase().includes(searchTerm) ||
        item?.phone?.toLowerCase().includes(searchTerm)
    );
    setFilterUsersList(result);
    setActivePage(1);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const renderUsersData = (customer, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;

    return (
      <tr key={index}>
        <td>{adjustedIndex}</td>

        <td>
          <div
            onClick={() =>
              navigate("/userDetails", { state: { customerId: customer._id } })
            }
            className="title-color hover-c1 d-flex align-items-center gap-10"
          >
            <img
              src={
                customer?.profile_image?.trim()
                  ? customer.profile_image
                  : "https://6valley.6amtech.com/public/assets/back-end/img/placeholder/user.png"
              }
              className="avatar rounded-circle"
              alt="profile"
              width={40}
            />
            <span>
              {customer?.first_name} {customer?.last_name || ""}
            </span>
          </div>
        </td>

        <td>
          <div className="mb-1">
            <strong>
              <a
                className="title-color hover-c1"
                href={`mailto:${customer?.email}`}
              >
                {customer?.email?.length > 15
                  ? `${customer?.email.slice(0, 15)}...`
                  : customer?.email}
              </a>
            </strong>
          </div>
          <a className="title-color hover-c1" href={`tel:${customer?.phone}`}>
            {customer?.phone}
          </a>
        </td>

        <td title={customer?.address}>
          {customer?.address
            ? customer.address.length > 20
              ? `${customer.address.slice(0, 20)}...`
              : customer.address
            : "N/A"}
        </td>
        <td>{customer?.account_type || "N/A"}</td>
        <td>{customer?.experience || "0"} yr</td>
        <td>{customer?.total_projects_done || "0"}</td>
        <td>{customer?.rating || "0"}</td>
        <td>
          {customer?.verify_profile === "true" ? (
            <span className="badge bg-success">Yes</span>
          ) : (
            <span className="badge bg-secondary">No</span>
          )}
        </td>
        <td>
          {customer?.createdAt?.slice(0, 10)}{" "}
          {customer?.createdAt?.slice(11, 16)}
        </td>

        <td>
          <div onClick={() => unblock(customer._id)} className="text-center">
            {customer?.block_status === 1 ? (
              <div className="btn btn-primary">Unblock</div>
            ) : (
              <div className="btn btn-danger">Block</div>
            )}
          </div>
        </td>

        <td>
          <div className="d-flex justify-content-center gap-2">
            <Link
              to="/userDetails"
              // onClick={() => {}}
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
              Users List
              <span className="badge badge-soft-dark radius-50">{count}</span>
            </h2>
          </div>
          <div className="card mb-5">
            <div className="px-3 py-4">
              <div className="row gy-2 align-items-center">
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
              {filterUsersList.length > 0 ? (
                <table
                  style={{ textAlign: "left" }}
                  className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                >
                  <thead className="thead-light thead-50 text-capitalize">
                    <tr>
                      <th>SL</th>
                      <th>Profile</th>
                      <th>Contact Info</th>
                      <th>Address</th>
                      <th>Account Type</th>
                      <th>Experience</th>
                      <th>Projects</th>
                      <th>Rating</th>
                      <th>Verified</th>
                      <th>Registered At</th>
                      <th className="text-center">Block / Unblock</th>
                      <th className="text-center">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterUsersList
                      .slice(
                        (activePage - 1) * itemsPerPage,
                        activePage * itemsPerPage
                      )
                      .map((user, index) => renderUsersData(user, index))}
                  </tbody>
                </table>
              ) : (
                <div class="text-center p-4">
                  <img
                    class="mb-3 w-160"
                    src="https://6valley.6amtech.com/public/assets/back-end/img/empty-state-icon/default.png"
                    alt="Image Description"
                  />
                  <p class="mb-0 order-stats__subtitle">No Data found</p>
                </div>
              )}
              <div className="d-flex justify-content-center mt-4">
                {filterUsersList.length > itemsPerPage && (
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={filterUsersList.length}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                )}
              </div>
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

export default UserList;
