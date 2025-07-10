import React, { useEffect, useState } from "react";
import "../sidebar.css";
import Header from "../Header";
import swal from "sweetalert";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebarr from "../Sidebar";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import Pagination from "react-js-pagination";
import { ColorRing } from "react-loader-spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const SubAdminDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { adminId } = location?.state || {};
  const [loading, setLoading] = useState(true);
  let token = secureLocalStorage.getItem("adminidtoken");
  const [adminData, setAdminData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const fetchAdminDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_KEY}admin/api/getAdminById?id=${adminId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAdminData(response.data);
    } catch (error) {
      console.log("Error:", error);
      swal("Error", "Failed to fetch admin details", "error");
      navigate(-1); // Go back if there's an error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminId) {
      fetchAdminDetails();
    } else {
      swal("Error", "No admin ID provided", "error");
      navigate(-1);
    }
  }, [adminId]);

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

  if (!adminData) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="fs-5 text-danger">No admin data found</div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
  className="container-fluid mt-5 mb-5"
  style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", fontSize: "16px" }}
>
  <div className="row">
    <div className="col-lg-3 col-md-4">
      <Sidebarr />
    </div>

    <div className="col-lg-9 col-md-8 mt-md-5 pt-md-3">
      <div
        className="card shadow-sm border-0"
        style={{ borderRadius: "12px", overflow: "hidden" }}
      >
        <div
          className="card-header bg-white border-0 d-flex justify-content-between align-items-center"
          style={{ 
            padding: "1.75rem", 
            borderBottom: "1px solid #e9ecef",
            backgroundColor: "#f8f9fa"
          }}
        >
          <h2
            className="h3 mb-0 d-flex align-items-center"
            style={{ 
              fontWeight: "700", 
              color: "#212529",
              fontSize: "1.75rem"
            }}
          >
            <i
              className="bi bi-person-circle me-3"
              style={{ fontSize: "1.75rem", color: "#0d6efd" }}
            ></i>
            Sub Admin Details
          </h2>
          <Link
            to="/addSubAdmin"
            className="btn btn-outline-primary btn-lg"
            style={{ fontSize: "1rem" }}
          >
            <i className="bi bi-arrow-left me-2"></i>Back to List
          </Link>
        </div>

        <div className="card-body" style={{ padding: "2.25rem" }}>
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="mb-5">
                <h5 
                  className="mb-4"
                  style={{
                    color: "#495057",
                    fontWeight: "600",
                    fontSize: "1.25rem",
                    borderBottom: "1px solid #dee2e6",
                    paddingBottom: "0.5rem"
                  }}
                >
                  Basic Information
                </h5>
                <div className="row">
  <div className="col-md-6 mb-4">
    <p className="mb-2 fw-semibold" style={{ color: "#343a40", fontSize: "1.05rem" }}>Name</p>
    <p className="text-dark" style={{ fontSize: "1.1rem" }}>{adminData.name}</p>
  </div>

  <div className="col-md-6 mb-4">
    <p className="mb-2 fw-semibold" style={{ color: "#343a40", fontSize: "1.05rem" }}>Email</p>
    <p className="text-dark" style={{ fontSize: "1.1rem" }}>{adminData.email}</p>
  </div>

  <div className="col-md-6 mb-4">
    <p className="mb-2 fw-semibold" style={{ color: "#343a40", fontSize: "1.05rem" }}>Role</p>
    <p className="text-dark" style={{ fontSize: "1.1rem" }}>{adminData.role?.role}</p>
  </div>

  <div className="col-md-6 mb-4">
    <p className="mb-2 fw-semibold" style={{ color: "#343a40", fontSize: "1.05rem" }}>Status</p>
    <span
      className={`badge ${adminData.isActive ? "bg-success" : "bg-danger"}`}
      style={{ fontSize: "0.95rem", padding: "0.5em 0.8em" }}
    >
      {adminData.isActive ? "Active" : "Inactive"}
    </span>
  </div>

  <div className="col-md-6 mb-4">
    <p className="mb-2 fw-semibold" style={{ color: "#343a40", fontSize: "1.05rem" }}>Password</p>
    <div className="d-flex align-items-center">
      <p className="text-dark mb-0" style={{ fontSize: "1.1rem" }}>
        {showPassword ? adminData.password : "••••••••"}
      </p>
      <span
        onClick={() => setShowPassword(!showPassword)}
        style={{ cursor: "pointer", marginLeft: 10 }}
        title={showPassword ? "Hide Password" : "Show Password"}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </span>
    </div>
  </div>
</div>

              </div>

              <div className="mb-5">
                <h5 
                  className="mb-4"
                  style={{
                    color: "#495057",
                    fontWeight: "600",
                    fontSize: "1.25rem",
                    borderBottom: "1px solid #dee2e6",
                    paddingBottom: "0.5rem"
                  }}
                >
                  Timestamps
                </h5>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <p className="mb-2 fw-semibold" style={{ color: "#343a40", fontSize: "1.05rem" }}>Created At</p>
                    <p className="text-dark" style={{ fontSize: "1.1rem" }}>
                      {formatDate(adminData.createdAt)}
                    </p>
                  </div>
                  <div className="col-md-6 mb-4">
                    <p className="mb-2 fw-semibold" style={{ color: "#343a40", fontSize: "1.05rem" }}>Last Updated</p>
                    <p className="text-dark" style={{ fontSize: "1.1rem" }}>
                      {formatDate(adminData.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h5 
                  className="mb-4"
                  style={{
                    color: "#495057",
                    fontWeight: "600",
                    fontSize: "1.25rem",
                    borderBottom: "1px solid #dee2e6",
                    paddingBottom: "0.5rem"
                  }}
                >
                  Permissions
                </h5>
                <div className="d-flex flex-wrap gap-3">
                  {adminData.permissions?.map((permission, index) => (
                    <span
                      key={index}
                      className="badge"
                      style={{
                        backgroundColor: "#e9f5ff",
                        color: "#0a58ca",
                        fontSize: "0.95rem",
                        padding: "0.5em 0.9em",
                        borderRadius: "8px",
                        fontWeight: "500"
                      }}
                    >
                      {permission}
                    </span>
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
  );
};

export default SubAdminDetail;