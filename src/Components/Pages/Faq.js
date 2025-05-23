import React, { useEffect, useState } from "react";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import toast, { Toaster } from "react-hot-toast";
const Faq = () => {
  const [faqData, setFaqData] = useState([]);
  const [updatedFaqData, setUpdatedFaqData] = useState([]);
  const token = secureLocalStorage.getItem("adminidtoken");
  const [title, setTitle] = useState();
  const [title1, setTitle1] = useState();
  const [text, setText] = useState();
  const [id, setid] = useState(null);
  const [text1, setText1] = useState("");
  const [id1, setid1] = useState(null);

  const submitForm = (e) => {
    e.preventDefault();
    const data = {
      type: "Company",
      title: title ? title : faqData[0]?.title,
      description: text ? text : faqData[0]?.description,
    }
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.put(`${process.env.REACT_APP_API_KEY}admin/api/update_faq/${id}`, data, options)
      .then((res) => {
        fetchFaqData();
      }).catch((error) => {

      })
    setText("");
    setTitle("");
    setid("")

  }

  useEffect(() => {
    fetchFaqData();
  }, [0]);

  const fetchFaqData = () => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/get_faq`, options)
      .then((res) => {
        const freelancerData = res.data.data.find(item => item.type === "Company");
        if (freelancerData) {
          setFaqData([freelancerData]);
          setTitle(freelancerData.title);
          setText(freelancerData.description || "");
          setid(freelancerData._id || "");
        }
      })
      .catch((error) => {

      });
  };

  const submitForm1 = (event) => {
    event.preventDefault();
    const dataAbout = {
      type: "Freelancer",
      title: title1 ? title1 : faqData[0]?.title,
      description: text1 ? text1 : faqData[0]?.description,
    };
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    axios
      .put(
        `${process.env.REACT_APP_API_KEY}admin/api/update_faq/${id1}`,
        dataAbout,
        options
      )
      .then((res) => {
        toast.success(res?.data?.msg || "About us Data Updated Successfully");
        getAbout1();
      })
      .catch((error) => { console.log(error) });

    setTitle1("");
    setText1("");
    setid1("");
  };
  const getAbout1 = () => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/get_faq`, options)
      .then((res) => {
        const freelancerData = res.data.data.find(item => item.type === "Freelancer");
        if (freelancerData) {
          setFaqData([freelancerData]);
          setTitle1(freelancerData.title || "");
          setText1(freelancerData.description || "");
          setid1(freelancerData._id || "");
        }
      })
      .catch((error) => { });
  };

  useEffect(() => {
    getAbout1();
  }, [0]);




 
  return (
    <div>
      
    <Toaster />
    
      <div className="container row">
        <div className="col-lg-3 col-md-4"></div>

        <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
          <div className="mt-3 mb-5">
            <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
              <h2 className="h1 mb-1 text-capitalize d-flex align-items-center gap-2">
                <img
                  width={20}
                  src="https://6valley.6amtech.com/public/assets/back-end/img/banner.png"
                  alt=""
                />
                Faq
              </h2>
            </div>
            <div className="row mb-5">
              <div className="col-md-12 mb-3">
                <div className="card">
                  <div className="card-header justify-content-center">
                    <h2 className="mb-0">Faq for Company</h2>
                  </div>

                  <form className="card" onSubmit={submitForm}>
                    <div className="card-body">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
                            <div className="form-group mb-3">
                              <label
                                htmlFor="name"
                                className="title-color text-capitalize"
                              >
                                Title
                              </label>
                              <textarea
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                              />
                            </div>
                          </div>

                          

                          <div className="col-md-4">
                            <div className="form-group mb-3">
                              <button
                                type="submit"
                                className="btn btn--primary "
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="col-md-12">
                <div className="card">
                  <div className="card-header justify-content-center">
                    <h2 className="mb-0">Faq for Freelancer</h2>
                  </div>

                  <form className="card" onSubmit={submitForm1}>
                    <div className="card-body">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
                            <div className="form-group mb-3">
                              <label
                                htmlFor="name"
                                className="title-color text-capitalize"
                              >
                                Title
                              </label>
                              <textarea
                                type="text"
                                className="form-control"
                                value={title1}
                                onChange={(e) => setTitle1(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
                            <div className="form-group mb-3">
                              <label
                                htmlFor="name"
                                className="title-color text-capitalize"
                              >
                                Description
                              </label>
                              <ReactQuill value={text1} onChange={setText1} />
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group mb-3">
                              <button
                                type="submit"
                                className="btn btn--primary"
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;




























// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import secureLocalStorage from "react-secure-storage";
// import toast, { Toaster } from "react-hot-toast";

// const Faq = () => {
//   const [aboutData, setAboutData] = useState([]);
//   const [title, setTitle] = useState("");
//   const [text, setText] = useState("");

//   const token = secureLocalStorage.getItem("adminidtoken");

//   const submitForm = (event) => {
//     event.preventDefault();

//     const dataAbout = {
//       title: title,
//       text: text,
//     };

//     const options = {
//       headers: {
//         token: token,
//       },
//     };

//     axios
//       .post(
//         `${process.env.REACT_APP_API_KEY}admin/api/create_faq`,
//         dataAbout,
//         options
//       )
//       .then((res) => {
//         getAbout();
//       })
//       .catch((error) => {});
//   };

//   const getAbout = () => {
//     axios
//       .get(`${process.env.REACT_APP_API_KEY}admin/api/faq_list`)
//       .then((res) => {
//         setAboutData(res.data.data);
//       })
//       .catch((error) => {});
//   };

//   useEffect(() => {
//     getAbout();
//   }, [0]);

//   return (
//     <div>
//       {/* <Toaster /> */}
//       {/* <Header /> */}
//       <div
//         className="container row"
//         style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
//       >
//         <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

//         <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
//           <div className="mt-3 mb-5">
//             <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
//               <h2 className="h1 mb-1 text-capitalize d-flex align-items-center gap-2">
//                 <img
//                   width={20}
//                   src="https://6valley.6amtech.com/public/assets/back-end/img/banner.png"
//                   alt
//                 />
//                 Faq
//               </h2>
//             </div>
//             <div className="row mb-5">
//               <div className="col-md-12">
//                 {aboutData?.map((data) => {
//                   return (
//                     <div className="card">
//                       <form className="card" onSubmit={submitForm}>
//                         <div className="card-body">
//                           <div className="form-group">
//                             <div className="row">
//                               <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
//                                 <div className="form-group mb-3">
//                                   <label
//                                     htmlFor="name"
//                                     className="title-color text-capitalize"
//                                   >
//                                     Title
//                                   </label>
//                                   <input
//                                     placeholder={data?.title}
//                                     type="text"
//                                     className="form-control"
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                   />
//                                 </div>
//                               </div>

//                               <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
//                                 <div className="form-group mb-3">
//                                   <label
//                                     htmlFor="name"
//                                     className="title-color text-capitalize"
//                                   >
//                                     Description
//                                   </label>
//                                   <textarea
//                                     type="text"
//                                     className="form-control"
//                                     value={Text}
//                                     placeholder={data?.text}
//                                     onChange={(e) => setText(e.target.value)}
//                                   />
//                                 </div>
//                               </div>

//                               <div className="col-md-4">
//                                 <div className="form-group mb-3">
//                                   <button
//                                     type="submit"
//                                     className="btn btn--primary "
//                                   >
//                                     Update
//                                   </button>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </form>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Faq;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import secureLocalStorage from "react-secure-storage";
// import toast, { Toaster } from "react-hot-toast";

// const Faq = () => {
//   const [aboutData, setAboutData] = useState([]);
//   const [title, setTitle] = useState("");
//   const [text, setText] = useState("");

//   const token = secureLocalStorage.getItem("adminidtoken");

//   const submitForm = (event) => {
//     event.preventDefault();

//     const dataAbout = {
//       title: title ? title : aboutData[0]?.title,
//       text: text ? text : aboutData[0]?.text,
//     };

//     const options = {
//       headers: {
//         token: token,
//       },
//     };

//     axios
//       .post(
//         `${process.env.REACT_APP_API_KEY}admin/api/create_faq`,
//         dataAbout,
//         options
//       )
//       .then((res) => {
//         getAbout();
//       })
//       .catch((error) => {});

//     setTitle("");
//     setText("");
//   };

//   const getAbout = () => {
//     axios
//       .get(`${process.env.REACT_APP_API_KEY}admin/api/faq_list`)
//       .then((res) => {
//         //toast.success("Faq Data Updated Successfully");
//         setAboutData(res.data.data);

//         setTitle(res.data.data[0]?.title || "");
//         setText(res.data.data[0]?.text || "");
//       })
//       .catch((error) => {});
//   };

//   useEffect(() => {
//     getAbout();
//   }, [0]);

//   return (
//     <div>
//       {/* <Toaster /> */}
//       {/* <Header /> */}
//       <div
//         className="container row"
//         style={{ paddingLeft: "0px", paddingRight: "0px", marginLeft: "0px" }}
//       >
//         <div className="col-lg-3 col-md-4">{/* <Sidebarr /> */}</div>

//         <div className="col-lg-9 col-md-8" style={{ marginTop: "60px" }}>
//           <div className="mt-3 mb-5">
//             <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
//               <h2 className="h1 mb-1 text-capitalize d-flex align-items-center gap-2">
//                 <img
//                   width={20}
//                   src="https://6valley.6amtech.com/public/assets/back-end/img/banner.png"
//                   alt
//                 />
//                 Faq
//               </h2>
//             </div>
//             <div className="row mb-5">
//               <div className="col-md-12">
//                 <div className="card">
//                   <form className="card" onSubmit={submitForm}>
//                     <div className="card-body">
//                       <div className="form-group">
//                         <div className="row">
//                           <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
//                             <div className="form-group mb-3">
//                               <label
//                                 htmlFor="name"
//                                 className="title-color text-capitalize"
//                               >
//                                 Title
//                               </label>
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                               />
//                             </div>
//                           </div>

//                           <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
//                             <div className="form-group mb-3">
//                               <label
//                                 htmlFor="name"
//                                 className="title-color text-capitalize"
//                               >
//                                 Description
//                               </label>
//                               <ReactQuill value={text} onChange={setText} />
//                             </div>
//                           </div>

//                           <div className="col-md-4">
//                             <div className="form-group mb-3">
//                               <button
//                                 type="submit"
//                                 className="btn btn--primary btn-block"
//                               >
//                                 Update
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Faq;
