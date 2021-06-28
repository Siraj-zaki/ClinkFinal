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
import { getProduct, addAreaProduct, getCategories, recentProductuser } from "./../Service/service";
import { ToastContainer, toast } from "react-toastify";
import { zipCode } from "./../services/Store/Actions/action";

import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { connect } from "react-redux";

class RecentViewProducts extends React.Component {
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
        user_area: this.props.user_area,
        categorydata: [],
        search: "",


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

                res = await recentProductuser(this.props.user.id)
                console.log(res);
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

        return (
            <div className="Home bgimg-1" style={{ position: 'relative', backgroundColor: 'white' }}>
                <Navbar />
                <div className="cart-heading">
                    <span className="cart-heading-heading">Recent View Products</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: 'column', padding: "10rem", paddingBottom: 0, paddingTop: 0 }}>
                    <div className="products" style={{ backgroundColor: 'transperent', borderRadius: 20, border: "1px solid whitesmoke" }}>
                        <div className="products-cart">
                            {
                                this.state.product.map((item, index) =>
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
                </div>
                <Footer />
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
export default connect(mapStateToProps, mapDispatchToProps)(RecentViewProducts);
