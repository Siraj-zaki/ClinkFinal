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
import { getProduct,addAreaProduct } from "./../Service/service";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { connect } from "react-redux";

class Products extends React.Component {
    state = {
        toggler: 1,
        product: [],
        productfilter: [],
        datevalue: '',
        companyvalue: 'Please Select Company',
        categoryid: '',
        lat: '',
        long: '',
        zipcode: '',
        completeAddress: [],
        user_area:this.props.user_area


    }
    async componentDidMount() {
        console.log(this.props.user_area);
        if(this.props.user_area){
            this.setState({toggler:0})
         
        let area = {
            longitude: this.props.user_area.longitude,
            latitude: this.props.user_area.latitude
        }
        let res;

        console.log(area);
        try {

              res = await addAreaProduct(area)
              console.log(res.data.result);
              this.setState({ product: res?.data.result })
              this.setState({ productfilter:res?.data.result })

        } catch (err) {
            console.log(err);
            console.log(err?.data?.message);
        }





        }
        console.log('test');
        window.scrollTo(0, 0)
        navigator.geolocation.getCurrentPosition(
            function (position) {
                console.log(position);
            },
            function (error) {
                console.error("Error Code = " + error.code + " - " + error.message);
            }
        );
        // try {
        //     let product1 = await getProduct();

        //     this.setState({ product: product1?.data?.result })
        //     this.setState({ productfilter: product1?.data?.result })

        // } catch (error) {
        //     console.log(error?.data);
        //     console.log(error?.response?.data?.message);
        // }
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
                        console.log(this.state.lat);
                        console.log(this.state.long);
                    })
                    .catch(error => console.error('Error', error));
            })
    };

    handleChange = address => {
        this.setState({ address });
    };

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
    checkarea = async (e) => {
        e.preventDefault()
        let area = {
            longitude: this.state.long,
            latitude: this.state.lat,
        }
        let res;

        console.log(area);
        try {

              res = await addAreaProduct(area)
              console.log(res.data.result);
              this.setState({ product: res?.data.result })
              this.setState({ productfilter:res?.data.result })

        } catch (err) {
            console.log(err);
            console.log(err?.data?.message);
        }



        this.setState({ toggler: 0 })

    }

    render() {
        console.log(this.state.product);
        return (
            <div className="Home bgimg-1" style={{ position: 'relative', backgroundColor: 'white' }}>
                {
                    this.state.toggler === 1 ?
                        <>
                            <div ani={this.state.toggler} className="menu alert-new" style={{ alignItems: 'center', width: '50%', height: '60%', justifyContent: 'flex-start' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "80%", flexDirection: 'column', marginTop: '20%' }} >
                                    <li className="menu-li" style={{ fontSize: "5rem" }}>Before We start !</li>
                                    <form onSubmit={this.checkarea}>
                                        <div style={{ marginTop: 20, width: '300px' }} style={{ position: 'relative' }}>
                                            <PlacesAutocomplete
                                                value={this.state.address}
                                                onChange={this.handleChange}
                                                onSelect={this.handleSelect}
                                            >
                                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                    <div style={{ width: '300px' }}>
                                                        <li className="menu-li" style={{ fontSize: "3rem", textAlign: 'center ' }}>
                                                            Enter your zıp code <br />
                                                            to see products near you
                                                        </li>
                                                        <br />
                                                        <button type="submit" className="footer-btn" style={{ position: 'absolute', right: 0, marginTop: 20, zIndex: 20, borderRadius: '0px', border: '1px solid white' }}>Enter</button>




                                                         {/* <input    {...getInputProps({
                              placeholder: 'Search Places ...',
                              className: 'location-search-input',
                            })} type="text" name="name" required class="form-control" ></input>  */}

                                                         <input autoFocus {...getInputProps({
                                                            placeholder: 'Search Places ...',
                                                            className: 'location-search-input',
                                                        })} style={{ marginTop: 20, border: '1px solid white', color: 'white' }} className="footer-input input-3" type="text" minLength="5" id="email"  required ></input> 

                                                        <div className="autocomplete-dropdown-container " style={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: "column" }}>
                                                            {loading && <div>Loading...</div>}
                                                            {suggestions.map(suggestion => {
                                                                const className = suggestion.active
                                                                    ? 'suggestion-item--active'
                                                                    : 'suggestion-item';
                                                                // inline style for demonstration purpose

                                                                return (
                                                                    <div
                                                                        {...getSuggestionItemProps(suggestion, {
                                                                            className,
                                                                        })}
                                                                    >
                                                                        <span style={{ marginTop: 20, color: 'white', fontSize: 15 }} >{suggestion.description}</span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )}
                                            </PlacesAutocomplete>

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
                                    this.state?.productfilter.length ? this.state?.productfilter .map((item, index) =>
                                        <CartProduct product={item} />
                                    )
                                    :'Product Data Not Found'
                                     
                            }

                        </div>

                    </div>

                    <Footer />

                </div>
            </div>
        )
    }

};
const mapStateToProps = (state) => {
    return {
      user: state.AuthReducer.user,
      user_area:state.AuthReducer.user_area
    };
  };
export default connect(mapStateToProps) (Products);
