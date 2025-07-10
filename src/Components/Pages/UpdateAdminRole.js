import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

const UpdateAdminRole = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const roleId = location.state?.roleId || {};
  const token = secureLocalStorage.getItem("adminidtoken");

  useEffect(() => {
    getRoleDetails();
  }, []);

  const getRoleDetails = () => {
    setLoading(true);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/api/getRoleById?id=${roleId}`,
        options
      )
      .then((res) => {
        setName(res.data.role);
      })
      .catch((error) => {
        console.error("Error fetching Role details:", error);
        toast.error("Failed to fetch role details");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const showSuccessMessage = () => {
    swal({
      title: "Role Updated Successfully",
      text: "Role updated successfully",
      icon: "success",
      buttons: true,
    });
  };

  const updateRole = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Role name is required");
      return;
    }

    setLoading(true);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const roleData = {
      id: roleId,
      role: name,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/updateRole`,
        roleData,
        options
      )
      .then((res) => {
        toast.success(res?.data?.msg || "Role Updated Successfully");
        showSuccessMessage();
        setTimeout(() => {
          navigate("/addAdminRole");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error updating role:", error);
        toast.error("Update failed");
      })
      .finally(() => {
        setLoading(false);
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
                      <form onSubmit={updateRole}>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group lang_form">
                              <label className="title-color">
                                Role Name{" "}
                                <span className="text-danger">*</span> (EN)
                              </label>
                              <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="Enter Role Name"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-wrap gap-2 justify-content-end">
                          <button
                            type="submit"
                            className="btn btn--primary"
                            disabled={loading}
                          >
                            {loading ? "Updating..." : "Update"}
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

export default UpdateAdminRole;