import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from "react-hot-toast";
import Editor from "./Editor";

const AboutUs = () => {
  const [aboutData, setAboutData] = useState([]);
  const [title, setTitle] = useState("");
  const [title1, setTitle1] = useState("");
  const [text, setText] = useState("");
  const [text1, setText1] = useState("");
  const [id, setid] = useState(null);
  const [id1, setid1] = useState(null);
  const [title2, setTitle2] = useState("");
  const [text2, setText2] = useState("");
  const [id2, setid2] = useState("");
  const [title3, setTitle3] = useState("");
  const [text3, setText3] = useState("");
  const [id3, setid3] = useState("");

  const token = secureLocalStorage.getItem("adminidtoken");

  const submitForm = (event) => {
    event.preventDefault();
    const dataAbout = {
      type: "Company",
      title: title ? title : aboutData[0]?.title,
      description: text ? text : aboutData[0]?.description,
    };
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(
        `${process.env.REACT_APP_API_KEY}admin/api/update_about/${id}`,
        dataAbout,
        options
      )
      .then((res) => {
        toast.success(res?.data?.msg || "About us Data Updated Successfully");
        getAbout();
      })
      .catch((error) => {
        console.log(error);
      });
    setTitle("");
    setText("");
    setid("");
  };
  const submitForm1 = (event) => {
    event.preventDefault();
    const dataAbout = {
      type: "Freelancer",
      title: title1 ? title1 : aboutData[1]?.title,
      text: text1 ? text1 : aboutData[1]?.text,
    };
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(
        `${process.env.REACT_APP_API_KEY}admin/api/update_about/${id1}`,
        dataAbout,
        options
      )
      .then((res) => {
        toast.success(res?.data?.msg || "About us Data Updated Successfully");
        getAbout1();
      })
      .catch((error) => {
        console.log(error);
      });

    setTitle1("");
    setText1("");
    setid1("");
  };

  const submitForm2 = (event) => {
    event.preventDefault();
    const dataAbout = {
      type: "Business",
      title: title2 ? title2 : aboutData[2]?.title,
      description: text2 ? text2 : aboutData[2]?.description,
    };
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(
        `${process.env.REACT_APP_API_KEY}admin/api/update_about/${id2}`,
        dataAbout,
        options
      )
      .then((res) => {
        toast.success(res?.data?.msg || "Business About Updated");
        getAbout2();
      })
      .catch((error) => console.log(error));

    setTitle2("");
    setText2("");
    setid2("");
  };

  const submitForm3 = (event) => {
    event.preventDefault();
    const dataAbout = {
      type: "Individual",
      title: title3 ? title3 : aboutData[3]?.title,
      description: text3 ? text3 : aboutData[3]?.description,
    };
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(
        `${process.env.REACT_APP_API_KEY}admin/api/update_about/${id3}`,
        dataAbout,
        options
      )
      .then((res) => {
        toast.success(res?.data?.msg || "Individual About Updated");
        getAbout3();
      })
      .catch((error) => console.log(error));

    setTitle3("");
    setText3("");
    setid3("");
  };

  const getAbout = () => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/get_abouts`, options)
      .then((res) => {
        const data = res.data.data.find((item) => item.type === "Company");
        if (data) {
          setAboutData([data]);
          setTitle(data.title);
          setText(data.description || "");
          setid(data._id || "");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAbout1 = () => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/get_abouts`, options)
      .then((res) => {
        const freelancerData = res.data.data.find(
          (item) => item.type === "Freelancer"
        );
        if (freelancerData) {
          setAboutData([freelancerData]);
          setTitle1(freelancerData.title || "");
          setText1(freelancerData.description || "");
          setid1(freelancerData._id || "");
        }
      })
      .catch((error) => {});
  };

  const getAbout2 = () => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/get_abouts`, options)
      .then((res) => {
        const data = res.data.data.find((item) => item.type === "Business");
        if (data) {
          setTitle2(data.title || "");
          setText2(data.description || "");
          setid2(data._id || "");
        }
      })
      .catch((error) => console.log(error));
  };

  const getAbout3 = () => {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${process.env.REACT_APP_API_KEY}admin/api/get_abouts`, options)
      .then((res) => {
        const data = res.data.data.find((item) => item.type === "Individual");
        if (data) {
          setTitle3(data.title || "");
          setText3(data.description || "");
          setid3(data._id || "");
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAbout();
    getAbout1();
    getAbout2();
    getAbout3();
  }, []);

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
            <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
              <h2 className="h1 mb-1 text-capitalize d-flex align-items-center gap-2">
                <img
                  width={20}
                  src="https://6valley.6amtech.com/public/assets/back-end/img/banner.png"
                  alt=""
                />
                About Us
              </h2>
            </div>

            <div className="row mb-5">
              <div className="col-md-12 mb-3">
                <div className="card">
                  <div className="card-header justify-content-center">
                    <h2 className="mb-0">About Us for Company</h2>
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

                          <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
                            <div className="form-group mb-3">
                              <label
                                htmlFor="name"
                                className="title-color text-capitalize"
                              >
                                Description
                              </label>
                              <Editor value={text} onChange={setText} />
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div className="form-group mb-3">
                              <button
                                type="submit"
                                className="btn btn--primary "
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

              <div className="col-md-12">
                <div className="card">
                  <div className="card-header justify-content-center">
                    <h2 className="mb-0">About Us for Freelancer</h2>
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
                              <Editor value={text1} onChange={setText1} />
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

              <div className="col-md-12 mb-3">
                <div className="card">
                  <div className="card-header justify-content-center">
                    <h2 className="mb-0">About Us for Business</h2>
                  </div>

                  <form className="card" onSubmit={submitForm2}>
                    <div className="card-body">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
                            <div className="form-group mb-3">
                              <label
                                htmlFor="title2"
                                className="title-color text-capitalize"
                              >
                                Title
                              </label>
                              <textarea
                                type="text"
                                className="form-control"
                                value={title2}
                                onChange={(e) => setTitle2(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
                            <div className="form-group mb-3">
                              <label
                                htmlFor="text2"
                                className="title-color text-capitalize"
                              >
                                Description
                              </label>
                              <Editor value={text2} onChange={setText2} />
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

              <div className="col-md-12 mb-3">
                <div className="card">
                  <div className="card-header justify-content-center">
                    <h2 className="mb-0">About Us for Individual</h2>
                  </div>

                  <form className="card" onSubmit={submitForm3}>
                    <div className="card-body">
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
                            <div className="form-group mb-3">
                              <label
                                htmlFor="title3"
                                className="title-color text-capitalize"
                              >
                                Title
                              </label>
                              <textarea
                                type="text"
                                className="form-control"
                                value={title3}
                                onChange={(e) => setTitle3(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="col-md-12 col-lg-12 col-xxl-12 col-lx-12">
                            <div className="form-group mb-3">
                              <label
                                htmlFor="text3"
                                className="title-color text-capitalize"
                              >
                                Description
                              </label>
                              <Editor value={text3} onChange={setText3} />
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

export default AboutUs;
