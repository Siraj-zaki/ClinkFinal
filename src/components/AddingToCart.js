import '../css/home.css';
import ReactStars from "react-rating-stars-component";
import React from 'react'
import heart from '../assets/heart.png'
import heartfill from '../assets/heartfill.png'
import staroutline from '../assets/staroutline.png'
import starfill from '../assets/starfill.png'
import Slider from "react-slick";
import left from '../assets/leftarrow.png'
import right from '../assets/rightarrow.png'
import starfull from '../assets/heartfull.png'
import User from './User'
import beercart from '../assets/beercart.png'
import '../css/products.css'
import Navbar from './Navbar'
import CartProduct from '../components/CartProduct'
import Footer from './Footer';
import { withRouter } from "react-router";
import { getProduct,whistlist ,whistlistUser,recentProduct} from "./../Service/service";

import { getProductById, getProductUnitById } from "./../Service/service";
import { connect } from 'react-redux';
import { addToCart } from '../services/Store/Actions/cartActions';
import { injectStyle } from "react-toastify/dist/inject-style";
import { ToastContainer, toast } from "react-toastify";

class AddingToCart extends React.Component {

    constructor() {
        super();
        this.state = {
            hearttoggler: false,
            counter: 0,
            product: [],
            quantity: 1, unit: [],
            items: '',
            productUnit: [],
            relatedproduct: [],

        }
        this.onChange = this.onChange.bind(this);
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     console.log(nextProps);
    //     console.log(nextProps.match.params.id);
    //     if (nextProps.cartData.find(pro => pro.id == nextProps.match.params.id)) {
    //         console.log('test propss')
    //         return{
    //             quantity: nextProps.cartData.find(pro => pro.id == nextProps.match.params.id).quantity
    //         }
    //     }
    // }
    onChange = (event) => {
        const target = event.target;
        var value = target.value;

        console.log(value);

        if (target.checked) {
            this.state.items = value;
            console.log(this.state.items);
        } else {

            var index = this.state.items.indexOf(value);
            if (index > -1) {
                let data = this.state.items.splice(index, 1);
                this.setState({
                    items: data
                })
            }
            console.log(this.state.items);
            // this.state.items.splice(value, 1);
        }
        console.log(this.state.unit);
        let item = this.state.unit.filter(c => c.id == this.state.items)
        this.setState({
            productUnit: item
        })
        console.log(item);

        // this.setState({ [e.target.name]: e.target.checked });
    }

    async componentDidMount() {
        if(this.props?.user?.id){
           
            console.log(this.state.hearttoggler);
    
            let data={
                itemId:this.props.match.params.id,
                userId:this.props.user.id
            }
         
            let recent=  await  recentProduct(data)
             
         let whi=  await  whistlistUser(data)
         .then(r1=>{
             
             if(r1.data.result.length){
                 if(r1.data.result[0].status=="true"){
                    console.log(r1.data.result.status);

                     this.setState({ hearttoggler: true })
                 }

                else{
                this.setState({ hearttoggler: false })
             }
             }
            

         })



        }

        const id = this.props.match.params.id;
        console.log('final carddd', this.props);

        let product1 = await getProduct();
        this.setState({ relatedproduct: product1?.data?.result })


        if (this.props?.cartData && this.props?.cartData.length && this.props?.cartData.find(pro => pro.id === id)) {
            console.log('final carddd', this.state.quantity);
            this.setState({ quantity: this.props?.cartData.find(pro => pro.id === id).quantity })
        }

        try {
            let product = await getProductById(id);
            console.log(product);
            this.setState({ product: product.data.result[0] });
            let unitproduct = await getProductUnitById(id);
            console.log(unitproduct);
            this.setState({ unit: unitproduct.data.result })

        } catch (error) {
            console.log(error.data);
            console.log(error?.response?.data?.message);
        }
    }

    onSubmit = () => {
        console.log(this.state.productUnit.length);
        if (this.state.productUnit.length) {
            let dup = this.state.product;
            dup.id_random = Math.floor(100000 + Math.random() * 900000);
            dup.quantity = this.state.quantity;
            dup.productUnit = this.state.productUnit;
            console.log(dup);
            this.props.addToCart(dup);
            toast.dark("Successfully Item Added")
            // , {
            //     style: { fontSize: 13 },
            //     className: 'dark-toast',
            //     autoClose: 5000
            // });
            setTimeout(() => {
                window.location.href = "/CartPage"
            }, 2000);
        } else {

            toast.dark("Please Select Unit", {
                style: { fontSize: 13 },
                className: 'dark-toast',
                autoClose: 5000
            });

        }


        // return toast("SuccessfullY Item Added", {
        //     position: "top-right",
        //     autoClose: 5000,
        //     className: 'dark-toast',
        //     fontSize: 100,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //   });
    }


    whistlist =async () => {
        if(this.props?.user?.id){
            this.setState({ hearttoggler: !this.state.hearttoggler })
            console.log(this.state.hearttoggler);
    
            let data={
                itemId:this.props.match.params.id,
                userId:this.props.user.id
            }
         
             
         let whi=  await  whistlist(data)
         .then(r1=>{
             console.log(r1);
             toast.dark(r1.data.message, {
                 style: { fontSize: 13 },
                 className: 'dark-toast',
                 autoClose: 5000
             });

         })



        }
else{
    
    toast.dark("Please login", {
        style: { fontSize: 13 },
        className: 'dark-toast',
        autoClose: 5000
    });
}
          
        


      
    }

    render() {
        console.log(this.state.quantity);
        let item = this.state.unit.filter(c => c.id === this.state.items)

        console.log(item);

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
            <div className="Home bg-white " style={{ position: 'relative' }}>
                {/* <img className="bgimg-1" src={bgimg1} alt="" /> */}
                <Navbar />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: 'column' }}>
                    {/* <div className="items mt-4">
                        <button className="product-btn btn-new-1">
                            Tequila
                        </button>
                        <button className="product-btn btn-new-1">
                            Beer
                        </button>
                        <button className="product-btn btn-new-1">
                            Wine
                        </button>
                        <button className="product-btn btn-new-1">
                            Vodka
                        </button>
                        <button className="product-btn btn-new-1">
                            Whiskey
                        </button>
                    </div> */}
                    <span className="detail-heading mt-5" >CLINK / TEQUILA / BLANCO / SILVER TEQUILA</span>
                    <div className="products new-padding">
                        <div className="product-detail-div">
                            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}  className="product-detail-div-left-side">
                                <img style={{objectFit:'contain',height:250}} src={this.state?.product?.imgUrl} alt="" />
                            </div>
                            <div className="product-detail-div-right-side" style={{ padding: '7rem', position: 'relative' }}>
                                <div style={{ width: '100%', position: 'relative', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <div style={{ right: '0%', top: "50%", transform: "translate(0%, -50%)" }} className="heart-main" onClick={() => this.whistlist()}>
                                        <img className="heart-div" src={this.state.hearttoggler === true ? heartfill : heart} alt="" />
                                    </div>
                                    <span className="div-right-side-heading" >{this.state?.product?.itemName}</span>
                                </div>
                                {/* <span className="div-right-side-heading" >Casamigos ??? Blanco</span> */}
                                <span className="div-right-side-small-heading" >{this.state?.product?.storeName}</span>
                                <div style={{ display: 'flex', padding: 3, paddingLeft: 0, justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                                    <ReactStars
                                        count={5}
                                        onChange={ratingChanged}
                                        size={30}
                                        isHalf={true}
                                        emptyIcon={<img src={staroutline} alt='' />}
                                        // halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<img src={starfill} alt='' />}
                                        activeColor="#a10948"
                                    />
                                </div>
                                <span className="div-right-side-p" >
                                    {this.state.product.description}
                                </span>
                                <div className="div-right-side-li">
                                    {this?.state?.unit.map(r1 => (

                                        <li className="size-selector mt-5">
                                            <div>
                                                <input type="radio" className="m-3 ml-5" id="t-option" name="selector" value={r1.id} onChange={(e) => this.onChange(e)} />
                                                <span className="li-size m-3">{r1.unit}</span>
                                            </div>
                                            <div>
                                                <span className="li-size m-3 mr-5" >{parseInt(r1.itemPrice) + parseInt(r1.cvr)} $</span>
                                            </div>
                                        </li>
                                    ))
                                    }
                                    <li className="size-selector mt-5" style={{ minHeight: 'none', border: 'none' }}>
                                        <div style={{ border: '1px solid black', minHeight: '70px', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: "space-evenly", width: 200 }}>
                                            <button onClick={() => this.state.quantity === 0 ? this.setState({ quantity: this.state.quantity + 0 }) : this.setState({ quantity: this.state.quantity - 1 })} className="addtocart-btn" style={{ fontSize: 40 }} >
                                                -
                                           </button>
                                            <button className="addtocart-btn">
                                                {this.state.quantity}
                                            </button>
                                            <button onClick={() => this.setState({ quantity: this.state.quantity + 1 })} className="addtocart-btn" style={{ fontSize: 30 }} >
                                                +
                                            </button>
                                        </div>
                                        <div>
                                            {/* <button className="li-size m-3 mr-5 addtocart " style={{ minHeight: 70, border: 'none' }} onClick={() => window.location.href = "/CartPage"}  >Add to Cart</button> */}
                                            {/* {this.props?.cartData && this.props?.cartData.length && this.props?.cartData.filter(pro => pro.id).length ? 
                                            <button className="li-size m-3 mr-5 addtocart " style={{ minHeight: 70, border: 'none' }} onClick={() => window.location.href = "/CartPage"}  >View Cart</button>
                                            :
                                        } */}
                                            <button className="li-size m-3 mr-5 addtocart " style={{ minHeight: 70, border: 'none' }} onClick={() => this.onSubmit()}  >Add to Cart</button>
                                        </div>
                                    </li>
                                </div>
                            </div>
                        </div>
                        <div className="w-100 mt-5 slider-div ">
                            <div style={{ margin: 30 }} >
                                <span className="slider-heading" >Products you may like</span>
                            </div>
                            <Slider {...settings}>
                                {
                                    this.props.product.map((item, index) =>
                                        <div>
                                            <CartProduct
                                                img={item.imgUrl}
                                                Company={item.Company}
                                                Bottle={item.itemName}
                                                StoreName={item.storeName}
                                                id={item.id}
                                            />
                                        </div>
                                    )
                                }
                            </Slider>
                        </div>
                        <div className="rating-reviews">
                            <div className="rating-heading-div">
                                <span className="rating-heading" >
                                    Rating and Reviews
                                </span>
                                <span style={{fontSize:15,margin:10}} className="rating-heading" >
                                    No Reviews and Ratings
                                </span>
                                {/* <span className="rating-about">
                                    <div>
                                        <span className="rating-about-point" >
                                            5,0
                                        </span>
                                    </div>
                                    <div style={{ width: '100%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flexDirection: "column" }}>
                                        {
                                            Array(5).fill().map((item, index) =>
                                                <img src={starfull} alt="" />

                                            )
                                        }
                                        <div>
                                            <span className="rating-about-point" style={{ fontSize: 20 }}  >5 Reviews</span>
                                        </div>
                                    </div>
                                </span> */}
                                 <div>
                                            <span className="rating-about-point" style={{ fontSize: 15 }}  >No Reviews</span>
                                        </div>
                                {/* {
                                    Array(6).fill().map((item, index) =>
                                        <User />
                                    )
                                } */}
                               


                            </div>
                        </div>


                    </div>

                    <Footer />
                    {/* <ToastContainer
                        toastClassName="dark-toast"
                        progressClassName="transparent-progress"
                    /> */}
                </div>
            </div>
        )
    }

};

const mapStateToProps = (state) => {
    return {
        cartData: state.CartReducer.cartData,
        user: state.AuthReducer.user,
        product: state.AreaProduct?.product
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: data => { dispatch(addToCart(data)) }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddingToCart));
