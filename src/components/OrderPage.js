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
import { customerwiseOrder } from "./../Service/service";

class OrderPage extends React.Component {
    state = {
        hearttoggler: false,
        counter: 0,
        product: [],
        productfilter: [],
    }
    async componentDidMount() {
        window.scrollTo(0, 0)
        console.log(this.props);
        try {
            let product1 = await customerwiseOrder(this.props.user.id);
        

            this.setState({ product: product1?.data?.result })
            this.setState({ productfilter: product1?.data?.result })
            console.log(this.state.product);
        } catch (error) {
            console.log(error?.data);
            console.log(error?.response?.data?.message);
        }
    }
    emptyCart = () => {

        if (this.props?.cartData.length === 0) {
            return toast.dark("CART IS EMPTY")
        } else return this.props.user?.id ? window.location.href = "/Devilvery" : toast.dark("Please login Your Account")


    }
    // this.props.user?.id ? window.location.href = "/Devilvery" : toast.warn("Please login Your Account"
    render() {
        console.log(this.props);
        let total_amount = 0
        return (
            <div className="Home bgimg-1 " style={{ position: 'relative', backgroundColor: 'white' }}>
                {/* <img className="bgimg-1" src={bgimg1} alt="" /> */}
                <Navbar />
                <div className="products new-padding new-class-product" style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} >
                    <div className="cart-right-side" style={{ zIndex: 1, width: '100%', paddingLeft: '4rem' }}>
                        <div className="selected-items-div">
                            <div className="cart-heading">
                                <span className="cart-heading-heading">Orders</span>
                            </div>

                            {this.state?.product && this.props?.product.length ?
                                this.state?.product.map((pro, ind) => (
                                    total_amount += pro.to,
                                    <>

                                        <SelectedItem
                                            key={ind}
                                            id={pro.id}
                                            id_random={pro.id_random}
                                            heading={pro.itemName}
                                            headingsmall={pro.storeName}
                                            size={pro.productUnit[0]?.unit}
                                            price={parseInt(pro.productUnit[0]?.cvr) + parseInt(pro.productUnit[0]?.itemPrice)}
                                            quantity={pro.quantity}
                                            imgsrc={pro.imgUrl}
                                            pending
                                            ordernumber={`Order ${ind + 1}`}
                                        />
                                        <div className="left-side-form" style={{ marginTop: '10rem', width: '100%' }}>
                                            <div className="form-selected-option" >
                                                <div className="form-selected-option mt-4">
                                                    <label htmlFor="" className="label-for-order" >Booking  Time</label>
                                                    <input type="text" placeholder="Devilery Time" className="adresses-input" style={{ width: '50rem' }} required disabled />
                                                </div>
                                                <div className="form-selected-option mt-4">
                                                    <label htmlFor="" className="label-for-order" >Est.Time</label>
                                                    <input type="text" placeholder="Est.Time" className="adresses-input" style={{ width: '50rem' }} required disabled />
                                                </div>
                                                <div className="form-selected-option mt-4">
                                                    <label htmlFor="" className="label-for-order" >Order Number</label>
                                                    <input type="text" placeholder="Order Number" className="adresses-input" style={{ width: '50rem' }} required disabled />
                                                </div>
                                            </div>
                                        </div>
                                    </>
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
                                            </div>
                                        </div>
                                    </div>
                            }


                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
                                <span className="go-back " onClick={() => window.history.go(-1)} style={{ fontSize: '18px', cursor: 'pointer' }} >Go Back</span>

                                {/* <span className="remove-all ">Remove all </span> */}
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


export default connect(mapStateToProps)(OrderPage);
