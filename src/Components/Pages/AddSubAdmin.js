import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "react-js-pagination";
import { ColorRing } from "react-loader-spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AddSubAdmin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    permissions: [],
  });
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
    { id: "Service List", name: "Service List" },
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
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setFilteredSubAdmins(subAdminsList);
  }, [subAdminsList]);

  useEffect(() => {
    fetchRoles();
    fetchSubAdmins();
  }, []);

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

  const fetchSubAdmins = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/getAllAdmins`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        const data = res?.data || [];
        setSubAdminsList(data);
        setFilteredSubAdmins(data);
        setTotalSubAdmins(data.length);
      })
      .catch((error) => {
        toast.error("Failed to fetch sub-admins list");
      })
      .finally(() => setLoading(false));
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

  const handleAddSubAdmin = (e) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.role
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/createSubAdmin`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        toast.success(res?.data?.msg || "Sub-admin added successfully");
        swal("Success", "Sub-admin added successfully", "success");
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "",
          permissions: [],
        });
        fetchSubAdmins();
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Failed to add sub-admin");
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = subAdminsList.filter(
      (item) =>
        item.name?.toLowerCase().includes(searchTerm) ||
        item.email?.toLowerCase().includes(searchTerm) ||
        item.role?.toLowerCase().includes(searchTerm)
    );
    setFilteredSubAdmins(filtered);
    setActivePage(1);
  };

  const handleDeleteSubAdmin = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, this sub-admin cannot be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        axios
          .post(
            `${process.env.REACT_APP_API_KEY}admin/api/deleteSubAdmin`,
            { id },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then(() => {
            toast.success("Sub-admin deleted successfully");
            fetchSubAdmins();
          })
          .catch(() => {
            toast.error("Failed to delete sub-admin");
          });
      }
    });
  };

  const toggleSubAdminStatus = (id) => {
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/toggleSubAdminStatus`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        toast.success(res?.data?.message || "Status updated");
        fetchSubAdmins();
      })
      .catch(() => {
        toast.error("Failed to update status");
      });
  };

  const handleEditSubAdmin = (id) => {
    navigate("/updateSubAdmin", { state: { adminId: id } });
  };
  const handleViewSubAdmin = (id) => {
    navigate("/subAdminDetail", { state: { adminId: id } });
  };

  const PasswordCell = ({ password }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <td>
        {showPassword ? password : "••••••••"}
        <span
          onClick={() => setShowPassword(!showPassword)}
          style={{ marginLeft: 10, cursor: "pointer" }}
          title={showPassword ? "Hide Password" : "Show Password"}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </td>
    );
  };

  const renderSubAdminRow = (subAdmin, index) => {
    const serial = (activePage - 1) * itemsPerPage + index + 1;
    const isActive = subAdmin?.status !== "inactive";

    return (
      <tr key={subAdmin._id}>
        <td>{serial}</td>
        <td>{subAdmin?.name}</td>
        <td>{subAdmin?.email}</td>
        <PasswordCell password={subAdmin.password} />
        <td>{subAdmin?.role?.role || "N/A"}</td>
        <td>
          {subAdmin?.permissions?.slice(0, 2).join(", ") || "No permissions"}
          {subAdmin?.permissions?.length > 2 ? "..." : ""}
        </td>{" "}
        <td>{new Date(subAdmin?.createdAt).toLocaleString()}</td>
        <td>
          <label className="switcher">
            <input
              type="checkbox"
              className="switcher_input"
              checked={isActive}
              onChange={() => toggleSubAdminStatus(subAdmin._id)}
            />
            <span className="switcher_control" />
          </label>
        </td>
        <td>
          <div className="d-flex gap-10 justify-content-center">
            <button
              className="btn btn-outline--primary btn-sm"
              title="Edit"
              onClick={() => handleEditSubAdmin(subAdmin._id)}
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              title="Delete"
              onClick={() => handleDeleteSubAdmin(subAdmin._id)}
            >
              <i className="fa fa-trash-o" aria-hidden="true" />
            </button>
            <button
              className="btn btn-outline-info btn-sm"
              title="View"
              onClick={() => handleViewSubAdmin(subAdmin._id)}
            >
              <i className="fa fa-eye" aria-hidden="true" />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div>
      <Toaster />
      <div
        className="container row"
        style={{ paddingLeft: "0px", marginLeft: "0px" }}
      >
        <div className="col-lg-3 col-md-4" />
        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3">
            <div className="mb-3">
              <h2 className="h1 mb-0 d-flex gap-10">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/brand-setup.png"
                  alt=""
                />
                Sub-Admins Management
              </h2>
            </div>

            {/* Add Sub-Admin Form */}
            <div className="card mb-4">
              <div className="card-body">
                <form onSubmit={handleAddSubAdmin}>
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
                          Password <span className="text-danger">*</span>
                        </label>
                        <input
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          type="password"
                          className="form-control"
                          placeholder="Enter password"
                          required
                        />
                      </div>
                    </div>
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
                          const isSelected = formData.permissions.includes(
                            permission.id
                          );
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
                      {isSubmitting ? "Adding..." : "Add Sub-Admin"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sub-Admins List */}
            <div className="card">
              <div className="px-3 py-4">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h5 className="text-capitalize d-flex gap-1">
                      Sub-Admins List
                      <span className="badge badge-soft-dark radius-50 fz-12">
                        {totalSubAdmins}
                      </span>
                    </h5>
                  </div>
                  <div className="col-md-4">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa fa-search" />
                        </span>
                      </div>
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Search sub-admins..."
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="table-responsive">
                {loading ? (
                  <div className="d-flex justify-content-center p-5">
                    <ColorRing
                      visible={true}
                      height="80"
                      width="80"
                      color="#e15b64"
                      glassColor="#c0efff"
                    />
                  </div>
                ) : filteredSubAdmins.length > 0 ? (
                  <table className="table table-hover table-borderless table-thead-bordered table-nowrap">
                    <thead className="thead-light">
                      <tr>
                        <th>Sr.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>Permissions</th>
                        <th>Created At</th>
                        <th>Status</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSubAdmins
                        .slice(
                          (activePage - 1) * itemsPerPage,
                          activePage * itemsPerPage
                        )
                        .map(renderSubAdminRow)}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center p-4">
                    <img
                      className="mb-3 w-160"
                      src="https://6valley.6amtech.com/public/assets/back-end/img/empty-state-icon/default.png"
                      alt="No Data"
                    />
                    <p>No sub-admins found</p>
                  </div>
                )}
              </div>

              {filteredSubAdmins.length > itemsPerPage && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={filteredSubAdmins.length}
                    onChange={setActivePage}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubAdmin;
