import React, { useEffect, useState } from "react";
import "../sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import swal from "sweetalert";
import Pagination from "react-js-pagination";
import { ColorRing } from "react-loader-spinner";

const JobList = () => {
  const [usersList, setUsersList] = useState([]);
  const [count, setCount] = useState();
  const [filterUsersList, setFilterUsersList] = useState([]);
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
        getUsersList();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getUsersList();
  }, []);

  let getUsersList = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/all_job_list`, {
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

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const renderUsersData = (job, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;

    return (
      <tr key={index}>
        <td>{adjustedIndex}</td>

        <td>{job?.first_name + " " + job?.last_name || "N/A"}</td>

        <td>{job?.job_title || "N/A"}</td>

        <td>{job?.job_type || "N/A"}</td>

        <td>{job?.work_location_type || "N/A"}</td>

        <td title={job?.location}>
          {job?.location?.length > 20
            ? `${job.location.slice(0, 20)}...`
            : job.location || "N/A"}
        </td>

        <td>
          ₹{job?.min_salary || "0"} - ₹{job?.mxn_salary || "0"}
        </td>

        <td>{job?.education || "N/A"}</td>

        <td>{job?.english || "N/A"}</td>

        <td>{job?.experience || "0"} yr</td>

        <td>
          {job?.skills?.length
            ? job.skills.slice(0, 2).join(", ") +
              (job.skills.length > 2 ? "..." : "")
            : "N/A"}
        </td>

        <td>{job?.category_name || "N/A"}</td>

        <td className="text-center">{job?.total_proposal || "0"}</td>

        <td className="text-center">
          {job?.favorite_status === "1" ? (
            <span className="badge bg-success">Yes</span>
          ) : (
            <span className="badge bg-secondary">No</span>
          )}
        </td>

        <td className="text-center">
          <div className="d-flex justify-content-center gap-2">
            <Link
              to="/jobDetail"
              state={{ jobId: job._id }}
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
              Job List
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
                      <th>SL</th>
                      <th>Full Name</th>
                      <th>Job Title</th>
                      <th>Job Type</th>
                      <th>Location Type</th>
                      <th>Location</th>
                      <th>Salary (Min - Max)</th>
                      <th>Education</th>
                      <th>English Level</th>
                      <th>Experience (yrs)</th>
                      <th>Skills</th>
                      <th>Category</th>
                      <th className="text-center">Proposals</th>
                      <th className="text-center">Favorite</th>
                      <th className="text-center">View Details</th>
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
                  <p className="mb-0 order-stats__subtitle">No Data found</p>
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
            <div className="table-responsive mt-4">
              <div className="px-4 d-flex justify-content-lg-end"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobList;
