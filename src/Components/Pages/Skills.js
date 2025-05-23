import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "react-js-pagination";
import { ColorRing } from "react-loader-spinner";

const Skills = () => {
  const navigate = useNavigate();
  const [skillName, setSkillName] = useState("");
  const [skillsList, setSkillsList] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;
  const [totalSkills, setTotalSkills] = useState(0);
  const token = secureLocalStorage.getItem("adminidtoken");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFilteredSkills(skillsList);
  }, [skillsList]);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/admin_all_skills`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res?.data?.data || [];
        setSkillsList(data);
        setTotalSkills(data.length);
      })
      .catch((error) => {
        toast.error("Failed to fetch skills list");
      })
      .finally(() => setLoading(false));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!skillName.trim()) {
      toast.error("Skill name is required");
      return;
    }

    setIsSubmitting(true);
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/admin_add_skills`,
        { name: skillName },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        toast.success(res?.data?.msg || "Skill added successfully");
        swal("Success", "Skill added successfully", "success");
        setSkillName("");
        fetchSkills();
      })
      .catch(() => {
        toast.error("Failed to add skill");
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = skillsList.filter((item) =>
      item.name?.toLowerCase().includes(searchTerm)
    );
    setFilteredSkills(filtered);
    setActivePage(1);
  };

  const handleDeleteSkill = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, this skill cannot be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((confirm) => {
      if (confirm) {
        axios
          .post(
            `${process.env.REACT_APP_API_KEY}admin/api/admin_skill_delete`,
            { skillId: id },
            { headers: { Authorization: `Bearer ${token}` } }
          )
          .then(() => {
            toast.success("Skill deleted successfully");
            fetchSkills();
          })
          .catch(() => {
            toast.error("Failed to delete skill");
          });
      }
    });
  };

  const toggleSkillStatus = (id) => {
    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/activeDeactive_category`,
        { categoryId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        toast.success(res?.data?.message || "Status updated");
        fetchSkills();
      })
      .catch(() => {
        toast.error("Failed to update status");
      });
  };

  const handleEditSkill = (id) => {
    secureLocalStorage.setItem("categoryid", id);
    navigate("/updateSkill");
  };

  const renderSkillRow = (skill, index) => {
    const serial = (activePage - 1) * itemsPerPage + index + 1;
    const isActive = skill?.acrtive_status !== 0;

    return (
      <tr key={skill._id}>
        <td>{serial}</td>
        <td>{skill?.name}</td>
        <td>{new Date(skill?.updatedAt).toLocaleString()}</td>
        <td>
          <label className="switcher">
            <input
              type="checkbox"
              className="switcher_input"
              checked={isActive}
              onChange={() => toggleSkillStatus(skill._id)}
            />
            <span className="switcher_control" />
          </label>
        </td>
        <td>
          <div className="d-flex gap-10 justify-content-center">
            <button
              className="btn btn-outline--primary btn-sm"
              title="Edit"
              onClick={() => handleEditSkill(skill._id)}
            >
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              title="Delete"
              onClick={() => handleDeleteSkill(skill._id)}
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
                Skills
              </h2>
            </div>

            {/* Add Skill Form */}
            <div className="card mb-4">
              <div className="card-body">
                <form onSubmit={handleAddSkill}>
                  <div className="row">
                    <div className="col-lg-6">
                      <label className="title-color">
                        Skill Name <span className="text-danger">*</span> (EN)
                      </label>
                      <input
                        value={skillName}
                        onChange={(e) => setSkillName(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Enter new skill"
                        required
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mt-3">
                    <button type="submit" className="btn btn--primary">
                      {isSubmitting ? "Adding..." : "Add Skill"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Skill List */}
            <div className="card">
              <div className="px-3 py-4">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h5 className="text-capitalize d-flex gap-1">
                      Skill List
                      <span className="badge badge-soft-dark radius-50 fz-12">{totalSkills}</span>
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
                        placeholder="Search skills..."
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
                ) : filteredSkills.length > 0 ? (
                  <table className="table table-hover table-borderless table-thead-bordered table-nowrap">
                    <thead className="thead-light">
                      <tr>
                        <th>Sr.No</th>
                        <th>Skill Name</th>
                        <th>Date/Time</th>
                        <th>Status</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSkills
                        .slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)
                        .map(renderSkillRow)}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center p-4">
                    <img
                      className="mb-3 w-160"
                      src="https://6valley.6amtech.com/public/assets/back-end/img/empty-state-icon/default.png"
                      alt="No Data"
                    />
                    <p>No skills found</p>
                  </div>
                )}
              </div>

              {filteredSkills.length > itemsPerPage && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={filteredSkills.length}
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

export default Skills;
