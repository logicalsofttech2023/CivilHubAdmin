import React, { useEffect, useState } from "react";
import Header from "../Header";
import { Link, useNavigate } from "react-router-dom";
import Sidebarr from "../Sidebar";
import swal from "sweetalert";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { ColorRing } from "react-loader-spinner";
import Pagination from "react-js-pagination";

const Notification = () => {
  let navigate = useNavigate();
  const [usersList, setUsersList] = useState([]);
  const [filterUsersList, setFilterUsersList] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  let token = secureLocalStorage.getItem("adminidtoken");
  const [selectedUsers, setSelectedUsers] = useState([]);
  console.log(selectedUsers.length);
  
  const [accountTypeFilter, setAccountTypeFilter] = useState("");

  useEffect(() => {
    getUsersList();
  }, [0]);

  let getUsersList = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/all_user_list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        const allUsers = res?.data?.data || [];

        setCount(allUsers.length);
        setUsersList(allUsers);
        setFilterUsersList(allUsers);
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

  const handleAccountTypeFilter = (event) => {
  const selectedType = event.target.value;
  setAccountTypeFilter(selectedType);

  let filteredList = [...usersList];

  // Filter by account type if selected
  if (selectedType) {
    filteredList = filteredList.filter(
      (item) => item?.account_type === selectedType
    );
  }

  setFilterUsersList(filteredList);
  setActivePage(1);
};


  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const renderUsersData = (customer, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;
    const handleCheckboxChange = (e) => {
      const userId = customer._id;
      if (e.target.checked) {
        setSelectedUsers([...selectedUsers, userId]);
      } else {
        setSelectedUsers(selectedUsers.filter((id) => id !== userId));
      }
    };
    return (
      <tr key={index}>
        <td>
          <input
            type="checkbox"
            checked={selectedUsers.includes(customer._id)}
            onChange={handleCheckboxChange}
          />
        </td>
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
                  ? `${process.env.REACT_APP_API_KEY}uploads/admin/${customer.profile_image}`
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
          <div className="d-flex justify-content-center gap-2">
            <Link
              to="/userDetails"
              state={{ userId: customer._id }}
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
        style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
      >
        <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3 mb-5">
            <h2 className="h1 mb-0 text-capitalize d-flex align-items-center gap-2">
              <img
                width={20}
                src="https://6valley.6amtech.com/public/assets/back-end/img/push_notification.png"
                alt
              />
              Send notification
            </h2>
          </div>
          <div className="row gx-2 gx-lg-3">
            <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
              <div className="card">
                <div className="card-body">
                  <form
                    action="https://6valley.6amtech.com/admin/notification/store"
                    method="post"
                    style={{ textAlign: "left" }}
                    encType="multipart/form-data"
                  >
                    <input
                      type="hidden"
                      name="_token"
                      defaultValue="M5Ms1Z4GEx6hqRPEuULXw4EVAXN9PGreUwLBXESa"
                    />
                    <div className="row g-3">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label
                            className="title-color text-capitalize"
                            htmlFor="exampleFormControlInput1"
                          >
                            Title{" "}
                          </label>
                          <input
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder="New notification"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label
                            className="title-color text-capitalize"
                            htmlFor="exampleFormControlInput1"
                          >
                            Description{" "}
                          </label>
                          <textarea
                            name="description"
                            className="form-control"
                            required
                            defaultValue={""}
                          />
                        </div>
                      </div>
                     
                    </div>
                    <div className="d-flex justify-content-end gap-3">
                      <button type="reset" className="btn btn-secondary">
                        Reset{" "}
                      </button>
                      <button type="submit" className="btn btn--primary">
                        Send Notification{" "}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-lg-12 mb-3 mb-lg-2">
              <div className="card">
                <div className="px-3 py-4">
                  <div className="row align-items-center">
                    <div className="col-sm-4 col-md-4 col-lg-4 mb-2 mb-sm-0">
                      <h5 className="mb-0 text-capitalize d-flex align-items-center gap-2">
                        Push notification table
                        <span className="badge badge-soft-dark radius-50 fz-12 ml-1">
                          {count}
                        </span>
                      </h5>
                    </div>

                    <div
                      className="col-sm-4 col-md-3 col-lg-4"
                      
                    >
                      <select
                        className="form-select"
                        aria-label="User type filter"
                        style={{
                          border: "1px solid #ced4da",
                          borderRadius: "4px",
                          padding: "8px 12px",
                          fontSize: "14px",
                          color: "#495057",
                          backgroundColor: "#fff",
                          width: "100%",
                          height: "38px",
                          cursor: "pointer",
                          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                          transition:
                            "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
                          appearance: "none",
                          backgroundImage:
                            'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 10px center",
                          backgroundSize: "12px",
                        }}
                        onChange={handleAccountTypeFilter}
                      >
                        <option value="">All User Types</option>
                        <option value="Freelancer">Freelancer</option>
                        <option value="Company">Company</option>
                        <option value="Business">Business</option>
                        <option value="Individual">Individual</option>
                      </select>
                    </div>

                    <div className="col-sm-4 col-md-4 col-lg-4">
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
                      </div>
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
                  ) : filterUsersList.length > 0 ? (
                    <table
                      style={{ textAlign: "left" }}
                      className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                    >
                      <thead className="thead-light thead-50 text-capitalize">
                        <tr>
                          <th>
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedUsers(
                                    filterUsersList.map((user) => user._id)
                                  );
                                } else {
                                  setSelectedUsers([]);
                                }
                              }}
                              checked={
                                selectedUsers.length ===
                                  filterUsersList.length &&
                                filterUsersList.length > 0
                              }
                            />
                          </th>
                          <th>SL</th>
                          <th style={{ paddingRight: "100px" }}>Profile</th>
                          <th>Contact Info</th>
                          <th>Address</th>
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
                    <div className="text-center p-4">
                      <img
                        className="mb-3 w-160"
                        src="https://6valley.6amtech.com/public/assets/back-end/img/empty-state-icon/default.png"
                        alt="Image Description"
                      />
                      <p className="mb-0 order-stats__subtitle">
                        No Data found
                      </p>
                    </div>
                  )}

                  {!loading && filterUsersList.length > itemsPerPage && (
                    <div className="d-flex justify-content-center mt-4">
                      <Pagination
                        activePage={activePage}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={filterUsersList.length}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
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
      </div>
    </div>
  );
};

export default Notification;
