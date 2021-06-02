import React from 'react'
import bottle from '../assets/tequilabottle.png'
import heart from '../assets/heart.png'
import heartfill from '../assets/heartfill.png'
import '../css/products.css'
import { getProduct, whistlist, whistlistUser } from "./../Service/service";

// import { getProductById, getProductUnitById } from "./../Service/service";
import { toast } from 'react-toastify'


class CartProduct extends React.Component {
    state = {

        cartproduct: [
            {
                img: this.props?.product?.imgUrl,
                Company: this.props?.product?.storeName,
                Bottle: this.props?.product?.itemName,
                Size: this.props?.product?.price

            }

        ],
        product: [],
        productlist: [],
        hearttoggler: false
    }
    whistlist = async () => {
        if (this.props.user.id) {
            this.setState({ hearttoggler: !this.state.hearttoggler })
            console.log(this.state.hearttoggler);

            let data = {
                itemId: this.props.match.params.id,
                userId: this.props.user.id
            }


            let whi = await whistlist(data)
                .then(r1 => {
                    console.log(r1);
                    toast.dark(r1.data.message, {
                        style: { fontSize: 13 },
                        className: 'dark-toast',
                        autoClose: 5000
                    });

                })



        }
        else {

            toast.dark("Please login", {
                style: { fontSize: 13 },
                className: 'dark-toast',
                autoClose: 5000
            });
        }
    }




    render() {

        console.log(this.state.cartproduct);

        return (
            <div>
                <div className="add-products" style={{ position: 'relative', minHeight: this.props.newheight ? 310 : "", width: this.props.newwidth ? 280 : "" }}  >
                    {this.props.fav ? <div className="heart-main" >
                        <img className="heart-div" src={this.state.hearttoggler === true ? heartfill : heart} alt="" onClick={() => this.whistlist()} />
                    </div> : ""
                    }
                    <img style={{ objectFit: 'contain' }} onClick={() => window.location.href = `/AddingToCart/${this.props.id}`} height="250px" width="250px" src={this.props.img} alt="not" />
                    <span onClick={() => window.location.href = `/AddingToCart/${this.props.id}`} className="cart-company" >{this.props.Company}</span>
                    <span onClick={() => window.location.href = `/AddingToCart/${this.props.id}`} className="cart-company" >{this.props.Bottle}</span>
                    <span onClick={() => window.location.href = `/AddingToCart/${this.props.id}`} className="cart-size">{this.props.StoreName}</span>
                </div>
            </div>
        )
    }
}
export default CartProduct