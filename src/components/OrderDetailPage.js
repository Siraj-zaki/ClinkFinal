import '../css/home.css';
import React from 'react'
import '../css/products.css'
import Navbar from './Navbar'
import SelectedItem from './SelectedItem'
import 'swiper/swiper.scss';
import Footer from './Footer';
import { connect } from 'react-redux';
import { getProduct } from "./../Service/service";
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


class OrderDetailPage extends React.Component {
    state = {
        hearttoggler: false,
        counter: 0,
        product: [],
        productfilter: [],
    }
    async componentDidMount() {
        window.scrollTo(0, 0)
        try {
            let product1 = await getProduct();

            this.setState({ product: product1?.data?.result })
            this.setState({ productfilter: product1?.data?.result })
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
                        <div className="selected-items-div" style={{ alignItems: 'flex-start' }}>
                            <div className="cart-heading">
                                <span className="cart-heading-heading">Product Detail Page</span>
                            </div>
                            {this.props?.cartData && this.props?.cartData.length ?
                                this.props?.cartData.map((pro, ind) => (
                                    total_amount += (parseInt(pro.productUnit[0]?.cvr) + parseInt(pro.productUnit[0]?.itemPrice)) * pro.quantity,

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
                                        OrderDetailPage
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
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
                                <span className="go-back " onClick={() => window.history.go(-1)} style={{ fontSize: '18px', cursor: 'pointer' }} >Go Back</span>
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


export default connect(mapStateToProps)(OrderDetailPage);
