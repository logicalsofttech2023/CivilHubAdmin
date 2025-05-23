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
  FormControlLabel,
} from "@mui/material";
import GoogleMapReact from "google-map-react";
import { IoMdCloseCircle } from "react-icons/io";
import { Stepper, Step, StepLabel } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const AddTendor = () => {
  const navigate = useNavigate();
  let token = secureLocalStorage.getItem("adminidtoken");

  const [title, setTitle] = useState();
  const [workDescription, setWorkDescription] = useState();
  const [preQualification, setPreQualification] = useState();
  const [remarks, setRemarks] = useState();
  const [tendorValue, setTendorValue] = useState();
  const [productCategory, setProductCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [contractType, setContractType] = useState();
  const [bidValidity, setBidValidity] = useState();
  const [periodOfWork, setPeriodOfWork] = useState();
  const [location, setLocation] = useState("");
  const [pincode, setPincode] = useState();
  const [preBidMeetingAddress, setPreBidMeetingAddress] = useState();
  const [bidOpeningPlace, setBidOpeningPlace] = useState();
  const [tendorInvitingName, setTendorInvitingName] = useState();
  const [tendorInvitingAddress, setTendorInvitingAddress] = useState();
  const [preBidMeetingDate, setPreBidMeetingDate] = useState();
  const [allowNDATendor, setAllowNDATendor] = useState(false);
  const [allowPreferentialBidder, setAllowPreferentialBidder] = useState(false);
  const [publishedDate, setPublishedDate] = useState();
  const [bidOpeningDate, setBidOpeningDate] = useState();
  const [documentStartDate, setDocumentStartDate] = useState();
  const [documentEndDate, setDocumentEndDate] = useState();
  const [clarificationStartDate, setClarificationStartDate] = useState();
  const [clarificationEndDate, setClarificationEndDate] = useState();
  const [bidSubmissionStartDate, setBidSubmissionStartDate] = useState();
  const [bidSubmissionEndDate, setBidSubmissionEndDate] = useState();
  const [tendorFeeIn, setTendorFeeIn] = useState();
  const [feePayableTo, setFeePayableTo] = useState();
  const [feePayableAt, setFeePayableAt] = useState();
  const [tendorFeeExemptionAllow, setTendorFeeExemptionAllow] = useState(false);
  const [emdAmmount, setEmdAmmount] = useState();
  const [emdFeeType, setEmdFeeType] = useState();
  const [emdPayableTo, setEmdPayableTo] = useState();
  const [emdExemptionAllow, setEmdExemptionAllow] = useState(false);
  const [emdPercentage, setEmdPercentage] = useState();
  const [emdPayableAt, setEmdPayableAt] = useState();
  const [organisationChain, setOrganisationChain] = useState();
  const [tendorReferenceNo, setTendorReferenceNo] = useState();
  const [tendorId, setTendorId] = useState();
  const [tendorType, setTendorType] = useState();
  const [tendorCategory, setTendorCategory] = useState();
  const [generalTechEvaluationAllow, setGeneralTechEvaluationAllow] =
    useState(false);
  const [paymentMode, setPaymentMode] = useState();
  const [multipleCurrencyAllow, setMultipleCurrencyAllow] = useState(false);
  const [withdrawlAllow, setWithdrawlAllow] = useState(false);

  const [itemwiseTechEvaluationAllow, setItemwiseTechEvaluationAllow] =
    useState(false);
  const [multipleCurrencyAllowBDQ, setMultipleCurrencyAllowBDQ] =
    useState(false);
  const [allowTwoStageBidding, setAllowTwoStageBidding] = useState(false);

  const [formOfContract, setFormOfContract] = useState();
  const [noOfCovers, setNoOfCovers] = useState();
  const [closeingDate, setCloseingDate] = useState();
  const [tendorAmmount, setTendorAmmount] = useState();
  const [workItemType, setWorkItemType] = useState();
  const [preBidMeetingPlace, setPreBidMeetingPlace] = useState();

  // File Upload States
  const [featuredImage, setFeaturedImage] = useState(null);

  // Replace individual states with arrays
  // Initialize with one empty document for each type
  const [nitDocuments, setNitDocuments] = useState([
    {
      nitDocFile: null,
      nitDescription: "",
      nitSize: "",
    },
  ]);

  const [preBidDocuments, setPreBidDocuments] = useState([
    {
      preBidDocFile: null,
      preBidDescription: "",
      preBidSize: "",
    },
  ]);

  const [workItemDocuments, setWorkItemDocuments] = useState([
    {
      workItemDocFile: null,
      workItemDescription: "",
      workItemType: "",
      workItemSize: "",
    },
  ]);

  const [corrigendumDocuments, setCorrigendumDocuments] = useState([
    {
      corrigendumDocFile: null,
      corrigendumTitle: "",
      corrigendumType: "",
    },
  ]);

  // Error handling
  const [suggestions, setSuggestions] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const validateStep = (stepNumber) => {
    const newErrors = {};

    switch (stepNumber) {
      case 1:
        if (!title) newErrors.title = "Title is required";
        if (!workDescription)
          newErrors.workDescription = "Work description is required";
        if (!location) newErrors.location = "Location is required";

        break;
      // Add more cases as needed
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = (e) => {
    e.preventDefault();
    setStep((prevStep) => prevStep - 1);
  };
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();

    // Basic Information
    formData.append("title", title);
    formData.append("work_description", workDescription);
    formData.append("pre_qualification", preQualification || "");
    formData.append("remarks", remarks || "");
    formData.append("tendor_value", tendorValue || "");
    formData.append("product_category", productCategory || "");
    formData.append("sub_category", subCategory || "");
    formData.append("contract_type", contractType || "");
    formData.append("bid_validity", bidValidity || "");
    formData.append("period_of_work", periodOfWork || "");
    formData.append("location", location);
    formData.append("pincode", pincode || "");
    formData.append("pre_bid_meeting_address", preBidMeetingAddress || "");
    formData.append("bid_opening_place", bidOpeningPlace || "");
    formData.append("tendor_inviting_name", tendorInvitingName || "");
    formData.append("tendor_inviting_address", tendorInvitingAddress || "");

    // Dates
    formData.append("pre_bid_meeting_date", preBidMeetingDate || "");
    formData.append("published_date", publishedDate || "");
    formData.append("bid_opening_date", bidOpeningDate || "");
    formData.append("document_start_date", documentStartDate || "");
    formData.append("document_end_date", documentEndDate || "");
    formData.append("clarification_start_date", clarificationStartDate || "");
    formData.append("clarification_end_date", clarificationEndDate || "");
    formData.append("bid_submission_start_date", bidSubmissionStartDate || "");
    formData.append("bid_submission_end_date", bidSubmissionEndDate || "");
    formData.append("closeing_date", closeingDate || "");

    // Flags
    formData.append("allow_nda_tendor", allowNDATendor);
    formData.append("allow_preferential_bidder", allowPreferentialBidder);
    formData.append("tendor_fee_exemption_allow", tendorFeeExemptionAllow);
    formData.append("emd_exemption_allow", emdExemptionAllow);
    formData.append(
      "general_tech_evaluation_allow",
      generalTechEvaluationAllow
    );
    formData.append(
      "itemwise_tech_evaluation_allow",
      itemwiseTechEvaluationAllow
    );
    formData.append("multiple_curreny_allow", multipleCurrencyAllow);
    formData.append("multiple_curreny_allow_bdq", multipleCurrencyAllowBDQ);
    formData.append("allow_two_stage_bidding", allowTwoStageBidding);
    formData.append("withdrawl_allow", withdrawlAllow);

    // Finance
    formData.append("tendor_fee_in", tendorFeeIn || "");
    formData.append("fee_payable_to", feePayableTo || "");
    formData.append("fee_payable_at", feePayableAt || "");
    formData.append("emd_ammount", emdAmmount || "");
    formData.append("emd_fee_type", emdFeeType || "");
    formData.append("emd_payable_to", emdPayableTo || "");
    formData.append("emd_percentage", emdPercentage || "");
    formData.append("emd_payable_at", emdPayableAt || "");
    formData.append("tendor_ammount", tendorAmmount || "");

    // Additional Info
    formData.append("organisation_chain", organisationChain || "");
    formData.append("tendor_reference_no", tendorReferenceNo || "");
    formData.append("tendor_id", tendorId || "");
    formData.append("tendor_type", tendorType || "");
    formData.append("tendor_category", tendorCategory || "");
    formData.append("payment_mode", paymentMode || "");
    formData.append("form_of_contract", formOfContract || "");
    formData.append("no_of_covers", noOfCovers || "");
    formData.append("work_item_type", workItemType || "");
    formData.append("pre_bid_meeting_place", preBidMeetingPlace || "");

    // File Uploads
    if (featuredImage) formData.append("featured_image", featuredImage);

    // Handle multiple document uploads
    nitDocuments.forEach((doc, index) => {
      if (doc.nitDocFile) {
        formData.append(`nit_document[${index}][nit_doc_file]`, doc.nitDocFile);
      }
      formData.append(
        `nit_document[${index}][nit_description]`,
        doc.nitDescription || ""
      );
      formData.append(`nit_document[${index}][nit_size]`, doc.nitSize || "");
    });

    preBidDocuments.forEach((doc, index) => {
      if (doc.preBidDocFile) {
        formData.append(
          `pre_bid_meeting_document[${index}][pre_bid_doc_file]`,
          doc.preBidDocFile
        );
      }
      formData.append(
        `pre_bid_meeting_document[${index}][pre_bid_description]`,
        doc.preBidDescription || ""
      );
      formData.append(
        `pre_bid_meeting_document[${index}][pre_bid_size]`,
        doc.preBidSize || ""
      );
    });

    workItemDocuments.forEach((doc, index) => {
      if (doc.workItemDocFile) {
        formData.append(
          `work_item_document[${index}][work_item_doc_file]`,
          doc.workItemDocFile
        );
      }
      formData.append(
        `work_item_document[${index}][work_item_description]`,
        doc.workItemDescription || ""
      );
      formData.append(
        `work_item_document[${index}][work_item_type]`,
        doc.workItemType || ""
      );
      formData.append(
        `work_item_document[${index}][work_item_size]`,
        doc.workItemSize || ""
      );
    });

    corrigendumDocuments.forEach((doc, index) => {
      if (doc.corrigendumDocFile) {
        formData.append(
          `corrigendum_list[${index}][corrigendum_doc_file]`,
          doc.corrigendumDocFile
        );
      }
      formData.append(
        `corrigendum_list[${index}][corrigendum_title]`,
        doc.corrigendumTitle || ""
      );
      formData.append(
        `corrigendum_list[${index}][corrigendum_type]`,
        doc.corrigendumType || ""
      );
    });

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}admin/api/admin_add_tendor`,
        formData,
        options
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.msg);
          setTimeout(() => {
            navigate("/tenderList");
          })
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred while submitting the form");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // const handleFileChange = (e, setFile, setSize) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFile(file);

  //     // Check size and format it properly
  //     const sizeInKB = file.size / 1024;
  //     if (sizeInKB > 1024) {
  //       const sizeInMB = (sizeInKB / 1024).toFixed(2);
  //       setSize(`${sizeInMB} MB`);
  //     } else {
  //       setSize(`${sizeInKB.toFixed(2)} KB`);
  //     }
  //   }
  // };

  const renderFilePreview = (file, setFile, setSize = null) => {
    const fileUrl = file ? URL.createObjectURL(file) : "";

    const getPreview = () => {
      const fileType = file?.type || "";

      if (fileType.startsWith("image/")) {
        return (
          <Avatar
            alt="Preview"
            src={fileUrl}
            sx={{
              width: 200,
              height: 200,
              borderRadius: 1,
              objectFit: "cover",
            }}
            variant="rounded"
          />
        );
      }

      if (fileType === "application/pdf") {
        return (
          <iframe
            title="PDF Preview"
            src={fileUrl}
            style={{
              width: "200px",
              height: "200px",
              border: "1px solid #ccc",
            }}
          />
        );
      }

      return (
        <Box>
          <Typography variant="body2" fontWeight="bold">
            {file.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            ({fileType || "Unknown Type"})
          </Typography>
        </Box>
      );
    };

    return (
      <Box display="flex" alignItems="center" mt={1} gap={2}>
        {getPreview()}

        {/* View and Remove Buttons */}
        <Box display="flex" flexDirection="column" gap={1}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => window.open(fileUrl, "_blank")}
          >
            View
          </Button>

          <IconButton
            onClick={() => {
              setFile(null);
              if (typeof setSize === "function") {
                setSize("");
              }
            }}
            size="small"
            color="error"
            sx={{ width: 40, height: 40 }}
          >
            <IoMdCloseCircle />
          </IconButton>
        </Box>
      </Box>
    );
  };

  const handleAddressChange = async (e) => {
    const value = e.target.value;
    setLocation(value);

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
    setLocation(suggestion.properties.formatted);
    setSuggestions([]);
  };

  const handleFileChange = (event, setFileCallback, setSizeCallback = null) => {
    const file = event.target.files[0];
    if (file) {
      setFileCallback(file);
      if (setSizeCallback) {
        const size = formatFileSize(file.size);
        setSizeCallback(size);
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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
                Add Tendor Details
              </h2>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body" style={{ textAlign: "left" }}>
                    <Stepper
                      activeStep={step - 1}
                      style={{ marginBottom: "30px" }}
                    >
                      {[
                        "Work Item Details",
                        "Critical Dates",
                        "Tendors Documents",
                        "Basic Details",
                      ].map((label, i) => (
                        <Step key={i}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                    <form onSubmit={handleSubmit}>
                      {step === 1 && (
                        <>
                          {/* Basic fields UI */}
                          <div className="row">
                            <div className="col-lg-6">
                              <TextField
                                label="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                name="title"
                                type="text"
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
                              <TextField
                                label="productCategory"
                                value={productCategory}
                                onChange={(e) =>
                                  setProductCategory(e.target.value)
                                }
                                name="productCategory"
                                placeholder="Enter Product Category"
                                fullWidth
                                margin="normal"
                              />
                            </div>

                            <div className="col-lg-12">
                              <TextField
                                label="Description"
                                value={workDescription}
                                onChange={(e) =>
                                  setWorkDescription(e.target.value)
                                }
                                name="description"
                                placeholder="Enter description"
                                multiline
                                rows={4}
                                fullWidth
                                margin="normal"
                                error={!!errors.workDescription}
                              />
                              {errors.workDescription && (
                                <FormHelperText error>
                                  {errors.workDescription}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="col-lg-6">
                              <TextField
                                label="Location"
                                value={location}
                                onChange={handleAddressChange}
                                name="location"
                                placeholder="Enter location"
                                fullWidth
                                margin="normal"
                                error={!!errors.location}
                              />
                              {errors.location && (
                                <FormHelperText error>
                                  {errors.location}
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
                              <TextField
                                label="Sub Category"
                                value={subCategory}
                                onChange={(e) => setSubCategory(e.target.value)}
                                name="subCategory"
                                placeholder="Enter Sub Category"
                                fullWidth
                                margin="normal"
                              />
                            </div>

                            <div className="col-lg-6">
                              <TextField
                                label="Pincode"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                name="pincode"
                                placeholder="Enter pincode"
                                fullWidth
                                margin="normal"
                                error={!!errors.pincode}
                              />
                              {errors.pincode && (
                                <FormHelperText error>
                                  {errors.pincode}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="col-lg-6">
                              <TextField
                                label="Contract Type"
                                value={contractType}
                                onChange={(e) =>
                                  setContractType(e.target.value)
                                }
                                name="contractType"
                                placeholder="Enter contract type"
                                fullWidth
                                margin="normal"
                                error={!!errors.contractType}
                              />
                              {errors.contractType && (
                                <FormHelperText error>
                                  {errors.contractType}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="col-lg-6">
                              <TextField
                                label="Tender Value Type"
                                value={tendorValue}
                                onChange={(e) => setTendorValue(e.target.value)}
                                name="tendorValue"
                                placeholder="Enter tender value"
                                fullWidth
                                margin="normal"
                                error={!!errors.tendorValue}
                                type="number"
                              />
                              {errors.tendorValue && (
                                <FormHelperText error>
                                  {errors.tendorValue}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="col-lg-6">
                              <TextField
                                label="Period Of Work"
                                value={periodOfWork}
                                onChange={(e) =>
                                  setPeriodOfWork(e.target.value)
                                }
                                name="periodOfWork"
                                placeholder="Enter period of work"
                                fullWidth
                                margin="normal"
                                type="number"
                                error={!!errors.periodOfWork}
                              />
                              {errors.periodOfWork && (
                                <FormHelperText error>
                                  {errors.periodOfWork}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="col-lg-6">
                              <TextField
                                label="remarks"
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                name="remarks"
                                placeholder="Enter remarks"
                                fullWidth
                                margin="normal"
                                error={!!errors.remarks}
                              />
                              {errors.remarks && (
                                <FormHelperText error>
                                  {errors.remarks}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="col-lg-6">
                              <TextField
                                label="pre Qualification"
                                value={preQualification}
                                onChange={(e) =>
                                  setPreQualification(e.target.value)
                                }
                                name="preQualification"
                                placeholder="Enter pre Qualification"
                                fullWidth
                                margin="normal"
                                error={!!errors.preQualification}
                              />
                              {errors.preQualification && (
                                <FormHelperText error>
                                  {errors.preQualification}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="col-lg-6">
                              <TextField
                                label="bid Validity"
                                value={bidValidity}
                                onChange={(e) => setBidValidity(e.target.value)}
                                name="bidValidity"
                                placeholder="Enter bid validity"
                                fullWidth
                                margin="normal"
                                error={!!errors.bidValidity}
                                type="number"
                              />
                              {errors.bidValidity && (
                                <FormHelperText error>
                                  {errors.bidValidity}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="col-lg-6">
                              <TextField
                                label="pre Bid Meeting Address"
                                value={preBidMeetingAddress}
                                onChange={(e) =>
                                  setPreBidMeetingAddress(e.target.value)
                                }
                                name="preBidMeetingAddress"
                                placeholder="Enter pre-bid meeting address"
                                fullWidth
                                margin="normal"
                                error={!!errors.preBidMeetingAddress}
                              />
                              {errors.preBidMeetingAddress && (
                                <FormHelperText error>
                                  {errors.preBidMeetingAddress}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="col-lg-6">
                              <TextField
                                label="bid Opening Place"
                                value={bidOpeningPlace}
                                onChange={(e) =>
                                  setBidOpeningPlace(e.target.value)
                                }
                                name="bidOpeningPlace"
                                placeholder="Enter bid opening place"
                                fullWidth
                                margin="normal"
                                error={!!errors.bidOpeningPlace}
                              />
                              {errors.bidOpeningPlace && (
                                <FormHelperText error>
                                  {errors.bidOpeningPlace}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="col-lg-6">
                              <TextField
                                label="tendor Inviting Name"
                                value={tendorInvitingName}
                                onChange={(e) =>
                                  setTendorInvitingName(e.target.value)
                                }
                                name="tendorInvitingName"
                                placeholder="Enter tender inviting name"
                                fullWidth
                                margin="normal"
                                error={!!errors.tendorInvitingName}
                              />
                              {errors.tendorInvitingName && (
                                <FormHelperText error>
                                  {errors.tendorInvitingName}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="col-lg-6">
                              <TextField
                                label="tendor Inviting Address"
                                value={tendorInvitingAddress}
                                onChange={(e) =>
                                  setTendorInvitingAddress(e.target.value)
                                }
                                name="tendorInvitingAddress"
                                placeholder="Enter tender inviting address"
                                fullWidth
                                margin="normal"
                                error={!!errors.tendorInvitingAddress}
                              />
                              {errors.tendorInvitingAddress && (
                                <FormHelperText error>
                                  {errors.tendorInvitingAddress}
                                </FormHelperText>
                              )}
                            </div>
                          </div>
                        </>
                      )}

                      {step === 2 && (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <div
                            className="row"
                            style={{
                              rowGap: "20px",
                              columnGap: "0px",
                              marginTop: "10px",
                            }}
                          >
                            <div className="col-lg-6">
                              <DatePicker
                                label="Published Date"
                                value={
                                  publishedDate ? dayjs(publishedDate) : null
                                }
                                onChange={(newValue) =>
                                  setPublishedDate(
                                    newValue?.format("YYYY-MM-DD")
                                  )
                                }
                                slotProps={{ textField: { fullWidth: true } }}
                              />
                              {errors.publishedDate && (
                                <FormHelperText error>
                                  {errors.publishedDate}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="col-lg-6">
                              <DatePicker
                                label="Bid Opening Date"
                                value={
                                  bidOpeningDate ? dayjs(bidOpeningDate) : null
                                }
                                onChange={(newValue) =>
                                  setBidOpeningDate(
                                    newValue?.format("YYYY-MM-DD")
                                  )
                                }
                                slotProps={{ textField: { fullWidth: true } }}
                              />
                              {errors.bidOpeningDate && (
                                <FormHelperText error>
                                  {errors.bidOpeningDate}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="col-lg-6">
                              <DatePicker
                                label="Document Start Date"
                                value={
                                  documentStartDate
                                    ? dayjs(documentStartDate)
                                    : null
                                }
                                onChange={(newValue) =>
                                  setDocumentStartDate(
                                    newValue?.format("YYYY-MM-DD")
                                  )
                                }
                                slotProps={{ textField: { fullWidth: true } }}
                              />
                              {errors.documentStartDate && (
                                <FormHelperText error>
                                  {errors.documentStartDate}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="col-lg-6">
                              <DatePicker
                                label="Document End Date"
                                value={
                                  documentEndDate
                                    ? dayjs(documentEndDate)
                                    : null
                                }
                                onChange={(newValue) =>
                                  setDocumentEndDate(
                                    newValue?.format("YYYY-MM-DD")
                                  )
                                }
                                slotProps={{ textField: { fullWidth: true } }}
                              />
                              {errors.documentEndDate && (
                                <FormHelperText error>
                                  {errors.documentEndDate}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="col-lg-6">
                              <DatePicker
                                label="Clarification Start Date"
                                value={
                                  clarificationStartDate
                                    ? dayjs(clarificationStartDate)
                                    : null
                                }
                                onChange={(newValue) =>
                                  setClarificationStartDate(
                                    newValue?.format("YYYY-MM-DD")
                                  )
                                }
                                slotProps={{ textField: { fullWidth: true } }}
                              />
                              {errors.clarificationStartDate && (
                                <FormHelperText error>
                                  {errors.clarificationStartDate}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="col-lg-6">
                              <DatePicker
                                label="Clarification End Date"
                                value={
                                  clarificationEndDate
                                    ? dayjs(clarificationEndDate)
                                    : null
                                }
                                onChange={(newValue) =>
                                  setClarificationEndDate(
                                    newValue?.format("YYYY-MM-DD")
                                  )
                                }
                                slotProps={{ textField: { fullWidth: true } }}
                              />
                              {errors.clarificationEndDate && (
                                <FormHelperText error>
                                  {errors.clarificationEndDate}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="col-lg-6">
                              <DatePicker
                                label="Bid Submission Start Date"
                                value={
                                  bidSubmissionStartDate
                                    ? dayjs(bidSubmissionStartDate)
                                    : null
                                }
                                onChange={(newValue) =>
                                  setBidSubmissionStartDate(
                                    newValue?.format("YYYY-MM-DD")
                                  )
                                }
                                slotProps={{ textField: { fullWidth: true } }}
                              />
                              {errors.bidSubmissionStartDate && (
                                <FormHelperText error>
                                  {errors.bidSubmissionStartDate}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="col-lg-6">
                              <DatePicker
                                label="Bid Submission End Date"
                                value={
                                  bidSubmissionEndDate
                                    ? dayjs(bidSubmissionEndDate)
                                    : null
                                }
                                onChange={(newValue) =>
                                  setBidSubmissionEndDate(
                                    newValue?.format("YYYY-MM-DD")
                                  )
                                }
                                slotProps={{ textField: { fullWidth: true } }}
                              />
                              {errors.bidSubmissionEndDate && (
                                <FormHelperText error>
                                  {errors.bidSubmissionEndDate}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="col-lg-6">
                              <DatePicker
                                label="Pre-Bid Meeting Date"
                                value={
                                  preBidMeetingDate
                                    ? dayjs(preBidMeetingDate)
                                    : null
                                }
                                onChange={(newValue) =>
                                  setPreBidMeetingDate(
                                    newValue?.format("YYYY-MM-DD")
                                  )
                                }
                                slotProps={{ textField: { fullWidth: true } }}
                              />
                              {errors.preBidMeetingDate && (
                                <FormHelperText error>
                                  {errors.preBidMeetingDate}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="col-lg-6">
                              <DatePicker
                                label="Close Date"
                                value={
                                  closeingDate ? dayjs(closeingDate) : null
                                }
                                onChange={(newValue) =>
                                  setCloseingDate(
                                    newValue?.format("YYYY-MM-DD")
                                  )
                                }
                                slotProps={{ textField: { fullWidth: true } }}
                              />
                              {errors.closeingDate && (
                                <FormHelperText error>
                                  {errors.closeingDate}
                                </FormHelperText>
                              )}
                            </div>
                          </div>
                        </LocalizationProvider>
                      )}

                      {step === 3 && (
                        <>
                          {/* NIT Documents Section */}
                          <div className="col-lg-12">
                            <Typography variant="h6">NIT Documents</Typography>
                            <Button
                              variant="outlined"
                              onClick={() =>
                                setNitDocuments([
                                  ...nitDocuments,
                                  {
                                    nitDocFile: null,
                                    nitDescription: "",
                                    nitSize: "",
                                  },
                                ])
                              }
                              style={{ marginBottom: "20px" }}
                            >
                              Add NIT Document
                            </Button>

                            {nitDocuments.map((doc, index) => (
                              <div
                                key={`nit-${index}`}
                                style={{
                                  marginBottom: "30px",
                                  border: "1px solid #eee",
                                  padding: "15px",
                                  borderRadius: "5px",
                                }}
                              >
                                <Typography>
                                  NIT Document #{index + 1}
                                </Typography>
                                <Button
                                  variant="outlined"
                                  component="label"
                                  fullWidth
                                  error={!!errors[`nitDocFile-${index}`]}
                                  style={{ marginTop: "10px" }}
                                >
                                  Upload NIT Doc File
                                  <input
                                    hidden
                                    type="file"
                                    onChange={(e) =>
                                      handleFileChange(
                                        e,
                                        (file) => {
                                          const updated = [...nitDocuments];
                                          updated[index].nitDocFile = file;
                                          setNitDocuments(updated);
                                        },
                                        (size) => {
                                          const updated = [...nitDocuments];
                                          updated[index].nitSize = size;
                                          setNitDocuments(updated);
                                        }
                                      )
                                    }
                                  />
                                </Button>

                                {doc.nitDocFile &&
                                  renderFilePreview(
                                    doc.nitDocFile,
                                    (file) => {
                                      const updated = [...nitDocuments];
                                      updated[index].nitDocFile = file;
                                      setNitDocuments(updated);
                                    },
                                    (size) => {
                                      const updated = [...nitDocuments];
                                      updated[index].nitSize = size;
                                      setNitDocuments(updated);
                                    },
                                    true
                                  )}

                                <TextField
                                  label="NIT Description"
                                  value={doc.nitDescription}
                                  onChange={(e) => {
                                    const updated = [...nitDocuments];
                                    updated[index].nitDescription =
                                      e.target.value;
                                    setNitDocuments(updated);
                                  }}
                                  fullWidth
                                  margin="normal"
                                  error={!!errors[`nitDescription-${index}`]}
                                />

                                <TextField
                                  label="NIT File Size"
                                  value={doc.nitSize}
                                  fullWidth
                                  margin="normal"
                                  InputLabelProps={{ shrink: true }}
                                  disabled
                                />

                                {nitDocuments.length > 1 && (
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => {
                                      const updated = [...nitDocuments];
                                      updated.splice(index, 1);
                                      setNitDocuments(updated);
                                    }}
                                    style={{ marginTop: "10px" }}
                                  >
                                    Remove Document
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* PreBid Documents */}
                          <div className="col-lg-12">
                            <Typography variant="h6">
                              PreBid Meeting Documents
                            </Typography>
                            <Button
                              variant="outlined"
                              onClick={() =>
                                setPreBidDocuments([
                                  ...preBidDocuments,
                                  {
                                    preBidDocFile: null,
                                    preBidDescription: "",
                                    preBidSize: "",
                                  },
                                ])
                              }
                              style={{ marginBottom: "20px" }}
                            >
                              Add PreBid Document
                            </Button>

                            {preBidDocuments.map((doc, index) => (
                              <div
                                key={`prebid-${index}`}
                                style={{
                                  marginBottom: "30px",
                                  border: "1px solid #eee",
                                  padding: "15px",
                                  borderRadius: "5px",
                                }}
                              >
                                <Typography>
                                  PreBid Document #{index + 1}
                                </Typography>
                                <Button
                                  variant="outlined"
                                  component="label"
                                  fullWidth
                                  error={!!errors[`preBidDocFile-${index}`]}
                                  style={{ marginTop: "10px" }}
                                >
                                  Upload PreBid Doc File
                                  <input
                                    hidden
                                    type="file"
                                    onChange={(e) =>
                                      handleFileChange(
                                        e,
                                        (file) => {
                                          const updated = [...preBidDocuments];
                                          updated[index].preBidDocFile = file;
                                          setPreBidDocuments(updated);
                                        },
                                        (size) => {
                                          const updated = [...preBidDocuments];
                                          updated[index].preBidSize = size;
                                          setPreBidDocuments(updated);
                                        }
                                      )
                                    }
                                  />
                                </Button>

                                {doc.preBidDocFile &&
                                  renderFilePreview(
                                    doc.preBidDocFile,
                                    (file) => {
                                      const updated = [...preBidDocuments];
                                      updated[index].preBidDocFile = file;
                                      setPreBidDocuments(updated);
                                    },
                                    (size) => {
                                      const updated = [...preBidDocuments];
                                      updated[index].preBidSize = size;
                                      setPreBidDocuments(updated);
                                    },
                                    true
                                  )}

                                <TextField
                                  label="PreBid Description"
                                  value={doc.preBidDescription}
                                  onChange={(e) => {
                                    const updated = [...preBidDocuments];
                                    updated[index].preBidDescription =
                                      e.target.value;
                                    setPreBidDocuments(updated);
                                  }}
                                  fullWidth
                                  margin="normal"
                                  error={!!errors[`preBidDescription-${index}`]}
                                />

                                <TextField
                                  label="PreBid File Size"
                                  value={doc.preBidSize}
                                  fullWidth
                                  margin="normal"
                                  InputLabelProps={{ shrink: true }}
                                  disabled
                                />

                                {preBidDocuments.length > 1 && (
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => {
                                      const updated = [...preBidDocuments];
                                      updated.splice(index, 1);
                                      setPreBidDocuments(updated);
                                    }}
                                    style={{ marginTop: "10px" }}
                                  >
                                    Remove Document
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Work Item Documents */}
                          <div className="col-lg-12">
                            <Typography variant="h6">
                              Work Item Documents
                            </Typography>
                            <Button
                              variant="outlined"
                              onClick={() =>
                                setWorkItemDocuments([
                                  ...workItemDocuments,
                                  {
                                    workItemDocFile: null,
                                    workItemDescription: "",
                                    workItemType: "",
                                    workItemSize: "",
                                  },
                                ])
                              }
                              style={{ marginBottom: "20px" }}
                            >
                              Add Work Item Document
                            </Button>

                            {workItemDocuments.map((doc, index) => (
                              <div
                                key={`workitem-${index}`}
                                style={{
                                  marginBottom: "30px",
                                  border: "1px solid #eee",
                                  padding: "15px",
                                  borderRadius: "5px",
                                }}
                              >
                                <Typography>
                                  Work Item Document #{index + 1}
                                </Typography>
                                <Button
                                  variant="outlined"
                                  component="label"
                                  fullWidth
                                  error={!!errors[`workItemDocFile-${index}`]}
                                  style={{ marginTop: "10px" }}
                                >
                                  Upload Work Item Doc File
                                  <input
                                    hidden
                                    type="file"
                                    onChange={(e) =>
                                      handleFileChange(
                                        e,
                                        (file) => {
                                          const updated = [
                                            ...workItemDocuments,
                                          ];
                                          updated[index].workItemDocFile = file;
                                          setWorkItemDocuments(updated);
                                        },
                                        (size) => {
                                          const updated = [
                                            ...workItemDocuments,
                                          ];
                                          updated[index].workItemSize = size;
                                          setWorkItemDocuments(updated);
                                        }
                                      )
                                    }
                                  />
                                </Button>

                                {doc.workItemDocFile &&
                                  renderFilePreview(
                                    doc.workItemDocFile,
                                    (file) => {
                                      const updated = [...workItemDocuments];
                                      updated[index].workItemDocFile = file;
                                      setWorkItemDocuments(updated);
                                    },
                                    (size) => {
                                      const updated = [...workItemDocuments];
                                      updated[index].workItemSize = size;
                                      setWorkItemDocuments(updated);
                                    },
                                    true
                                  )}

                                <TextField
                                  label="Work Item Description"
                                  value={doc.workItemDescription}
                                  onChange={(e) => {
                                    const updated = [...workItemDocuments];
                                    updated[index].workItemDescription =
                                      e.target.value;
                                    setWorkItemDocuments(updated);
                                  }}
                                  fullWidth
                                  margin="normal"
                                  error={
                                    !!errors[`workItemDescription-${index}`]
                                  }
                                />

                                <TextField
                                  label="Work Item Type"
                                  value={doc.workItemType}
                                  onChange={(e) => {
                                    const updated = [...workItemDocuments];
                                    updated[index].workItemType =
                                      e.target.value;
                                    setWorkItemDocuments(updated);
                                  }}
                                  fullWidth
                                  margin="normal"
                                />

                                <TextField
                                  label="Work Item File Size"
                                  value={doc.workItemSize}
                                  fullWidth
                                  margin="normal"
                                  InputLabelProps={{ shrink: true }}
                                  disabled
                                />

                                {workItemDocuments.length > 1 && (
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => {
                                      const updated = [...workItemDocuments];
                                      updated.splice(index, 1);
                                      setWorkItemDocuments(updated);
                                    }}
                                    style={{ marginTop: "10px" }}
                                  >
                                    Remove Document
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>

                          {/* Corrigendum Documents */}
                          <div className="col-lg-12">
                            <Typography variant="h6">
                              Corrigendum Documents
                            </Typography>
                            <Button
                              variant="outlined"
                              onClick={() =>
                                setCorrigendumDocuments([
                                  ...corrigendumDocuments,
                                  {
                                    corrigendumDocFile: null,
                                    corrigendumTitle: "",
                                    corrigendumType: "",
                                  },
                                ])
                              }
                              style={{ marginBottom: "20px" }}
                            >
                              Add Corrigendum Document
                            </Button>

                            {corrigendumDocuments.map((doc, index) => (
                              <div
                                key={`corrigendum-${index}`}
                                style={{
                                  marginBottom: "30px",
                                  border: "1px solid #eee",
                                  padding: "15px",
                                  borderRadius: "5px",
                                }}
                              >
                                <Typography>
                                  Corrigendum Document #{index + 1}
                                </Typography>
                                <Button
                                  variant="outlined"
                                  component="label"
                                  fullWidth
                                  error={
                                    !!errors[`corrigendumDocFile-${index}`]
                                  }
                                  style={{ marginTop: "10px" }}
                                >
                                  Upload Corrigendum Doc File
                                  <input
                                    hidden
                                    type="file"
                                    onChange={(e) =>
                                      handleFileChange(
                                        e,
                                        (file) => {
                                          const updated = [
                                            ...corrigendumDocuments,
                                          ];
                                          updated[index].corrigendumDocFile =
                                            file;
                                          setCorrigendumDocuments(updated);
                                        },
                                        () => {} // Size not stored in Corrigendum
                                      )
                                    }
                                  />
                                </Button>

                                {doc.corrigendumDocFile &&
                                  renderFilePreview(
                                    doc.corrigendumDocFile,
                                    (file) => {
                                      const updated = [...corrigendumDocuments];
                                      updated[index].corrigendumDocFile = file;
                                      setCorrigendumDocuments(updated);
                                    },
                                    () => {},
                                    true
                                  )}

                                <TextField
                                  label="Corrigendum Title"
                                  value={doc.corrigendumTitle}
                                  onChange={(e) => {
                                    const updated = [...corrigendumDocuments];
                                    updated[index].corrigendumTitle =
                                      e.target.value;
                                    setCorrigendumDocuments(updated);
                                  }}
                                  fullWidth
                                  margin="normal"
                                  error={!!errors[`corrigendumTitle-${index}`]}
                                />

                                <TextField
                                  label="Corrigendum Type"
                                  value={doc.corrigendumType}
                                  onChange={(e) => {
                                    const updated = [...corrigendumDocuments];
                                    updated[index].corrigendumType =
                                      e.target.value;
                                    setCorrigendumDocuments(updated);
                                  }}
                                  fullWidth
                                  margin="normal"
                                />

                                {corrigendumDocuments.length > 1 && (
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() => {
                                      const updated = [...corrigendumDocuments];
                                      updated.splice(index, 1);
                                      setCorrigendumDocuments(updated);
                                    }}
                                    style={{ marginTop: "10px" }}
                                  >
                                    Remove Document
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>

                          <div className="col-lg-12">
                            <Typography>Featured Image</Typography>
                            <Button
                              variant="outlined"
                              component="label"
                              fullWidth
                              
                              style={{ marginTop: "10px" }}
                            >
                              Upload Featured Image
                              <input
                                hidden
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleFileChange(e, setFeaturedImage)
                                }
                              />
                            </Button>
                            {featuredImage &&
                              renderFilePreview(
                                featuredImage,
                                setFeaturedImage,
                                true
                              )}
                          </div>
                        </>
                      )}

                      {step === 4 && (
                        <>
                          <div className="row mt-4">
                            {/* Financial Fields */}
                            <div className="col-lg-6 mt-3">
                              <TextField
                                label="Tender Fee (INR)"
                                type="number"
                                value={tendorFeeIn}
                                onChange={(e) => setTendorFeeIn(e.target.value)}
                                fullWidth
                                error={!!errors.tendorFeeIn}
                              />
                              {errors.tendorFeeIn && (
                                <FormHelperText error>
                                  {errors.tendorFeeIn}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="col-lg-6 mt-3">
                              <TextField
                                label="Fee Payable To"
                                value={feePayableTo}
                                onChange={(e) =>
                                  setFeePayableTo(e.target.value)
                                }
                                fullWidth
                                error={!!errors.feePayableTo}
                                type="number"
                              />
                              {errors.feePayableTo && (
                                <FormHelperText error>
                                  {errors.feePayableTo}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="col-lg-6 mt-3">
                              <TextField
                                label="Fee Payable At"
                                value={feePayableAt}
                                onChange={(e) =>
                                  setFeePayableAt(e.target.value)
                                }
                                fullWidth
                                error={!!errors.feePayableAt}
                                type="number"
                              />
                              {errors.feePayableAt && (
                                <FormHelperText error>
                                  {errors.feePayableAt}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="col-lg-6 mt-3">
                              <TextField
                                label="EMD Amount"
                                type="number"
                                value={emdAmmount}
                                onChange={(e) => setEmdAmmount(e.target.value)}
                                fullWidth
                                error={!!errors.emdAmmount}
                              />
                              {errors.emdAmmount && (
                                <FormHelperText error>
                                  {errors.emdAmmount}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="col-lg-6 mt-3">
                              <TextField
                                label="EMD Fee Type"
                                value={emdFeeType}
                                onChange={(e) => setEmdFeeType(e.target.value)}
                                fullWidth
                                error={!!errors.emdFeeType}
                              />
                              {errors.emdFeeType && (
                                <FormHelperText error>
                                  {errors.emdFeeType}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="col-lg-6 mt-3">
                              <TextField
                                label="EMD Payable To"
                                value={emdPayableTo}
                                onChange={(e) =>
                                  setEmdPayableTo(e.target.value)
                                }
                                fullWidth
                                error={!!errors.emdPayableTo}
                              />
                              {errors.emdPayableTo && (
                                <FormHelperText error>
                                  {errors.emdPayableTo}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="col-lg-6 mt-3">
                              <TextField
                                label="EMD Payable At"
                                value={emdPayableAt}
                                onChange={(e) =>
                                  setEmdPayableAt(e.target.value)
                                }
                                fullWidth
                                error={!!errors.emdPayableAt}
                              />
                              {errors.emdPayableAt && (
                                <FormHelperText error>
                                  {errors.emdPayableAt}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="col-lg-6 mt-3">
                              <TextField
                                label="EMD Percentage"
                                type="number"
                                value={emdPercentage}
                                onChange={(e) =>
                                  setEmdPercentage(e.target.value)
                                }
                                fullWidth
                                error={!!errors.emdPercentage}
                              />
                              {errors.emdPercentage && (
                                <FormHelperText error>
                                  {errors.emdPercentage}
                                </FormHelperText>
                              )}
                            </div>

                            {/* Tender Metadata */}
                            <div className="col-lg-6 mt-3">
                              <TextField
                                label="Organisation Chain"
                                value={organisationChain}
                                onChange={(e) =>
                                  setOrganisationChain(e.target.value)
                                }
                                fullWidth
                                error={!!errors.organisationChain}
                              />
                              {errors.organisationChain && (
                                <FormHelperText error>
                                  {errors.organisationChain}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="col-lg-6 mt-3">
                              <TextField
                                label="Tender Reference No."
                                value={tendorReferenceNo}
                                onChange={(e) =>
                                  setTendorReferenceNo(e.target.value)
                                }
                                fullWidth
                                error={!!errors.tendorReferenceNo}
                              />
                              {errors.tendorReferenceNo && (
                                <FormHelperText error>
                                  {errors.tendorReferenceNo}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="col-lg-6 mt-3">
                              <TextField
                                label="Tender ID"
                                value={tendorId}
                                onChange={(e) => setTendorId(e.target.value)}
                                fullWidth
                                error={!!errors.tendorId}
                              />
                              {errors.tendorId && (
                                <FormHelperText error>
                                  {errors.tendorId}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="col-lg-6 mt-3">
                              <TextField
                                label="Tender Type"
                                value={tendorType}
                                onChange={(e) => setTendorType(e.target.value)}
                                fullWidth
                                error={!!errors.tendorType}
                              />
                              {errors.tendorType && (
                                <FormHelperText error>
                                  {errors.tendorType}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="col-lg-6 mt-3">
                              <TextField
                                label="Tender Category"
                                value={tendorCategory}
                                onChange={(e) =>
                                  setTendorCategory(e.target.value)
                                }
                                fullWidth
                                error={!!errors.tendorCategory}
                              />
                              {errors.tendorCategory && (
                                <FormHelperText error>
                                  {errors.tendorCategory}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="col-lg-6 mt-3">
                              <TextField
                                label="Payment Mode"
                                value={paymentMode}
                                onChange={(e) => setPaymentMode(e.target.value)}
                                fullWidth
                                error={!!errors.paymentMode}
                              />
                              {errors.paymentMode && (
                                <FormHelperText error>
                                  {errors.paymentMode}
                                </FormHelperText>
                              )}
                            </div>

                            {/* Input Fields */}
                            <div className="col-lg-6 mt-3">
                              <TextField
                                label="Form of Contract"
                                value={formOfContract}
                                onChange={(e) =>
                                  setFormOfContract(e.target.value)
                                }
                                fullWidth
                                error={!!errors.formOfContract}
                              />
                              {errors.formOfContract && (
                                <FormHelperText error>
                                  {errors.formOfContract}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="col-lg-6 mt-3">
                              <TextField
                                label="No. of Covers"
                                type="number"
                                value={noOfCovers}
                                onChange={(e) => setNoOfCovers(e.target.value)}
                                fullWidth
                                error={!!errors.noOfCovers}
                              />
                              {errors.noOfCovers && (
                                <FormHelperText error>
                                  {errors.noOfCovers}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="col-lg-6 mt-3">
                              <TextField
                                label="Tender Amount"
                                type="number"
                                value={tendorAmmount}
                                onChange={(e) =>
                                  setTendorAmmount(e.target.value)
                                }
                                fullWidth
                                error={!!errors.tendorAmmount}
                              />
                              {errors.tendorAmmount && (
                                <FormHelperText error>
                                  {errors.tendorAmmount}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="col-lg-6 mt-3">
                              <TextField
                                label="Work Item Type"
                                value={workItemType}
                                onChange={(e) =>
                                  setWorkItemType(e.target.value)
                                }
                                fullWidth
                                error={!!errors.workItemType}
                              />
                              {errors.workItemType && (
                                <FormHelperText error>
                                  {errors.workItemType}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="col-lg-6 mt-3">
                              <TextField
                                label="Pre-Bid Meeting Place"
                                value={preBidMeetingPlace}
                                onChange={(e) =>
                                  setPreBidMeetingPlace(e.target.value)
                                }
                                fullWidth
                                error={!!errors.preBidMeetingPlace}
                              />
                              {errors.preBidMeetingPlace && (
                                <FormHelperText error>
                                  {errors.preBidMeetingPlace}
                                </FormHelperText>
                              )}
                            </div>

                            {/* Boolean Flags */}
                            <div className="col-lg-6 mt-3">
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={allowNDATendor}
                                    onChange={(e) =>
                                      setAllowNDATendor(e.target.checked)
                                    }
                                  />
                                }
                                label="Allow NDA Tender"
                              />
                              {errors.allowNDATendor && (
                                <FormHelperText error>
                                  {errors.allowNDATendor}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="col-lg-6 mt-3">
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={tendorFeeExemptionAllow}
                                    onChange={(e) =>
                                      setTendorFeeExemptionAllow(
                                        e.target.checked
                                      )
                                    }
                                  />
                                }
                                label="Tender Fee Exemption Allowed"
                              />
                              {errors.tendorFeeExemptionAllow && (
                                <FormHelperText error>
                                  {errors.tendorFeeExemptionAllow}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="col-lg-6 mt-3">
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={emdExemptionAllow}
                                    onChange={(e) =>
                                      setEmdExemptionAllow(e.target.checked)
                                    }
                                  />
                                }
                                label="EMD Exemption Allowed"
                              />
                              {errors.emdExemptionAllow && (
                                <FormHelperText error>
                                  {errors.emdExemptionAllow}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="col-lg-6 mt-3">
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={generalTechEvaluationAllow}
                                    onChange={(e) =>
                                      setGeneralTechEvaluationAllow(
                                        e.target.checked
                                      )
                                    }
                                  />
                                }
                                label="General Technical Evaluation Allowed"
                              />
                              {errors.generalTechEvaluationAllow && (
                                <FormHelperText error>
                                  {errors.generalTechEvaluationAllow}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="col-lg-6 mt-3">
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={allowPreferentialBidder}
                                    onChange={(e) =>
                                      setAllowPreferentialBidder(
                                        e.target.checked
                                      )
                                    }
                                  />
                                }
                                label="Allow Preferential Bidder"
                              />
                              {errors.allowPreferentialBidder && (
                                <FormHelperText error>
                                  {errors.allowPreferentialBidder}
                                </FormHelperText>
                              )}
                            </div>

                            <div className="col-lg-6 mt-3">
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={multipleCurrencyAllow}
                                    onChange={(e) =>
                                      setMultipleCurrencyAllow(e.target.checked)
                                    }
                                  />
                                }
                                label="Allow Multiple Currency"
                              />
                              {errors.multipleCurrencyAllow && (
                                <FormHelperText error>
                                  {errors.multipleCurrencyAllow}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="col-lg-6 mt-3">
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={withdrawlAllow}
                                    onChange={(e) =>
                                      setWithdrawlAllow(e.target.checked)
                                    }
                                  />
                                }
                                label="Allow Withdrawal"
                              />
                              {errors.withdrawlAllow && (
                                <FormHelperText error>
                                  {errors.withdrawlAllow}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="col-lg-6 mt-3">
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={itemwiseTechEvaluationAllow}
                                    onChange={(e) =>
                                      setItemwiseTechEvaluationAllow(
                                        e.target.checked
                                      )
                                    }
                                  />
                                }
                                label="Item-wise Technical Evaluation Allowed"
                              />
                              {errors.itemwiseTechEvaluationAllow && (
                                <FormHelperText error>
                                  {errors.itemwiseTechEvaluationAllow}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="col-lg-6 mt-3">
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={multipleCurrencyAllowBDQ}
                                    onChange={(e) =>
                                      setMultipleCurrencyAllowBDQ(
                                        e.target.checked
                                      )
                                    }
                                  />
                                }
                                label="Allow Multiple Currency for BDQ"
                              />
                              {errors.multipleCurrencyAllowBDQ && (
                                <FormHelperText error>
                                  {errors.multipleCurrencyAllowBDQ}
                                </FormHelperText>
                              )}
                            </div>
                            <div className="col-lg-6 mt-3">
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={allowTwoStageBidding}
                                    onChange={(e) =>
                                      setAllowTwoStageBidding(e.target.checked)
                                    }
                                  />
                                }
                                label="Allow Two Stage Bidding"
                              />
                              {errors.allowTwoStageBidding && (
                                <FormHelperText error>
                                  {errors.allowTwoStageBidding}
                                </FormHelperText>
                              )}
                            </div>
                          </div>
                        </>
                      )}

                      <div className="mt-4 d-flex justify-content-between">
                        <Button
                          variant="outlined"
                          onClick={prevStep}
                          disabled={step === 1}
                          sx={{
                            minWidth: "120px",
                            padding: "8px 16px",
                            borderRadius: "8px",
                            fontWeight: 500,
                          }}
                          type="button" // Crucial for Back button
                        >
                          Back
                        </Button>

                        {step !== 4 ? (
                          <Button
                            variant="contained"
                            onClick={nextStep}
                            sx={{
                              minWidth: "120px",
                              padding: "8px 16px",
                              borderRadius: "8px",
                              fontWeight: 500,
                            }}
                            type="button" // Crucial for Next button
                          >
                            Next
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{
                              minWidth: "120px",
                              padding: "8px 16px",
                              borderRadius: "8px",
                              fontWeight: 500,
                            }}
                            type="submit"
                          >
                            {loading ? "Adding..." : "Add Tendor"}
                          </Button>
                        )}
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

export default AddTendor;
