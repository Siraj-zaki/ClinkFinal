import '../css/home.css';
import React from 'react'
import Slider from "react-slick";
// import cart from '../assets/cart.png'
import left from '../assets/leftarrow.png'
import smallcross from '../assets/smallcross.png'
import right from '../assets/rightarrow.png'
import cartimg from '../assets/cartimg.png'
import cart from '../assets/cart.png'
import '../css/products.css'
import SwiperCore, { Navigation } from 'swiper';
import Navbar from './Navbar'
import { motion } from "framer-motion"
import SelectedItem from './SelectedItem'
import 'swiper/swiper.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import CartProduct from '../components/CartProduct'
import Footer from './Footer';
import { connect } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
class AddingToCart extends React.Component {
    state = {
        hearttoggler: false,
        counter: 0,
    }
    emptyCart = () => {
        // if (this.props.user?.id === true) {
        //      window.location.href = "/Devilvery"

        // } else if (this.props.user?.id === true) {
        //     return toast.dark("PLEASE LOGIN FIRST")
        // }
        // else if (this.props?.cartData === null) {
        //     return toast.dark("NO ITEM IN CART")
        // }
        if (this.props?.cartData.length === 0) {
            return toast.dark("CART IS EMPTY")
        } else return this.props.user?.id ? window.location.href = "/Devilvery" : toast.dark("Please login Your Account")
        //  else if (this.props.user?.id === true) {
        //     window.location.href = "/Devilvery"
        // } else return toast.dark("PLEASE LOGIN FIRST ")

    }
    // this.props.user?.id ? window.location.href = "/Devilvery" : toast.warn("Please login Your Account"
    render() {
        console.log(this.props);
        let total_amount = 0
        SwiperCore.use([Navigation]);
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

                        <motion.svg xmlns="http://www.w3.org/2000/svg" width="525" height="73" viewBox="0 0 525 63"
                            variants={svganimation}
                            initial="hidden"
                            animate="visible"
                        >
                            <g id="Group_6244" data-name="Group 6244" transform="translate(-706 -159)">
                                <motion.text variants={svgfont1} id="Order" transform="translate(706 217)" fill="#233d3a" font-size="20" font-family="Montserrat-Regular, Montserrat"><tspan x="0" y="0">Order</tspan></motion.text>
                                <motion.text variants={svgfont2} id="Delivery" transform="translate(920 217)" fill="#233d3a" font-size="20" font-family="Montserrat-Regular, Montserrat"><tspan x="0" y="0">Delivery</tspan></motion.text>
                                <motion.text variants={svgfont3} id="Payment" transform="translate(1139 217)" fill="#233d3a" font-size="20" font-family="Montserrat-Regular, Montserrat"><tspan x="0" y="0">Payment</tspan></motion.text>
                                <g id="Group_6238" data-name="Group 6238">
                                    <circle id="Ellipse_13" data-name="Ellipse 13" cx="11" cy="11" r="11" transform="translate(724 159)" fill="#a10948" />
                                    <g id="Group_6237" data-name="Group 6237">
                                        <motion.line id="Line_8" data-name="Line 8" x1="432" transform="translate(742 170)  " fill="none" stroke="#a10948" stroke-width="2"
                                            variants={svgline}
                                        ></motion.line>
                                        <motion.circle
                                            variants={svgbox2}
                                            id="Ellipse_14" data-name="Ellipse 14" cx="11" cy="11" r="15" transform="translate(949 159)" fill="#a10948" ></motion.circle>
                                        <motion.circle
                                            variants={svgbox1}
                                            id="Ellipse_15" data-name="Ellipse 15" cx="11" cy="11" r="15" transform="translate(1174 159)" fill="#a10948" ></motion.circle>
                                        <circle id="Ellipse_16" data-name="Ellipse 16" cx="7" cy="7" r="7" transform="translate(728 163)" fill="#fff" />
                                    </g>
                                </g>
                            </g>
                        </motion.svg>

                    </div>
                </div>


                <div className="products new-padding new-class-product" style={{ justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'row' }} >
                    {/* <div className="cart-left-side " style={{ width: '40rem', zIndex: 40 }} >
                        <div className="w-100 mt-5 slider-div ">
                            <div style={{ margin: 30 }} >
                                <span className="slider-heading" >Products you may like</span>
                            </div>
                            <Slider {...settings}>
                                {
                                    Array(10).fill().map((item, index) =>
                                        <div>
                                            <CartProduct />
                                        </div>
                                    )
                                }
                            </Slider>
                            <button className="li-size  addtocart " style={{ minHeight: 70, border: 'none', width: 270 }} >Add to Cart</button>
                            <button className="li-size  addtocart " style={{ backgroundColor: 'transparent', minHeight: 70, border: '1px solid  #a10948 ', color: '#a10948', width: 270, marginTop: 160 }} >Explore More</button>
                        </div>
                    </div> */}
                    <div className="slider-div" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: "450px" }} >
                        <div style={{ margin: 30 }} >
                            <span className="slider-heading" >Products you may like</span>
                        </div>
                        <div style={{ width: 272, paddingBottom: 20, display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }} >
                            <Swiper
                                spaceBetween={10}
                                navigation
                                pagination
                                slidesPerView={1}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                            >
                                {
                                    Array(10).fill().map((item, index) =>

                                        <SwiperSlide>
                                            <div >
                                                <CartProduct newwidth newheight />
                                            </div>
                                        </SwiperSlide>

                                    )
                                }
                            </Swiper>
                        </div>
                        <button className="li-size  addtocart " style={{ minHeight: 70, border: 'none', width: 270 }} >Add to Cart</button>
                        <button className="li-size  addtocart " style={{ backgroundColor: 'transparent', minHeight: 70, border: '1px solid  #a10948 ', color: '#a10948', width: 270, marginTop: 40, }} onClick={() => window.location.href = "/Products"} >Explore More</button>
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
                                        id={pro.id}
                                        heading={pro.itemName}
                                        headingsmall={pro.storeName}
                                        size={pro.productUnit[0].unit}
                                        price={parseInt(pro.productUnit[0].cvr) + parseInt(pro.productUnit[0].itemPrice)}
                                        quantity={pro.quantity}
                                        imgsrc={pro.imgUrl}
                                    />
                                )) : null}
                            {/* {Array(5).fill().map((item, index) =>

                                <SelectedItem
                                    heading="Casamigos – Blanco"
                                    headingsmall="Tequila Reposado"
                                    size="375 ML"
                                    price=" $25"
                                    imgsrc={cartimg}
                                />
                            )} */}
                            <div className="inner-cart-div mt-5 border-top pt-5">
                                <div className="cart-left-side">
                                    <img src={this.props.imgsrc} alt="" />
                                </div>
                                <div className="cart-center-side" style={{ width: '100%' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', flexDirection: 'column' }}>
                                        <span className="div-right-side-heading m-2" style={{ fontSize: '20px' }} >{this.props.heading}</span>
                                        <span className="div-right-side-small-heading m-2" style={{ textAlign: 'left' }} >{this.props.headingsmall}</span>
                                        <div className="m-2" style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', width: '100%' }} >
                                            <span className=" div-right-side-small-heading m-2" style={{ display: 'flex', justifyContent: 'center', alignItems: "center", width: '100%', alignSelf: 'center' }} >Total Amount</span>
                                            <span className="li-size" style={{ fontSize: '7rem', display: 'flex', justifyContent: 'center', alignItems: "center", width: '100%', alignSelf: 'center' }} >{total_amount}$</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
                                <span className="go-back " onClick={() => window.history.go(-1)} style={{ fontSize: '18px', cursor: 'pointer' }} >Go Back</span>
                                <button onClick={
                                    //     () => 
                                    // this.props.user?.id ? window.location.href = "/Devilvery" : toast.warn("Please login Your Account", {
                                    //     style: { fontSize: 13 },
                                    //     className: 'dark-toast',
                                    //     autoClose: 5000

                                    // }
                                    // )
                                    this.emptyCart
                                } className="li-size  addtocart " style={{ minHeight: 70, border: 'none', width: 270, margin: '6rem' }}  >Proceed to Delivery </button>
                                <span className="remove-all ">Remove all </span>
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
        cartData: state.CartReducer.cartData
    };
};


export default connect(mapStateToProps)(AddingToCart);
