import '../css/home.css';
import React from 'react'
import left from '../assets/leftarrow.png'
import right from '../assets/rightarrow.png'
import cartimg from '../assets/cartimg.png'
import cart from '../assets/cart.png'
import Dropdown from 'react-bootstrap/Dropdown'
import "../css/devilvery.css"
import { connect } from "react-redux";
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './Navbar'
import { motion } from "framer-motion"
import SelectedItem from './SelectedItem'
import { addDelivery, getDeliverybycustomer, addOrder, addCustomerDetail, StoreTiming } from "./../Service/service";
import { ToastContainer, toast } from "react-toastify";
import { LOGIN_USER } from "./../services/Store/Actions/action";

import "react-toastify/dist/ReactToastify.css";
import Footer from './Footer';
import { customerAddres } from '../services/Store/Actions/cartActions';
import { deliveryTime } from '../services/Store/Actions/deliverytime';
import { loadStripe } from '@stripe/stripe-js';
import moment from 'moment'
import { Tooltip } from 'bootstrap';
class Devilvery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeSlots: [],
            startingTime: "",
            endingTime: "",
            devilveryTime: "",
            hearttoggler: false,
            counter: 0,
            toggler: 0,
            radiobtn: '',
            radiobtn1: '',
            name: '',
            addressname: '',
            openaddress: '',
            city: '',
            area: '',
            postalcode: '',
            userID: '',
            idcard: '',
            customer_address: [],
            customer_id: false,
            errors: {},
            number: '',
            filterData: [],
            ani: 1,
            storeClose: true
        }
        // console.log(this.props.user);
        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(
            this
        );
        this.handleChangeAddress = this.handleChangeAddress.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
        this.handleChangeArea = this.handleChangeArea.bind(this);
        this.handleChangeidCARD = this.handleChangeidCARD.bind(this);
        this.handleChangeNumber = this.handleChangeNumber.bind(this);
        this.handleChangePostalCode = this.handleChangePostalCode.bind(this);
        this.handleSaveAddress = this.handleSaveAddress.bind(this);

    }
    creatTimeSlots = (fromTime, toTime) => {
        let startTime = moment(fromTime, "hh:mm A");
        let endTime = moment(toTime, "hh:mm A")
        if (endTime.isBefore(startTime)) {
            endTime.add(1, 'day');
        }
        let arr = []
        while (startTime <= endTime) {
            arr.push(new moment(startTime).format('hh:mm A'))
            startTime.add(30, 'minutes')
        }
        return arr
    }
    async componentDidMount() {
     
        // alert( this.creatTimeSlots('08:00 AM', '09:00 PM'))
        // this.setState({ timeSlots: this.creatTimeSlots('08:00 AM', '09:00 PM') })

        // this.setState({ timeSlots: this.creatTimeSlots('08:00 AM', '09:00 PM') })
        this.props?.cartData.map(async (r8) => {
            let store = await StoreTiming(r8.store_id)
            // console.log(store.data.result);]
            // alert(store.data.result)
            store?.data?.result?.map(r6 => {
                // console.log(store, "sada")
                this.setState({ startingTime: r6.days })
                this.setState({ endingTime: r6.days })

                console.log(r6.days, 'asdasd');
                if (r6.days == moment().format('dddd')) {
                    // console.log('r6.sssss');
                    var str1 = r6.startingTime;
                    var str2 = r6.endingTime;
                    str1 = str1.split(':');
                    str2 = str2.split(':');
                    let totalSeconds1 = parseInt(str1[0] * 3600 + str1[1].slice(0, 2) * 60);
                    let totalSeconds2 = parseInt(str2[0] * 3600 + str2[1].slice(0, 2) * 60);
                    // compare them
                    let customertime = moment().format('LT').slice(0, 4).split(':');
                    let customerSeconds2 = parseInt(customertime[0] * 3600 + customertime[1].slice(0, 2) * 60);


                    if (totalSeconds1 > customerSeconds2 && totalSeconds2 > customerSeconds2) {
                        // console.log(customerSeconds2, '222222222222222222222222222222222');
                        this.setState({ storeClose: false })
                    }
                } else {
                    this.setState({ startingTime: store.data?.result[0].startingTime })
                    this.setState({ endingTime: store.data?.result[0].endingTime })
                    console.log(this.state.startingTime);
                    console.log(this.state.endingTime);
                    // alert(this.creatTimeSlots(this.state.startingTime, this.state.endingTime))
                    this.setState({ timeSlots: this.creatTimeSlots(this.state.startingTime, this.state.endingTime) })
                    console.log(this.state.timeSlots);


                }

            })

        })
        let customer = await getDeliverybycustomer(this.props?.user.user_ID)
        // console.log(customer.data.result);
        this.setState({ customer_address: customer.data.result })



    }

    async submituserRegistrationForm(e) {
        e.preventDefault();
        if (this.state.addressname === "") {

            return toast.dark("PLEASE ENTER ADDRESS NAME")

        } else if (this.state.name === "") {
            return toast.dark("PLEASE ENTER NAME")
        } else if (this.state.openaddress === '') {
            return toast.dark("PLEASE ENTER OPEN ADDRESS")
        } else if (this.state.city === "") {
            return toast.dark("PLEASE ENTER CITY")
        } else if (this.state.area === "") {
            return toast.dark("PLEASE ENTER  AREA")
        } else if (this.state.idcard === "") {
            return toast.dark("PLEASE ENTER ID CARD NUMBER")
        } else if (this.state.postalcode === "") {
            return toast.dark("PLEASE ENTER POSTAL CODE")
        } else if (this.state.number === "") {
            return toast.dark("PLEASE ENTER TELEPHONE NUMBER")
        } else if (this.validateForm()) {
            // console.log(this.state);
            try {
                let data = {
                    addressName: this.state.addressname,
                    name: this.state.name,
                    business: this.state.radiobtn,
                    business: this.state.radiobtn1,
                    number: this.state.number,
                    postalcode: this.state.postalcode,
                    address: this.state.openaddress,
                    city: this.state.city,
                    area: this.state.area,
                    userID: this.props?.user?.id,
                    // deliverytime:this.state.devilveryTime?this.state.devilveryTime:moment().format() 
                };

                console.log("asdasdasdasd",data);
                console.log("asdasdasdasd",this.props);
                e.preventDefault();
                // console.log("asdasdasdasd", this.validateForm());
                // console.log("data", data);
                let customer = await addDelivery(data)
                    .then((re1) => {
                        // console.log(re1);
                        if (re1?.data?.success) {
                            return toast(re1.data.message, {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            },
                                setTimeout(() => {
                                    window.location.reload(false)
                                }, 1000)
                            );
                        } else {
                            // console.log("errrrr", re1);
                            return toast("Email Already Exists", {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        }


                    })
                    .catch(err => {
                        // console.log("er", err);
                    })
            }
            catch (error) {
                // console.log(error);
            }
        }
    }

    validateForm() {
        let errors = {};

        let formIsValid = true;

        if (!this.state.addressname) {
            // formIsValid = false;
            console.log("state empty");
            return toast("🦄 Wow so easy!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            errors["email"] = "*Please enter your address .";
        }



        if (!this.state.name) {
            //   formIsValid = false;

            errors["password"] = "*Please enter your name.";
        }


        this.setState({
            errors: errors,
        });
        // console.log("formIsValid", formIsValid);
        return formIsValid;
    }
    handleChangeAddress(e) {
        // console.log(e.target.value);
        this.setState({ addressname: e.target.value });
    }
    handleChangeOpenAddress1(e) {
        // console.log(e.target.value);
        this.setState({ openaddress: e.target.value });
    }
    handleChangeName(e) {
        // console.log(e.target.value);

        this.setState({ name: e.target.value });
    } handleChangeCity(e) {
        // console.log(e.target.value);

        this.setState({ city: e.target.value });
    } handleChangeArea(e) {
        // console.log(e.target.value);

        this.setState({ area: e.target.value });
    } handleChangeidCARD(e) {
        // console.log(e.target.value);

        this.setState({ idcard: e.target.value });
    } handleChangeNumber(e) {
        // console.log(e.target.value);

        this.setState({ number: e.target.value });
    } handleChangePostalCode(e) {
        // console.log(e.target.value);

        this.setState({ postalcode: e.target.value });
    }
    async handleSaveAddress(e) {


        this.setState({ customer_id: e.target.value });

        setTimeout(() => {

            let filtercustomer = this.state?.customer_address?.filter(r1 => r1?.id == this.state?.customer_id)
            // console.log(filtercustomer);
            this.props.customerAddres(filtercustomer)
        }, 200);


    }
    DevilveryAddress = () => {
        if (this.state.customer_id === false) {
            return toast.dark("Please Select Address")
        } else if (this.props?.cartData.length === 0) {
            return toast.dark("CART IS EMPTY")
        } else if (this.state.devilveryTime === "") {
            return toast.dark("Please Select Time ")
        } else {


            this.props.deliveryTime(this.state.devilveryTime)
            console.log(this.props);
            window.location.href = "/Payment"

        }

    }


    render() {

        let total_amount = 0
        console.log(this.props);




        const svganimation = {
            hidden: {
                opacity: 0
            },
            visible: {
                opacity: 1,
                transition: { duration: 1 }
            }

        }
        const svgline = {
            hidden: {
                opacity: 0,
                x2: 445
            },
            visible: {
                opacity: 1,

                transition: { duration: 2, type: "easeInOut" },
                x2: 0
            }

        }
        const svgbox1 = {
            hidden: {
                opacity: 0,
                r: 0
            },
            visible: {
                opacity: 1,
                transition: { duration: 1, type: "spring", stiffness: 200 },
                r: 11,
            }
        }
        const svgfont1 = {
            hidden: {
                opacity: 0,
                "font-size": 0
            },
            visible: {
                opacity: 1,
                transition: { duration: 1, delay: 2, type: "spring", stiffness: 200 },
                "font-size": 20,
            }
        }
        const svgfont2 = {
            hidden: {
                opacity: 0,
                "font-size": 0
            },
            visible: {
                opacity: 1,
                transition: { duration: 1, delay: 1, type: "spring", stiffness: 200 },
                "font-size": 20,
            }
        }
        const svgfont3 = {
            hidden: {
                opacity: 0,
                "font-size": 0
            },
            visible: {
                opacity: 1,
                transition: { duration: 1, type: "spring", stiffness: 200 },
                "font-size": 20,
            }
        }
        const svgbox2 = {
            hidden: {
                opacity: 0,
                r: 0
            },
            visible: {
                opacity: 1,
                transition: { duration: 1, delay: 1, type: "spring", stiffness: 200 },
                r: 11,
            }
        }
        const svgbox3 = {
            hidden: {
                opacity: 0,
                r: 0
            },
            visible: {
                opacity: 1,
                transition: { duration: 1, delay: 2, type: "spring", stiffness: 200 },
                r: 11,
            }
        }
        const svgbox4 = {
            hidden: {
                opacity: 0,
                r: 0
            },
            visible: {
                opacity: 1,
                transition: { duration: 1, delay: 2, type: "spring", stiffness: 200 },
                r: 7,
            }
        }
        const svgbox5 = {
            hidden: {
                opacity: 0,
                r: 0
            },
            visible: {
                opacity: 1,
                transition: { duration: 1, delay: 1, type: "spring", stiffness: 200 },
                r: 7,
            }
        }
        function SamplePrevArrow(props) {
            const { className, style, onClick } = props;
            return (
                <div className="left-arrow" onClick={onClick} >
                    <img src={left} alt="" />
                </div>
            );
        }

        const ratingChanged = (newRating) => {
            // console.log(newRating);
        };


        function SampleNxtArrow(props) {
            const { className, style, onClick } = props;
            return (
                <div className="right-arrow" onClick={onClick} >
                    <img src={right} alt="" />
                </div>
            );
        }
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow: <SamplePrevArrow />,
            prevArrow: <SampleNxtArrow />,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        console.log(this.state.devilveryTime);
        return (
            <div className="Home bgimg-1 " style={{ position: 'relative', backgroundColor: 'white' }}>
                {/* <img className="bgimg-1" src={bgimg1} alt="" /> */}
                <Navbar />
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 40 }} >
                    <div style={{ width: "50%", height: 75, display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                        <motion.svg
                            variants={svganimation}
                            initial="hidden"
                            animate="visible" xmlns="http://www.w3.org/2000/svg" width="525" height="73" viewBox="0 0 525 63">
                            <g id="Group_6251" data-name="Group 6251" transform="translate(-706 -159)">
                                <motion.text variants={svgfont1} id="Order" transform="translate(706 217)" fill="#233d3a" font-size="20" font-family="Montserrat-Regular, Montserrat"><tspan x="0" y="0">Order</tspan></motion.text>
                                <motion.text variants={svgfont2} id="Delivery" transform="translate(920 217)" fill="#233d3a" font-size="20" font-family="Montserrat-Regular, Montserrat"><tspan x="0" y="0">Delivery</tspan></motion.text>
                                <motion.text variants={svgfont3} id="Payment" transform="translate(1139 217)" fill="#233d3a" font-size="20" font-family="Montserrat-Regular, Montserrat"><tspan x="0" y="0">Payment</tspan></motion.text>
                                <g id="Group_6250" data-name="Group 6250">
                                    <motion.circle variants={svgbox3} id="Ellipse_13" data-name="Ellipse 13" cx="11" cy="11" r="11" transform="translate(724 159)" fill="#a10948" ></motion.circle>
                                    <g id="Group_6249" data-name="Group 6249">
                                        <motion.line id="Line_8" data-name="Line 8" x1="432" transform="translate(742 170)  " fill="none" stroke="#a10948" stroke-width="2"
                                            variants={svgline}
                                        ></motion.line>
                                        <motion.circle variants={svgbox2} id="Ellipse_14" data-name="Ellipse 14" cx="11" cy="11" r="15" transform="translate(949 159)" fill="#a10948" ></motion.circle>
                                        <motion.circle variants={svgbox1} id="Ellipse_15" data-name="Ellipse 15" cx="11" cy="11" r="15" transform="translate(1174 159)" fill="#a10948" ></motion.circle>
                                        <motion.circle variants={svgbox4} id="Ellipse_16" data-name="Ellipse 16" cx="7" cy="7" r="7" transform="translate(728 163)" fill="#fff" ></motion.circle>
                                        <motion.circle variants={svgbox5} id="Ellipse_17" data-name="Ellipse 17" cx="7" cy="7" r="7" transform="translate(953 163)" fill="#fff" ></motion.circle>
                                    </g>
                                </g>
                            </g>
                        </motion.svg>
                    </div>
                </div>


                <div className="products new-padding new-class-product" style={{ justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'row' }} >
                    <div style={{ display: "flex", justifyContent: 'center', alignItems: "center", flexDirection: 'column', position: 'relative' }} >
                        {
                            this.state.storeClose ?
                                <div className="slider-div-1" style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column', width: "auto", marginBottom: 30 }} >
                                    <div style={{ margin: 30 }} >
                                        <span className="slider-heading" style={{ fontWeight: 400 }} >Store is Closed</span>
                                    </div>
                                    <div className="left-side-form">
                                        <div className="form-selected-option">
                                            <h1 style={{ fontSize: 17 }} >See Secdule for more details</h1>
                                        </div>
                                        <div className="mt-5" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}  >
                                            <Dropdown  >
                                                <Dropdown.Toggle
                                                    className="btn-nav"
                                                    id="dropdown-basic"
                                                >
                                                    See Schedule
                                                </Dropdown.Toggle>
                                                {console.log(this.state.timeSlots)}
                                                <Dropdown.Menu className="customer-scrollbar"  >
                                                    {this.state.timeSlots.map((item, index) => {
                                                        return <button
                                                            onClick={() => this.setState({ devilveryTime: item + " " + this.state.timeSlots[index + 1] })}
                                                            style={{ width: 'max-content', fontSize: '10px', textAlign: 'center' }}
                                                            className=" new-btn-1" key={index}>
                                                            {item}
                                                            {this.state.timeSlots[index + 1] ? ' - ' + this.state.timeSlots[index + 1] : ""}
                                                        </button>
                                                    }
                                                    )}
                                                    {/* </Dropdown.Menu> */}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                                : ""

                        }
                        <div className="slider-div-1" ani={this.state.ani} animation={this.state.toggler} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column', width: "auto", marginBottom: 30 }} >
                            <div style={{ margin: 30 }} >
                                <span className="slider-heading" style={{ fontWeight: 400 }} >Delivery Information</span>
                            </div>
                            <div className="left-side-form">
                                <div className="form-selected-option">
                                    <label htmlFor="chooseaddress" className="label-for-select" >Delivery Adresses </label>
                                    <select type="text" value={this.state?.customer_id} onChange={this.handleSaveAddress} className="adresses-input">
                                        <option>Please select Option</option>

                                        {this.state.customer_address.map((cat, index) =>
                                            <option key={index} value={cat?.id} >{cat.addressName}</option>

                                        )}

                                    </select>
                                </div>
                                {/* <div className="form-selected-option">
                                    <label htmlFor="chooseaddress" className="label-for-select" >Billing Adresses </label>
                                    <select type="text" className="adresses-input">
                                        <option value="1"> Billing Adresses</option>
                                        <option value="2"> Billing Adresses</option>
                                        <option value="3"> Billing Adresses</option>
                                        <option value="4"> Billing Adresses</option>
                                        <option value="5"> Billing Adresses</option>
                                    </select>
                                </div> */}
                                <div className="mt-5"  >
                                    <button className="add-new-btn" onClick={() => this.setState({ toggler: 1, ani: 1 })} >Add New</button>
                                </div>
                            </div>
                        </div>

                        {
                            this.state.toggler === 1 ?
                                <div className="slider-div-1 new-animation" ani={this.state.ani} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column', width: "auto", marginBottom: 30 }} >
                                    <div style={{ margin: 30 }} >
                                        <span className="slider-heading" style={{ fontWeight: 400 }} >Delivery Information</span>
                                    </div>
                                    <form onSubmit={this.submituserRegistrationForm}>
                                        <div className="left-side-form">
                                            <div className="form-selected-option">
                                                <input type="text" placeholder="Address Name" onChange={this.handleChangeAddress} className="adresses-input" />
                                            </div>
                                            <div style={{ display: 'flex', marginTop: 20, alignItems: 'center', justifyContent: 'flex-start', width: "100%" }}>
                                                <input onClick={(e) => this.setState({ radiobtn1: e.target.checked, radiobtn: false })} className="m-3" type="radio" name="Radio" id="radio-1" />
                                                <label className="m-3 personal-radio" htmlFor="radio-1">Personal</label>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: "100%" }}>
                                                <input onClick={(e) => this.setState({ radiobtn: e.target.checked ? true : false, radiobtn1: false })} className="m-3" type="radio" name="Radio" id="radio-2" />
                                                <label className="m-3 personal-radio" htmlFor="radio-2">Company</label>
                                            </div>
                                            {
                                                this.state.radiobtn === true ?
                                                    <div className="form-selected-option mt-5">
                                                        <input type="text" placeholder="Company Tax Number" className="adresses-input" />
                                                    </div>
                                                    :
                                                    <div className="form-selected-option mt-5">
                                                        <input type="text" placeholder="Name and Surname" onChange={this.handleChangeName} className="adresses-input" />
                                                    </div>

                                            }

                                            <div className="form-selected-option mt-5">
                                                <textarea style={{ height: 200, paddingTop: 10, paddingRight: 30 }} type="text" placeholder="Open Adress" onChange={(e) => this.setState({ openaddress: e.target.value })} className="adresses-input" ></textarea>
                                            </div>
                                            <div className="form-selected-option mt-5">
                                                <input type="text" placeholder="City" onChange={this.handleChangeCity} className="adresses-input" />
                                            </div>
                                            <div className="form-selected-option mt-5">
                                                <input type="text" placeholder="Area" className="adresses-input" onChange={this.handleChangeArea} />
                                            </div>
                                            <div className="form-selected-option mt-5">
                                                <input type="number" placeholder="ID Card Number" className="adresses-input" onChange={this.handleChangeidCARD} />
                                            </div>
                                            <div className="form-selected-option mt-5">
                                                <input type="number" placeholder="Postal Code" className="adresses-input" onChange={this.handleChangePostalCode} />
                                            </div>
                                            <div className="form-selected-option mt-5">
                                                <input type="number" placeholder="Telephone Number" className="adresses-input" onChange={this.handleChangeNumber} />
                                            </div>

                                            <div className="mt-5"  >
                                                <button className="add-new-btn"  >Add Address</button>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="mt-5"  >
                                        <button className="add-new-btn" onClick={() => this.setState({ ani: 2 })} >Go Back</button>
                                    </div>
                                </div>
                                : null
                        }
                    </div>
                    <div className="cart-right-side" style={{ zIndex: 1, width: '100%', paddingLeft: '4rem' }}>
                        <div className="selected-items-div">
                            <div className="cart-heading">
                                <img src={cart} alt="" />
                                <span className="cart-heading-heading">Cart</span>
                            </div>
                            {this.props?.cartData && this.props?.cartData.length ?
                                this.props?.cartData.map((pro, ind) => (

                                    total_amount += (parseInt(pro.productUnit[0].cvr) + parseInt(pro.productUnit[0].itemPrice)) * pro.quantity,

                                    <SelectedItem
                                        key={ind}
                                        id={pro?.id}
                                        heading={pro?.itemName}
                                        headingsmall={pro?.storeName}
                                        size={pro.productUnit[0].unit}
                                        price={parseInt(pro.productUnit[0].cvr) + parseInt(pro.productUnit[0].itemPrice)}
                                        quantity={pro.quantity}
                                        imgsrc={pro?.imgUrl}
                                    />

                                )) : null}
                            {
                                total_amount === 0 ? <span className="cart-heading-heading" style={{ opacity: 0.5, marginTop: "3rem" }} >Cart is Empty</span>
                                    :
                                    <div className="inner-cart-div mt-5 border-top pt-5">
                                        <div className="cart-left-side">
                                            <img src={this.props.imgsrc} alt="" />
                                        </div>
                                        <div className="cart-center-side" style={{ width: '100%' }}>
                                            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', flexDirection: 'column' }}>
                                                <span className="div-right-side-heading m-2" style={{ fontSize: '20px' }} >{this.props.heading}</span>
                                                <span className="div-right-side-small-heading m-2" style={{ textAlign: 'left' }} >{this.props.headingsmall}</span>
                                                <>


                                                    <div className="m-2" style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', width: '100%' }} >
                                                        <span className=" div-right-side-small-heading m-2" style={{ display: 'flex', justifyContent: 'center', alignItems: "center", width: '100%', alignSelf: 'center' }} >Total Amount</span>

                                                        <span className="li-size" style={{ fontSize: '7rem', display: 'flex', justifyContent: 'center', alignItems: "center", width: '100%', alignSelf: 'center' }} >{total_amount}$</span>
                                                    </div>
                                                </>
                                            </div>
                                        </div>
                                    </div>
                            }


                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
                                <span onClick={() => window.location.href = "/CartPage"} className="go-back" style={{ fontSize: '18px' }}  >Go Back</span>
                                <button className="li-size  addtocart " style={{ minHeight: 70, border: 'none', width: 270, margin: '6rem' }} onClick={this.DevilveryAddress}   >Proceed to Payment </button>
                                <span className="remove-all" >Remove all </span>
                            </div>
                        </div>
                    </div>






                </div>

                <Footer />

            </div >

        )
    }

};
const mapStateToProps = (state) => {
    return {
        user: state.AuthReducer.user,
        cartData: state.CartReducer.cartData,
        customerAddress: state.CartReducer.customerAddress,
        delivery: state.DeliveryTime.delivery

    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        customerAddres: data => { dispatch(customerAddres(data)) },
        deliveryTime: data => { dispatch(deliveryTime(data)) },


    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Devilvery);
