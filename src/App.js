import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Home from "./Components/Home";
import { useEffect, useState } from "react";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Login from "./Components/Login";
import Error from "./Components/Error";

// New Routes
import UserList from "./Components/Pages/UserList";
import FreelancerList from "./Components/Pages/FreelancerList";
import CompanyList from "./Components/Pages/CompanyList";
import BusinessList from "./Components/Pages/BusinessList";
import Individual from "./Components/Pages/Individual";
import FreelancerCategory from "./Components/Pages/FreelancerCategory";
import FreelancerSubCategory from "./Components/Pages/FreelancerSubCategory";
import JobCategory from "./Components/Pages/JobCategory";
import ProductCategory from "./Components/Pages/ProductCategory";
import Skills from "./Components/Pages/Skills";
import FreelancerBanner from "./Components/Pages/FreelancerBanner";
import MarketPlaceBanner from "./Components/Pages/MarketPlaceBanner";
import BlogList from "./Components/Pages/BlogList";
import UpdateBlog from "./Components/Pages/UpdateBlog";
import UserDetails from "./Components/Pages/UserDetails";
import UpdateFreelancerCategory from "./Components/Pages/UpdateFreelancerCategory";
import UpdateJobCategory from "./Components/Pages/UpdateJobCategory";
import UpdateSkill from "./Components/Pages/UpdateSkill";
import UpdateFreelancerBanner from "./Components/Pages/UpdateFreelancerBanner";
import UpdateMarketPlaceBanner from "./Components/Pages/UpdateMarketPlaceBanner";
import ReportedUsersList from "./Components/Pages/ReportedUsersList";
import JobList from "./Components/Pages/JobList";
import UpdateFreelancerSubCategory from "./Components/Pages/UpdateFreelancerSubCategory";
import Protect from "./Components/Pages/Protect";
import Aboutus from "./Components/Pages/Aboutus";
import Termcondition from "./Components/Pages/Termcondition";
import Privacypolicy from "./Components/Pages/Privacypolicy";
import Faq from "./Components/Pages/Faq";
import Test from "./Components/Pages/Test";
import Profile from "./Components/Pages/Profile";
import TendorBlogsList from "./Components/Pages/TendorBlogsList";
import UpdateTendorBlog from "./Components/Pages/UpdateTendorBlog";
import AddFreelancer from "./Components/Pages/AddFreelancer";
import AddCompany from "./Components/Pages/AddCompany";
import AddIndividual from "./Components/Pages/AddIndividual";
import AddBusiness from "./Components/Pages/AddBusiness";
import AddTendor from "./Components/Pages/AddTendor";
import UpdateProductCategory from "./Components/Pages/UpdateProductCategory";
import ServiceCategoryList from "./Components/Pages/ServiceCategoryList";
import UpdateServiceCategory from "./Components/Pages/UpdateServiceCategory";
import Notification from "./Components/Pages/Notification";
import ProductList from "./Components/Pages/ProductList";
import MachineryList from "./Components/Pages/MachineryList";
import TenderList from "./Components/Pages/TenderList";
import TenderDetails from "./Components/Pages/TenderDetails";
import BusinessBanner from "./Components/Pages/BusinessBanner";
import UpdateBusinessBanner from "./Components/Pages/UpdateBusinessBanner";
import CompanyBanner from "./Components/Pages/CompanyBanner";
import UpdateCompanyBanner from "./Components/Pages/UpdateCompanyBanner";
import UpdateIndividualBanner from "./Components/Pages/UpdateIndividualBanner";
import IndividualBanner from "./Components/Pages/IndividualBanner";
import UpdateMachineryCategory from "./Components/Pages/UpdateMachineryCategory";
import JobDetail from "./Components/Pages/JobDetail";
import MainPowerCategoryList from "./Components/Pages/MainPowerCategoryList";
import UpdateMainPowerCategoryList from "./Components/Pages/UpdateMainPowerCategoryList";
import MainPowerSubCategoryList from "./Components/Pages/MainPowerSubCategoryList";
import BlogDetail from "./Components/Pages/BlogDetail";
import TendorBlogDetail from "./Components/Pages/TendorBlogDetail";
import AddAdminRole from "./Components/Pages/AddAdminRole";
import UpdateAdminRole from "./Components/Pages/UpdateAdminRole";
import AddSubAdmin from "./Components/Pages/AddSubAdmin";
import UpdateSubAdmin from "./Components/Pages/UpdateSubAdmin";
import SubAdminDetail from "./Components/Pages/SubAdminDetail";
import FreelancerHeadline from "./Components/Pages/FreelancerHeadline";
import BusinessHeadline from "./Components/Pages/BusinessHeadline";
import CompanyHeadline from "./Components/Pages/CompanyHeadline";
import IndividualHeadline from "./Components/Pages/IndividualHeadline";
import FreelancerBenefit from "./Components/Pages/FreelancerBenefit";
import BusinessCategory from "./Components/Pages/BusinessCategory";
import UpdateBusinessCategory from "./Components/Pages/UpdateBusinessCategory";
import WorkType from "./Components/Pages/WorkType";
import UpdateWorkType from "./Components/Pages/UpdateWorkType";
import TenderDepartment from "./Components/Pages/TenderDepartment";
import UpdateTenderDepartment from "./Components/Pages/UpdateTenderDepartment";
import FreelancerBlog from "./Components/Pages/FreelancerBlog";
import UpdateFreelancerBlog from "./Components/Pages/UpdateFreelancerBlog";
import BusinessBlog from "./Components/Pages/BusinessBlog";
import UpdateBusinessBlog from "./Components/Pages/UpdateBusinessBlog";
import CompanyBlog from "./Components/Pages/CompanyBlog";
import UpdateCompanyBlog from "./Components/Pages/UpdateCompanyBlog";
import IndividualBlog from "./Components/Pages/IndividualBlog";
import UpdateIndividualBlog from "./Components/Pages/UpdateIndividualBlog";
import UpdateFreelancerBenefit from "./Components/Pages/UpdateFreelancerBenefit";
import UpdateBusinessBenefit from "./Components/Pages/UpdateBusinessBenefit";
import BusinessBenefit from "./Components/Pages/BusinessBenefit";
import CompanyBenefit from "./Components/Pages/CompanyBenefit";
import UpdateCompanyBenefit from "./Components/Pages/UpdateCompanyBenefit";
import IndividualBenefit from "./Components/Pages/IndividualBenefit";
import UpdateIndividualBenefit from "./Components/Pages/UpdateIndividualBenefit";
import FreelancerWork from "./Components/Pages/FreelancerWork";
import UpdateFreelancerWork from "./Components/Pages/UpdateFreelancerWork";
import ServiceSubCategory from "./Components/Pages/ServiceSubCategory";
import UpdateServiceSubCategory from "./Components/Pages/UpdateServiceSubCategory";
import TenderCategory from "./Components/Pages/TenderCategory";
import UpdateTenderCategory from "./Components/Pages/UpdateTenderCategory";
import TenderSubCategory from "./Components/Pages/TenderSubCategory";
import UpdateTenderSubCategory from "./Components/Pages/UpdateTenderSubCategory";
import JobPositionCategory from "./Components/Pages/JobPositionCategory";
import UpdateJobPositionCategory from "./Components/Pages/UpdateJobPositionCategory";
import BusinessWork from "./Components/Pages/BusinessWork";
import CompanyWork from "./Components/Pages/CompanyWork";
import IndividualWork from "./Components/Pages/IndividualWork";
import JobPositionSubCategory from "./Components/Pages/JobPositionSubCategory";
import UpdateJobPositionSubCategory from "./Components/Pages/UpdateJobPositionSubCategory";
import ServiceProviderCategory from "./Components/Pages/ServiceProviderCategory";
import UpdateServiceProviderCategory from "./Components/Pages/UpdateServiceProviderCategory";
import ServiceProviderSubCategory from "./Components/Pages/ServiceProviderSubCategory";
import UpdateServiceProviderSubCategory from "./Components/Pages/UpdateServiceProviderSubCategory";
import ServiceProvider from "./Components/Pages/ServiceProvider";
import AddServiceProvider from "./Components/Pages/AddServiceProvider";
import UpdateServiceProvider from "./Components/Pages/UpdateServiceProvider";
import UpdateBusinessWork from "./Components/Pages/UpdateBusinessWork";
import UpdateCompanyWork from "./Components/Pages/UpdateCompanyWork";
import UpdateIndividualWork from "./Components/Pages/UpdateIndividualWork";
import WorkShopBanner from "./Components/Pages/WorkShopBanner";
import UpdateWorkShopBanner from "./Components/Pages/UpdateWorkShopBanner";
import ServiceList from "./Components/Pages/ServiceList";


