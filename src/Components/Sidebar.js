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
import { FaHome } from 'react-icons/fa';


import { IoMdSettings } from "react-icons/io";
const Sidebarr = () => {
  let navigate = useNavigate();
  let [opcount, setopcount] = useState();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
                <ul className="navbar-nav navbar-nav-lg nav-tabs pb-10">
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

                        {/* web page  */}
                        <SubMenu
                          label="Web Page"
                          style={{
                            paddingLeft: "5px",
                            backgroundColor: "#073b74",
                            color: "white",
                            height: "39px",
                          }}
                          icon={<FaHome  style={{ fontSize: "20px" }} />}
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
                            Web Page
                          </MenuItem>
                        </SubMenu>

                        {/* market place */}
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

                        {/* rental market place */}
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
                        </SubMenu>

                        {/* chat */}
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
                            Job Category
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
                            Job Category
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
