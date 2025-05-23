import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './manubar.css'
import Sidebar from './Sidebar'
import secureLocalStorage from 'react-secure-storage'

const Header = () => {
  let navigate = useNavigate()
  let userprofile = () => {
    navigate(`/profile`)
  }
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Function to update screen width
  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  // Initial update
  useEffect(() => {
    updateScreenWidth();

    // Cleanup: Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, [screenWidth]); // Empty dependency array ensures the effect runs only once on mount

  // Add event listener for window resize
  useEffect(() => {
    window.addEventListener('resize', updateScreenWidth);

    // Cleanup: Remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', updateScreenWidth);
    };
  }, [screenWidth]); // Empty dependency array ensures the effect runs only once on mount 


  let notificationsend = () => {
    navigate(`/sendnotification`)
  }


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
    <>

      {screenWidth >= 768 ? (
        <header id="header" style={{ zIndex: 1 }} className="navbar navbar-expand-lg navbar-fixed navbar-height navbar-flush navbar-container navbar-bordered">
          <div className="navbar-nav-wrap">
            <div style={{ cursor: "pointer" }} className="navbar-brand-wrapper">
              <Link className="navbar-brand" to="/home" aria-label>
                <img className="navbar-brand-logo-mini" src="./app_logo.png" alt="Logo" height={40} />
              </Link>

            </div>

            <div className="navbar-nav-wrap-content-right" style={{ marginRight: 'unset', marginLeft: 'auto', cursor: "pointer" }}>



              <ul className="navbar-nav align-items-center flex-row">
                <li className="nav-item d-none d-md-inline-block">
                  <div className="hs-unfold">
                    <a className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle media align-items-center gap-3 navbar-dropdown-account-wrapper dropdown-toggle-left-arrow dropdown-toggle-empty" href="javascript:" data-hs-unfold-target="#notificationDropdown" data-hs-unfold-invoker="true">
                      <i onClick={notificationsend} className="fa fa-bell" aria-hidden="true" />
                      <span className="btn-status btn-sm-status btn-status-danger">0</span>
                    </a>

                    <div id="notificationDropdown" className="hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right navbar-dropdown-menu navbar-dropdown-account py-0 overflow-hidden hs-unfold-content-initialized hs-unfold-css-animation animated hs-unfold-hidden" data-hs-target-height={0} data-hs-unfold-content="true" data-hs-unfold-content-animation-in="slideInUp" data-hs-unfold-content-animation-out="fadeOut" style={{ width: '20rem', animationDuration: '300ms' }} />
                  </div>
                </li>
                <li className="nav-item d-none d-md-inline-block">
                  <div className="hs-unfold">
                    <Link className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle media align-items-center gap-3 navbar-dropdown-account-wrapper dropdown-toggle dropdown-toggle-left-arrow" to="/customermessage">
                      <i className="fa fa-envelope-o" aria-hidden="true" />
                      <span className="btn-status btn-sm-status btn-status-danger">0</span>
                    </Link>
                    <div id="messageDropdown" className="hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right navbar-dropdown-menu navbar-dropdown-account hs-unfold-content-initialized hs-unfold-css-animation animated hs-unfold-hidden" data-hs-target-height="117.375" data-hs-unfold-content="true" data-hs-unfold-content-animation-in="slideInUp" data-hs-unfold-content-animation-out="fadeOut" style={{ width: '16rem', animationDuration: '300ms' }}><a className="dropdown-item position-relative" href="https://6valley.6amtech.com/seller/messages/chat/customer"><span className="text-truncate pr-2" title="Settings">Customer</span><span className="btn-status btn-sm-status-custom btn-status-danger">1</span>
                    </a>
                      <div className="dropdown-divider" />
                      <a className="dropdown-item position-relative" href="https://6valley.6amtech.com/seller/messages/chat/delivery-man"><span className="text-truncate pr-2" title="Settings">Delivery man</span>
                      </a>
                    </div>
                  </div>
                </li>
                <li className="nav-item view-web-site-info">
                  <div className="hs-unfold">
                    <a className="bg-white" href="javascript:">
                      <i className="tio-info" />
                    </a>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="hs-unfold">
                    <a className="js-hs-unfold-invoker media align-items-center gap-3 navbar-dropdown-account-wrapper dropdown-toggle dropdown-toggle-left-arrow hs-active" href="javascript:;" data-hs-unfold-options="{

        }" data-hs-unfold-target="#accountNavbarDropdown" data-hs-unfold-invoker="true">
                      <div className="d-none d-md-block media-body text-right" onClick={userprofile}><h5 className="profile-name mb-0" />
                        <span className="fz-12">{secureLocalStorage.getItem("adminemail")}</span>
                      </div>
                      <div className="avatar avatar-sm avatar-circle" onClick={userprofile}>
                        <img className="avatar-img" src="app_logo.png" alt="Image Description" />
                        <span className="avatar-status avatar-sm-status avatar-status-success" />
                      </div>
                    </a>
                  </div>
                </li>
              </ul>

            </div>
          </div>
          <div id="website_info" style={{ display: 'none' }} className="bg-secondary w-100">
            <div className="p-3">
              <div className="bg-white p-1 rounded">
                <div className="topbar-text dropdown disable-autohide m-1 text-capitalize">
                  <a className="topbar-link dropdown-toggle title-color d-flex align-items-center" href="#" data-toggle="dropdown">
                    <img className="mr-2" width={20} src="https://6valley.6amtech.com/public/assets/front-end/img/flags/en.png" alt="Eng" />
                    english
                  </a>

                </div>
              </div>

            </div>
          </div>
        </header>
      ) : (
        <header style={{ zIndex: 1 }}   id="header" className="navbar navbar-expand-lg navbar-fixed navbar-height navbar-flush navbar-container navbar-bordered">
          <div className="navbar-nav-wrap">
            <div style={{ cursor: "pointer" }} className="navbar-brand-wrapper">
              <Link className="navbar-brand" to="/home" aria-label>
                <img className="navbar-brand-logo-mini" src="./app_logo.png" alt="Logo" height={40} />
              </Link>

            </div>
            <div
        onClick={() => {
          const currentStatus = localStorage.getItem("setstatus");
          const newStatus = currentStatus === "false" ? "true" : "false";
          localStorage.setItem("setstatus", newStatus);
          window.dispatchEvent(new Event("storage"));
        }}
        className="navbar-brand"
        aria-label="Toggle Sidebar"
      >
        {sidebarStatus === "true" ? (
          <i
            className="fa fa-times"
            aria-hidden="true"
            style={{ fontSize: "25px", color: "rgb(7, 59, 116)" }}
          ></i>
        ) : (
          <i
            className="fa fa-bars chkicons"
            aria-hidden="true"
            style={{ fontSize: "20px", color: "rgb(7, 59, 116)" }}
          ></i>
        )}
      </div>

            <div
              className="navbar-nav-wrap-content-right"
              style={{
                marginRight: "unset",
                marginLeft: "auto",
                cursor: "pointer",
              }}
            >
              <ul className="navbar-nav align-items-center flex-row">
                <li className="nav-item view-web-site-info">
                  <div className="hs-unfold">
                    <a
                      className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle media align-items-center gap-3 navbar-dropdown-account-wrapper dropdown-toggle-left-arrow dropdown-toggle-empty"
                      href="javascript:"
                      data-hs-unfold-target="#notificationDropdown"
                      data-hs-unfold-invoker="true"
                    >
                      <i
                        onClick={notificationsend}
                        className="fa fa-bell"
                        aria-hidden="true"
                      />
                      <span className="btn-status btn-sm-status btn-status-danger">
                        0
                      </span>
                    </a>

                    <div
                      id="notificationDropdown"
                      className="hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right navbar-dropdown-menu navbar-dropdown-account py-0 overflow-hidden hs-unfold-content-initialized hs-unfold-css-animation animated hs-unfold-hidden"
                      data-hs-target-height={0}
                      data-hs-unfold-content="true"
                      data-hs-unfold-content-animation-in="slideInUp"
                      data-hs-unfold-content-animation-out="fadeOut"
                      style={{ width: "20rem", animationDuration: "300ms" }}
                    />
                  </div>
                </li>

                <li className="navbar-nav align-items-center flex-row">
                  <div className="hs-unfold">
                    <Link className="js-hs-unfold-invoker btn btn-icon btn-ghost-secondary rounded-circle media align-items-center gap-3 navbar-dropdown-account-wrapper dropdown-toggle dropdown-toggle-left-arrow" to="/customermessage">
                      <i className="fa fa-envelope-o" aria-hidden="true" />
                      <span className="btn-status btn-sm-status btn-status-danger">0</span>
                    </Link>
                    <div id="messageDropdown" className="hs-unfold-content dropdown-unfold dropdown-menu dropdown-menu-right navbar-dropdown-menu navbar-dropdown-account hs-unfold-content-initialized hs-unfold-css-animation animated hs-unfold-hidden" data-hs-target-height="117.375" data-hs-unfold-content="true" data-hs-unfold-content-animation-in="slideInUp" data-hs-unfold-content-animation-out="fadeOut" style={{ width: '16rem', animationDuration: '300ms' }}><a className="dropdown-item position-relative" href="https://6valley.6amtech.com/seller/messages/chat/customer"><span className="text-truncate pr-2" title="Settings">Customer</span><span className="btn-status btn-sm-status-custom btn-status-danger">1</span>
                    </a>
                      <div className="dropdown-divider" />
                      <a className="dropdown-item position-relative" href="https://6valley.6amtech.com/seller/messages/chat/delivery-man"><span className="text-truncate pr-2" title="Settings">Delivery man</span>
                      </a>
                    </div>
                  </div>
                </li>

                <li className="nav-item">
                  <div className="hs-unfold">
                    <a className="js-hs-unfold-invoker media align-items-center gap-3 navbar-dropdown-account-wrapper -toggle dropdown-toggle-left-arrow hs-active" href="javascript:;" data-hs-unfold-options="{

        }" data-hs-unfold-target="#accountNavbarDropdown" data-hs-unfold-invoker="true">
                      <div className="d-none d-md-block media-body text-right" onClick={userprofile}><h5 className="profile-name mb-0" />
                        <span className="fz-12">Subham Ajay</span>
                      </div>
                      <div className="avatar avatar-sm avatar-circle" onClick={userprofile}>
                        <img className="avatar-img" src="app_logo.png" alt="Image Description" />
                        <span className="avatar-status avatar-sm-status avatar-status-success" />
                      </div>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
         
        </header>
      )}



    </>
  )
}

export default Header
