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

const TenderList = () => {
  const [tenderList, setTenderList] = useState([]);
  const [count, setCount] = useState();
  const [filterTenderList, setFilterTenderList] = useState([]);
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
      .get(
        `${process.env.REACT_APP_API_KEY}admin/api/getAllTendorListInAdmin`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setCount(res?.data?.data.length);
        setTenderList(res?.data?.data);
        setFilterTenderList(res?.data?.data);
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
    const result = tenderList.filter(
      (item) =>
        item?.firstName?.toLowerCase().includes(searchTerm) ||
        item?.lastName?.toLowerCase().includes(searchTerm) ||
        item?.email?.toLowerCase().includes(searchTerm) ||
        item?.phone?.toLowerCase().includes(searchTerm)
    );
    setFilterTenderList(result);
    setActivePage(1);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const renderTenderInfo = (tender, index) => {
    const dateFormat = (dateStr) =>
      dateStr ? new Date(dateStr).toLocaleString() : "N/A";

    return (
      <tr key={tender._id}>
        <td>{index + 1}</td>
        <td>
          {tender.title?.slice(0, 20)}
          {tender.title?.length > 20 ? "..." : ""}
        </td>
        <td>
          {tender.work_description?.slice(0, 20)}
          {tender.work_description?.length > 20 ? "..." : ""}
        </td>
        <td>
          {tender.pre_qualification?.slice(0, 20)}
          {tender.pre_qualification?.length > 20 ? "..." : ""}
        </td>

        <td>{tender.contract_type}</td>
        <td>₹{tender?.tendor_value?.toLocaleString()}</td>
        <td>{tender.location}</td>
        <td>{tender.pincode}</td>
        <td>{tender.bid_validity} days</td>
        <td>{tender.period_of_work} months</td>
        <td>{tender.product_category}</td>
        <td>{tender.sub_category}</td>
        <td>{tender.organisation_chain}</td>
        <td>{tender.tendor_reference_no}</td>
        <td>{tender.tendor_id}</td>
        <td>{tender.tendor_type}</td>
        <td>{tender.tendor_category}</td>
        <td>
          <img
            src={`${process.env.REACT_APP_API_KEY}uploads/admin/${tender.featured_image}`}
            alt="Featured"
            width={50}
            className="rounded"
          />
        </td>
        <td>{dateFormat(tender.published_date)}</td>
        <td>{dateFormat(tender.bid_submission_end_date)}</td>
        <td>
          <a
            href={`${process.env.REACT_APP_API_KEY}uploads/admin/${tender.nit_document?.[0]?.nit_doc_file}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            NIT Doc
          </a>
        </td>
        <td>
          <a
            href={`${process.env.REACT_APP_API_KEY}uploads/admin/${tender.work_item_document?.[0]?.work_item_doc_file}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Work Item Doc
          </a>
        </td>
        <td>
          <a
            href={`${process.env.REACT_APP_API_KEY}uploads/admin/${tender.pre_bid_meeting_document?.[0]?.pre_bid_doc_file}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pre-Bid Doc
          </a>
        </td>
        <td>
          <a
            href={`${process.env.REACT_APP_API_KEY}uploads/admin/${tender.corrigendum_list?.[0]?.corrigendum_doc_file}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Corrigendum
          </a>
        </td>
        <td>{dateFormat(tender.createdAt)}</td>
        <td>
          <div className="d-flex justify-content-center gap-2">
            <Link
              to="/tenderDetails"
              state={{ tenderId: tender._id }}
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
              Tender List
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
                    onClick={() => navigate("/addTendor")}
                    type="button"
                    className="btn btn--primary"
                  >
                    Add Tender
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
              ) : filterTenderList.length > 0 ? (
                <table
                  style={{ textAlign: "left" }}
                  className="table table-hover table-borderless table-thead-bordered table-nowrap table-align-middle card-table w-100"
                >
                  <thead className="thead-light thead-50 text-capitalize">
                    <tr>
                      <th>SL</th>
                      <th>Title</th>
                      <th>Work Description</th>
                      <th>Pre-Qualification</th>
                      <th>Contract Type</th>
                      <th>Tender Value</th>
                      <th>Location</th>
                      <th>Pincode</th>
                      <th>Bid Validity</th>
                      <th>Period (Months)</th>
                      <th>Product Category</th>
                      <th>Sub Category</th>
                      <th>Organisation Chain</th>
                      <th>Reference No</th>
                      <th>Tender ID</th>
                      <th>Tender Type</th>
                      <th>Tender Category</th>
                      <th>Featured Image</th>
                      <th>Published Date</th>
                      <th>Submission Deadline</th>
                      <th>NIT Document</th>
                      <th>Work Item</th>
                      <th>Pre-Bid</th>
                      <th>Corrigendum</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filterTenderList
                      .slice(
                        (activePage - 1) * itemsPerPage,
                        activePage * itemsPerPage
                      )
                      .map((user, index) => renderTenderInfo(user, index))}
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

              {!loading && filterTenderList.length > itemsPerPage && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={filterTenderList.length}
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

export default TenderList;
