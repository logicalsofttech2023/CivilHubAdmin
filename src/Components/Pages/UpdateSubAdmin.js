import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

const UpdateSubAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const adminId = location.state?.adminId || "";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    permissions: [],
  });

  console.log(formData);

  const [rolesList, setRolesList] = useState([]);
  const [subAdminsList, setSubAdminsList] = useState([]);
  const [filteredSubAdmins, setFilteredSubAdmins] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const [totalSubAdmins, setTotalSubAdmins] = useState(0);
  const token = secureLocalStorage.getItem("adminidtoken");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [permissionOptions, setPermissionOptions] = useState([
    { id: "Dashboard", name: "Dashboard" },
    { id: "Freelancer Profile", name: "Freelancer Profile" },
    { id: "Company Profile", name: "Company Profile" },
    { id: "Business Profile", name: "Business Profile" },
    { id: "Individual Profile", name: "Individual Profile" },
    { id: "Service Provider", name: "Service Provider" },
    { id: "Tender", name: "Tender" },
    { id: "Add Admin Role", name: "Add Admin Role" },
    { id: "Add Sub Admin", name: "Add Sub Admin" },
    { id: "Web Page", name: "Web Page" },
    { id: "Market Place", name: "Market Place" },
    { id: "Rental Market Place", name: "Rental Market Place" },
    { id: "Chat", name: "Chat" },
    { id: "Blogs", name: "Blogs" },
    { id: "Categories", name: "Categories" },
    { id: "Skills", name: "Skills" },
    { id: "Banner", name: "Banner" },
    { id: "Notification", name: "Notification" },
    { id: "Setting", name: "Setting" },
  ]);

  useEffect(() => {
    fetchRoles();
    getSubDetails();
  }, []);

  const getSubDetails = () => {
    setLoading(true);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/api/getAdminById?id=${adminId}`,
        options
      )
      .then((res) => {
        const admin = res?.data;
        setFormData({
          name: admin?.name || "",
          email: admin?.email || "",
          role: admin?.role?._id || "",
          permissions: admin?.permissions || [],
        });
      })
      .catch((error) => {
        console.error("Error fetching Role details:", error);
        toast.error("Failed to fetch role details");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchRoles = () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/getAllRoles`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRolesList(res?.data || []);
      })
      .catch((error) => {
        toast.error("Failed to fetch roles list");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePermissionChange = (permissionId) => {
    setFormData((prev) => {
      const newPermissions = prev.permissions.includes(permissionId)
        ? prev.permissions.filter((id) => id !== permissionId)
        : [...prev.permissions, permissionId];
      return { ...prev, permissions: newPermissions };
    });
  };

  const updateSubAdmin = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/updateAdmin?id=${adminId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        toast.success(res?.data?.msg || "Sub-admin added successfully");
        showSuccessMessage();
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "",
          permissions: [],
        });
        setTimeout(() => {
          navigate("/addSubAdmin");
        }, 2000);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to add sub-admin");
      })
      .finally(() => setIsSubmitting(false));
  };

  const showSuccessMessage = () => {
    swal({
      title: "Sub Admin Updated Successfully",
      text: "Sub Admin updated successfully",
      icon: "success",
      buttons: true,
    });
  };

  return (
    <div>
      <Toaster />
      <div
        className="container row"
        style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
      >
        <div className="col-lg-3 col-md-4"></div>
        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3 mb-5">
            <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
              <h2 className="h1 mb-0">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/brand-setup.png"
                  className="mb-1 mr-1"
                  alt="icon"
                />
                Update Admin Role
              </h2>
            </div>

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
            ) : (
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-body" style={{ textAlign: "left" }}>
                      <form onSubmit={updateSubAdmin}>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="title-color">
                                Name <span className="text-danger">*</span>
                              </label>
                              <input
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                type="text"
                                className="form-control"
                                placeholder="Enter full name"
                                required
                              />
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="title-color">
                                Email <span className="text-danger">*</span>
                              </label>
                              <input
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                type="email"
                                className="form-control"
                                placeholder="Enter email address"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-lg-6">
                            <div className="form-group">
                              <label className="title-color">
                                Role <span className="text-danger">*</span>
                              </label>
                              <select
                                name="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                              >
                                <option value="">Select Role</option>
                                {rolesList.map((role) => (
                                  <option key={role._id} value={role._id}>
                                    {role.role}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-12">
                            <label
                              className="fw-bold mb-2"
                              style={{ fontSize: "1.1rem", color: "#343a40" }}
                            >
                              Permissions
                            </label>

                            <div className="row">
                              {permissionOptions.map((permission) => {
                                const isSelected =
                                  formData.permissions.includes(permission.id);
                                return (
                                  <div
                                    key={permission.id}
                                    className="col-sm-6 col-md-4 mb-3"
                                  >
                                    <div
                                      onClick={() =>
                                        handlePermissionChange(permission.id)
                                      }
                                      style={{
                                        border: "1px solid",
                                        borderColor: isSelected
                                          ? "#0d6efd"
                                          : "#dee2e6",
                                        borderRadius: "8px",
                                        padding: "12px 16px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        backgroundColor: isSelected
                                          ? "#e7f1ff"
                                          : "#fff",
                                        transition: "all 0.3s ease",
                                        cursor: "pointer",
                                      }}
                                    >
                                      <div
                                        className="form-check"
                                        style={{ pointerEvents: "none" }}
                                      >
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          id={`perm-${permission.id}`}
                                          checked={isSelected}
                                          readOnly
                                        />
                                        <label
                                          className="form-check-label ms-2"
                                          htmlFor={`perm-${permission.id}`}
                                          style={{
                                            fontSize: "1rem",
                                            color: "#212529",
                                          }}
                                        >
                                          {permission.name}
                                        </label>
                                      </div>

                                      {isSelected && (
                                        <span
                                          style={{
                                            backgroundColor: "#0d6efd",
                                            color: "#fff",
                                            fontSize: "0.75rem",
                                            padding: "2px 8px",
                                            borderRadius: "12px",
                                          }}
                                        >
                                          Selected
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-end mt-3">
                          <button
                            type="submit"
                            className="btn btn--primary"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Updating..." : "Update Sub Admin"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSubAdmin;
