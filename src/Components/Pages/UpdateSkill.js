import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";

const UpdateSkill = () => {
  const [name, setname] = useState();
  const [loading, setLoading] = useState(false); // for get and update both
  const Navigate = useNavigate();
  let token = secureLocalStorage.getItem("adminidtoken");
  let category_id = secureLocalStorage.getItem("categoryid");

  useEffect(() => {
    getcategorydetails();
  }, []);

  const getcategorydetails = () => {
    setLoading(true);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/api/admin_skill_details/${category_id}`,
        options
      )
      .then((res) => {
        setname(res.data.data?.name);
      })
      .catch((error) => {
        console.error("Error fetching Skill details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const editdata = () => {
    swal({
      title: "Skill Updated Successfully",
      text: "Skill updated successfully",
      icon: "success",
      buttons: true,
    });
  };

  const editcetagory = (e) => {
    e.preventDefault();
    setLoading(true);
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const category = {
      skillId: category_id,
      name: name,
    };
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/admin_skill_update`,
        category,
        options
      )
      .then((res) => {
        toast.success(res?.data?.msg || "Skill Updated Successfully");
        editdata();
        setTimeout(() => {
          Navigate("/skills");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error updating skill:", error);
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
                Skilled Update
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
                      <form onSubmit={editcetagory}>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="form-group lang_form">
                              <label className="title-color">
                                Skilled Name{" "}
                                <span className="text-danger">*</span> (EN)
                              </label>
                              <input
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder="Enter Skill Name"
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

export default UpdateSkill;
