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
import { getProduct, addAreaProduct, whistlistALLProduct } from "./../Service/service";
import { ToastContainer, toast } from "react-toastify";
import { zipCode } from "./../services/Store/Actions/action";

import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { connect } from "react-redux";

class Favourite extends React.Component {
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
      
            try {
                console.log(this.props.user.id);
              let  res = await whistlistALLProduct(this.props.user.id)
                console.log(res.data.result);
                this.setState({ product: res?.data.result })
                this.setState({ productfilter: res?.data.result })

            } catch (err) {
                console.log(err);
                console.log(err?.data?.message);
            }





        
      
        
      
    }
   
   

  
  

    render() {

        return (
            <div className="Home bgimg-1" style={{ position: 'relative', backgroundColor: 'white' }}>
                <Navbar />
                <div className="cart-heading">
                    <span className="cart-heading-heading">Favourite Products</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: 'column', padding: "10rem",paddingBottom:0,paddingTop:0 }}>
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
export default connect(mapStateToProps, mapDispatchToProps)(Favourite);
