import React, { useEffect, useState } from "react";
import Header from "../Header";
import { Link, useLocation } from "react-router-dom";
import Sidebarr from "./../Sidebar";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { ColorRing } from "react-loader-spinner";

const TenderDetails = () => {
  const location = useLocation();
  const { tenderId } = location?.state;
  const [loading, setLoading] = useState(true);
  let token = secureLocalStorage.getItem("adminidtoken");
  const [tenderData, setTenderData] = useState(null);

  const fetchTenderDetails = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(
        `${process.env.REACT_APP_API_KEY}admin/api/getTendorDetailById`,
        {
          params: { id: tenderId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Tender Details:", response.data);
      setTenderData(response.data.data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenderDetails();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ fontSize: "20px" }}>
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
      </div>
    );
  }

  if (!tenderData) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ fontSize: "20px", color: "red" }}>
          No tender data found
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return dateString;
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
            <div className="d-print-none pb-2">
              <div className="row align-items-center">
                <div className="col-sm mb-2 mb-sm-0">
                  <div className="mb-3">
                    <h2 className="h1 mb-0 text-capitalize d-flex gap-2">
                      <img
                        width={20}
                        src="https://6valley.6amtech.com/public/assets/back-end/img/customer.png"
                        alt
                      />
                      Tender details
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="row"
              id="printableArea"
              style={{
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              }}
            >
              <div className="col-lg-12 mb-3 mb-lg-0">
                <div
                  className="card"
                  style={{
                    border: "none",
                    borderRadius: "10px",
                    boxShadow: "0 0 15px rgba(0,0,0,0.05)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#f8f9fa",
                      minHeight: "100vh",
                      padding: "30px",
                    }}
                  >
                    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                      
                      
                      {/* Header Section */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderBottom: "2px solid #e0e6ed",
                          paddingBottom: "20px",
                          marginBottom: "30px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "15px",
                          }}
                        >
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              backgroundColor: "#4e73df",
                              background:
                                "linear-gradient(135deg, #4e73df 0%, #224abe 100%)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: "50%",
                              color: "white",
                              fontSize: "18px",
                              fontWeight: "bold",
                              boxShadow: "0 3px 5px rgba(0,0,0,0.1)",
                            }}
                          >
                            T
                          </div>
                          <h1
                            style={{
                              fontSize: "15px",
                              fontWeight: "700",
                              color: "#2d3748",
                              margin: 0,
                            }}
                          >
                            {tenderData.title}
                          </h1>
                        </div>
                        <div
                          style={{
                            backgroundColor: "#e1e9ff",
                            padding: "8px 20px",
                            borderRadius: "20px",
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#2c5282",
                            border: "1px solid #c3dafe",
                          }}
                        >
                          Ref: {tenderData.tendor_reference_no}
                        </div>
                      </div>

      {/* Basic Information Section */}
      <div
        style={{
          marginBottom: "40px",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "25px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#4e73df",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        > 
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          > 
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#4e73df"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            /> 
            <path
              d="M12 8V12L15 15"
              stroke="#4e73df"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            /> 
          </svg>
          Basic Information
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {[
            {
              label: "Tender Title",
              value: tenderData.title || "Not specified",
              icon: "📌",
            },
            {
              label: "Tender Reference No",
              value: tenderData.tendor_reference_no || "Not specified",
              icon: "🔖",
            },
            {
              label: "Tender ID",
              value: tenderData.tendor_id || "Not specified",
              icon: "🆔",
            },
            {
              label: "Tender Value",
              value: tenderData.tendor_value ? `₹${(tenderData.tendor_value / 100000).toFixed(2)} Lakhs` : "Not specified",
              icon: "💰",
            },
            {
              label: "Location",
              value: `${tenderData.location || "Not specified"} - ${tenderData.pincode || ""}`,
              icon: "📍",
            },
            {
              label: "Category",
              value: `${tenderData.product_category || "Not specified"} / ${tenderData.sub_category || "Not specified"}`,
              icon: "🏷️",
            },
            {
              label: "Published Date",
              value: formatDate(tenderData.published_date),
              icon: "📅",
            },
            {
              label: "Bid Opening Date",
              value: formatDate(tenderData.bid_opening_date),
              icon: "📅",
            },
            {
              label: "Closing Date",
              value: formatDate(tenderData.closeing_date),
              icon: "⏰",
            },
            {
              label: "Tender Type",
              value: tenderData.tendor_type || "Not specified",
              icon: "📋",
            },
            {
              label: "Contract Type",
              value: tenderData.contract_type || "Not specified",
              icon: "📝",
            },
            {
              label: "Organisation",
              value: tenderData.organisation_chain || "Not specified",
              icon: "🏛️",
            },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: "18px" }}>{item.icon}</span>
              <div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#718096",
                    marginBottom: "5px",
                    fontWeight: "500",
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#2d3748",
                    margin: 0,
                  }}
                >
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Work Description Section */}
      <div
        style={{
          marginBottom: "40px",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "25px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#4e73df",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
              stroke="#4e73df"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 2V8H20"
              stroke="#4e73df"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 13H8"
              stroke="#4e73df"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 17H8"
              stroke="#4e73df"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 9H9H8"
              stroke="#4e73df"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Work Description
        </h2>
        <div
          style={{
            backgroundColor: "#f8fafc",
            padding: "20px",
            borderRadius: "6px",
            lineHeight: "1.7",
            color: "#4a5568",
            borderLeft: "4px solid #4e73df",
          }}
        >
          {tenderData.work_description || "No description provided"}
        </div>
      </div>

      {/* Pre-Qualification & Remarks Section */}
      <div
        style={{
          marginBottom: "40px",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "25px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#4e73df",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#4e73df"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13"
              stroke="#4e73df"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 17H12.01"
              stroke="#4e73df"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Additional Information
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
            gap: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "20px",
              borderRadius: "6px",
              lineHeight: "1.7",
              color: "#4a5568",
              borderLeft: "4px solid #4e73df",
            }}
          >
            <h3 style={{ marginTop: 0, color: "#4e73df" }}>Pre-Qualification Requirements</h3>
            <p>{tenderData.pre_qualification || "No pre-qualification requirements specified"}</p>
          </div>
          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "20px",
              borderRadius: "6px",
              lineHeight: "1.7",
              color: "#4a5568",
              borderLeft: "4px solid #4e73df",
            }}
          >
            <h3 style={{ marginTop: 0, color: "#4e73df" }}>Remarks</h3>
            <p>{tenderData.remarks || "No remarks provided"}</p>
          </div>
        </div>
      </div>

      {/* Key Dates Section */}
      <div
        style={{
          marginBottom: "40px",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "25px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#4e73df",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
              stroke="#4e73df"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Key Dates
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {[
            {
              label: "Document Start Date",
              value: formatDate(tenderData.document_start_date),
              icon: "📄",
            },
            {
              label: "Document End Date",
              value: formatDate(tenderData.document_end_date),
              icon: "📑",
            },
            {
              label: "Bid Submission Start",
              value: formatDate(tenderData.bid_submission_start_date),
              icon: "⏱️",
            },
            {
              label: "Bid Submission End",
              value: formatDate(tenderData.bid_submission_end_date),
              icon: "🕒",
            },
            {
              label: "Pre-Bid Meeting",
              value: formatDate(tenderData.pre_bid_meeting_date),
              details: tenderData.pre_bid_meeting_place,
              icon: "👥",
            },
            {
              label: "Clarification Start",
              value: formatDate(tenderData.clarification_start_date),
              icon: "❓",
            },
            {
              label: "Clarification End",
              value: formatDate(tenderData.clarification_end_date),
              icon: "❗",
            },
            {
              label: "Bid Validity",
              value: tenderData.bid_validity ? `${tenderData.bid_validity} days` : "Not specified",
              icon: "🛡️",
            },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#f8fafc",
                padding: "18px",
                borderRadius: "8px",
                borderLeft: "3px solid #4e73df",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontSize: "18px" }}>{item.icon}</span>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#718096",
                    margin: 0,
                    fontWeight: "500",
                  }}
                >
                  {item.label}
                </p>
              </div>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#2d3748",
                  margin: "5px 0 0 28px",
                }}
              >
                {item.value}
              </p>
              {item.details && (
                <p
                  style={{
                    fontSize: "13px",
                    color: "#718096",
                    margin: "5px 0 0 28px",
                    fontStyle: "italic",
                  }}
                >
                  {item.details}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Financial Details Section */}
      <div
        style={{
          marginBottom: "40px",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "25px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#4e73df",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 1V23"
              stroke="#4e73df"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6"
              stroke="#4e73df"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Financial Details
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {[
            {
              label: "Tender Fee",
              value: tenderData.tendor_fee_in ? `₹${tenderData.tendor_fee_in}` : "Not specified",
              details: `Payable to: ${tenderData.fee_payable_to || "Not specified"}`,
              icon: "💵",
            },
            {
              label: "EMD Amount",
              value: tenderData.emd_ammount ? `₹${tenderData.emd_ammount}` : "Not specified",
              details: `Type: ${tenderData.emd_fee_type || "Not specified"}`,
              icon: "🏦",
            },
            {
              label: "Period of Work",
              value: tenderData.period_of_work ? `${tenderData.period_of_work} days` : "Not specified",
              icon: "⏳",
            },
            {
              label: "EMD Payable To",
              value: tenderData.emd_payable_to || "Not specified",
              details: `Payable at: ${tenderData.emd_payable_at || "Not specified"}`,
              icon: "🏛️",
            },
            {
              label: "EMD Percentage",
              value: tenderData.emd_percentage ? `${tenderData.emd_percentage}%` : "Not specified",
              details: tenderData.emd_exemption_allow === "true" ? "Exemption allowed" : "No exemption",
              icon: "📊",
            },
            {
              label: "Tender Fee Exemption",
              value: tenderData.tendor_fee_exemption_allow === "true" ? "Allowed" : "Not allowed",
              icon: "🧾",
            },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#f8fafc",
                padding: "18px",
                borderRadius: "8px",
                borderLeft: "3px solid #4e73df",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontSize: "18px" }}>{item.icon}</span>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#718096",
                    margin: 0,
                    fontWeight: "500",
                  }}
                >
                  {item.label}
                </p>
              </div>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#2d3748",
                  margin: "5px 0 0 28px",
                }}
              >
                {item.value}
              </p>
              {item.details && (
                <p
                  style={{
                    fontSize: "13px",
                    color: "#718096",
                    margin: "5px 0 0 28px",
                  }}
                >
                  {item.details}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bid Process Details Section */}
      <div
        style={{
          marginBottom: "40px",
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "25px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        }}
      >
        <h2
          style={{
            fontSize: "18px",
            fontWeight: "700",
            marginBottom: "20px",
            color: "#4e73df",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#4e73df"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 16L12 12L8 8"
              stroke="#4e73df"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 8L12 12L8 16"
              stroke="#4e73df"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Bid Process Details
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {[
            {
              label: "Form of Contract",
              value: tenderData.form_of_contract || "Not specified",
              icon: "📜",
            },
            {
              label: "No. of Covers",
              value: tenderData.no_of_covers || "Not specified",
              icon: "📦",
            },
            {
              label: "Payment Mode",
              value: tenderData.payment_mode || "Not specified",
              icon: "💳",
            },
            {
              label: "Bid Opening Place",
              value: tenderData.bid_opening_place || "Not specified",
              icon: "🏢",
            },
            {
              label: "Allow NDA Tender",
              value: tenderData.allow_nda_tendor === "true" ? "Yes" : "No",
              icon: "🤫",
            },
            {
              label: "Allow Preferential Bidder",
              value: tenderData.allow_preferential_bidder === "true" ? "Yes" : "No",
              icon: "⭐",
            },
            {
              label: "Allow Two Stage Bidding",
              value: tenderData.allow_two_stage_bidding === "true" ? "Yes" : "No",
              icon: "↔️",
            },
            {
              label: "Withdrawal Allowed",
              value: tenderData.withdrawl_allow === "true" ? "Yes" : "No",
              icon: "↩️",
            },
            {
              label: "Multiple Currency Allowed",
              value: tenderData.multiple_curreny_allow === "true" ? "Yes" : "No",
              icon: "💱",
            },
            {
              label: "General Tech Evaluation",
              value: tenderData.general_tech_evaluation_allow === "true" ? "Yes" : "No",
              icon: "🔍",
            },
            {
              label: "Itemwise Tech Evaluation",
              value: tenderData.itemwise_tech_evaluation_allow === "true" ? "Yes" : "No",
              icon: "📋",
            },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#f8fafc",
                padding: "18px",
                borderRadius: "8px",
                borderLeft: "3px solid #4e73df",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontSize: "18px" }}>{item.icon}</span>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#718096",
                    margin: 0,
                    fontWeight: "500",
                  }}
                >
                  {item.label}
                </p>
              </div>
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#2d3748",
                  margin: "5px 0 0 28px",
                }}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>

                      {/* Documents Section */}
                      <div
                        style={{
                          marginBottom: "40px",
                          backgroundColor: "white",
                          borderRadius: "8px",
                          padding: "25px",
                          boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                        }}
                      >
                        <h2
                          style={{
                            fontSize: "18px",
                            fontWeight: "700",
                            marginBottom: "20px",
                            color: "#4e73df",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                              stroke="#4e73df"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M14 2V8H20"
                              stroke="#4e73df"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16 13H8"
                              stroke="#4e73df"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M16 17H8"
                              stroke="#4e73df"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10 9H9H8"
                              stroke="#4e73df"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Documents
                        </h2>

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fill, minmax(300px, 1fr))",
                            gap: "20px",
                          }}
                        >
                          {[
                            {
                              title: "NIT Document",
                              data: tenderData.nit_document,
                              nameKey: "nit_doc_file",
                              sizeKey: "nit_size",
                              descKey: "nit_description",
                              folder: "admin",
                              icon: "📜",
                            },
                            {
                              title: "Pre-Bid Documents",
                              data: tenderData.pre_bid_meeting_document,
                              nameKey: "pre_bid_doc_file",
                              sizeKey: "pre_bid_size",
                              descKey: "pre_bid_description",
                              folder: "admin",
                              icon: "📋",
                            },
                            {
                              title: "Work Item Documents",
                              data: tenderData.work_item_document,
                              nameKey: "work_item_doc_file",
                              sizeKey: "work_item_size",
                              descKey: "work_item_description",
                              folder: "admin",
                              icon: "📝",
                            },
                            {
                              title: "Corrigendum Documents",
                              data: tenderData.corrigendum_list,
                              nameKey: "corrigendum_doc_file",
                              descKey: "corrigendum_title",
                              sizeKey: null,
                              folder: "admin",
                              icon: "🔖",
                            },
                          ]
                            .filter(
                              (section) =>
                                section.data && section.data.length > 0
                            )
                            .map((section, i) => (
                              <div
                                key={i}
                                style={{
                                  backgroundColor: "#f8fafc",
                                  padding: "20px",
                                  borderRadius: "8px",
                                  border: "1px solid #edf2f7",
                                }}
                              >
                                <h3
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "700",
                                    marginBottom: "15px",
                                    color: "#4a5568",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                  }}
                                >
                                  <span>{section.icon}</span>
                                  {section.title}
                                </h3>

                                {section.data.map((doc, index) => (
                                  <div
                                    key={index}
                                    style={{
                                      backgroundColor: "white",
                                      padding: "15px",
                                      borderRadius: "6px",
                                      marginBottom: "15px",
                                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                                      borderLeft: "3px solid #4e73df",
                                    }}
                                  >
                                    <div
                                      style={{ display: "flex", gap: "12px" }}
                                    >
                                      <div
                                        style={{
                                          width: "40px",
                                          height: "40px",
                                          backgroundColor: "#ebf4ff",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          borderRadius: "6px",
                                          flexShrink: 0,
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontSize: "18px",
                                            color: "#4e73df",
                                          }}
                                        >
                                          📄
                                        </span>
                                      </div>
                                      <div style={{ flexGrow: 1 }}>
                                        <p
                                          style={{
                                            fontSize: "14px",
                                            fontWeight: "600",
                                            marginBottom: "5px",
                                            color: "#2d3748",
                                            wordBreak: "break-word",
                                          }}
                                        >
                                          {doc[section.nameKey]}
                                        </p>
                                        {section.descKey && (
                                          <p
                                            style={{
                                              fontSize: "13px",
                                              color: "#718096",
                                              marginBottom: "5px",
                                            }}
                                          >
                                            {doc[section.descKey]}
                                          </p>
                                        )}
                                        {section.sizeKey &&
                                          doc[section.sizeKey] && (
                                            <p
                                              style={{
                                                fontSize: "12px",
                                                color: "#a0aec0",
                                                marginBottom: 0,
                                              }}
                                            >
                                              Size: {doc[section.sizeKey]}
                                            </p>
                                          )}
                                      </div>
                                    </div>

                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "10px",
                                        marginTop: "12px",
                                        justifyContent: "flex-end",
                                      }}
                                    >
                                      <a
                                        href={`${
                                          process.env.REACT_APP_API_KEY
                                        }uploads/${section.folder}/${
                                          doc[section.nameKey]
                                        }`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                          padding: "6px 12px",
                                          backgroundColor: "white",
                                          color: "#4e73df",
                                          border: "1px solid #4e73df",
                                          borderRadius: "4px",
                                          fontSize: "13px",
                                          fontWeight: "500",
                                          textDecoration: "none",
                                          display: "inline-flex",
                                          alignItems: "center",
                                          gap: "5px",
                                          transition: "all 0.2s",
                                        }}
                                        onMouseOver={(e) => {
                                          e.currentTarget.style.backgroundColor =
                                            "#f0f5ff";
                                          e.currentTarget.style.transform =
                                            "translateY(-1px)";
                                        }}
                                        onMouseOut={(e) => {
                                          e.currentTarget.style.backgroundColor =
                                            "white";
                                          e.currentTarget.style.transform =
                                            "translateY(0)";
                                        }}
                                      >
                                        <svg
                                          width="14"
                                          height="14"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                                            stroke="#4e73df"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                            stroke="#4e73df"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        View
                                      </a>
                                      <a
                                        target="_blank"
                                        
                                        href={`${
                                          process.env.REACT_APP_API_KEY
                                        }uploads/${section.folder}/${
                                          doc[section.nameKey]
                                        }`}
                                        download
                                        style={{
                                          padding: "6px 12px",
                                          backgroundColor: "#4e73df",
                                          color: "white",
                                          border: "1px solid #4e73df",
                                          borderRadius: "4px",
                                          fontSize: "13px",
                                          fontWeight: "500",
                                          textDecoration: "none",
                                          display: "inline-flex",
                                          alignItems: "center",
                                          gap: "5px",
                                          transition: "all 0.2s",
                                        }}
                                        onMouseOver={(e) => {
                                          e.currentTarget.style.backgroundColor =
                                            "#3b56b4";
                                          e.currentTarget.style.transform =
                                            "translateY(-1px)";
                                        }}
                                        onMouseOut={(e) => {
                                          e.currentTarget.style.backgroundColor =
                                            "#4e73df";
                                          e.currentTarget.style.transform =
                                            "translateY(0)";
                                        }}
                                      >
                                        <svg
                                          width="14"
                                          height="14"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M7 10L12 15L17 10"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                          <path
                                            d="M12 15V3"
                                            stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                        Download
                                      </a>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ))}
                        </div>
                      </div>


                    </div>
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

export default TenderDetails;