function App() {

  useEffect(() => {
    // Generate 8-digit random number
    const randomNumber = Math.floor(Math.random() * 90000000) + 10000000;

    // Generate 2 random alphabets
    const randomAlphabets =
      String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
      String.fromCharCode(65 + Math.floor(Math.random() * 26));

    // Combine the random number and alphabets
    const result = randomNumber.toString() + randomAlphabets;

    // Set the result in the state
    // setRandomResult(result);
  }, []);
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/" && <Header />}
      {location.pathname !== "/" && <Sidebar />}
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/home" element={<Protect ComponentName={Home} />}></Route>

        <Route
          path="/profile"
          element={<Protect ComponentName={Profile} />}
        ></Route>

        {/* -------------- New Routes -------------- */}

        <Route
          path="/userList"
          element={<Protect ComponentName={UserList} />}
        ></Route>

        <Route
          path="/freelancerList"
          element={<Protect ComponentName={FreelancerList} />}
        ></Route>

        <Route
          path="/companyList"
          element={<Protect ComponentName={CompanyList} />}
        ></Route>

        <Route
          path="/businessList"
          element={<Protect ComponentName={BusinessList} />}
        ></Route>

        <Route
          path="/individualList"
          element={<Protect ComponentName={Individual} />}
        ></Route>

        <Route
          path="/freelancerCategory"
          element={<Protect ComponentName={FreelancerCategory} />}
        ></Route>

        <Route
          path="/freelancerSubCategory"
          element={<Protect ComponentName={FreelancerSubCategory} />}
        ></Route>

        <Route
          path="/jobCetegory"
          element={<Protect ComponentName={JobCategory} />}
        ></Route>

        <Route
          path="/productCategory"
          element={<Protect ComponentName={ProductCategory} />}
        ></Route>

        <Route
          path="/skills"
          element={<Protect ComponentName={Skills} />}
        ></Route>

        <Route
          path="/freelancerBanner"
          element={<Protect ComponentName={FreelancerBanner} />}
        ></Route>

        <Route
          path="/marketPlaceBanner"
          element={<Protect ComponentName={MarketPlaceBanner} />}
        ></Route>

        <Route
          path="/blogList"
          element={<Protect ComponentName={BlogList} />}
        ></Route>

        <Route
          path="/blogDetail"
          element={<Protect ComponentName={BlogDetail} />}
        ></Route>

        <Route
          path="/tendorBlogsList"
          element={<Protect ComponentName={TendorBlogsList} />}
        ></Route>

        <Route
          path="/tendorBlogDetail"
          element={<Protect ComponentName={TendorBlogDetail} />}
        ></Route>

        <Route
          path="/updateBlog"
          element={<Protect ComponentName={UpdateBlog} />}
        ></Route>

        <Route
          path="/updateTendorBlog"
          element={<Protect ComponentName={UpdateTendorBlog} />}
        ></Route>

        <Route
          path="/userDetails"
          element={<Protect ComponentName={UserDetails} />}
        ></Route>

        <Route
          path="/updateFreelancerCategory"
          element={<Protect ComponentName={UpdateFreelancerCategory} />}
        ></Route>

        <Route
          path="/updateMarketPlaceBanner"
          element={<Protect ComponentName={UpdateMarketPlaceBanner} />}
        ></Route>

        <Route
          path="/updateJobCategory"
          element={<Protect ComponentName={UpdateJobCategory} />}
        ></Route>

        <Route
          path="/reportedUsersList"
          element={<Protect ComponentName={ReportedUsersList} />}
        ></Route>

        <Route
          path="/jobList"
          element={<Protect ComponentName={JobList} />}
        ></Route>

        <Route
          path="/updateSkill"
          element={<Protect ComponentName={UpdateSkill} />}
        ></Route>

        <Route
          path="/updateFreelancerSubCategory"
          element={<Protect ComponentName={UpdateFreelancerSubCategory} />}
        ></Route>

        <Route path="/faq" element={<Protect ComponentName={Faq} />}></Route>
        <Route
          path="/aboutus"
          element={<Protect ComponentName={Aboutus} />}
        ></Route>

        <Route
          path="/termcondition"
          element={<Protect ComponentName={Termcondition} />}
        ></Route>

        <Route
          path="/addFreelancer"
          element={<Protect ComponentName={AddFreelancer} />}
        ></Route>

        <Route
          path="/addBusiness"
          element={<Protect ComponentName={AddBusiness} />}
        ></Route>

        <Route
          path="/addCompany"
          element={<Protect ComponentName={AddCompany} />}
        ></Route>

        <Route
          path="/addIndividual"
          element={<Protect ComponentName={AddIndividual} />}
        ></Route>

        <Route
          path="/addTendor"
          element={<Protect ComponentName={AddTendor} />}
        ></Route>

        <Route
          path="/updateProductCategory"
          element={<Protect ComponentName={UpdateProductCategory} />}
        ></Route>

        <Route
          path="/serviceCategoryList"
          element={<Protect ComponentName={ServiceCategoryList} />}
        ></Route>

        <Route
          path="/updateServiceCategory"
          element={<Protect ComponentName={UpdateServiceCategory} />}
        ></Route>

        <Route
          path="/privacypolicy"
          element={<Protect ComponentName={Privacypolicy} />}
        ></Route>

        <Route
          path="/notification"
          element={<Protect ComponentName={Notification} />}
        ></Route>

        <Route
          path="/productList"
          element={<Protect ComponentName={ProductList} />}
        ></Route>

        <Route
          path="/machineryList"
          element={<Protect ComponentName={MachineryList} />}
        ></Route>

        <Route
          path="/tenderList"
          element={<Protect ComponentName={TenderList} />}
        ></Route>

        <Route
          path="/tenderDetails"
          element={<Protect ComponentName={TenderDetails} />}
        ></Route>

        <Route
          path="/businessBanner"
          element={<Protect ComponentName={BusinessBanner} />}
        ></Route>

        <Route
          path="/updateBusinessBanner"
          element={<Protect ComponentName={UpdateBusinessBanner} />}
        ></Route>

        <Route
          path="/companyBanner"
          element={<Protect ComponentName={CompanyBanner} />}
        ></Route>

        <Route
          path="/updateCompanyBanner"
          element={<Protect ComponentName={UpdateCompanyBanner} />}
        ></Route>

        <Route
          path="/individualBanner"
          element={<Protect ComponentName={IndividualBanner} />}
        ></Route>

        <Route
          path="/updateIndividualBanner"
          element={<Protect ComponentName={UpdateIndividualBanner} />}
        ></Route>

        <Route
          path="/updateMachineryCategory"
          element={<Protect ComponentName={UpdateMachineryCategory} />}
        ></Route>

        <Route
          path="/updateFreelancerBanner"
          element={<Protect ComponentName={UpdateFreelancerBanner} />}
        ></Route>

        <Route
          path="/jobDetail"
          element={<Protect ComponentName={JobDetail} />}
        ></Route>

        <Route
          path="/mainPowerCategoryList"
          element={<Protect ComponentName={MainPowerCategoryList} />}
        ></Route>

        <Route
          path="/updateMainPowerCategoryList"
          element={<Protect ComponentName={UpdateMainPowerCategoryList} />}
        ></Route>

        <Route
          path="/mainPowerSubCategoryList"
          element={<Protect ComponentName={MainPowerSubCategoryList} />}
        ></Route>

        <Route
          path="/addAdminRole"
          element={<Protect ComponentName={AddAdminRole} />}
        ></Route>

        <Route
          path="/updateAdminRole"
          element={<Protect ComponentName={UpdateAdminRole} />}
        ></Route>

        <Route
          path="/addSubAdmin"
          element={<Protect ComponentName={AddSubAdmin} />}
        ></Route>

        <Route
          path="/updateSubAdmin"
          element={<Protect ComponentName={UpdateSubAdmin} />}
        ></Route>

        <Route
          path="/subAdminDetail"
          element={<Protect ComponentName={SubAdminDetail} />}
        ></Route>

        <Route
          path="/freelancerHeadline"
          element={<Protect ComponentName={FreelancerHeadline} />}
        ></Route>

        <Route
          path="/businessHeadline"
          element={<Protect ComponentName={BusinessHeadline} />}
        ></Route>

        <Route
          path="/companyHeadline"
          element={<Protect ComponentName={CompanyHeadline} />}
        ></Route>

        <Route
          path="/individualHeadline"
          element={<Protect ComponentName={IndividualHeadline} />}
        ></Route>

        <Route
          path="/freelancerBenefit"
          element={<Protect ComponentName={FreelancerBenefit} />}
        ></Route>

        <Route
          path="/businessCategory"
          element={<Protect ComponentName={BusinessCategory} />}
        ></Route>

        <Route
          path="/updateBusinessCategory"
          element={<Protect ComponentName={UpdateBusinessCategory} />}
        ></Route>

        <Route
          path="/serviceSubCategory"
          element={<Protect ComponentName={ServiceSubCategory} />}
        ></Route>

        <Route
          path="/updateServiceSubCategory"
          element={<Protect ComponentName={UpdateServiceSubCategory} />}
        ></Route>

        <Route
          path="/tenderCategory"
          element={<Protect ComponentName={TenderCategory} />}
        ></Route>


        <Route
          path="/updateTenderCategory"
          element={<Protect ComponentName={UpdateTenderCategory} />}
        ></Route>

        <Route
          path="/tenderSubCategory"
          element={<Protect ComponentName={TenderSubCategory} />}
        ></Route>


        <Route
          path="/updateTenderSubCategory"
          element={<Protect ComponentName={UpdateTenderSubCategory} />}
        ></Route>

        <Route
          path="/workType"
          element={<Protect ComponentName={WorkType} />}
        ></Route>

        <Route
          path="/updateWorkType"
          element={<Protect ComponentName={UpdateWorkType} />}
        ></Route>

         <Route
          path="/tenderDepartment"
          element={<Protect ComponentName={TenderDepartment} />}
        ></Route>

        <Route
          path="/updateTenderDepartment"
          element={<Protect ComponentName={UpdateTenderDepartment} />}
        ></Route>

        <Route
          path="/freelancerBlog"
          element={<Protect ComponentName={FreelancerBlog} />}
        ></Route>

        <Route
          path="/updateFreelancerBlog"
          element={<Protect ComponentName={UpdateFreelancerBlog} />}
        ></Route>

        <Route
          path="/updateCompanyBlog"
          element={<Protect ComponentName={UpdateCompanyBlog} />}
        ></Route>

        <Route
          path="/updateBusinessBlog"
          element={<Protect ComponentName={UpdateBusinessBlog} />}
        ></Route>

        <Route
          path="/updateIndividualBlog"
          element={<Protect ComponentName={UpdateIndividualBlog} />}
        ></Route>

        

        <Route
          path="/businessBlog"
          element={<Protect ComponentName={BusinessBlog} />}
        ></Route>

        <Route
          path="/companyBlog"
          element={<Protect ComponentName={CompanyBlog} />}
        ></Route>

        <Route
          path="/individualBlog"
          element={<Protect ComponentName={IndividualBlog} />}
        ></Route>

         <Route
          path="/updateFreelancerBenefit"
          element={<Protect ComponentName={UpdateFreelancerBenefit} />}
        ></Route>

        <Route
          path="/businessBenefit"
          element={<Protect ComponentName={BusinessBenefit} />}
        ></Route>

        <Route
          path="/updateBusinessBenefit"
          element={<Protect ComponentName={UpdateBusinessBenefit} />}
        ></Route>

        <Route
          path="/companyBenefit"
          element={<Protect ComponentName={CompanyBenefit} />}
        ></Route>


        <Route
          path="/updateCompanyBenefit"
          element={<Protect ComponentName={UpdateCompanyBenefit} />}
        ></Route>


        <Route
          path="/individualBenefit"
          element={<Protect ComponentName={IndividualBenefit} />}
        ></Route>

        <Route
          path="/updateIndividualBenefit"
          element={<Protect ComponentName={UpdateIndividualBenefit} />}
        ></Route>

        <Route
          path="/freelancerWork"
          element={<Protect ComponentName={FreelancerWork} />}
        ></Route>

        <Route
          path="/updateFreelancerWork"
          element={<Protect ComponentName={UpdateFreelancerWork} />}
        ></Route>

        <Route
          path="/businessWork"
          element={<Protect ComponentName={BusinessWork} />}
        ></Route>

        <Route
          path="/updateBusinessWork"
          element={<Protect ComponentName={UpdateBusinessWork} />}
        ></Route>

        <Route
          path="/companyWork"
          element={<Protect ComponentName={CompanyWork} />}
        ></Route>

        <Route
          path="/updateCompanyWork"
          element={<Protect ComponentName={UpdateCompanyWork} />}
        ></Route>

        <Route
          path="/individualWork"
          element={<Protect ComponentName={IndividualWork} />}
        ></Route>

        <Route
          path="/updateIndividualWork"
          element={<Protect ComponentName={UpdateIndividualWork} />}
        ></Route>

        <Route
          path="/jobPositionCategory"
          element={<Protect ComponentName={JobPositionCategory} />}
        ></Route>

        <Route
          path="/updateJobPositionCategory"
          element={<Protect ComponentName={UpdateJobPositionCategory} />}
        ></Route>

        <Route
          path="/jobPositionSubCategory"
          element={<Protect ComponentName={JobPositionSubCategory} />}
        ></Route>

        <Route
          path="/updateJobPositionSubCategory"
          element={<Protect ComponentName={UpdateJobPositionSubCategory} />}
        ></Route>

        <Route
          path="/serviceProviderCategory"
          element={<Protect ComponentName={ServiceProviderCategory} />}
        ></Route>

        <Route
          path="/updateServiceProviderCategory"
          element={<Protect ComponentName={UpdateServiceProviderCategory} />}
        ></Route>

        <Route
          path="/serviceProviderSubCategory"
          element={<Protect ComponentName={ServiceProviderSubCategory} />}
        ></Route>

        <Route
          path="/updateServiceProviderSubCategory"
          element={<Protect ComponentName={UpdateServiceProviderSubCategory} />}
        ></Route>

        <Route
          path="/serviceProvider"
          element={<Protect ComponentName={ServiceProvider} />}
        ></Route>

        <Route
          path="/addServiceProvider"
          element={<Protect ComponentName={AddServiceProvider} />}
        ></Route>

        <Route
          path="/updateServiceProvider"
          element={<Protect ComponentName={UpdateServiceProvider} />}
        ></Route>

        <Route
          path="/workShopBanner"
          element={<Protect ComponentName={WorkShopBanner} />}
        ></Route>

        <Route
          path="/updateWorkShopBanner"
          element={<Protect ComponentName={UpdateWorkShopBanner} />}
        ></Route>

        <Route
          path="/serviceList"
          element={<Protect ComponentName={ServiceList} />}
        ></Route>

        <Route path="/test" element={<Protect ComponentName={Test} />}></Route>

        <Route path="*" element={<Error />}></Route>
      </Routes>
      {location.pathname !== "/"}
    </div>
  );
}

export default App;
