import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "react-js-pagination";
import { ColorRing } from "react-loader-spinner";

const AddAdminRole = () => {
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState("");
  const [rolesList, setRolesList] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const [totalRoles, setTotalRoles] = useState(0);
  const token = secureLocalStorage.getItem("adminidtoken");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFilteredRoles(rolesList);
  }, [rolesList]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/getAllRoles`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res)
        const data = res?.data || [];
        setRolesList(data);
        setTotalRoles(data.length);
      })
      .catch((error) => {
        toast.error("Failed to fetch roles list");
      })
      .finally(() => setLoading(false));
  };

  const handleAddRole = (e) => {
    e.preventDefault();
    if (!roleName.trim()) {
      toast.error("Role name is required");
      return;
    }

    setIsSubmitting(true);
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/createRole`,
        { role: roleName },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        toast.success(res?.data?.msg || "Role added successfully");
        swal("Success", "Role added successfully", "success");
        setRoleName("");
        fetchRoles();
      })
      .catch(() => {
        toast.error("Failed to add role");
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = rolesList.filter((item) =>
      item.name?.toLowerCase().includes(searchTerm)
    );
    setFilteredRoles(filtered);
    setActivePage(1);
  };

  const handleDeleteRole = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, this role cannot be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        axios
          .post(
            `${process.env.REACT_APP_API_KEY}admin/api/deleteRole`,
            { id: id },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then(() => {
            toast.success("Role deleted successfully");
            fetchRoles();
          })
          .catch(() => {
            toast.error("Failed to delete role");
          });
      }
    });
  };

  const toggleRoleStatus = (id) => {
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/activeDeactive_role`,
        { roleId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        toast.success(res?.data?.message || "Status updated");
        fetchRoles();
      })
      .catch(() => {
        toast.error("Failed to update status");
      });
  };

  const handleEditRole = (id) => {
    secureLocalStorage.setItem("roleid", id);
    navigate("/updateAdminRole", { state: { roleId: id } });
  };

  const renderRoleRow = (role, index) => {
    const serial = (activePage - 1) * itemsPerPage + index + 1;
    const isActive = role?.active_status !== 0;

    return (
      <tr key={role._id}>
        <td>{serial}</td>
        <td>{role?.role}</td>
        <td>{new Date(role?.updatedAt).toLocaleString()}</td>
        <td>
          <label className="switcher">
            <input
              type="checkbox"
              className="switcher_input"
              checked={isActive}
              onChange={() => toggleRoleStatus(role._id)}
            />
            <span className="switcher_control" />
          </label>
        </td>
        <td>
          <div className="d-flex gap-10 justify-content-center">
            <button
              className="btn btn-outline--primary btn-sm"
              title="Edit"
              onClick={() => handleEditRole(role._id)}
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              title="Delete"
              onClick={() => handleDeleteRole(role._id)}
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
      <div className="container row" style={{ paddingLeft: "0px", marginLeft: "0px" }}>
        <div className="col-lg-3 col-md-4" />
        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3">
            <div className="mb-3">
              <h2 className="h1 mb-0 d-flex gap-10">
                <img src="https://6valley.6amtech.com/public/assets/back-end/img/brand-setup.png" alt="" />
                Admin Roles
              </h2>
            </div>

            {/* Add Role Form */}
            <div className="card mb-4">
              <div className="card-body">
                <form onSubmit={handleAddRole}>
                  <div className="row">
                    <div className="col-lg-6">
                      <label className="title-color">
                        Role Name <span className="text-danger">*</span> (EN)
                      </label>
                      <input
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Enter new role"
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mt-3">
                    <button type="submit" className="btn btn--primary">
                      {isSubmitting ? "Adding..." : "Add Role"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Role List */}
            <div className="card">
              <div className="px-3 py-4">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h5 className="text-capitalize d-flex gap-1">
                      Role List
                      <span className="badge badge-soft-dark radius-50 fz-12">{totalRoles}</span>
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
                        placeholder="Search roles..."
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
                ) : filteredRoles.length > 0 ? (
                  <table className="table table-hover table-borderless table-thead-bordered table-nowrap">
                    <thead className="thead-light">
                      <tr>
                        <th>Sr.No</th>
                        <th>Role Name</th>
                        <th>Date/Time</th>
                        <th>Status</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRoles
                        .slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)
                        .map(renderRoleRow)}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center p-4">
                    <img
                      className="mb-3 w-160"
                      src="https://6valley.6amtech.com/public/assets/back-end/img/empty-state-icon/default.png"
                      alt="No Data"
                    />
                    <p>No roles found</p>
                  </div>
                )}
              </div>

              {filteredRoles.length > itemsPerPage && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={filteredRoles.length}
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

export default AddAdminRole;