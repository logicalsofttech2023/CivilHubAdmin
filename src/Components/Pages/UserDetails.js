import React, { useEffect, useState } from "react";
import "../sidebar.css";
import Header from "../Header";
import swal from "sweetalert";
import { Link, useLocation } from "react-router-dom";
import Sidebarr from "../Sidebar";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import Pagination from "react-js-pagination";
import { ColorRing } from "react-loader-spinner";

const UserDetails = () => {
  const location = useLocation();
  const { userId } = location?.state || {};
  const [loading, setLoading] = useState(true);
  let token = secureLocalStorage.getItem("adminidtoken");
  const [userData, setUserData] = useState(null);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_KEY}admin/api/get_user_by_admin_details/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData(response.data.data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
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
    );
  }

  if (!userData) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="fs-5 text-danger">No user data found</div>
      </div>
    );
  }

  return (
    <div
      className="container-fluid mt-5 mb-5"
      style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}
    >
      <div className="row">
        <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

        <div className="col-lg-9 col-md-8 mt-5 pt-3">
          <div
            className="card shadow-sm border-0"
            style={{ borderRadius: "12px", overflow: "hidden" }}
          >
            <div
              className="card-header bg-white border-0"
              style={{ padding: "1.5rem", borderBottom: "1px solid #f0f0f0" }}
            >
              <h2
                className="h4 mb-0 d-flex align-items-center"
                style={{ fontWeight: "600", color: "#2c3e50" }}
              >
                <i
                  className="bi bi-person-circle me-2"
                  style={{ fontSize: "1.5rem", color: "#3498db" }}
                ></i>
                User Details
              </h2>
            </div>

            <div className="card-body" style={{ padding: "2rem" }}>
  <div className="row mb-4">
    <div className="col-md-8">
      {/* Profile Header */}
      <div className="d-flex align-items-center mb-5">
        <div className="position-relative" style={{ marginRight: "1.5rem" }}>
          <div
            className="rounded-circle overflow-hidden border border-3"
            style={{
              width: "100px",
              height: "100px",
              borderColor: "#f8f9fa",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
            }}
          >
            <img
              src={
                userData.profile_image
                  ? `${process.env.REACT_APP_API_KEY}uploads/admin/${userData.profile_image}`
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt="Profile"
              className="img-fluid h-100 w-100"
              style={{ objectFit: "cover" }}
            />
          </div>
          {userData.verify_profile === "true" && (
            <div
              className="position-absolute bottom-0 end-0 bg-primary rounded-circle p-1"
              style={{ transform: "translate(25%, 25%)" }}
              title="Verified"
            >
              <i className="bi bi-check-lg text-white fs-6"></i>
            </div>
          )}
        </div>
        <div>
          <h2 className="mb-1 fw-bold" style={{ fontSize: "1.8rem", color: "#2c3e50" }}>
            {userData.first_name} {userData.last_name}
            {userData.block_status === 1 && (
              <span className="badge bg-danger ms-2 align-middle" style={{ fontSize: "0.75rem" }}>Blocked</span>
            )}
          </h2>
          <div className="d-flex align-items-center mb-2">
            <i className="bi bi-envelope me-2" style={{ color: "#7f8c8d" }}></i>
            <span style={{ color: "#34495e", fontSize: "0.95rem" }}>{userData.email}</span>
          </div>
          <div className="d-flex align-items-center">
            <i className="bi bi-phone me-2" style={{ color: "#7f8c8d" }}></i>
            <span style={{ color: "#34495e", fontSize: "0.95rem" }}>{userData.mobile}</span>
          </div>
        </div>
      </div>

      {/* Basic Information Section */}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4 pb-2 border-bottom" style={{ fontSize: "1.25rem", color: "#2c3e50" }}>
            <i className="bi bi-info-circle-fill me-2" style={{ color: "#3498db" }}></i>
            Basic Information
          </h5>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="d-flex align-items-center">
                <span className="me-2" style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>Account Type:</span>
                <span
                  className={`badge ${userData.account_type === "Freelancer" ? "bg-info text-dark" : "bg-success"}`}
                  style={{ fontSize: "0.8rem" }}
                >
                  {userData.account_type}
                </span>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="d-flex align-items-center">
                <span className="me-2" style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>Verified:</span>
                <span className={`fw-medium ${userData.verify_profile === "true" ? "text-success" : "text-danger"}`} style={{ fontSize: "0.9rem" }}>
                  {userData.verify_profile === "true" ? "Verified" : "Not Verified"}
                </span>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="d-flex align-items-center">
                <span className="me-2" style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>Status:</span>
                <span className={`fw-medium ${userData.block_status === 0 ? "text-success" : "text-danger"}`} style={{ fontSize: "0.9rem" }}>
                  {userData.block_status === 0 ? "Active" : "Blocked"}
                </span>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="d-flex align-items-center">
                <span className="me-2" style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>Rating:</span>
                <div>
                  <span className="fw-medium me-1" style={{ color: "#34495e", fontSize: "0.9rem" }}>{userData.rating}</span>
                  <i className="bi bi-star-fill text-warning"></i>
                  <small className="ms-1" style={{ color: "#7f8c8d", fontSize: "0.8rem" }}>({userData.rating_count} ratings)</small>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="d-flex align-items-center">
                <span className="me-2" style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>Experience:</span>
                <span className="fw-medium" style={{ color: "#34495e", fontSize: "0.9rem" }}>{userData.experience} years</span>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="d-flex align-items-center">
                <span className="me-2" style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>Projects Completed:</span>
                <span className="fw-medium" style={{ color: "#34495e", fontSize: "0.9rem" }}>{userData.total_project_comppleted}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4 pb-2 border-bottom" style={{ fontSize: "1.25rem", color: "#2c3e50" }}>
            <i className="bi bi-geo-alt-fill me-2" style={{ color: "#e74c3c" }}></i>
            Location
          </h5>
          <p className="mb-2" style={{ color: "#34495e", fontSize: "0.95rem" }}>
            <i className="bi bi-geo me-2" style={{ color: "#7f8c8d" }}></i>
            {userData.address}
          </p>
          <small style={{ color: "#95a5a6", fontSize: "0.85rem" }}>
            <i className="bi bi-geo me-2"></i>
            Lat: {userData.latitude}, Lng: {userData.longitude}
          </small>
        </div>
      </div>

      {/* About Section */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4 pb-2 border-bottom" style={{ fontSize: "1.25rem", color: "#2c3e50" }}>
            <i className="bi bi-person-lines-fill me-2" style={{ color: "#3498db" }}></i>
            About
          </h5>
          <p className="mb-0" style={{ lineHeight: "1.7", color: "#34495e", fontSize: "0.95rem" }}>
            {userData.description || (
              <span className="fst-italic" style={{ color: "#95a5a6" }}>No description provided</span>
            )}
          </p>
        </div>
      </div>
    </div>

    {/* Right Sidebar */}
    <div className="col-md-4">
      {/* Account Details Card */}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4 pb-2 border-bottom" style={{ fontSize: "1.25rem", color: "#2c3e50" }}>
            <i className="bi bi-credit-card-fill me-2" style={{ color: "#3498db" }}></i>
            Account Details
          </h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item px-0 py-2 d-flex justify-content-between align-items-center border-0">
              <span style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>Username:</span>
              <span style={{ color: "#34495e", fontSize: "0.9rem", fontWeight: "500" }}>{userData.username}</span>
            </li>
            <li className="list-group-item px-0 py-2 d-flex justify-content-between align-items-center border-0">
              <span style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>Wallet Amount:</span>
              <span style={{ color: "#27ae60", fontSize: "0.9rem", fontWeight: "500" }}>₹{userData.wallet_ammount}</span>
            </li>
            <li className="list-group-item px-0 py-2 d-flex justify-content-between align-items-center border-0">
              <span style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>Member Since:</span>
              <span style={{ color: "#34495e", fontSize: "0.9rem", fontWeight: "500" }}>
                {new Date(userData.createdAt).toLocaleDateString()}
              </span>
            </li>
            <li className="list-group-item px-0 py-2 d-flex justify-content-between align-items-center border-0">
              <span style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>Last Updated:</span>
              <span style={{ color: "#34495e", fontSize: "0.9rem", fontWeight: "500" }}>
                {new Date(userData.updatedAt).toLocaleDateString()}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Documents Card */}
      <div className="card mb-4 border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4 pb-2 border-bottom" style={{ fontSize: "1.25rem", color: "#2c3e50" }}>
            <i className="bi bi-folder-fill me-2" style={{ color: "#3498db" }}></i>
            Documents
          </h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item px-0 py-2 d-flex justify-content-between align-items-center border-0">
              <span style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>Profile Image:</span>
              <span className={`badge ${userData.profile_image ? "bg-success" : "bg-secondary"}`} style={{ fontSize: "0.8rem" }}>
                {userData.profile_image ? "Uploaded" : "Not uploaded"}
              </span>
            </li>
            <li className="list-group-item px-0 py-2 d-flex justify-content-between align-items-center border-0">
              <span style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>ID Proof:</span>
              <span className={`badge ${userData.id_proof ? "bg-success" : "bg-secondary"}`} style={{ fontSize: "0.8rem" }}>
                {userData.id_proof ? "Uploaded" : "Not uploaded"}
              </span>
            </li>
            <li className="list-group-item px-0 py-2 d-flex justify-content-between align-items-center border-0">
              <span style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>Resume:</span>
              <span className={`badge ${userData.resume_file ? "bg-success" : "bg-secondary"}`} style={{ fontSize: "0.8rem" }}>
                {userData.resume_file ? "Uploaded" : "Not uploaded"}
              </span>
            </li>
            <li className="list-group-item px-0 py-2 d-flex justify-content-between align-items-center border-0">
              <span style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>PAN Card:</span>
              <span className={`badge ${userData.panCard ? "bg-success" : "bg-secondary"}`} style={{ fontSize: "0.8rem" }}>
                {userData.panCard ? "Uploaded" : "Not uploaded"}
              </span>
            </li>
            <li className="list-group-item px-0 py-2 d-flex justify-content-between align-items-center border-0">
              <span style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>GST Certificate:</span>
              <span className={`badge ${userData.gstCertificate ? "bg-success" : "bg-secondary"}`} style={{ fontSize: "0.8rem" }}>
                {userData.gstCertificate ? "Uploaded" : "Not uploaded"}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Additional Information Card */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-4 pb-2 border-bottom" style={{ fontSize: "1.25rem", color: "#2c3e50" }}>
            <i className="bi bi-collection-fill me-2" style={{ color: "#3498db" }}></i>
            Additional Information
          </h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item px-0 py-2 d-flex justify-content-between align-items-center border-0">
              <span style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>Subcategories:</span>
              <span className="badge bg-primary rounded-pill" style={{ fontSize: "0.8rem" }}>
                {userData.subcategoryId?.length || 0}
              </span>
            </li>
            <li className="list-group-item px-0 py-2 d-flex justify-content-between align-items-center border-0">
              <span style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>Skills:</span>
              <span className="badge bg-primary rounded-pill" style={{ fontSize: "0.8rem" }}>
                {userData.skills?.length || 0}
              </span>
            </li>
            <li className="list-group-item px-0 py-2 d-flex justify-content-between align-items-center border-0">
              <span style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>Languages:</span>
              <span className="badge bg-primary rounded-pill" style={{ fontSize: "0.8rem" }}>
                {userData.language?.length || 0}
              </span>
            </li>
            <li className="list-group-item px-0 py-2 d-flex justify-content-between align-items-center border-0">
              <span style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>Education:</span>
              <span className="badge bg-primary rounded-pill" style={{ fontSize: "0.8rem" }}>
                {userData.education?.length || 0}
              </span>
            </li>
            <li className="list-group-item px-0 py-2 d-flex justify-content-between align-items-center border-0">
              <span style={{ color: "#7f8c8d", fontSize: "0.9rem" }}>Work History:</span>
              <span className="badge bg-primary rounded-pill" style={{ fontSize: "0.8rem" }}>
                {userData.work_history?.length || 0}
              </span>
            </li>
          </ul>
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

export default UserDetails;
