import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import "./manubar.css";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { MdOutlineWallpaper } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { FaBlog, FaUserGraduate } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { TbBrandProducthunt } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { FaToolbox } from "react-icons/fa";
import { FaFileContract } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

import { IoMdSettings } from "react-icons/io";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
const Sidebarr = () => {
  let navigate = useNavigate();
  let [opcount, setopcount] = useState();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [adminData, setAdminData] = useState();
  const adminId = secureLocalStorage.getItem("adminid");
  const token = secureLocalStorage.getItem("adminidtoken");

  // Function to update screen width
  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    updateScreenWidth();
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, [screenWidth]);

  useEffect(() => {
    window.addEventListener("resize", updateScreenWidth);

    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, [screenWidth]);

  const [sidebarStatus, setSidebarStatus] = useState(() => {
    return localStorage.getItem("setstatus");
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setSidebarStatus(localStorage.getItem("setstatus"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const getAdminPermissions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_KEY}admin/api/getAdminById?id=${adminId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setAdminData(response.data.permissions);
          console.log(response.data.permissions);
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    getAdminPermissions();
  }, []);

  const hasPermission = (permission) => {
    return adminData && adminData.includes(permission);
  };

  return (
    <div>
      {screenWidth >= 767 ? (
        <aside
          className="sidenav"
          style={{ textAlign: "left", paddingLeft: "0px", marginTop: "60px" }}
        >
          <div className="navbar-vertical-container ">
            <div className="navbar-vertical-footer-offset pb-0">
              <div className="">
                <ul className="navbar-nav navbar-nav-lg nav-tabs pb-10" style={{ borderBottom: "none" }}>
                  <li className="navbar-vertical-aside-has-menu ">
                    <Sidebar className="bg-info example">
                      <Menu style={{ width: "100%" }}>
                        {/* <Menu style={{ width: '75%' }}> */}

                        {hasPermission("Dashboard") && (
                          <MenuItem
                            component={<Link to="/home" />}
                            icon={
                              <i
                                class="fa fa-home"
                                style={{ color: "white", fontSize: "20px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "7px",
                              backgroundColor: "#073b74",
                              color: "white",
                            }}
                          >
                            {" "}
                            Dashboard{" "}
                          </MenuItem>
                        )}

                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "#073b74",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                            height: "39px",
                          }}
                        >
                          {" "}
                          USER MANAGEMENT{" "}
                        </MenuItem>

                        {hasPermission("Freelancer Profile") && (
                          <MenuItem
                            component={<Link to="/freelancerList" />}
                            icon={<FaUser style={{ fontSize: "20px" }} />}
                            style={{
                              paddingLeft: "7px",
                              backgroundColor: "#073b74",
                              color: "white",
                            }}
                          >
                            {" "}
                            Freelancer Profile{" "}
                          </MenuItem>
                        )}

                        {hasPermission("Company Profile") && (
                          <MenuItem
                            component={<Link to="/companyList" />}
                            icon={<FaUser style={{ fontSize: "20px" }} />}
                            style={{
                              paddingLeft: "7px",
                              backgroundColor: "#073b74",
                              color: "white",
                            }}
                          >
                            {" "}
                            Company Profile{" "}
                          </MenuItem>
                        )}

                        {hasPermission("Business Profile") && (
                          <MenuItem
                            component={<Link to="/businessList" />}
                            icon={<FaUser style={{ fontSize: "20px" }} />}
                            style={{
                              paddingLeft: "7px",
                              backgroundColor: "#073b74",
                              color: "white",
                            }}
                          >
                            {" "}
                            Business Profile{" "}
                          </MenuItem>
                        )}

                        {hasPermission("Individual Profile") && (
                          <MenuItem
                            component={<Link to="/individualList" />}
                            icon={<FaUser style={{ fontSize: "20px" }} />}
                            style={{
                              paddingLeft: "7px",
                              backgroundColor: "#073b74",
                              color: "white",
                            }}
                          >
                            {" "}
                            Individual Profile{" "}
                          </MenuItem>
                        )}

                        {hasPermission("Service Provider") && (
                          <MenuItem
                            component={<Link to="/serviceProvider" />}
                            icon={<FaUser style={{ fontSize: "20px" }} />}
                            style={{
                              paddingLeft: "7px",
                              backgroundColor: "#073b74",
                              color: "white",
                            }}
                          >
                            {" "}
                            Service Provider{" "}
                          </MenuItem>
                        )}

                        {hasPermission("Service Provider") && (
                          <MenuItem
                            component={<Link to="/jobList" />}
                            icon={<FaUser style={{ fontSize: "20px" }} />}
                            style={{
                              paddingLeft: "7px",
                              backgroundColor: "#073b74",
                              color: "white",
                            }}
                          >
                            {" "}
                            Service Provider{" "}
                          </MenuItem>
                        )}


                        

                        {hasPermission("Service List") && (
                          <MenuItem
                            component={<Link to="/serviceList" />}
                            icon={<FaUser style={{ fontSize: "20px" }} />}
                            style={{
                              paddingLeft: "7px",
                              backgroundColor: "#073b74",
                              color: "white",
                            }}
                          >
                            {" "}
                            Service List{" "}
                          </MenuItem>
                        )}

                        {hasPermission("Tender") && (
                          <SubMenu
                            label="Tender"
                            style={{
                              paddingLeft: "5px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "39px",
                            }}
                            icon={
                              <FaFileContract style={{ fontSize: "20px" }} />
                            }
                          >
                            <MenuItem
                              component={<Link to="/tenderList" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              {" "}
                              Tender List
                            </MenuItem>
                          </SubMenu>
                        )}

                        {(hasPermission("Add Admin Role") ||
                          hasPermission("Add Sub Admin")) && (
                          <MenuItem
                            style={{
                              paddingLeft: "13px",
                              backgroundColor: "#073b74",
                              color: "#a3b9d2",
                              fontWeight: "bold",
                            }}
                          >
                            {" "}
                            SUB ADMIN MANAGEMENT{" "}
                          </MenuItem>
                        )}

                        {hasPermission("Add Admin Role") && (
                          <MenuItem
                            component={<Link to="/addAdminRole" />}
                            icon={<FaUser style={{ fontSize: "20px" }} />}
                            style={{
                              paddingLeft: "7px",
                              backgroundColor: "#073b74",
                              color: "white",
                            }}
                          >
                            {" "}
                            Add Admin Role{" "}
                          </MenuItem>
                        )}

                        {hasPermission("Add Sub Admin") && (
                          <MenuItem
                            component={<Link to="/addSubAdmin" />}
                            icon={<FaUser style={{ fontSize: "20px" }} />}
                            style={{
                              paddingLeft: "7px",
                              backgroundColor: "#073b74",
                              color: "white",
                            }}
                          >
                            {" "}
                            Add Sub Admin{" "}
                          </MenuItem>
                        )}

                        {(hasPermission("Web Page") ||
                          hasPermission("Market Place") ||
                          hasPermission("Rental Market Place") ||
                          hasPermission("Blogs") ||
                          hasPermission("Chat") ||
                          hasPermission("Categories") ||
                          hasPermission("Skills") ||
                          hasPermission("Banner") ||
                          hasPermission("Notification")) && (
                          <MenuItem
                            style={{
                              paddingLeft: "13px",
                              backgroundColor: "#073b74",
                              color: "#a3b9d2",
                              fontWeight: "bold",
                            }}
                          >
                            {" "}
                            APP MANAGEMENT{" "}
                          </MenuItem>
                        )}

                        {hasPermission("Web Page") && (
                          <SubMenu
                            label="Web Page"
                            style={{
                              paddingLeft: "5px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "39px",
                            }}
                            icon={<FaHome style={{ fontSize: "20px" }} />}
                          >
                            <MenuItem
                              component={<Link to="/freelancerHeadline" />}
                              icon={
                                <i
                                  className="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              Freelancer Headline
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/businessHeadline" />}
                              icon={
                                <i
                                  className="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              Business Headline
                            </MenuItem>

                             <MenuItem
                              component={<Link to="/companyHeadline" />}
                              icon={
                                <i
                                  className="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              Company Headline
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/individualHeadline" />}
                              icon={
                                <i
                                  className="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              Individual Headline
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/freelancerBenefit" />}
                              icon={
                                <i
                                  className="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              Freelancer Benefit
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/businessBenefit" />}
                              icon={
                                <i
                                  className="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              Business Benefit
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/companyBenefit" />}
                              icon={
                                <i
                                  className="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              Company Benefit
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/individualBenefit" />}
                              icon={
                                <i
                                  className="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              Individual Benefit
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/freelancerWork" />}
                              icon={
                                <i
                                  className="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              Freelancer Work
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/businessWork" />}
                              icon={
                                <i
                                  className="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              Business Work
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/companyWork" />}
                              icon={
                                <i
                                  className="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              Company Work
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/individualWork" />}
                              icon={
                                <i
                                  className="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              Individual Work
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/workShopBanner" />}
                              icon={
                                <i
                                  className="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              Work Shop Banner
                            </MenuItem>

                            
                          </SubMenu>
                        )}

                        {hasPermission("Market Place") && (
                          <SubMenu
                            style={{
                              paddingLeft: "5px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "39px",
                            }}
                            icon={
                              <TbBrandProducthunt
                                style={{ fontSize: "20px" }}
                              />
                            }
                            label="Market Place"
                          >
                            <MenuItem
                              component={<Link to="/productList" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              {" "}
                              Products List{" "}
                            </MenuItem>
                          </SubMenu>
                        )}

                        {/* rental market place */}
                        {hasPermission("Rental Market Place") && (
                          <SubMenu
                            style={{
                              paddingLeft: "5px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "39px",
                            }}
                            icon={
                              <TbBrandProducthunt
                                style={{ fontSize: "20px" }}
                              />
                            }
                            label="Rental Market Place"
                          >
                            <MenuItem
                              component={<Link to="/machineryList" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              {" "}
                              Machinery List{" "}
                            </MenuItem>
                          </SubMenu>
                        )}

                        {/* blog */}
                        {hasPermission("Blogs") && (
                          <SubMenu
                            label="Blogs"
                            style={{
                              paddingLeft: "5px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "39px",
                            }}
                            icon={<FaBlog style={{ fontSize: "20px" }} />}
                          >
                            <MenuItem
                              component={<Link to="/blogList" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              Add Blog{" "}
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/tendorBlogsList" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              Add Tender Blog{" "}
                            </MenuItem>

                            <MenuItem
                            component={<Link to="/freelancerBlog" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            Add Freelancer Blog{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/companyBlog" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            Add Company Blog{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/businessBlog" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            Add Business Blog{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/individualBlog" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            Add Individual Blog{" "}
                          </MenuItem>



                          </SubMenu>
                        )}

                        {/* chat */}
                        {hasPermission("Chat") && (
                          <SubMenu
                            style={{
                              paddingLeft: "5px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "39px",
                            }}
                            icon={
                              <TbBrandProducthunt
                                style={{ fontSize: "20px" }}
                              />
                            }
                            label="Chat"
                          >
                            <MenuItem
                              component={<Link to="/machineryList" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              {" "}
                              Chat{" "}
                            </MenuItem>
                          </SubMenu>
                        )}

                        {hasPermission("Categories") && (
                          <SubMenu
                            label="Categories"
                            style={{
                              paddingLeft: "5px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "39px",
                            }}
                            icon={<BiCategory style={{ fontSize: "20px" }} />}
                          >
                            <MenuItem
                              component={<Link to="/freelancerCategory" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              Freelancer Category{" "}
                            </MenuItem>
                            <MenuItem
                              component={<Link to="/freelancerSubCategory" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              {" "}
                              Freelancer Sub Category
                            </MenuItem>
                            <MenuItem
                              component={<Link to="/jobCetegory" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              {" "}
                              Project Work Category
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/productCategory" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              {" "}
                              Product Category
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/serviceCategoryList" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              {" "}
                              Machinery Category
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/mainPowerCategoryList" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              {" "}
                              Main Power Category
                            </MenuItem>

                            <MenuItem
                              component={
                                <Link to="/mainPowerSubCategoryList" />
                              }
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              {" "}
                              Main Power Sub Category
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/businessCategory" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              {" "}
                              Service Category
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/serviceSubCategory" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              {" "}
                              Service Sub Category
                            </MenuItem>

                             <MenuItem
                              component={<Link to="/tenderCategory" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              {" "}
                              Tender Category
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/tenderSubCategory" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              {" "}
                              Tender Sub Category
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/jobPositionCategory" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              {" "}
                              Job Position Category
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/jobPositionSubCategory" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              {" "}
                              Job Position Sub Category
                            </MenuItem>


                            <MenuItem
                              component={<Link to="/serviceProviderCategory" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              {" "}
                              Service Provider Category
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/serviceProviderSubCategory" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              {" "}
                              Service Provider Sub Category
                            </MenuItem>
                          </SubMenu>
                        )}

                        {/*skilled  */}
                        {hasPermission("Skills") && (
                          <SubMenu
                            label="Skills"
                            style={{
                              paddingLeft: "5px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "39px",
                            }}
                            icon={
                              <FaUserGraduate style={{ fontSize: "20px" }} />
                            }
                          >
                            <MenuItem
                              component={<Link to="/skills" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              Add Skills{" "}
                            </MenuItem>
                          </SubMenu>
                        )}
                        {/* banner */}
                        {hasPermission("Banner") && (
                          <SubMenu
                            label="Banner"
                            style={{
                              paddingLeft: "5px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "39px",
                            }}
                            icon={
                              <MdOutlineWallpaper
                                style={{ fontSize: "20px" }}
                              />
                            }
                          >
                            <MenuItem
                              component={<Link to="/freelancerBanner" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              Freelancer Section Banner{" "}
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/businessBanner" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              Business Section Banner{" "}
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/companyBanner" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              Company Section Banner{" "}
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/individualBanner" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              Individual Section Banner{" "}
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/marketPlaceBanner" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              Market Place Section Banner{" "}
                            </MenuItem>
                          </SubMenu>
                        )}

                        {hasPermission("Notification") && (
                          <SubMenu
                            style={{
                              paddingLeft: "5px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "39px",
                            }}
                            icon={
                              <IoMdNotifications style={{ fontSize: "20px" }} />
                            }
                            label="Notification"
                          >
                            <MenuItem
                              component={<Link to="/notification" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              {" "}
                              Send Notification{" "}
                            </MenuItem>
                          </SubMenu>
                        )}

                        {hasPermission("Setting") && (
                          <MenuItem
                            style={{
                              paddingLeft: "13px",
                              backgroundColor: "#073b74",
                              color: "#a3b9d2",
                              fontWeight: "bold",
                            }}
                          >
                            {" "}
                            SETTINGS{" "}
                          </MenuItem>
                        )}

                        {hasPermission("Setting") && (
                          <SubMenu
                            style={{
                              paddingLeft: "5px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "39px",
                            }}
                            icon={<IoMdSettings style={{ fontSize: "20px" }} />}
                            label="Setting"
                          >
                            <MenuItem
                              component={<Link to="/aboutus" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              {" "}
                              About us{" "}
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/termcondition" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              {" "}
                              Term & Conditions{" "}
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/privacypolicy" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              {" "}
                              Privacy & Policy{" "}
                            </MenuItem>

                            <MenuItem
                              component={<Link to="/faq" />}
                              icon={
                                <i
                                  class="fa fa-circle"
                                  style={{ color: "white", fontSize: "5px" }}
                                  aria-hidden="true"
                                ></i>
                              }
                              style={{
                                paddingLeft: "20px",
                                backgroundColor: "#073b74",
                                color: "white",
                                height: "32px",
                              }}
                            >
                              {" "}
                              Faq{" "}
                            </MenuItem>
                          </SubMenu>
                        )}
                      </Menu>
                    </Sidebar>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
      ) : null}

      {sidebarStatus == "true" ? (
        <aside
          className="sidenav1"
          style={{
            textAlign: "left",
            paddingLeft: "0px",
            marginTop: "60px",
            opacity: `${opcount}`,
          }}
        >
          <div className="navbar-vertical-container ">
            <div className="navbar-vertical-footer-offset pb-0">
              <div className="">
                <ul
                  style={{ overflow: "scroll", height: "450px" }}
                  className="navbar-nav navbar-nav-lg nav-tabs pb-10"
                >
                  <li className="navbar-vertical-aside-has-menu ">
                    <Sidebar className="bg-info example">
                      <Menu style={{ width: "100%" }}>
                        {/* <Menu style={{ width: '75%' }}> */}
                        <MenuItem
                          component={<Link to="/home" />}
                          icon={
                            <i
                              class="fa fa-home"
                              style={{ color: "white", fontSize: "20px" }}
                              aria-hidden="true"
                            ></i>
                          }
                          style={{
                            paddingLeft: "7px",
                            backgroundColor: "#073b74",
                            color: "white",
                          }}
                        >
                          {" "}
                          Dashboard{" "}
                        </MenuItem>
                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "#073b74",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                            height: "39px",
                          }}
                        >
                          {" "}
                          USER MANAGEMENT{" "}
                        </MenuItem>
                        <SubMenu
                          label="Users"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<FaUser style={{ fontSize: "20px" }} />}
                        >
                          <MenuItem
                            component={<Link to="/freelancerList" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Freelancer List
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/companyList" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Company List
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/businessList" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Business List
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/individualList" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Individual List
                          </MenuItem>
                        </SubMenu>

                        <SubMenu
                          label="Job"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<FaToolbox style={{ fontSize: "20px" }} />}
                        >
                          <MenuItem
                            component={<Link to="/jobList" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Job List
                          </MenuItem>
                        </SubMenu>

                        <SubMenu
                          label="Tender"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<FaFileContract style={{ fontSize: "20px" }} />}
                        >
                          <MenuItem
                            component={<Link to="/tenderList" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Tender List
                          </MenuItem>
                        </SubMenu>

                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "#073b74",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          APP MANAGEMENT{" "}
                        </MenuItem>

                        <SubMenu
                          label="Categories"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<BiCategory style={{ fontSize: "20px" }} />}
                        >
                          <MenuItem
                            component={<Link to="/freelancerCategory" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            Freelancer Category{" "}
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/freelancerSubCategory" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Freelancer Sub Category
                          </MenuItem>
                          <MenuItem
                            component={<Link to="/jobCetegory" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Project Work Category
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/productCategory" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Product Category
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/serviceCategoryList" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Machinery Category
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/mainPowerCategoryList" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Main Power Category
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/mainPowerSubCategoryList" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Main Power Sub Category
                          </MenuItem>
                        </SubMenu>

                        {/*skilled  */}
                        <SubMenu
                          label="Skills"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<FaUserGraduate style={{ fontSize: "20px" }} />}
                        >
                          <MenuItem
                            component={<Link to="/skills" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            Add Skills{" "}
                          </MenuItem>
                        </SubMenu>
                        {/* banner */}
                        <SubMenu
                          label="Banner"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <MdOutlineWallpaper style={{ fontSize: "20px" }} />
                          }
                        >
                          <MenuItem
                            component={<Link to="/freelancerBanner" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            Freelancer Section Banner{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/businessBanner" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            Business Section Banner{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/companyBanner" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            Company Section Banner{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/individualBanner" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            Individual Section Banner{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/marketPlaceBanner" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            Market Place Section Banner{" "}
                          </MenuItem>
                        </SubMenu>

                        {/* blog */}
                        <SubMenu
                          label="Blogs"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<FaBlog style={{ fontSize: "20px" }} />}
                        >
                          <MenuItem
                            component={<Link to="/blogList" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            Add Blog{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/tendorBlogsList" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            Add Tender Blog{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/freelancerBlog" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            Add Freelancer Blog{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/companyBlog" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            Add Company Blog{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/businessBlog" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            Add Business Blog{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/individualBlog" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            Add Individual Blog{" "}
                          </MenuItem>
                        </SubMenu>

                        

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <TbBrandProducthunt style={{ fontSize: "20px" }} />
                          }
                          label="Market Place Products"
                        >
                          <MenuItem
                            component={<Link to="/productList" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Products List{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/machineryList" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Machinery List{" "}
                          </MenuItem>
                        </SubMenu>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={
                            <IoMdNotifications style={{ fontSize: "20px" }} />
                          }
                          label="Notification"
                        >
                          <MenuItem
                            component={<Link to="/notification" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Send Notification{" "}
                          </MenuItem>
                        </SubMenu>

                        <MenuItem
                          style={{
                            paddingLeft: "13px",
                            backgroundColor: "#073b74",
                            color: "#a3b9d2",
                            fontWeight: "bold",
                          }}
                        >
                          {" "}
                          SETTINGS{" "}
                        </MenuItem>

                        <SubMenu
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<IoMdSettings style={{ fontSize: "20px" }} />}
                          label="Setting"
                        >
                          <MenuItem
                            component={<Link to="/aboutus" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            About us{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/termcondition" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Term & Conditions{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/privacypolicy" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Privacy & Policy{" "}
                          </MenuItem>

                          <MenuItem
                            component={<Link to="/faq" />}
                            icon={
                              <i
                                class="fa fa-circle"
                                style={{ color: "white", fontSize: "5px" }}
                                aria-hidden="true"
                              ></i>
                            }
                            style={{
                              paddingLeft: "20px",
                              backgroundColor: "#073b74",
                              color: "white",
                              height: "32px",
                            }}
                          >
                            {" "}
                            Faq{" "}
                          </MenuItem>
                        </SubMenu>
                      </Menu>
                    </Sidebar>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
      ) : null}
    </div>
  );
};

export default Sidebarr;
