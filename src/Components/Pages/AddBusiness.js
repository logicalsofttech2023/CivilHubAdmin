import React, { useEffect, useState } from "react";
import Header from "../Header";
import Sidebarr from "../Sidebar";
import swal from "sweetalert";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { Navigate, useNavigate } from "react-router-dom";
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
const Marker = ({ text }) => (
  <div
    style={{
      color: "white",
      background: "red",
      padding: "5px",
      borderRadius: "50%",
    }}
  >
    {text}
  </div>
);

const AddBusiness = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [panCard, setPanCard] = useState(null);
  const [gstCertificate, setGstCertificate] = useState(null);
  const [gstNumber, setGstNumber] = useState();
  const [panNumber, setPanNumber] = useState();
  const [description, setDescription] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [mobile, setMobile] = useState();
  const [accountType, setAccountType] = useState("Business");
  const [profileImage, setProfileImage] = useState(null);

  let token = secureLocalStorage.getItem("adminidtoken");

  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const newErrors = {};

    if (!firstName) newErrors.firstName = "Please enter first name";
    if (!lastName) newErrors.lastName = "Please enter last name";
    if (!email) newErrors.email = "Please enter email";
    if (!password) newErrors.password = "Please enter password";
    if (!description) newErrors.description = "Please enter description";
    if (!mobile) newErrors.mobile = "Please enter mobile number";
    if (!address) newErrors.address = "Please enter address";
    if (!gstNumber) newErrors.gstNumber = "Please enter GST number";
    if (!panNumber) newErrors.panNumber = "Please enter PAN number";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return;
    }

    var data = new FormData();
    data.append("first_name", firstName);
    data.append("last_name", lastName);
    data.append("email", email);
    data.append("password", password);
    data.append("description", description);
    data.append("latitude", latitude);
    data.append("longitude", longitude);
    data.append("address", address);
    data.append("mobile", mobile);
    data.append("account_type", accountType);

    if (panCard) data.append("panCard", panCard);
    if (gstCertificate) data.append("gstCertificate", gstCertificate);
    if (profileImage) data.append("profile_image", profileImage);

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/add_user_by_admin`,
        data,
        options
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.msg);
          setLoading(false);
          setTimeout(() => {
            navigate("/businessList");
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    setter(file);
  };

  const renderFilePreview = (file, setter, isImage = false) => (
    <Box display="flex" alignItems="center" mt={1} gap={1}>
      {isImage ? (
        <Avatar
          alt="Preview"
          src={file ? URL.createObjectURL(file) : ""}
          sx={{ width: 200, height: 200, borderRadius: 1, objectFit: "cover" }}
          variant="rounded"
        />
      ) : (
        <Typography variant="body2">{file.name}</Typography>
      )}
      <IconButton onClick={() => setter(null)} size="small">
        <IoMdCloseCircle />
      </IconButton>
    </Box>
  );

  const handleAddressChange = async (e) => {
    const value = e.target.value;
    setAddress(value);

    if (value) {
      try {
        const response = await axios.get(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&apiKey=9b01ac1abb1a47b69280eb823c7e6b5b`
        );
        setSuggestions(response.data.features || []);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setLatitude(suggestion.geometry.coordinates[1]);
    setLongitude(suggestion.geometry.coordinates[0]);
    setAddress(suggestion.properties.formatted);
    setSuggestions([]);
  };

  return (
    <div>
      <Toaster />
      {/* <Header /> */}
      <div
        className="container row"
        style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
      >
        <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3 mb-5">
            <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
              <h2 className="h1 mb-0">
                <img
                  src="https://6valley.6amtech.com/public/assets/back-end/img/brand-setup.png"
                  className="mb-1 mr-1"
                  alt
                />
                Add Business
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
                            label="First Name (EN)"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            name="firstName"
                            placeholder="Enter first name"
                            fullWidth
                            margin="normal"
                            error={!!errors.firstName}
                          />
                          {errors.firstName && (
                            <FormHelperText error>
                              {errors.firstName}
                            </FormHelperText>
                          )}
                        </div>

                        <div className="col-lg-6">
                          <TextField
                            label="Last Name (EN)"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            name="lastName"
                            placeholder="Enter last name"
                            fullWidth
                            margin="normal"
                            error={!!errors.lastName}
                          />
                          {errors.lastName && (
                            <FormHelperText error>
                              {errors.lastName}
                            </FormHelperText>
                          )}
                        </div>

                        <div className="col-lg-6">
                          <TextField
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            fullWidth
                            margin="normal"
                            error={!!errors.email}
                          />
                          {errors.email && (
                            <FormHelperText error>
                              {errors.email}
                            </FormHelperText>
                          )}
                        </div>

                        <div className="col-lg-6">
                          <TextField
                            label="Mobile"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            name="mobile"
                            type="tel"
                            placeholder="Enter mobile number"
                            fullWidth
                            margin="normal"
                            error={!!errors.mobile}
                          />
                          {errors.mobile && (
                            <FormHelperText error>
                              {errors.mobile}
                            </FormHelperText>
                          )}
                        </div>

                        <div className="col-lg-6">
                          <TextField
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            fullWidth
                            margin="normal"
                            error={!!errors.password}
                          />
                          {errors.password && (
                            <FormHelperText error>
                              {errors.password}
                            </FormHelperText>
                          )}
                        </div>

                        <div className="col-lg-6">
                          <TextField
                            label="Address"
                            value={address}
                            onChange={handleAddressChange}
                            name="address"
                            placeholder="Enter address"
                            fullWidth
                            margin="normal"
                            error={!!errors.address}
                          />
                          {errors.address && (
                            <FormHelperText error>
                              {errors.address}
                            </FormHelperText>
                          )}

                          {suggestions.length > 0 && (
                            <ul
                              style={{
                                listStyle: "none",
                                padding: 0,
                                margin: 0,
                                border: "1px solid #ddd",
                                borderRadius: "4px",
                                maxHeight: "200px",
                                overflowY: "auto",
                                position: "absolute",
                                zIndex: 1000,
                                width: "100%",
                                backgroundColor: "white",
                              }}
                            >
                              {suggestions.map((suggestion, index) => (
                                <li
                                  key={index}
                                  onClick={() =>
                                    handleSuggestionSelect(suggestion)
                                  }
                                  style={{
                                    padding: "8px 16px",
                                    cursor: "pointer",
                                    borderBottom: "1px solid #eee",
                                    "&:hover": {
                                      backgroundColor: "#f5f5f5",
                                    },
                                  }}
                                >
                                  {suggestion.properties.formatted}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div className="col-lg-6">
                          <FormControl
                            fullWidth
                            margin="normal"
                            error={!!errors.accountType}
                          >
                            <InputLabel id="account-type-label">
                              Account Type
                            </InputLabel>
                            <Select
                              labelId="account-type-label"
                              id="account-type"
                              value={accountType}
                              onChange={(e) => setAccountType(e.target.value)}
                              name="accountType"
                              label="Account Type"
                            >
                              <MenuItem selected value="Business">
                                Business
                              </MenuItem>
                            </Select>
                            {errors.accountType && (
                              <FormHelperText error>
                                {errors.accountType}
                              </FormHelperText>
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

                        <div className="col-lg-6">
                          <TextField
                            label="Pan Number"
                            value={panNumber}
                            onChange={(e) => setPanNumber(e.target.value)}
                            name="panNumber"
                            placeholder="Pan Number"
                            fullWidth
                            margin="normal"
                            error={!!errors.panNumber}
                          />
                          {errors.panNumber && (
                            <FormHelperText error>
                              {errors.panNumber}
                            </FormHelperText>
                          )}
                        </div>

                        <div className="col-lg-6">
                          <TextField
                            label="GST Number"
                            value={gstNumber}
                            onChange={(e) => setGstNumber(e.target.value)}
                            name="gstNumber"
                            placeholder="GST Number"
                            fullWidth
                            margin="normal"
                            error={!!errors.gstNumber}
                          />
                          {errors.gstNumber && (
                            <FormHelperText error>
                              {errors.gstNumber}
                            </FormHelperText>
                          )}
                        </div>

                        <div className="col-lg-6 mt-3">
                          <Typography>PAN Card (Optional)</Typography>
                          <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                            error={!!errors.panCard}
                          >
                            Upload PAN Card
                            <input
                              hidden
                              type="file"
                              onChange={(e) => handleFileChange(e, setPanCard)}
                            />
                          </Button>
                          {panCard && renderFilePreview(panCard, setPanCard)}
                          {errors.panCard && (
                            <FormHelperText error>
                              {errors.panCard}
                            </FormHelperText>
                          )}
                        </div>

                        <div className="col-lg-6 mt-3">
                          <Typography>GST Certificate (Optional)</Typography>
                          <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                            sx={{ marginBottom: "15px" }}
                            error={!!errors.gstCertificate}
                          >
                            Upload GST Certificate
                            <input
                              hidden
                              type="file"
                              onChange={(e) =>
                                handleFileChange(e, setGstCertificate)
                              }
                            />
                          </Button>
                          {gstCertificate &&
                            renderFilePreview(
                              gstCertificate,
                              setGstCertificate
                            )}
                          {errors.gstCertificate && (
                            <FormHelperText error>
                              {errors.gstCertificate}
                            </FormHelperText>
                          )}
                        </div>

                        <div className="col-lg-6 mb-3">
                          <Typography>Profile Image (Optional)</Typography>
                          <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                            error={!!errors.profileImage}
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
                          {errors.profileImage && (
                            <FormHelperText error>
                              {errors.profileImage}
                            </FormHelperText>
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

export default AddBusiness;
