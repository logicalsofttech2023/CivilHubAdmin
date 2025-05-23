import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const Protect = (props) => {
  let { ComponentName } = props;

  let navigate = useNavigate();

  useEffect(() => {
    let status = secureLocalStorage.getItem("adminid");

    if (!status) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <ComponentName />
    </>
  );
};

export default Protect;

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import secureLocalStorage from "react-secure-storage";

// const Protect = (props) => {
//   const { ComponentName } = props;
//   const navigate = useNavigate();

//   useEffect(() => {

//     const adminid = "1234"
//     console.log("adminidasd",adminid)
//     if (!adminid) {

//       navigate("/");
//     }
//   }, [navigate]);

//   const logout = () => {

//     secureLocalStorage.removeItem("adminid");
//     navigate("/login");
//   };

//   return (
//     <>
//       <ComponentName />
//     </>
//   );
// };

// export default Protect;

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import secureLocalStorage from "react-secure-storage";

// const Protect = (props) => {
//   let { ComponentName } = props;

//   let navigate = useNavigate();

//   useEffect(() => {
//     let status = secureLocalStorage.getItem("adminid");

//     if (!status) {
//       navigate("/");
//     }
//   }, []);

//   let logout = () => {
//     secureLocalStorage.removeItem("adminid");
//     navigate("login");
//   };
//   return (
//     <>
//       <ComponentName />
//     </>
//   );
// };

// export default Protect;
