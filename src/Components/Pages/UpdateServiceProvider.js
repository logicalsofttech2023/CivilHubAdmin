import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebarr from "../Sidebar";
import swal from "sweetalert";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  Box,
  Chip,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Button,
  Typography,
  Input,
  Avatar,
  IconButton,
  FormHelperText,
} from "@mui/material";
import GoogleMapReact from "google-map-react";
import { IoMdCloseCircle } from "react-icons/io";

const UpdateServiceProvider = () => {
  const navigate = useNavigate();
  let token = secureLocalStorage.getItem("adminidtoken");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState([]); // Changed to array
  const [subCategory, setSubCategoryList] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState([]); // Changed to array
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const id = location.state?.id || "";

  const getServiceProviderDetails = () => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/service_provider_details/${id}`, options)
      .then((res) => {
        setTitle(res.data.data.title);
        setDescription(res.data.data.description);
        setCategoryId(res.data.data.serviceprovidercat_id._id);
        setSubCategoryId(res.data.data.serviceprovidersubcat_id._id);
        getSubCategoryList(res.data.data.serviceprovidercat_id._id);
      setProfileImage(`${process.env.REACT_APP_API_KEY}uploads/admin/${res.data.data.image}`);
      })
      .catch((error) => {
        console.log("error", error);
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    const newErrors = {};
    if (!title) newErrors.title = "Please enter title";
    if (!description) newErrors.description = "Please enter description";
    if (categoryId.length === 0) newErrors.categoryId = "Please select category";
    // if (subCategoryId.length === 0) newErrors.subCategoryId = "Please select subcategory";

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("serviceproviderID", id);
    data.append("title", title);
    data.append("description", description);
    data.append("serviceprovidercat_id", categoryId);
    data.append("serviceprovidersubcat_id", subCategoryId);
    if (profileImage) data.append("image", profileImage);

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/update_service_provider`,
        data,
        options
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.msg);
          setTimeout(() => {
            navigate("/serviceProvider");
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getCategoryList = () => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/api/all_provider_service_cat`,
        options
      )
      .then((res) => {
        setCategoryList(res.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  

  const getSubCategoryList = (categoryIds) => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}admin/api/service_provider_cat_by_subcategory/${categoryIds}`,
       
        options
      )
      .then((res) => {
        setSubCategoryList(res.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    getCategoryList();
    getServiceProviderDetails();
  }, []);

  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    setter(file);
  };

  const renderFilePreview = (file, setter, isImage = false) => (
  <Box display="flex" alignItems="center" mt={1} gap={1}>
    {isImage ? (
      <Avatar
        alt="Preview"
        src={file ? (typeof file === 'string' ? file : URL.createObjectURL(file)) : ""}
        sx={{ width: 200, height: 200, borderRadius: 1, objectFit: "cover" }}
        variant="rounded"
      />
    ) : (
      <Typography variant="body2">{file?.name}</Typography>
    )}
    <IconButton onClick={() => {
      setter(null);
      if (isImage) setProfileImage("");
    }} size="small">
      <IoMdCloseCircle />
    </IconButton>
  </Box>
);

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
                  alt=""
                />
                Update Service Provider
              </h2>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-6">
                          <TextField
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            name="title"
                            placeholder="Enter title"
                            fullWidth
                            margin="normal"
                            error={!!errors.title}
                          />
                          {errors.title && (
                            <FormHelperText error>
                              {errors.title}
                            </FormHelperText>
                          )}
                        </div>

                        <div className="col-lg-6">
                          <FormControl fullWidth margin="normal" error={!!errors.categoryId}>
  <InputLabel id="freelancer-category-label">Category</InputLabel>
  <Select
    labelId="freelancer-category-label"
    id="freelancer-category"
    value={categoryId}
    onChange={(e) => {
      const selectedId = e.target.value;
      setCategoryId(selectedId);
      getSubCategoryList(selectedId);
    }}
    name="categoryId"
    label="Category"
  >
    {categoryList?.map((cat) => (
      <MenuItem key={cat._id} value={cat._id}>
        {cat.title}
      </MenuItem>
    ))}
  </Select>
  {errors.categoryId && (
    <FormHelperText error>{errors.categoryId}</FormHelperText>
  )}
</FormControl>
                        </div>

                        <div className="col-lg-12">
                          <FormControl fullWidth margin="normal" error={!!errors.subCategoryId}>
  <InputLabel id="freelancer-sub-category-label">Sub Category</InputLabel>
  <Select
    labelId="freelancer-sub-category-label"
    id="freelancer-sub-category"
    value={subCategoryId}
    onChange={(e) => {
      setSubCategoryId(e.target.value);
    }}
    name="subCategoryId"
    label="Sub Category"
  >
    {subCategory?.map((cat) => (
      <MenuItem key={cat._id} value={cat._id}>
        {cat.title}
      </MenuItem>
    ))}
  </Select>
  {errors.subCategoryId && (
    <FormHelperText error>{errors.subCategoryId}</FormHelperText>
  )}
</FormControl>
                        </div>

                        <div className="col-lg-12">
                          <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            name="description"
                            placeholder="Enter description"
                            multiline
                            rows={4}
                            fullWidth
                            margin="normal"
                            error={!!errors.description}
                          />
                          {errors.description && (
                            <FormHelperText error>
                              {errors.description}
                            </FormHelperText>
                          )}
                        </div>

                        <div className="col-lg-6 mt-3">
                          <Typography>Profile Image (Optional)</Typography>
                          <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                            sx={{ marginTop: "10px" }}
                          >
                            Upload Profile Image
                            <input
                              hidden
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleFileChange(e, setProfileImage)
                              }
                            />
                          </Button>
                          {profileImage &&
                            renderFilePreview(
                              profileImage,
                              setProfileImage,
                              true
                            )}
                        </div>
                      </div>

                      <div
                        style={{ width: "100%" }}
                        className="d-flex flex-wrap gap-2 justify-content-end mt-5"
                      >
                        <button
                          type="submit"
                          className="btn btn--primary"
                          disabled={loading}
                          style={{ width: "100%" }}
                        >
                          {loading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Processing...
                            </>
                          ) : (
                            "Submit"
                          )}
                        </button>
                      </div>
                    </form>
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

export default UpdateServiceProvider;
