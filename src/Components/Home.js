import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./sidebar.css";
import { Link } from "react-router-dom";
import Sidebarr from "./Sidebar";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Home = () => {
  const [most, setmost] = useState();
  const [topcustomerdetails, settopcustomerdetails] = useState();
  const [mostpopular, setmostpopular] = useState();
  const [topsellingstore, settopsellingstore] = useState();
  const [topsellingprod, settopsellingprod] = useState();
  const [mostpopproducts, setmostpopproducts] = useState();
  const [dashboarddata, setdashboarddata] = useState();
  const [earndata, setearndata] = useState();
  
  const [amount, setamount] = useState();
  useEffect(() => {
    getmost();
  }, [0]);
  let getmost = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/most_rated_products`)
      .then((res) => {
        setmost(res.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    topcustomer();
  }, [0]);
  let topcustomer = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/topCustomer_list`)
      .then((res) => {
        settopcustomerdetails(res.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    mostpopularr();
  }, [0]);
  let mostpopularr = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/mostPopular_storelist`)
      .then((res) => {
        setmostpopular(res.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    topsellings();
  }, [0]);
  let topsellings = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/topSelling_stores`)
      .then((res) => {
        settopsellingstore(res.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    topsellingproduct();
  }, [0]);
  let topsellingproduct = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/topSelling_products`)
      .then((res) => {
        settopsellingprod(res.data.data);
      })
      .catch((error) => {});
  };


  useEffect(() => {
    mostpopproduct();
  }, [0]);
  let mostpopproduct = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/mostPopular_products`)
      .then((res) => {
        setmostpopproducts(res.data.data);
      })
      .catch((error) => {});
  };



  useEffect(() => {
    Dashboard();
  }, [0]);
  let Dashboard = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/dashboardData`)
      .then((res) => {
        setdashboarddata(res.data.data);
      })
      .catch((error) => {});
  };

  let adminidd = secureLocalStorage.getItem("adminid")
  useEffect(()=>{
    adminearning()
  },[0])
 const adminearning = ()=>{
  const data = {
    adminId:adminidd
  }

  axios.post(`${process.env.REACT_APP_API_KEY}admin/api/adminWallet_details`,data).then((res)=>{
    setearndata(res.data.data)
    
  }).catch((error)=>{

  })
 }

 const paymentrequest = (e) => {
  e.preventDefault();
  const data = {
    adminId: adminidd,
    amount: amount,
  };
  axios
    .post(`${process.env.REACT_APP_API_KEY}admin/api/withdrawRequest`, data)
    .then((res) => {
      toast.success(res.data.message);
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Invalid Data Entered by you.");
      }
    });
};

  return (
    <div>
      {/* <Header /> */}
      <Toaster/>
      <div
        className="container row"
        style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
      >
        <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3 mb-5">
            <div className="page-header pb-0 border-0 mb-3 mt-3 ">
              <div className="flex-between row align-items-center mx-1">
                <div>
                  <h2 className="page-header-title">Dashboard</h2>
                  <div>Hello {secureLocalStorage.getItem("adminemail")}</div>
                </div>
              </div>
            </div>
            <div className="row g-2" id="order_stats">
              <div className="col-sm-6 col-lg-3">
                <div className="business-analytics">
                  <h5 className="business-analytics__subtitle">Total Sale</h5>
                  <h2 className="business-analytics__title">${dashboarddata?.totalSales}</h2>
                  <img
                    src="https://6valley.6amtech.com/public/assets/back-end/img/total-sale.png"
                    className="business-analytics__img"
                    alt
                  />
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="business-analytics">
                  <h5 className="business-analytics__subtitle">Total Stores</h5>
                  <h2 className="business-analytics__title">{dashboarddata?.stores}</h2>
                  <img
                    src="https://6valley.6amtech.com/public/assets/back-end/img/total-stores.png"
                    className="business-analytics__img"
                    alt
                  />
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="business-analytics">
                  <h5 className="business-analytics__subtitle">
                    Total Products
                  </h5>
                  <h2 className="business-analytics__title">{dashboarddata?.products}</h2>
                  <img
                    src="https://6valley.6amtech.com/public/assets/back-end/img/total-product.png"
                    className="business-analytics__img"
                    alt
                  />
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <Link to="/customerlist">
                  <div className="business-analytics">
                    <h5 className="business-analytics__subtitle">
                      Total Customers
                    </h5>
                    <h2 className="business-analytics__title">{dashboarddata?.users}</h2>
                    <img
                      src="https://6valley.6amtech.com/public/assets/back-end/img/total-customer.png"
                      className="business-analytics__img"
                      alt
                    />
                  </div>
                </Link>
              </div>

              {/* <div className="col-sm-6  col-lg-3">
                <Link to="/overviewsale">
                  <div className="business-analytics">
                    <h5 className="business-analytics__subtitle">
                      Sales Overview
                    </h5>
                    <h2 className="business-analytics__title">0</h2>
                    <img
                      src="./sign.png"
                      className="business-analytics__img"
                      alt
                    />
                  </div>
                </Link>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="business-analytics">
                  <h5 className="business-analytics__subtitle">
                    Current sales{" "}
                  </h5>
                  <h2 className="business-analytics__title">0</h2>
                  <img
                    src="./graph.png"
                    className="business-analytics__img"
                    alt
                  />
                </div>
              </div> */}
              {/* <div className="col-sm-6 col-lg-3">
                <div className="business-analytics">
                  <h5 className="business-analytics__subtitle">
                    Today’s sales
                  </h5>
                  <h2 className="business-analytics__title">0</h2>
                  <img
                    src="./acquisition.png"
                    className="business-analytics__img"
                    alt
                  />
                </div>
              </div> */}

              {/* <hr /> */}

              <div className="col-sm-6 col-lg-3 ">
                <Link className="order-stats order-stats_pending" to="/panding">
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}
                  >
                    <img
                      width={20}
                      src="https://6valley.6amtech.com/public/assets/back-end/img/pending.png"
                      alt
                    />
                    <h6 className="order-stats__subtitle">Pending</h6>
                  </div>
                  <span className="order-stats__title">{dashboarddata?.pending}</span>
                </Link>
              </div>
              <div className="col-sm-6 col-lg-3">
                <Link
                  className="order-stats order-stats_confirmed"
                  to="/confrimproducts"
                >
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}
                  >
                    <img
                      width={20}
                      src="https://6valley.6amtech.com/public/assets/back-end/img/confirmed.png"
                      alt
                    />
                    <h6 className="order-stats__subtitle">Confirmed</h6>
                  </div>
                  <span className="order-stats__title">{dashboarddata?.confirm}</span>
                </Link>
              </div>
              <div className="col-sm-6 col-lg-3">
                <Link
                  className="order-stats order-stats_packaging"
                  to="/packaging"
                >
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}
                  >
                    <img
                      width={20}
                      src="https://6valley.6amtech.com/public/assets/back-end/img/packaging.png"
                      alt
                    />
                    <h6 className="order-stats__subtitle">Packaging</h6>
                  </div>
                  <span className="order-stats__title">{dashboarddata?.packing}</span>
                </Link>
              </div>
              <div className="col-sm-6 col-lg-3">
                <Link
                  className="order-stats order-stats_out-for-delivery"
                  to="/outfordelivery"
                >
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}
                  >
                    <img
                      width={20}
                      src="https://6valley.6amtech.com/public/assets/back-end/img/out-of-delivery.png"
                      alt
                    />
                    <h6 className="order-stats__subtitle">Shipped</h6>
                  </div>
                  <span className="order-stats__title">{dashboarddata?.shipped}</span>
                </Link>
              </div>
              <div className="col-sm-6 col-lg-3">
                <Link
                  className="order-stats order-stats_delivered cursor-pointer"
                  to="/delivered"
                >
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}
                  >
                    <img
                      width={20}
                      src="https://6valley.6amtech.com/public/assets/back-end/img/delivered.png"
                      alt
                    />
                    <h6 className="order-stats__subtitle">Delivered</h6>
                  </div>
                  <span className="order-stats__title">{dashboarddata?.delivered}</span>
                </Link>
              </div>
              <div className="col-sm-6 col-lg-3">
                <Link
                  className="order-stats order-stats_canceled cursor-pointer"
                  to="/canceled"
                >
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}
                  >
                    <img
                      width={20}
                      src="https://6valley.6amtech.com/public/assets/back-end/img/canceled.png"
                      alt
                    />
                    <h6 className="order-stats__subtitle">Canceled</h6>
                  </div>
                  <span className="order-stats__title h3">{dashboarddata?.cancel}</span>
                </Link>
              </div>
              <div className="col-sm-6 col-lg-3">
                <Link
                  className="order-stats order-stats_returned cursor-pointer"
                  to="/returned"
                >
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}
                  >
                    <img
                      width={20}
                      src="https://6valley.6amtech.com/public/assets/back-end/img/returned.png"
                      alt
                    />
                    <h6 className="order-stats__subtitle">Returned</h6>
                  </div>
                  <span className="order-stats__title h3">{dashboarddata?.return}</span>
                </Link>
              </div>
              <div className="col-sm-6 col-lg-3">
                <Link
                  className="order-stats order-stats_failed cursor-pointer"
                  to="/failedtodelivery"
                >
                  <div
                    className="order-stats__content"
                    style={{ textAlign: "left" }}
                  >
                    <img
                      width={20}
                      src="https://6valley.6amtech.com/public/assets/back-end/img/failed-to-deliver.png"
                      alt
                    />
                    <h6 className="order-stats__subtitle">
                    Not Delivered
                    </h6>
                  </div>
                  <span className="order-stats__title h3">{dashboarddata?.not_delivered}</span>
                </Link>
              </div>
            </div>

           
          </div>
        </div>
      </div>
      <div
              className="modal fade"
              id="balance-modal"
              tabIndex={-1}
              role="dialog"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content" style={{ textAlign: "left" }}>
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Withdraw Request
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <form onSubmit={paymentrequest}>
                    <div className="modal-body">
                      <input
                        type="hidden"
                        name="_token"
                        defaultValue="ogOCpmdAJJ38pWdY4o8txAvCPH58PO03n5rkZpRx"
                      />{" "}
                      {/* <div className>
                        <select
                          className="form-control"
                          id="withdraw_method"
                          name="withdraw_method"
                          required
                        >
                          <option value={1} selected>
                            VISA Card
                          </option>
                          <option value={2}>bkash</option>
                          <option value={3}>Bank</option>
                        </select>
                      </div> */}
                      <div className id="method-filed__div"></div>
                      <div className="mt-1">
                        <label
                          htmlFor="recipient-name"
                          className="col-form-label fz-16"
                        >
                          Amount : {earndata?.withdrawable_amount}
                        </label>
                        <input
                          required
                          value={amount}
                          onChange={(e) => {
                            setamount(e.target.value);
                          }}
                          type="number"
                          name="amount"
                          step=".01"
                          placeholder={earndata?.withdrawable_amount}
                          className="form-control"
                          id
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn--primary">
                        Request
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
    </div>
  );
};

export default Home;
