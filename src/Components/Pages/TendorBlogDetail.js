import React, { useEffect, useState } from "react";
import Header from "../Header";
import { Link, useLocation } from "react-router-dom";
import Sidebarr from "./../Sidebar";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { ColorRing } from "react-loader-spinner";

const TendorBlogDetail = () => {
  const location = useLocation();
  const { blogId } = location?.state;
  const [loading, setLoading] = useState(true);
  let token = secureLocalStorage.getItem("adminidtoken");
  const [blogData, setBlogData] = useState(null);

  const fetchBlogDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_KEY}admin/api/admin_tendor_blogs_details/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Blog Details:", response.data);
      setBlogData(response.data.data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
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

  if (!blogData) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ fontSize: "20px" }}>No blog data found</div>
      </div>
    );
  }
  return (
    <div>
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
                        alt=""
                      />
                      Tender Blog details
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
                      <div style={{ marginBottom: "30px" }}>
                        <h1 style={{ 
                          fontSize: "32px", 
                          fontWeight: "700", 
                          color: "#333", 
                          marginBottom: "20px" 
                        }}>
                          {blogData.title}
                        </h1>
                        
                        <div style={{ 
                          display: "flex", 
                          alignItems: "center", 
                          marginBottom: "20px",
                          color: "#666",
                          fontSize: "14px"
                        }}>
                          <span style={{ marginRight: "15px" }}>By {blogData.other_name}</span>
                          <span>{new Date(blogData.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        
                        {blogData.image && (
                          <div style={{ 
                            marginBottom: "30px", 
                            borderRadius: "8px", 
                            overflow: "hidden",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                          }}>
                            <img 
                              src={`${process.env.REACT_APP_API_KEY}uploads/admin/${blogData.image}`} 
                              alt={blogData.title} 
                              style={{ 
                                width: "100%", 
                                height: "auto", 
                                display: "block" 
                              }} 
                            />
                          </div>
                        )}
                        
                        <div 
                          dangerouslySetInnerHTML={{ __html: blogData.description }} 
                          style={{
                            fontSize: "16px",
                            lineHeight: "1.8",
                            color: "#333"
                          }}
                        />
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

export default TendorBlogDetail;
