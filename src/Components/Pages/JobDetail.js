import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { ColorRing } from "react-loader-spinner";

const JobDetail = () => {
  const location = useLocation();
  const { jobId } = location?.state;
  const [loading, setLoading] = useState(true);
  let token = secureLocalStorage.getItem("adminidtoken");
  const [jobData, setJobData] = useState(null);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_KEY}admin/api/admin_job_details/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJobData(response.data.data[0]); // Accessing the first item in the data array
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
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

  if (!jobData) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="fs-5 text-danger">No job data found</div>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-5 mb-5" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <div className="row">
        <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>
        
        <div className="col-lg-9 col-md-8 mt-5 pt-3">
          <div className="card shadow-sm border-0" style={{ borderRadius: '12px', overflow: 'hidden' }}>
            <div className="card-header bg-white border-0" style={{ padding: '1.5rem', borderBottom: '1px solid #f0f0f0' }}>
              <h2 className="h4 mb-0 d-flex align-items-center" style={{ fontWeight: '600', color: '#2c3e50' }}>
                <i className="bi bi-briefcase me-2" style={{ fontSize: '1.5rem', color: '#3498db' }}></i>
                Job Details
              </h2>
            </div>
            
            <div className="card-body" style={{ padding: '2rem' }}>
              <div className="row mb-4">
                <div className="col-md-8">
                  <h3 className="mb-3" style={{ fontWeight: '700', color: '#2c3e50', fontSize: '1.8rem' }}>{jobData.job_title}</h3>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <span className="badge" style={{ backgroundColor: '#e3f2fd', color: '#1976d2', padding: '0.5rem 0.8rem', borderRadius: '8px', fontWeight: '500' }}>
                      {jobData.job_type}
                    </span>
                    <span className="badge" style={{ backgroundColor: '#e8f5e9', color: '#388e3c', padding: '0.5rem 0.8rem', borderRadius: '8px', fontWeight: '500' }}>
                      {jobData.work_location_type}
                    </span>
                    <span className="badge" style={{ backgroundColor: '#fff8e1', color: '#ff8f00', padding: '0.5rem 0.8rem', borderRadius: '8px', fontWeight: '500' }}>
                      {jobData.experience}
                    </span>
                  </div>
                  <p className="mb-4" style={{ color: '#7f8c8d', fontSize: '1rem' }}>
                    <i className="bi bi-geo-alt me-2" style={{ color: '#e74c3c' }}></i>
                    {jobData.location}
                  </p>
                </div>
                <div className="col-md-4">
                  <div className="card p-3" style={{ backgroundColor: '#f8f9fa', border: 'none', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h5 className="mb-3" style={{ fontWeight: '600', color: '#2c3e50' }}>Salary Range</h5>
                    <p className="mb-1" style={{ fontSize: '0.95rem' }}>
                      <strong style={{ color: '#7f8c8d' }}>Min:</strong> 
                      <span style={{ color: '#27ae60', fontWeight: '600', marginLeft: '0.5rem' }}>₹{jobData.min_salary}</span>
                    </p>
                    <p style={{ fontSize: '0.95rem' }}>
                      <strong style={{ color: '#7f8c8d' }}>Max:</strong> 
                      <span style={{ color: '#27ae60', fontWeight: '600', marginLeft: '0.5rem' }}>₹{jobData.mxn_salary}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-8">
                  <div className="mb-4">
                    <h5 className="mb-3" style={{ fontWeight: '600', color: '#2c3e50', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Job Description</h5>
                    <p style={{ color: '#555', lineHeight: '1.7', fontSize: '1rem' }}>{jobData.job_description}</p>
                  </div>

                  <div className="mb-4">
                    <h5 className="mb-3" style={{ fontWeight: '600', color: '#2c3e50', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Responsibilities</h5>
                    <p style={{ color: '#555', lineHeight: '1.7', fontSize: '1rem' }}>{jobData.job_responsibilities}</p>
                  </div>

                  <div className="mb-4">
                    <h5 className="mb-3" style={{ fontWeight: '600', color: '#2c3e50', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Required Skills</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {jobData?.skills?.map((skill, index) => (
                        <span key={index} className="badge" style={{ 
                          backgroundColor: '#e0f7fa', 
                          color: '#00acc1', 
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          fontWeight: '500',
                          fontSize: '0.85rem'
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="card p-3 mb-4" style={{ border: 'none', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h5 className="mb-3" style={{ fontWeight: '600', color: '#2c3e50' }}>Requirements</h5>
                    <ul className="list-unstyled" style={{ lineHeight: '2' }}>
                      <li className="mb-2">
                        <strong style={{ color: '#7f8c8d' }}>Education:</strong> 
                        <span style={{ color: '#555', marginLeft: '0.5rem' }}>{jobData.education}</span>
                      </li>
                      <li className="mb-2">
                        <strong style={{ color: '#7f8c8d' }}>English Level:</strong> 
                        <span style={{ color: '#555', marginLeft: '0.5rem' }}>{jobData.english}</span>
                      </li>
                      <li>
                        <strong style={{ color: '#7f8c8d' }}>Experience:</strong> 
                        <span style={{ color: '#555', marginLeft: '0.5rem' }}>{jobData.experience}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="card p-3" style={{ border: 'none', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h5 className="mb-3" style={{ fontWeight: '600', color: '#2c3e50' }}>Additional Information</h5>
                    <ul className="list-unstyled" style={{ lineHeight: '2' }}>
                      <li className="mb-2">
                        <strong style={{ color: '#7f8c8d' }}>Total Proposals:</strong> 
                        <span style={{ color: '#555', marginLeft: '0.5rem' }}>{jobData.total_proposal}</span>
                      </li>
                      <li>
                        <strong style={{ color: '#7f8c8d' }}>Favorite Status:</strong> 
                        <span style={{ 
                          color: jobData.favorite_status === "1" ? '#27ae60' : '#e74c3c', 
                          marginLeft: '0.5rem',
                          fontWeight: '500'
                        }}>
                          {jobData.favorite_status === "1" ? "Yes" : "No"}
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
  );
};

export default JobDetail;