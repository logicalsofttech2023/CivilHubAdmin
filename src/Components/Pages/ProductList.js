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

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [count, setCount] = useState();
  const [filterProductList, setFilterProductList] = useState([]);
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
      .get(`${process.env.REACT_APP_API_KEY}admin/api/get_business_product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setCount(res?.data?.data.length);
        setProductList(res?.data?.data);
        setFilterProductList(res?.data?.data);
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
    const result = productList.filter(
      (item) =>
        item?.firstName?.toLowerCase().includes(searchTerm) ||
        item?.lastName?.toLowerCase().includes(searchTerm) ||
        item?.email?.toLowerCase().includes(searchTerm) ||
        item?.phone?.toLowerCase().includes(searchTerm)
    );
    setFilterProductList(result);
    setActivePage(1);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const renderProductData = (data, index) => {
    const adjustedIndex = (activePage - 1) * itemsPerPage + index + 1;

    return (
      <tr key={index}>
        <td>{adjustedIndex}</td>

        <td>
          <div className="title-color hover-c1 d-flex align-items-center gap-10">
            <img
              src={
                data?.userId?.profile_image?.trim()
                  ? `${process.env.REACT_APP_API_KEY}uploads/users/${data.userId.profile_image}`
                  : "https://6valley.6amtech.com/public/assets/back-end/img/placeholder/user.png"
              }
              className="avatar rounded-circle"
              alt="profile"
              width={40}
            />
            <span>
              {data?.userId?.first_name} {data?.userId?.last_name || ""}
            </span>
          </div>
        </td>

        <td>
          <div className="mb-1">
            <strong>{data?.product_title}</strong>
          </div>
          <div>{data?.categoryId?.name}</div>
        </td>

        <td title={data?.description}>
          {data?.description
            ? data.description.length > 20
              ? `${data.description.slice(0, 20)}...`
              : data.description
            : "N/A"}
        </td>

        <td>{data?.qty}</td>
        <td>${data?.price}</td>

        <td>
          <img
            src={
              data?.product_image?.trim()
                ? `${process.env.REACT_APP_API_KEY}uploads/users/${data.product_image}`
                : "https://6valley.6amtech.com/public/assets/back-end/img/placeholder/product.png"
            }
            className="avatar"
            alt="product"
            width={40}
          />
        </td>

        <td>
          {data?.userId?.block_status === 1 ? (
            <span className="badge bg-danger">Blocked</span>
          ) : (
            <span className="badge bg-success">Active</span>
          )}
        </td>

        <td>
          {data?.createdAt?.slice(0, 10)} {data?.createdAt?.slice(11, 16)}
        </td>

        <td>
          <div className="d-flex justify-content-center gap-2">
            <Link
              to={`/productDetails/${data._id}`}
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
              Product List
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
              ) : filterProductList.length > 0 ? (
                <table
                  style={{ textAlign: "left" }}
                  className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                >
                  <thead className="thead-light thead-50 text-capitalize">
                    <tr>
                      <th>SL</th>
                      <th style={{ paddingRight: "130px"}}>Seller</th>
                      <th>Product & Category</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Product Image</th>
                      <th>Status</th>
                      <th>Created At</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterProductList
                      .slice(
                        (activePage - 1) * itemsPerPage,
                        activePage * itemsPerPage
                      )
                      .map((product, index) =>
                        renderProductData(product, index)
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
                  <p className="mb-0 order-stats__subtitle">No Data found</p>
                </div>
              )}

              {!loading && filterProductList.length > itemsPerPage && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={filterProductList.length}
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

export default ProductList;
