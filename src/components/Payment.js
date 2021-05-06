import '../css/home.css';
import React from 'react'
import left from '../assets/leftarrow.png'
import right from '../assets/rightarrow.png'
import cartimg from '../assets/cartimg.png'
import cart from '../assets/cart.png'
import "../css/devilvery.css"

import Navbar from './Navbar'
import { motion } from "framer-motion"
import SelectedItem from './SelectedItem'

import { connect } from "react-redux";

import { emptyFromCart } from '../services/Store/Actions/cartActions';

import Footer from './Footer';
import { loadStripe } from '@stripe/stripe-js';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ElementsConsumer } from "@stripe/react-stripe-js";
import {
    CardNumberElement,
    CardElement,
    CardExpiryElement,
    CardCvcElement,
    injectStripe,
    StripeProvider,
    Elements,
} from '@stripe/react-stripe-js';
import { addOrder } from '../Service/service';


const CARD_ELEMENT_OPTIONS = {
    iconStyle: "solid",
    hidePostalCode: true,
    style: {
        base: {

            iconColor: "rgb(240, 57, 122)",
            color: "rgb(240, 57, 122)",
            fontSize: "25px",
            fontFamily: '"Open Sans", sans-serif',
            fontSmoothing: "antialiased",
            "::placeholder": {
                color: "#CFD7DF"
            }
        },
        invalid: {
            color: "#e5424d",
            ":focus": {
                color: "#303238"
            }
        }
    }
};

class Payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hearttoggler: false,
            counter: 0,
            toggler: 0,
            errorMessage: '',
            number: '',
            name: '',
            orderNote: '',
            stripeToken: ''
        }
        console.log(this.props);
        this.handleChange = this.handleChange.bind(
            this
        );
        this.handleSubmit = this.handleSubmit.bind(
            this
        );
        this.handleChangeNumber = this.handleChangeNumber.bind(
            this
        ); this.handleChangeName = this.handleChangeName.bind(
            this
        );
        this.handleChangeOrderNote = this.handleChangeOrderNote.bind(
            this
        );
    }
    handleChangeNumber(e) {
        console.log(e.target.value);

        this.setState({ number: e.target.value });
    }
    handleChangeOrderNote(e) {
        console.log(e.target.value);

        this.setState({ orderNote: e.target.value });
    }
    handleChangeName(e) {
        console.log(e.target.value);

        this.setState({ name: e.target.value });
    }
    handleChange = ({ error }) => {
        if (error) {
            this.setState({ errorMessage: error.message });
        }
    };
    //  handleSubmit = async(event) => {
    //         event.preventDefault();
    //         debugger
    //         const { stripe, elements } = this.props;
    //         console.log(stripe);
    //         if (!stripe || !elements) {
    //           return;
    //         }


    //         const card = elements.getElement(CardNumberElement);
    //         const result = await stripe.createToken(card);
    //         if (result.error) {
    //           console.log(result.error.message);
    //         } else {

    //             try {

    //                 this.setState({stripeToken:result.token})
    //                  console.log(result.token);
    //                  console.log(this.props);

    //                     this?.props?.cardData?.map(async(item,index)=>{

    //                         let data = {

    //                             stripeToken: this.state.stripeToken,
    //                             userID: this?.props.customerAddress[0].userID,
    //                             customerAddress: this?.props.customerAddress[0].id,
    //                             itemquantity:item.quantity,
    //                             unitID: item.unit,
    //                             product_id: item.id,
    //                             product_amount: item.price * item.quantity,


    //                         };

    //                         console.log("data", data);
    //                         let customer = await addOrder(data)
    //                           .then((re1) => {
    //                             console.log(re1);

    //                           })
    //                           .catch(err => {
    //                             console.log("er", err);
    //                           })
    //                     })




    //               }
    //               catch (error) {
    //                 console.log(error);
    //               }




    //         }





    //     };

    handleSubmit = async (event) => {


        console.log(this.props);
        event.preventDefault();

        const { stripe, elements } = this.props;
        console.log(stripe);
        if (!stripe || !elements) {
            return toast.dark("PLEASE FILL FORM TO PROCEED");
        } else if (this.props?.cardData.length === 0) {
            return toast.dark("CART IS EMPTY")
        }
        try {


            console.log(this.props);

            this?.props?.cardData?.map(async (item, index) => {
                const card = elements.getElement(CardNumberElement);
                const result = await stripe.createToken(card);
                this.setState({ stripeToken: result.token })
                console.log(result.token);
                if (result.error) {
                    console.log(result.error.message);
                } else {


                    let data = {

                        stripeToken: this.state.stripeToken,
                        userID: this?.props.customerAddress[0].userID,
                        customerAddress: this?.props.customerAddress[0].id,
                        itemquantity: item.quantity,
                        unitId: item.productUnit[0].id,
                        product_id: item.id,
                        product_amount: (parseInt(item.productUnit[0].cvr) + parseInt(item.productUnit[0].itemPrice)) * item.quantity,


                    };

                    console.log("data", data);
                    let customer = await addOrder(data)
                        .then((re1) => {
                            console.log(re1);
                            console.log(this.props);
                            toast.dark("PAYMENT PAID")
                            setTimeout(() => {
                                window.location.href = "/Products"
                            }, 2000);

                        })
                        .catch(err => {
                            console.log("er", err);
                        })
                }

            })
            this.props.emptycard();



        } catch (error) {
            console.log(error);
        }


    };


    render() {
        let total_amount = 0
        console.log('asda', this.props);

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
            console.log(newRating);
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
                                        <motion.circle id="Ellipse_18" data-name="Ellipse 18" cx="7" cy="7" r="7" transform="translate(1178 163)" fill="#fff" ></motion.circle>
                                    </g>
                                </g>
                            </g>
                        </motion.svg>
                    </div>
                </div>


                <form onSubmit={this.handleSubmit}>
                    <div className="products new-padding new-class-product" style={{ justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'row' }} >
                        <div style={{ display: "flex", justifyContent: 'center', alignItems: "center", flexDirection: 'column', position: 'relative' }} >
                            <div className="slider-div-1" animation={this.state.toggler} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column', width: "56rem", minWidth: '320px', marginBottom: 30 }} >
                                <div style={{ margin: 30 }} >
                                    <span className="slider-heading" style={{ fontWeight: 400 }} >Delivery Information</span>
                                </div>
                                <div className="left-side-form">
                                    <div className="form-selected-option">
                                        <div className="form-selected-option mt-4">
                                            <input type="text" placeholder="User Name" onChange={this.handleChangeName} className="adresses-input" style={{ width: '50rem' }} required />
                                        </div>
                                        <div className="form-selected-option mt-4">
                                            <input type="text" placeholder="Contact Number" onChange={this.handleChangeNumber} className="adresses-input" style={{ width: '50rem' }} required />
                                        </div>
                                        <div style={{ width: "100%" }}>
                                            <div className="form-selected-option " style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
                                                <CardNumberElement options={CARD_ELEMENT_OPTIONS} className='adresses-input mt-4' />
                                                <CardExpiryElement options={CARD_ELEMENT_OPTIONS} className='adresses-input adresses-input-2 mt-4' />
                                            </div>
                                            {/* <div className="form-selected-option mt-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>

                                            </div> */}
                                        </div>
                                        <div className="form-selected-option " style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
                                            <CardCvcElement options={CARD_ELEMENT_OPTIONS} className='adresses-input mt-4' />
                                            <div className="mt-4" style={{ width: 'auto', minWidth: 'auto' }} >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="172.2" height="76" viewBox="0 0 172.2 76">
                                                    <g id="Group_6254" data-name="Group 6254" transform="translate(-636.8 -692)">
                                                        <text id="Card_Number" data-name="Card Number" transform="translate(685 747)" fill="#a2a2a2" font-size="18" font-family="Montserrat-Regular, Montserrat"><tspan x="0" y="0"></tspan></text>
                                                        <g id="Group_5348" data-name="Group 5348" transform="translate(604.8 596)">
                                                            <path id="Path_3536" data-name="Path 3536" d="M131.75,96H38.65A6.654,6.654,0,0,0,32,102.65v62.7A6.67,6.67,0,0,0,38.65,172h93.1a6.67,6.67,0,0,0,6.65-6.721V102.721A6.67,6.67,0,0,0,131.75,96Zm-89.039,7.6h84.954a3.157,3.157,0,0,1,3.111,2.85v4.75H39.6v-4.821A3.131,3.131,0,0,1,42.711,103.6Zm84.977,60.8H42.711a3.114,3.114,0,0,1-3.111-2.779V134h91.2v27.55A3.175,3.175,0,0,1,127.689,164.4Z" fill="#233d3a" />
                                                            <path id="Path_3537" data-name="Path 3537" d="M96,304h45.6v3.8H96Z" transform="translate(-48.8 -158.6)" fill="#233d3a" />
                                                            <path id="Path_3538" data-name="Path 3538" d="M96,336h22.8v3.8H96Z" transform="translate(-48.8 -183)" fill="#233d3a" />
                                                            <path id="Path_3539" data-name="Path 3539" d="M352,304h15.2v11.4H352Z" transform="translate(-244 -158.6)" fill="#233d3a" />
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="form-selected-option mt-4" style={{ width: '100%' }}>
                                            <textarea style={{ height: 200, paddingTop: 10, paddingRight: 30, width: '100%' }} type="text" placeholder="Order Note or message (If any)" onChange={this.handleChangeOrderNote} className="adresses-input" ></textarea>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column', width: '100%' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                                <input className="checking m-1" type="checkbox" required name="" id="" /><label htmlFor="checking" className="remember-heading m-1">I agree <label htmlFor="checking" className="remember-heading m-1" style={{ color: "#a10948" }}>that, I am 21 above</label> </label>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                                <input className="checking m-1" type="checkbox" required name="" id="" /><label htmlFor="checking" className="remember-heading m-1">I agree <label htmlFor="checking" className="remember-heading m-1" style={{ color: "#a10948" }}> terms & conditions and Privacy policy</label> </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="cart-right-side" style={{ zIndex: 1, width: '100%', paddingLeft: '4rem' }}>
                            <div className="selected-items-div">
                                <div className="cart-heading">
                                    <img src={cart} alt="" />
                                    <span className="cart-heading-heading">Cart</span>
                                </div>
                                {this.props?.cardData && this.props?.cardData.length ?
                                    this.props?.cardData.map((pro, ind) => (
                                        total_amount += (parseInt(pro.productUnit[0].cvr) + parseInt(pro.productUnit[0].itemPrice)) * pro.quantity,

                                        <SelectedItem
                                            key={ind}
                                            id={pro.id}
                                            heading={pro.itemName}
                                            headingsmall={pro.storeName}
                                            size={pro.productUnit[0].unit}
                                            price={parseInt(pro.productUnit[0].cvr) + parseInt(pro.productUnit[0].itemPrice)}
                                            quantity={pro.quantity}
                                            imgsrc={pro.imgUrl}
                                        />
                                    )) : null}
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
                            </div>
                        </div>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
                        <span className="go-back" onClick={() => window.location.href = "/Devilvery"} style={{ fontSize: '18px' }} >Go Back</span>
                        <button className="li-size  addtocart " style={{ minHeight: 70, border: 'none', width: 270, margin: '6rem' }} type="submit"  >Make Payment </button>
                        {/* <button className="li-size  addtocart " style={{ minHeight: 70, border: 'none', width: 270, margin: '6rem' }} onClick={() => window.location.href = "/Finished"} >Make Payment </button> */}
                    </div>
                </form>
                <Footer />


            </div >

        )
    }

};

const Devilvery = (props) => (

    <ElementsConsumer>
        {({ stripe, elements }) => (

            <Payment stripe={stripe} elements={elements} cardData={props.cartData} customerAddress={props.customerAddress} emptycard={props.emptyFromCart} />
        )}
    </ElementsConsumer>
);


const mapStateToProps = (state) => {
    return {
        user: state.AuthReducer.user,
        cartData: state.CartReducer.cartData,
        customerAddress: state.CartReducer.customerAddress,

    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        emptyFromCart: data => { dispatch(emptyFromCart()) }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Devilvery);
