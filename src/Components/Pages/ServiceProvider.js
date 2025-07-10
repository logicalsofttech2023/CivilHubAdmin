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
import toast, { Toaster } from "react-hot-toast";

const ServiceProvider = () => {
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

  let handleTopFreelancer = (item, status) => {
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/updateTopFreelancerStatus`,
        { userId: item, status: status },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success(res?.data?.msg || "Status updated");
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
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/all_service_provider`, {
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
  /*******  4b7b98fc-d7c7-4a9c-8e18-e9104b7e29c2  *******/

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleDeleteCategory = (id) => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, this data cannot be recovered!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((confirm) => {
        if (confirm) {
          axios
            .get(
              `${process.env.REACT_APP_API_KEY}admin/api/service_provider_delete/${id}`,
              { headers: { Authorization: `Bearer ${token}` } }
            )
            .then(() => {
              toast.success("data deleted successfully");
              getUsersList();
            })
            .catch(() => {
              toast.error("Failed to delete category");
            });
        }
      });
    };

  const renderUsersData = (customer, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;

    return (
      <tr key={index}>
        <td>{adjustedIndex}</td>

        <td>
          <div
            onClick={() =>
              navigate("/serviceProviderDetails", {
                state: { customerId: customer._id },
              })
            }
            className="title-color hover-c1 d-flex align-items-center gap-10"
          >
            <img
              src={
                customer?.image?.trim()
                  ? `${process.env.REACT_APP_API_KEY}uploads/admin/${customer.image}`
                  : "https://6valley.6amtech.com/public/assets/back-end/img/placeholder/user.png"
              }
              className="avatar rounded-circle"
              alt="profile"
              width={40}
            />
            <span>{customer?.title}</span>
          </div>
        </td>

        <td>{customer?.description} </td>

        <td>{customer?.serviceprovidercat_id?.title} </td>

        <td>{customer?.serviceprovidersubcat_id?.title} </td>

       

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

            <Link
              className="btn btn-outline--primary btn-sm cursor-pointer edit"
              to="/updateServiceProvider"
              state={{ id: customer._id }}
              title="Edit"
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </Link>

            <button
              className="btn btn-outline-danger btn-sm"
              title="Delete"
              onClick={() => handleDeleteCategory(customer._id)}
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
              Service Provider List
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
                <div className="mr-2">
                  <button
                    onClick={() => navigate("/addServiceProvider")}
                    type="button"
                    className="btn btn--primary"
                  >
                    Add Service Provider
                  </button>
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
                      <th>Title</th>
                      <th>Description</th>
                      <th>Category Name</th>
                      <th>Sub Category Name</th>

                      
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

export default ServiceProvider;
