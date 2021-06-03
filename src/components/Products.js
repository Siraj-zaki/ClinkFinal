import '../css/home.css';
import React from 'react'
import tec2 from '../assets/tec1.png'
import beer from '../assets/beerbg.png'
import wine from '../assets/winebg.png'
import vodka from '../assets/vodkabg.png'
import whiskey from '../assets/whiskeybg.png'
import Slider from "react-slick";
import left from '../assets/leftarrow.png'
import right from '../assets/rightarrow.png'
import Carousel from 'react-bootstrap/Carousel'
import '../css/products.css'
import Navbar from './Navbar'
import CartProduct from '../components/CartProduct'
import Footer from './Footer';
import { getProduct, addAreaProduct, getCategories } from "./../Service/service";
import { ToastContainer, toast } from "react-toastify";
import { zipCode } from "./../services/Store/Actions/action";

import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { connect } from "react-redux";

class Products extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

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
            user_area: this.props.user_area,
            categorydata: [],
            search:
                this.props.location.tecquila === "tecquila"
                    ?
                    "tecquila"
                    :
                    this.props.location.whiskey === "whiskey"
                        ?
                        "whiskey"
                        :
                        this.props.location.vodka === "vodka"
                            ?
                            "vodka"
                            :
                            this.props.location.wine === "wine"
                                ?
                                "wine"
                                :
                                this.props.location.beer === "beer"
                                    ?
                                    "beer"
                                    :
                                    "",
            activeIndex: '',

        }
        this.searchInputFocus = React.createRef();
    }

    async componentDidMount() {
        console.log(this.props.user_area);
        console.log(this.state.lat, 'lat666666666666666666666666');
        if (this.props.user_area) {
            this.setState({ toggler: 0 })

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
                this.setState({ productfilter: res?.data.result })

            } catch (err) {
                console.log(err);
                console.log(err?.data?.message);
            }





        }
        if (this.state.lat && this.state.long) {
            console.log('already longi 888888888888888888888888888888888');
        }
        let customer = await getCategories()
            .then((re1) => {
                if (re1?.data?.success) {
                    this.setState({ categorydata: re1.data.result })

                    console.log(this.state.categorydata);
                }




            })
            .catch(err => {
                return toast.dark("Data Not Found", {
                    style: { fontSize: 13 },
                    className: 'dark-toast',
                    autoClose: 5000
                }
                );
                console.log("er", err);
            })
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

                        let area = {
                            longitude: this.state.long,
                            latitude: this.state.lat,
                        }

                        this.props.zipCode(area)
                        console.log(this.state.lat);
                        console.log(this.state.long);
                    })
                    .catch(error => console.error('Error', error));
            })
    };
    searchFilter = (e) => {
        let searchItem = e.target.value
        this.setState({ search: searchItem })
    }

    handleChange = address => {
        this.setState({ address });
    };
    searchFunc = (e, index) => {
        this.setState({ search: e.target.name })
        this.setState({ activeIndex: index })
        console.log(index)
        console.log(this.state.activeIndex);
        this.searchInputFocus.current.focus()
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
        console.log(this.state.product)
        console.log(results)

        // let matches = this.state.product.filter(v => v.itemName.includes(results));
        // console.log(matches)

        this.setState({ product: results })
        this.setState({ stringName: string })

        console.log(this.state.product)

        this.setState({ productfilter: results })

        console.log(this.state.product);
        console.log(this.state.productfilter);
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        // console.log(string, results)
        // console.log(string)
        // console.log(this.state.product.length)
        // { this.state.product.length == 1 ? this.setState({ product: this.state.productfilter }) : this.setState({ product: this.state.product }) }

        // if (this.state.product.length == 1) {
        //     this.setState({ product: this.state.productfilter })

        // }

        // console.log(this.state.productfilter);
        // this.setState({ product: results })



    }

    handleOnHover = (result) => {
        { this.state.product.length == 1 ? this.setState({ product: this.state.productfilter }) : this.setState({ product: this.state.product }) }

        // the item hovered
        console.log(result)
    }

    handleOnSelect = (item) => {
        // the item selected
        console.log(item);
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
        console.log(this.props.user_area);
        // this.props.user_area.longitude=area.longitude
        // this.props.user_area.latitude=area.latitude
        console.log(this.props.user_area);
        try {

            res = await addAreaProduct(area)
            console.log(res.data.result);
            this.setState({ product: res?.data.result })
            this.setState({ productfilter: res?.data.result })

        } catch (err) {
            console.log(err);
            console.log(err?.data?.message);
        }
        this.setState({ toggler: 0 })

    }

    render() {
        console.log("links", this.props.location.searchName);
        function SamplePrevArrow(props) {
            const { className, style, onClick } = props;
            return (
                <div className="left-arrow" onClick={onClick} >
                    <img src={left} alt="" />
                </div>
            );
        }
        function NewArrow(props) {
            const { className, style, onClick } = props;
            return (
                null
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
            slidesToShow: 6,
            slidesToScroll: 1,
            nextArrow: <SamplePrevArrow />,
            prevArrow: <SampleNxtArrow />,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true,
                        nextArrow: <NewArrow />,
                        prevArrow: <NewArrow />,

                    }
                },
                {
                    breakpoint: 1280,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true,
                        nextArrow: <NewArrow />,
                        prevArrow: <NewArrow />,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        initialSlide: 2,
                        nextArrow: <NewArrow />,
                        prevArrow: <NewArrow />,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        nextArrow: <NewArrow />,
                        prevArrow: <NewArrow />,
                    }
                },
                {
                    breakpoint: 380,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        nextArrow: <NewArrow />,
                        prevArrow: <NewArrow />,
                    }
                },
                {
                    breakpoint: 320,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        nextArrow: <NewArrow />,
                        prevArrow: <NewArrow />,
                    }
                }
            ]
        };
        const category = [
            {
                name: "Tequila",
                index: 0
            },
            {
                name: "Whiskey",
                index: 1
            },
            {
                name: "Vodka",
                index: 2
            },
            {
                name: "Wine",
                index: 3
            },
            {
                name: "Beer",
                index: 4
            },
        ]
        console.log(this.state.product);
        return (
            <div className="Home bgimg-1" style={{ position: 'relative', backgroundColor: 'white' }}>
                {
                    this.state.toggler === 1 ?
                        <>
                            <div ani={this.state.toggler} className="menu alert-new" style={{ alignItems: 'center', width: '50%', height: '60%', justifyContent: 'center' }}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "80%", flexDirection: 'column' }} >
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

                                                        <input autoFocus {...getInputProps({
                                                            placeholder: 'Search Places ...',
                                                            className: 'location-search-input',
                                                        })} style={{ marginTop: 20, border: '1px solid white', color: 'white' }} className="footer-input input-3" type="text" minLength="2" id="email" required ></input>

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
                        {


                            <Slider {...settings}>
                                {
                                    category.map((item, index) =>
                                        <a
                                            href="#Products"
                                            index={item.index}
                                            name={item.name}
                                            onClick={(e) => this.searchFunc(e, item.index)}
                                            className="product-btn btn-new-1">
                                            {item.name}
                                        </a>
                                    )
                                }
                                {/* <a
                                    href="#Products"
                                    index="0"
                                    name="Tequila"
                                    onClick={this.searchFunc}
                                    className="product-btn btn-new-1">
                                    Tequila
                                            </a>
                                <a
                                    href="#Products"
                                    index="1"
                                    name="Whiskey"
                                    onClick={this.searchFunc}
                                    className="product-btn btn-new-1">
                                    Whiskey
                                            </a>
                                <a
                                    href="#Products"
                                    index="2"
                                    onClick={this.searchFunc}
                                    name="Vodka"
                                    className="product-btn btn-new-1">
                                    Vodka
                                            </a>
                                <a
                                    href="#Products"
                                    index="3"
                                    onClick={this.searchFunc}
                                    name="Wine"
                                    className="product-btn btn-new-1">
                                    Wine
                                            </a>
                                <a
                                    href="#Products"
                                    index="4"
                                    onClick={this.searchFunc}
                                    name="Beer"
                                    className="product-btn btn-new-1">
                                    Beer
                                            </a> */}

                            </Slider>


                        }

                    </div>
                    <div className="products">

                        <div className="slider" style={{ minHeight: '40rem' }}>
                            <Carousel fade={true} style={{ width: '100%', height: '100%' }} >
                                <Carousel.Item className="custom" style={{ width: '100%', height: '100%' }} interval={1500}>
                                    <img width="100%" height="100%" src={tec2} alt="" />
                                </Carousel.Item>
                                <Carousel.Item style={{ width: '100%', height: '100%' }} interval={1500}>
                                    <img width="100%" height="100%" src={beer} alt="" />
                                </Carousel.Item>
                                <Carousel.Item style={{ width: '100%', height: '100%' }} interval={1500}>
                                    <img width="100%" height="100%" src={wine} alt="" />
                                </Carousel.Item>
                                <Carousel.Item style={{ width: '100%', height: '100%' }} interval={1500}>
                                    <img width="100%" height="100%" src={vodka} alt="" />
                                </Carousel.Item>
                                <Carousel.Item style={{ width: '100%', height: '100%' }} interval={1500}>
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
                            {/* <div style={{ width: 280 }}>
                                <ReactSearchAutocomplete
                                    fuseOptions={{ keys: ["itemName"] }}
                                    //     // necessary, otherwise the results will be blank
                                    resultStringKeyName="itemName"
                                    items={this.state.productfilter}
                                    onSearch={this.handleOnSearch}
                                    onHover={this.handleOnHover}

                                    onFocus={this.handleOnFocus}
                                // autoFocus
                                />
                            </div> */}
                            <input className="filter-input" ref={this.searchInputFocus} name="sort" value={this.state.search} onChange={this.searchFilter} id="sort" placeholder="Search Product Here"></input>
                        </div>
                        <div id="Products" className="products-cart">
                            {
                                this.state.product.filter(data => {
                                    if (this.state.search === "") {
                                        return data
                                    } else if (data.itemName.toLowerCase().includes(this.state.search.toLowerCase()) || data.storeName.toLowerCase().includes(this.state.search.toLowerCase())) {
                                        return data
                                    }
                                }).map((item, index) =>
                                    <CartProduct
                                        img={item.imgUrl}
                                        Company={item.Company}
                                        Bottle={item.itemName}
                                        StoreName={item.storeName}
                                        id={item.id}
                                        fav
                                    />
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
const mapStateToProps = (state) => {
    return {
        user: state.AuthReducer.user,
        user_area: state.AuthReducer.user_area
    };
};
const mapDispatchToProps = (dispatch) => {
    return {

        zipCode: data => { dispatch(zipCode(data)) }

    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Products);
