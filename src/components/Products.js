import '../css/home.css';
import React from 'react'
import tec2 from '../assets/tec1.png'
import beer from '../assets/beerbg.png'
import wine from '../assets/winebg.png'
import vodka from '../assets/vodkabg.png'
import whiskey from '../assets/whiskeybg.png'
import Carousel from 'react-bootstrap/Carousel'
import '../css/products.css'
import Navbar from './Navbar'
import CartProduct from '../components/CartProduct'
import Footer from './Footer';
import { getProduct } from "./../Service/service";
class Products extends React.Component {
    state = {
        toggler: 1,
        product:[]

    }
   async componentDidMount() {
        window.scrollTo(0, 0)
        try {
            let product = await getProduct();
         
            this.setState({product:product?.data?.result})
          } catch (error) {
            console.log(error?.data);
            console.log(error?.response?.data?.message);
          }
    }
    render() {
        console.log(this.state.product);
        return (
            <div className="Home bgimg-1" style={{ position: 'relative',backgroundColor:'white' }}>
                {
                    this.state.toggler === 1 ?
                        <>
                            <div ani={this.state.toggler} className="menu alert-new" style={{ alignItems: 'center', width: '50%', height: '60%' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "80%", flexDirection: 'column' }} >
                                    <li className="menu-li" style={{ fontSize: "5rem" }}>Before We start !</li>

                                    <li className="menu-li" style={{ fontSize: "3rem", textAlign: 'center ' }}>
                                        Enter your zıp code <br />
                                     to see products near you
                                         </li>
                                    <form onSubmit={() => this.setState({ toggler: 0 })}>
                                        <div style={{ marginTop: 20 }} style={{ position: 'relative' }}>
                                            <button type="submit" className="footer-btn" style={{ position: 'absolute', right: 0, marginTop: 20, zIndex: 20, borderRadius: '0px', border: '1px solid white' }}>Enter</button>
                                            <input style={{ marginTop: 20, border: '1px solid white', color: 'white' }} className="footer-input input-3" type="number" minLength="5" id="email" placeholder="xxxxxxxx" required />
                                        </div>

                                        {/* <div className="new-grid">
                                        <button className="signupbtn btn-2-new" style={{ color: 'white', border: '1px solid white ' }} >No , Leave</button>
                                        <button onClick={() => this.setState({ toggler: 0 })} className="signupbtn btn-1-new">Yes I am</button>

                                    </div> */}
                                    </form>
                                </div>

                            </div>
                            <div ani={this.state.toggler} className="menu-back">

                            </div>
                        </>
                        :
                        null
                }
                {/* <img className="bgimg-1" src={bgimg1} alt="" /> */}
                <Navbar />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: 'column' }}>
                    <div className="items mt-4">
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
                    </div>
                    <div className="products">

                        <div className="slider">
                            <Carousel>
                                <Carousel.Item interval={1500}>
                                    <img width="100%" height="100%" src={tec2} alt="" />
                                </Carousel.Item>
                                <Carousel.Item interval={1500}>
                                    <img width="100%" height="100%" src={beer} alt="" />
                                </Carousel.Item>
                                <Carousel.Item interval={1500}>
                                    <img width="100%" height="100%" src={wine} alt="" />
                                </Carousel.Item>
                                <Carousel.Item interval={1500}>
                                    <img width="100%" height="100%" src={vodka} alt="" />
                                </Carousel.Item>
                                <Carousel.Item interval={1500}>
                                    <img width="100%" height="100%" src={whiskey} alt="" />
                                </Carousel.Item>
                            </Carousel>
                        </div>
                        <span className="mt-5 p-5 filter-heading" >Filtering By</span>
                        <div className="filters">
                            <select className="filter-input" name="sort" id="sort">
                                <option className="filter-input" value="date">date</option>
                                <option value="time">time</option>
                            </select>
                            <select className="filter-input" name="sort" id="sort">
                                <option value="Company">Company</option>
                                <option value="Company">Company</option>
                            </select>
                            <select className="filter-input" name="sort" id="sort">
                                <option value="Volume">Volume</option>
                                <option value="Volume">Volume</option>
                            </select>
                            <select className="filter-input" name="sort" id="sort">
                                <option value="Category">Category</option>
                                <option value="Category">Category</option>
                            </select>
                        </div>
                        <div className="products-cart">
                            {
                                this.state && this.state.product?
                                this.state?.product.map((item, index) =>
                                    <CartProduct product={item}/>
                                )
                                :'product Not Found'
                            }

                        </div>

                    </div>

                    <Footer />

                </div>
            </div>
        )
    }

};
export default Products;
