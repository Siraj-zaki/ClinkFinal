import React from "react";
import Logo from "./Logo";
import searchBar from "../assets/searchBar.png";
import youtube from "../assets/youtube.png";
import instagram from "../assets/instagram.png";
import linkedin from "../assets/linkedin.png";
import facebook from "../assets/facebook.png";
import tele from "../assets/tele.png";
import whatsapp from "../assets/whatsapp.png";
import "../css/Navbar.css";
import Loader from "react-loader-spinner";
import cross from "../assets/cross.png";
import cross2 from "../assets/cross2.png";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import emailico from "../assets/email1.png";
import eye from "../assets/eye.png";
import lock from "../assets/lock.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { addAreaProduct } from "./../Service/service";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { customerSignUp, customerLogin, getVerification, getVerifiedCustomer, getforgetpassword } from "./../Service/service";
import { LOGIN_USER, zipCode } from "./../services/Store/Actions/action";

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: window.matchMedia("(max-width: 768px)").matches,
      toggler: 0,
      toggler1: 0,
      toggler2: 0,
      toggler3: 0,
      toggler4: 0,
      loginLoader: false,
      loginLoader1: false,
      code: '',
      passShow: false,
      passShow1: false,
      email: "",
      password: "",
      checked: "",
      email1: "",
      forgotEmail: "",
      emailforget: "",
      password1: "",
      confirmPassowrd: "",
      password2: "",
      confirmPassowrd2: "",
      checked1: "",
      checked2: "",
      age: "",
      signup: [],
      errors: {},
      customer: null,
      userlogin: '',
      product: [],
      productfilter: [],
      completeAddress: [],
      categorydata: [],

    };
    // formhandler1 = (e) => {
    //     e.preventDefault()

    // }
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeCode = this.handleChangeCode.bind(this);
    this.handleChangeforgotEmail = this.handleChangeforgotEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangePassword2 = this.handleChangePassword2.bind(this);
    this.handleChecked = this.handleChecked.bind(this);
    this.handleage = this.handleage.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.handleConfirmPassword2 = this.handleConfirmPassword2.bind(this);
    this.handleChecked2 = this.handleChecked2.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(
      this
    );
    this.formhandler1 = this.formhandler1.bind(this);
    this.forgetpassword = this.forgetpassword.bind(this);
    this.codeSet = this.codeSet.bind(this);
    this.forgetPasswordhandler = this.forgetPasswordhandler.bind(this);
  }

  async componentDidMount() {

    const handler = e => this.setState({ matches: e.matches });
    window.matchMedia("(max-width: 768px)").addListener(handler);
    console.log(this.props.user);
    
    if (this.props.user) {
      console.log(this.props.user);
      await this.setState({ userlogin: this.props.user });

      console.log(this.state.userlogin);
    }


  }
  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {


        this.state.completeAddress.push(results[0].formatted_address)


        getLatLng(results[0])
          .then(latLng => {
            console.log('Success', latLng)
            this.setState({ lat: latLng.lat })
            this.setState({ long: latLng.lng })
            let area = {
              longitude: this.state.long,
              latitude: this.state.lat,
            }
            let res;
            console.log(area);
            this.props.zipCode(area)
            if (window.location.href === "/Products") {
              // window.location.href
              console.log("not reload");
            } else {
              window.location.href = "/Products"
            }
            console.log(this.state.lat);
            console.log(this.state.long);
          })
          .catch(error => console.error('Error', error));
      })
  };

  handleChange = (address) => {

    this.setState({ address });
    // window.location.href !== "/Products" ? window.location.href = "/Products" : ""

  };
  // locationHandler = () => {
  //   if (window.location.href !== "/Products") {
  //     window.location.href = "/Products"
  //   }
  // }


  handleChangeEmail(e) {
    console.log(e.target.value);
    this.setState({ email: e.target.value });
  }
  handleChangeCode(e) {
    console.log(e.target.value);
    this.setState({ code: e.target.value });
  }
  async handleChangeforgotEmail(e) {
    console.log("testtt", e.target.value);
    this.setState({ forgotEmail: e.target.value });


  }
  checkarea = async (e) => {
    e.preventDefault()
    
    
    console.log(this.props);
    // try {

    //       res = await addAreaProduct(area)
    //       console.log(res.data.result);
    //       this.setState({ product: res?.data.result })
    //       this.setState({ productfilter:res?.data.result })

    // } catch (err) {
    //     console.log(err);
    //     console.log(err?.data?.message);
    // }



    this.setState({ toggler: 0 })

  }
  handleChangePassword(e) {
    console.log(e.target.value);

    this.setState({ password: e.target.value });
  }
  handleConfirmPassword(e) {
    this.setState({ confirmPassowrd: e.target.value });
  }
  handleChangePassword2(e) {
    console.log(e.target.value);

    this.setState({ password2: e.target.value });
  }
  handleConfirmPassword2(e) {
    this.setState({ confirmPassowrd2: e.target.value });
  }
  handleage(e) {
    this.setState({ age: e.target.value });
  }
  handleChecked(e) {
    this.setState({ checked1: e.target.value });
  }
  handleChecked2(e) {
    this.setState({ checked2: e.target.value });
  }

  async submituserRegistrationForm(e) {
    console.log("asdasdasdasd");
    e.preventDefault();
    console.log("asdasdasdasd", this.validateForm());
    if (this.state.age <= 20) {
      return toast.dark("AGE WILL BE GREATER OR EQUAL TO 21")
    } else if (this.state.confirmPassowrd !== this.state.password) {
      return toast.dark("Confirm Password is not matched")
    } else if (this.validateForm()) {
      console.log(this.state);
      try {
        let data = {
          email: this.state.email,
          password: this.state.password,
          age: this.state.age,
          type: 'user'
        };
        console.log("data", data);
        let customer = await customerSignUp(data)
          .then((re1) => {
            console.log(re1);
            if (re1?.data?.success) {
              return toast.dark("User Registered", {
                style: { fontSize: 13 },
                className: 'dark-toast',
                autoClose: 5000
              },
                this.setState({ toggler2: 0 })
              );

            } else {
              console.log("errrrr", re1);
              return toast.dark("Email Already Access", {
                style: { fontSize: 13 },
                className: 'dark-toast',
                autoClose: 5000
              }
              );
            }


          })
          .catch(err => {
            console.log("er", err);
          })
      }
      catch (error) {
        console.log(error);
      }
    }
  }
  async forgetpassword(e) {

    e.preventDefault()
    console.log("state", this.state.email);
    console.log('foreettt')
    try {
      let data = {
        email: this.state.forgotEmail,


      };
      console.log("data", data);
      let customer = await getVerification(data)
        .then((re1) => {
          console.log(re1);
          if (re1?.data?.success) {
            this.setState({ toggler3: 0, toggler4: 1 })
            return toast.dark(re1?.data?.message, {
              style: { fontSize: 13 },
              className: 'dark-toast',
              autoClose: 5000
            },

            );

          } else {
            console.log("errrrr", re1);
            return toast.dark(re1?.data?.message, {
              style: { fontSize: 13 },
              className: 'dark-toast',
              autoClose: 5000
            }
            );
          }


        })
        .catch(err => {
          return toast.dark("User Not Exist", {
            style: { fontSize: 13 },
            className: 'dark-toast',
            autoClose: 5000
          }
          );
          console.log("er", err);
        })
    }
    catch (error) {
      return toast.dark("User Not Exist", {
        style: { fontSize: 13 },
        className: 'dark-toast',
        autoClose: 5000
      },

      );
    }
  }
  async codeSet(e) {

    e.preventDefault()
    console.log("state", this.state.code);
    console.log('foreettt')
    try {
      let data = {
        code: this.state.code,

      };
      console.log("data", data);
      this.setState({ loginLoader1: true })
      let customer = await getVerifiedCustomer(data)

        .then((re1) => {
          console.log(re1);

          if (re1?.data?.success) {
            this.setState({ loginLoader1: false })
            this.setState({ toggler4: 0, toggler5: 1 })
            this.setState({ emailforget: re1.data?.data })
            return toast.dark(re1?.data?.message, {
              style: { fontSize: 13 },
              className: 'dark-toast',
              autoClose: 5000
            },
            );

          } else {
            this.setState({ loginLoader1: false })
            console.log("errrrr", re1);
            return toast.dark(re1?.data?.message, {
              style: { fontSize: 13 },
              className: 'dark-toast',
              autoClose: 5000
            }
            );
          }


        })
        .catch(err => {
          return toast.dark("Code is Wrong", {
            style: { fontSize: 13 },
            className: 'dark-toast',
            autoClose: 5000
          }
          );
          console.log("er", err);
        })
    }
    catch (error) {
      return toast.dark("Code is Wrong", {
        style: { fontSize: 13 },
        className: 'dark-toast',
        autoClose: 5000
      },

      );
    }
  }
  async forgetPasswordhandler(e) {

    e.preventDefault()
    console.log("state", this.state.code);
    console.log('foreettt')
    try {
      let data = {
        email: this.state.emailforget,
        password: this.state.password2

      };
      console.log("data", data);
      let customer = await getforgetpassword(data)
        .then((re1) => {
          console.log(re1);
          if (re1?.data?.success) {

            this.setState({ toggler5: 0 })
            return toast.dark(re1?.data?.message, {
              style: { fontSize: 13 },
              className: 'dark-toast',
              autoClose: 5000
            },


            );

          } else {
            console.log("errrrr", re1);
            return toast.dark(re1?.data?.message, {
              style: { fontSize: 13 },
              className: 'dark-toast',
              autoClose: 5000
            }
            );
          }


        })
        .catch(err => {
          return toast.dark("Server Error", {
            style: { fontSize: 13 },
            className: 'dark-toast',
            autoClose: 5000
          }
          );
          console.log("er", err);
        })
    }
    catch (error) {
      return toast.dark("Code is Wrong", {
        style: { fontSize: 13 },
        className: 'dark-toast',
        autoClose: 5000
      },

      );
    }
  }
  async formhandler1(e) {
    this.setState({ loginLoader: true })
    if (this.props.user) {
      console.log(this.props.user);
      await this.setState({ userlogin: this.props.user });
      console.log(this.state.userlogin);

    }
    console.log(this.state.userlogin);
    if (!this.state.userlogin) {
      e.preventDefault()
      console.log("state", this.state.email);
      let data = {
        email: this.state.email,
        password: this.state.password,



      };

      try {
        let customer = await customerLogin(data);
        if (customer && customer.data && customer.data.data) {
          console.log(customer.data.data);
          this.props.LOGIN_USER(customer.data.data)
          // console.log(this.props.cardItems)
          return toast.dark("Login Successfully", {
            style: { fontSize: 13 },
            className: 'dark-toast',
            autoClose: 5000
          },
            this.setState({ loginLoader: false }),
            this.setState({ toggler1: 0 }),

          );

          console.log(customer);

        }


      } catch (error) {
        console.log(error.data);
        return toast.dark("Email or Password Incorrect"),
          this.setState({ loginLoader: false }),
          console.log(error.response.data.message);
      }


    } else {
      return toast.dark("User Already login", {
        style: { fontSize: 13 },
        className: 'dark-toast',
        autoClose: 5000
      },
        this.setState({ loginLoader: false }),
        this.setState({ toggler1: 0 })
      );
    }

    //    console.log("data1",customer);

  }
  validateForm() {
    let errors = {};

    let formIsValid = true;

    if (!this.state.email) {
      // formIsValid = false;
      //   console.log("state empty");
      return toast.dark("Email Not Correct", {
        style: { fontSize: 13 },
        className: 'dark-toast',
        autoClose: 5000
      });

      errors["email"] = "*Please enter your email-ID.";
    }

    if (typeof this.state.email !== "undefined") {
      //regular expression for email validation

      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );

      if (!pattern.test(this.state.email)) {
        // formIsValid = false;

        errors["email"] = "*Please enter valid email-ID.";
      }
    }

    // if (this.state.age < 21  ){
    //   return toast.dark("Your age is INVALID")
    // }


    if (!this.state.password) {
      //   formIsValid = false;

      errors["password"] = "*Please enter your password.";
    }

    if (typeof this.state.password !== "undefined") {
      if (
        !this.state.password.match(
          /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/
        )
      ) {
        // formIsValid = false;

        errors["password"] = "*Please enter secure and strong password.";
      }
    }

    this.setState({
      errors: errors,
    });
    console.log("formIsValid", formIsValid);
    return formIsValid;
  }

  render() {
    // console.log("LOGIN_USER1", this.props);
    console.log(this.state.checked1, this.state.checked2);

    return (
      <>
        <>
          {this.state.toggler2 === 1 ? (
            <>
              <div
                style={{ zIndex: 30 }}
                onClick={() => this.setState({ toggler2: 0, toggler1: 0 })}
                ani={this.state.toggler1}
                className="signup-menu-back"
              ></div>
              <div
                style={{ zIndex: 31 }}
                ani={this.state.toggler1}
                className="signup-menu"
              >
                <div
                  className="signup-form"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    height: "60%",
                    flexDirection: "column",
                  }}
                >
                  <span className="signup-heading">
                    Welcome to{" "}
                    <span className="font" style={{ fontSize: 50 }}>
                      {" "}
                      Clink
                    </span>
                  </span>
                  <p className="signup-p">
                    Welcome back to clink sign in to place your
                    <br />
                    order..
                  </p>
                  <form onSubmit={this.submituserRegistrationForm}>
                    <div className="signup-form">
                      <div style={{ position: "relative" }}>
                        <label className="email-label" htmlFor="emal1">
                          <img src={emailico} alt="" />
                        </label>
                        <input
                          className="input-1-new"
                          type="email"
                          onChange={this.handleChangeEmail}
                          id="email1"
                          placeholder="Email"
                          required
                        />
                      </div>
                      <div style={{ position: "relative", marginTop: 20 }}>
                        <label className="email-label" htmlFor="pass1">
                          <img src={lock} alt="" />
                        </label>
                        <label
                          onMouseLeave={() =>
                            this.setState({ passShow: false })
                          }
                          onMouseEnter={() => this.setState({ passShow: true })}
                          className="eye-label"
                          htmlFor="emal1"
                        >
                          <img src={eye} alt="" />
                        </label>
                        <input
                          onChange={this.handleChangePassword}
                          className="input-1-new"
                          type={this.state.passShow ? "text" : "password"}
                          id="pass1"
                          placeholder="Password"
                          required
                        />
                      </div>
                      <div style={{ position: "relative", marginTop: 20 }}>
                        <label className="email-label" htmlFor="pass1">
                          <img src={lock} alt="" />
                        </label>
                        <input
                          onChange={this.handleConfirmPassword}
                          className="input-1-new"
                          type="password"
                          id="pass1"
                          placeholder="Confirm Password"
                          required
                        />
                      </div>
                      <div style={{ position: "relative", marginTop: 20 }}>
                        <label className="email-label" htmlFor="pass1">
                          <img src={lock} alt="" />
                        </label>
                        <input
                          onChange={this.handleage}
                          className="input-1-new"
                          type="number"
                          id="pass1"
                          placeholder="Age"
                        />
                      </div>
                      <div className="remember-me">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "flex-start",
                            flexDirection: "column",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <input
                              onChange={this.handleChecked}
                              className="checking m-1"
                              type="checkbox"
                              // required
                              id="checking-1"
                            />
                            <label
                              htmlFor="checking-1"
                              className="custom-checkbox"
                            ></label>
                            <label
                              htmlFor="checking-1"
                              className="remember-heading m-1"
                            >
                              I agree{" "}
                              <label
                                htmlFor="checking"
                                className="remember-heading m-1"
                                style={{ color: "#a10948" }}
                              >
                                that, I am 21 above
                              </label>{" "}
                            </label>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <input
                              onChange={this.handleChecked2}
                              className="checking m-1"
                              type="checkbox"
                              // required
                              id="checking-2"
                            />
                            <label
                              htmlFor="checking-2"
                              className="custom-checkbox"
                            ></label>
                            <label
                              htmlFor="checking-2"
                              className="remember-heading m-1"
                            >
                              I agree{" "}
                              <label
                                htmlFor="checking"
                                className="remember-heading m-1"
                                style={{ color: "#a10948" }}
                              >
                                {" "}
                                terms & conditions and Privacy policy
                              </label>{" "}
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="signup-btns">
                        <button className="signupbtn btn-1-new" type="submit">
                          Sign Up
                        </button>
                        <a
                          className="signupbtn btn-2-new"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onClick={() =>
                            this.setState({ toggler1: 1, toggler2: 0 })
                          }
                        >
                          Login
                        </a>
                      </div>
                    </div>
                    <div style={{ marginTop: 20 }}>
                      <span className="new-span m-3">Or Login with </span>
                      <a
                        href="/"
                        className="new-span m-3"
                        style={{ color: "#a10948" }}
                      >
                        Facebook{" "}
                      </a>
                      <a
                        href="/"
                        className="new-span m-3"
                        style={{ color: "#a10948" }}
                      >
                        Google{" "}
                      </a>
                    </div>
                  </form>
                </div>

                <div
                  onClick={() => this.setState({ toggler2: 0, toggler1: 0 })}
                  className="cross"
                >
                  <img width="100%" height="100%" src={cross2} alt="" />
                </div>
              </div>
            </>
          ) : null}
          {this.state.toggler1 === 1 ? (
            <>
              <div
                onClick={() => this.setState({ toggler1: 0 })}
                ani={this.state.toggler1}
                className="signup-menu-back"
              ></div>
              <form
                onSubmit={this.formhandler1}
                ani={this.state.toggler1}
                className="signup-menu"
              >
                <div
                  className="signup-form"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    height: "60%",
                    flexDirection: "column",
                  }}
                >
                  <span className="signup-heading">
                    Welcome to{" "}
                    <span className="font" style={{ fontSize: 50 }}>
                      {" "}
                      Clink
                    </span>
                  </span>
                  <p className="signup-p">
                    Welcome back to clink sign in to place your
                    <br />
                    order..
                  </p>
                  <div className="signup-form">
                    <div style={{ position: "relative" }}>
                      <label className="email-label" htmlFor="emal1">
                        <img src={emailico} alt="" />
                      </label>

                      <input
                        onChange={this.handleChangeEmail}

                        className="input-1-new"
                        type="email"
                        id="email1"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div style={{ position: "relative", marginTop: 20 }}>
                      <label className="email-label" htmlFor="pass1">
                        <img src={lock} alt="" />
                      </label>
                      <label
                        onMouseLeave={() => this.setState({ passShow: false })}
                        onMouseEnter={() => this.setState({ passShow: true })}
                        className="eye-label"
                        htmlFor="emal1"
                      >
                        <img src={eye} alt="" />
                      </label>
                      <input
                        onChange={this.handleChangePassword}
                        className="input-1-new"
                        type={this.state.passShow ? "text" : "password"}
                        id="pass1"
                        placeholder="Password"
                        required
                      />
                    </div>
                    <div className="remember-me">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          onChange={(e) =>
                            this.setState({ checked: e.target.checked })
                          }
                          className="checking m-1"
                          type="checkbox"
                          id="checking"

                        />

                        <label
                          htmlFor="checking"
                          className="custom-checkbox"
                        ></label>
                        <label
                          htmlFor="checking"
                          className="remember-heading m-1"
                        >
                          Remember Me
                        </label>
                      </div>
                      <div>
                        <a onClick={() => this.setState({ toggler3: 1, toggler1: 0 })} href="#" className="forgot">
                          {" "}
                          Forgot Passoword ?
                        </a>
                      </div>
                    </div>
                    <div className="signup-btns">
                      <button className="signupbtn btn-1-new" type="submit">
                        {
                          this.state.loginLoader ? <Loader type="Oval" width={40} height={40} color="black" /> : "Login"
                        }
                      </button>
                      <button
                        onClick={() =>
                          this.setState({ toggler2: 1, toggler1: 0 })
                        }
                        className="signupbtn btn-2-new"
                      >
                        Create Profile
                      </button>
                    </div>
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <span className="new-span m-3">Or Login with </span>
                    <a
                      href="/"
                      className="new-span m-3"
                      style={{ color: "#a10948" }}
                    >
                      Facebook{" "}
                    </a>
                    <a
                      href="/"
                      className="new-span m-3"
                      style={{ color: "#a10948" }}
                    >
                      Google{" "}
                    </a>
                  </div>
                </div>
                <div
                  onClick={() => this.setState({ toggler1: 0 })}
                  className="cross"
                >
                  <img width="100%" height="100%" src={cross2} alt="" />
                </div>
              </form>
            </>
          ) : null}
          {this.state.toggler3 === 1 ? (
            <>
              <div
                onClick={() => this.setState({ toggler1: 0 })}
                ani={this.state.toggler1}
                className="signup-menu-back"
              ></div>
              <form
                // onSubmit={() => this.setState({ toggler3: 0, toggler4: 1 })}
                onSubmit={this.forgetpassword}
                ani={this.state.toggler1}
                className="signup-menu"
              >
                <div
                  className="signup-form"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    height: "60%",
                    flexDirection: "column",
                  }}
                >
                  <span className="signup-heading">
                    Welcome to{" "}
                    <span className="font" style={{ fontSize: 50 }}>
                      {" "}
                      Clink
                    </span>
                  </span>
                  <p className="signup-p">
                    Welcome back to clink sign in to place your
                    <br />
                    order..
                  </p>
                  <div className="signup-form">
                    <div style={{ position: "relative" }}>
                      <label className="email-label" htmlFor="forgotEmail">
                        <img src={emailico} alt="" />
                      </label>

                      <input
                        onChange={this.handleChangeforgotEmail}
                        value={this.state.forgotEmail}
                        className="input-1-new"
                        type="email"
                        id="forgotEmail"
                        placeholder="Email"
                        required
                      />
                    </div>

                    <div className="signup-btns">
                      <button className="signupbtn btn-1-new" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => this.setState({ toggler3: 0 })}
                  className="cross"
                >
                  <img width="100%" height="100%" src={cross2} alt="" />
                </div>
              </form>
            </>
          ) : null}
          {this.state.toggler4 === 1 ? (
            <>
              <div
                onClick={() => this.setState({ toggler1: 0 })}
                ani={this.state.toggler1}
                className="signup-menu-back"
              ></div>
              <form
                // onSubmit={() => this.setState({ toggler4: 0, toggler5: 1 })}
                onSubmit={this.codeSet}
                ani={this.state.toggler1}
                className="signup-menu"
              >
                <div
                  className="signup-form"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    height: "60%",
                    flexDirection: "column",
                  }}
                >
                  <span className="signup-heading">
                    Welcome to{" "}
                    <span className="font" style={{ fontSize: 50 }}>
                      {" "}
                      Clink
                    </span>
                  </span>
                  <p className="signup-p">
                    Welcome back to clink sign in to place your
                    <br />
                    order..
                  </p>
                  <div className="signup-form">
                    <div style={{ position: "relative" }}>
                      <label className="email-label" htmlFor="forgotEmail">
                        <img src={emailico} alt="" />
                      </label>
                      <input
                        onChange={this.handleChangeCode}
                        value={this.state.code}
                        className="input-1-new"
                        type="number"
                        id="forgotEmail"
                        placeholder="Enter Code"
                        required
                      />
                    </div>

                    <div className="signup-btns">
                      <button className="signupbtn btn-1-new" type="submit">
                        {
                          this.state.loginLoader1 ? <Loader type="Oval" width={40} height={40} color="black" /> : "Submit"
                        }
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => this.setState({ toggler4: 0 })}
                  className="cross"
                >
                  <img width="100%" height="100%" src={cross2} alt="" />
                </div>
              </form>
            </>
          ) : null}
          {this.state.toggler5 === 1 ? (
            <>
              <div
                onClick={() => this.setState({ toggler1: 0 })}
                // onClick={ this.forgetPasswordhandler}

                ani={this.state.toggler1}
                className="signup-menu-back"
              ></div>
              <form
                // onSubmit={() => this.setState({ toggler4: 0, toggler5: 1 })}
                onSubmit={this.forgetPasswordhandler}
                ani={this.state.toggler1}
                className="signup-menu"
              >
                <div
                  className="signup-form"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    height: "60%",
                    flexDirection: "column",
                  }}
                >
                  <span className="signup-heading">
                    Welcome to{" "}
                    <span className="font" style={{ fontSize: 50 }}>
                      {" "}
                      Clink
                    </span>
                  </span>
                  <p className="signup-p">
                    Welcome back to clink sign in to place your
                    <br />
                    order..
                  </p>
                  <div className="signup-form">
                    <div style={{ position: "relative", marginTop: 20 }}>
                      <label className="email-label" htmlFor="pass1">
                        <img src={lock} alt="" />
                      </label>
                      <label
                        onMouseLeave={() =>
                          this.setState({ passShow: false })
                        }
                        onMouseEnter={() => this.setState({ passShow: true })}
                        className="eye-label"
                        htmlFor="emal1"
                      >
                        <img src={eye} alt="" />
                      </label>
                      <input
                        onChange={this.handleChangePassword2}
                        value={this.state.password2}
                        className="input-1-new"
                        type={this.state.passShow ? "text" : "password"}
                        id="pass1"
                        placeholder="New Password"
                        required
                      />
                    </div>
                    <div style={{ position: "relative", marginTop: 20 }}>
                      <label className="email-label" htmlFor="pass1">
                        <img src={lock} alt="" />
                      </label>
                      <input
                        onChange={this.handleConfirmPassword2}
                        className="input-1-new"
                        value={this.state.confirmPassowrd2}
                        type="password"
                        id="pass1"
                        placeholder="Confirm Password"
                        required
                      />
                    </div>
                    <div className="signup-btns">
                      <button className="signupbtn btn-1-new" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => this.setState({ toggler5: 0 })}
                  className="cross"
                >
                  <img width="100%" height="100%" src={cross2} alt="" />
                </div>
              </form>
            </>
          ) : null}
          {this.state.toggler === 1 ? (
            <>
              <div ani={this.state.toggler} className="menu">
                <div>
                  <li
                    className="menu-li"
                    style={{ cursor: "pointer" }}
                    onClick={() => (window.location.href = "/Home")}
                  >
                    Home
                  </li>
                  <li
                    className="menu-li"
                    style={{ cursor: "pointer" }}
                    onClick={() => (window.location.href = "/AboutUs")}
                  >
                    About
                  </li>
                  <li
                    className="menu-li"
                    style={{ cursor: "pointer" }}
                    onClick={() => (window.location.href = "/Products")}
                  >
                    Products
                  </li>
                  <li
                    className="menu-li"
                    style={{ cursor: "pointer" }}
                    onClick={() => (window.location.href = "/BlogPage")}
                  >
                    Blog
                  </li>
                  <li
                    className="menu-li"
                    style={{ cursor: "pointer" }}
                    onClick={() => (window.location.href = "/Contact")}
                  >
                    Contact
                  </li>
                  <li className="menu-icons">
                    <span className="menu-heading">Social Media</span>
                    <div className="footer-icons">
                      <img className="ico-footer" src={youtube} alt="" />
                      <img className="ico-footer" src={instagram} alt="" />
                      <img className="ico-footer" src={linkedin} alt="" />
                      <img className="ico-footer" src={facebook} alt="" />
                    </div>
                  </li>
                </div>
                <div
                  onClick={() => this.setState({ toggler: 0 })}
                  className="cross"
                >
                  <img width="100%" height="100%" src={cross} alt="" />
                </div>
                <div>
                  <span className="privacy">
                    Privacy Policy . Terms & Condition
                  </span>
                </div>
              </div>
              <div
                onClick={() => this.setState({ toggler: 0 })}
                ani={this.state.toggler}
                className="menu-back"
              ></div>
            </>
          ) : null}
          <div className="Navbar">
            <div
              className="left-side-nav"
              style={{ width: this.state.matches ? "100%" : "33%" }}
            >
              <div style={{ height: this.state.matches ? "50px" : "100px" }}>
                <Logo mainpage />
              </div>
            </div>
            <div
              className="center-side-nav"
              style={{ display: this.state.matches ? "none" : "flex" }}
            >
              <form onSubmit={this.checkarea} className="search-bar-nav">
                {/* <input
                  className="input-search-bar"
                  type="text"
                  placeholder="Enter your Zip code"
                  name="search"
                  id="search"
                  required
                /> */}

                <PlacesAutocomplete
                  value={this.state.address}
                  onChange={this.handleChange}
                  onSelect={this.handleSelect}
                >
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>

                      {/* <input
                           {...getInputProps({
                              placeholder: 'Search Places ...',
                              className: 'location-search-input',
                            })}
                            type="text"
                  className="input-search-bar"
                  placeholder="Enter your Zip code"
                  name="search"
                  id="search"
                  required
                > </input> */}

                      <input    {...getInputProps({
                        placeholder: 'Enter your Zip code',
                        className: 'location-search-input',
                      })} type="text" name="name" required
                        className="input-search-bar" >
                      </input>

                      {/* <input autoFocus {...getInputProps({
                              placeholder: 'Search Places ...',
                              className: 'location-search-input',
                            })} style={{ marginTop: 20, border: '1px solid white', color: 'white' }} className="footer-input input-3" type="number" minLength="5" id="email" placeholder="xxxxxxxx" required /> */}

                      <div className="autocomplete-dropdown-container-1">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                          const className = suggestion.active
                            ? 'suggestion-item--active-1'
                            : 'suggestion-item-1';
                          // inline style for demonstration purpose
                          const style = suggestion.active
                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                              })}
                            >
                              <span onClick={() => this.locationHandler} style={{ marginTop: 20, color: 'white', fontSize: 15 }} >{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
                <button className="btn-search-bar" type="submit">
                  <img
                    className="search-icon"
                    src={searchBar}
                    height="20px"
                    width="20px"
                    alt=""
                  />
                </button>
              </form>
            </div>
            <div
              className="right-side-nav"
              style={{ width: this.state.matches ? "100%" : "33%" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Link
                  onClick={() => this.setState({ toggler1: 1 })}
                  className="btn-nav"
                >
                  {" "}
                  Sign in / Sign up
                </Link>
                <div className="icons-nav">
                  <i onClick={() => (window.location.href = "/CartPage")}>
                    <svg
                      className="icon-nav"
                      xmlns="http://www.w3.org/2000/svg"
                      width="30.393"
                      height="33.804"
                      viewBox="0 0 30.393 33.804"
                    >
                      <path
                        id="Path_30"
                        data-name="Path 30"
                        d="M33.888,23.947a5.065,5.065,0,0,0-3.208-4.693L33.838,7.436A1.618,1.618,0,0,0,32.2,5.376H9.071L8.514,3.249A1.688,1.688,0,0,0,6.876,2H3.5V5.376H5.577L9.763,21.01a1.688,1.688,0,0,0,1.688,1.249H28.824a1.688,1.688,0,0,1,0,3.376H6.876a1.688,1.688,0,1,0,0,3.376H8.869a5.065,5.065,0,1,0,9.522,0h3.984A5.065,5.065,0,1,0,32.2,30.7a4.963,4.963,0,0,0-.675-2.482A5.065,5.065,0,0,0,33.888,23.947Zm-6.6-5.065h-14.5L9.983,8.753H30.005ZM13.629,32.388A1.688,1.688,0,1,1,15.318,30.7,1.688,1.688,0,0,1,13.629,32.388Zm13.506,0A1.688,1.688,0,1,1,28.824,30.7,1.688,1.688,0,0,1,27.135,32.388Z"
                        transform="translate(-3.5 -2)"
                        fill="#a10948"
                      />
                    </svg>
                  </i>
                  <i onClick={() => this.setState({ toggler: 1 })}>
                    <svg
                      className="icon-nav"
                      xmlns="http://www.w3.org/2000/svg"
                      width="38.375"
                      height="26"
                      viewBox="0 0 38.375 26"
                    >
                      <g
                        id="Group_7"
                        data-name="Group 7"
                        transform="translate(-1309 -175.546)"
                      >
                        <circle
                          id="Ellipse_1"
                          data-name="Ellipse 1"
                          cx="1.668"
                          cy="1.668"
                          r="1.668"
                          transform="translate(1309 187.086)"
                          fill="#a10948"
                        />
                        <rect
                          id="Rectangle_2"
                          data-name="Rectangle 2"
                          width="30.292"
                          height="3.337"
                          rx="0.94"
                          transform="translate(1317.083 187.086)"
                          fill="#a10948"
                        />
                        <rect
                          id="Rectangle_3"
                          data-name="Rectangle 3"
                          width="38.375"
                          height="3.337"
                          rx="0.94"
                          transform="translate(1309 198.209)"
                          fill="#a10948"
                        />
                        <rect
                          id="Rectangle_4"
                          data-name="Rectangle 4"
                          width="38"
                          height="3"
                          rx="0.94"
                          transform="translate(1309.096 175.546)"
                          fill="#a10948"
                        />
                      </g>
                    </svg>
                  </i>
                </div>
              </div>
            </div>
          </div>
        </>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.AuthReducer.user,
    user_area: state.AuthReducer.user_area
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    LOGIN_USER: data => { dispatch(LOGIN_USER(data)) },
    zipCode: data => { dispatch(zipCode(data)) }

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
