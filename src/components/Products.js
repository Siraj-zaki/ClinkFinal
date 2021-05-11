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
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

class Products extends React.Component {
    state = {
        toggler: 1,
        product: [],
        productfilter: [],
        datevalue: '',
        companyvalue: 'Please Select Company',
        categoryid: ''


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
    handleDate = (e) => {
        if (!this.state.product.length) {
            console.log('elseee');
            this.setState({ product: this.state.productfilter })

        }
        console.log('valuedate', e.target.value);
        this.setState({ datevalue: e.target.value })
        let item = this.state.productfilter.filter(c => c.createdat == e.target.value)
        console.log('item', item);
        this.setState({ product: item })
        console.log('123', this.state.productfilter);
        console.log('123', this.state.product);

    }
    handleCompany = (e) => {
        if (!this.state.product.length) {
            console.log('elseee');
            this.setState({ product: this.state.productfilter })

        }
        console.log('valuedate', e.target.value);
        this.setState({ companyvalue: e.target.value })
        let item = this.state.productfilter.filter(c => c.storeName == e.target.value)
        console.log('item', item);
        this.setState({ product: item })
        console.log('123', this.state.productfilter);
        console.log('123', this.state.product);

    }
    handleCategory = (e) => {
        if (!this.state.product.length) {
            console.log('elseee');
            this.setState({ product: this.state.productfilter })

        }
        console.log('valuedate', e.target.value);
        this.setState({ categoryid: e.target.value })
        let item = this.state.productfilter.filter(c => c.categoryName == e.target.value)
        console.log('item', item);
        this.setState({ product: item })
        console.log('123', this.state.productfilter);
        console.log('123', this.state.product);

    }

    handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
        console.log(string)
        console.log(this.state.product.length)
        { this.state.product.length == 1 ? this.setState({ product: this.state.productfilter }) : this.setState({ product: this.state.product }) }

        if (this.state.product.length == 1) {
            this.setState({ product: this.state.productfilter })

        }

        console.log(this.state.productfilter);
        this.setState({ product: results })


    }

    handleOnHover = (result) => {
        { this.state.product.length == 1 ? this.setState({ product: this.state.productfilter }) : this.setState({ product: this.state.product }) }

        // the item hovered
        console.log(result)
    }

    handleOnSelect = (item) => {
        // the item selected
        this.setState({ product: item })
        { this.state.product.length == 1 ? this.setState({ product: this.state.productfilter }) : this.setState({ product: this.state.product }) }

        console.log(item)
    }

    handleOnFocus = () => {
        { this.state.product.length == 1 ? this.setState({ product: this.state.productfilter }) : this.setState({ product: this.state.product }) }

        console.log('Focused')
    }

    render() {
        console.log(this.state.product);
        return (
            <div className="Home bgimg-1" style={{ position: 'relative', backgroundColor: 'white' }}>
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
                                            <input autoFocus  style={{ marginTop: 20, border: '1px solid white', color: 'white' }} className="footer-input input-3" type="number" minLength="5" id="email" placeholder="xxxxxxxx" required />
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
                            <select className="filter-input" name="sort" value={this.state.companyvalue} onChange={(e) => this.handleCompany(e)} id="sort">
                                <option value='Date'>Please Select Company</option>

                                {
                                    this.state?.productfilter.map((cat, index) =>


                                        <option key={index} value={cat.storeName}>{cat.storeName}</option>

                                    )
                                }

                            </select>
                            <select className="filter-input" name="sort" value={this.state.datevalue} onChange={(e) => this.handleDate(e)} id="sort">
                                <option value='Date'>Please Select Date</option>

                                {
                                    this.state?.productfilter.map((cat, index) =>


                                        <option key={index} value={cat.createdat}>{cat.createdat}</option>

                                    )
                                }

                            </select>
                            <div style={{ width: 280 }}>
                                <ReactSearchAutocomplete
                                    fuseOptions={{ keys: ["itemName"] }}
                                    //     // necessary, otherwise the results will be blank
                                    resultStringKeyName="itemName"
                                    items={this.state.productfilter}
                                    onSearch={this.handleOnSearch}
                                    onHover={this.handleOnHover}
                                    onSelect={this.handleOnSelect}
                                    onFocus={this.handleOnFocus}
                                    // autoFocus
                                />
                            </div>

                            <select className="filter-input" name="sort" value={this.state.categoryid} onChange={(e) => this.handleCategory(e)} id="sort">
                                <option value='Date'>Please Select Category</option>

                                {
                                    this.state?.productfilter.map((cat, index) =>


                                        <option key={index} value={cat.categoryName}>{cat.categoryName}</option>

                                    )
                                }

                            </select>
                        </div>
                        <div className="products-cart">
                            {

                                this.state && this.state.product.length ?
                                    this.state?.product.map((item, index) =>
                                        <CartProduct product={item} />
                                    )
                                    :
                                    this.state?.productfilter.map((item, index) =>
                                        <CartProduct product={item} />
                                    )
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
