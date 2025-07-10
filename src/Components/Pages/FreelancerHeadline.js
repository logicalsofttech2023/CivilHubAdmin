import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";
import Editor from "./Editor";

const FreelancerHeadline = () => {
  const [data, setData] = useState([]);
  const [headline, setHeadline] = useState("");
  const [subHeadline, setSubHeadline] = useState("");
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
  const token = secureLocalStorage.getItem("adminidtoken");
  const [preview, setPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm = (event) => {
    setIsSubmitting(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append("headline", headline || data[0]?.headline);
    formData.append("subheadline", subHeadline || data[0]?.subHeadline);

    if (image) {
      formData.append("image", image); // Only append if a new file is selected
    }

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // important for file upload
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/AddOrUpdateFreelancerHeadline`,
        formData,
        options
      )
      .then((res) => {
        toast.success(res?.data?.msg || "About us Data Updated Successfully");
        getData();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const getData = () => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/api/GetFreelancerHeadline`,
        options
      )
      .then((res) => {
        console.log(res);
        const data = res.data.data;
        if (data) {
          setData([data]);
          setHeadline(data.headline);
          setSubHeadline(data.subheadline || "");
          setImage(data.image || "");
          setId(data._id || "");
          setPreview(
            `${process.env.REACT_APP_API_KEY}uploads/admin/${data.image}`
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Toaster />
      {/* <Header /> */}
      <div className="container-fluid px-0 mx-0">
        <div className="row g-0">
          <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

          <div
            className="col-lg-9 col-md-8 px-4 py-4"
            style={{ marginTop: "60px" }}
          >
            <div className="dashboard-content">
              {/* Header Section */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="icon-circle bg-primary-light">
                    <img
                      width={24}
                      src="https://6valley.6amtech.com/public/assets/back-end/img/banner.png"
                      alt="Banner icon"
                      className="img-fluid"
                    />
                  </div>
                  <h1 className="h3 mb-0 text-dark">Freelancer Headline</h1>
                </div>
              </div>

              {/* Main Card */}
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white border-bottom py-3">
                  <h2 className="h5 mb-0 text-dark">
                    Freelancer Headline
                  </h2>
                </div>

                <form onSubmit={submitForm}>
                  <div className="card-body p-4">
                    {/* Headline Editor */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold text-dark mb-2">
                        Headline
                      </label>
                      <div className="border rounded-3 overflow-hidden">
                        <Editor
                          value={headline}
                          onChange={setHeadline}
                          className="border-0"
                        />
                      </div>
                    </div>

                    {/* Sub Headline Editor */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold text-dark mb-2">
                        Sub Headline
                      </label>
                      <div className="border rounded-3 overflow-hidden">
                        <Editor
                          value={subHeadline}
                          onChange={setSubHeadline}
                          className="border-0"
                        />
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                      <label className="form-label fw-semibold text-dark mb-2">
                        Banner Image
                      </label>
                      <div className="border rounded-3 p-3">
                        <div className="mb-3">
                          <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                setImage(file);
                                setPreview(URL.createObjectURL(file));
                              }
                            }}
                          />
                          <div className="form-text">
                            Recommended size: 1200x400px
                          </div>
                        </div>

                        {preview && (
                          <div className="mt-3 text-center">
                            <img
                              src={preview}
                              alt="Preview"
                              className="img-fluid rounded-3 shadow-sm"
                              style={{
                                maxHeight: "500px",
                                objectFit: "cover",
                                width: "100%",
                                border: "1px solid #eee",
                              }}
                            />
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger mt-2"
                              onClick={() => {
                                setImage(null);
                                setPreview(null);
                              }}
                            >
                              Remove Image
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="d-flex justify-content-end mt-4">
                      <button
                        type="submit"
                        className="btn btn-primary px-4 py-2"
                        style={{ minWidth: "150px" }}
                      >
                        {isSubmitting ? "Updating..." : "Update"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerHeadline;
