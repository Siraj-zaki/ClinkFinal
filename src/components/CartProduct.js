import React from 'react'
import bottle from '../assets/tequilabottle.png'
import heart from '../assets/heart.png'
import heartfill from '../assets/heartfill.png'
import '../css/products.css'


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



    render() {

        console.log(this.state.cartproduct);

        return (
            <div>
                <div className="add-products" style={{ position: 'relative', minHeight: this.props.newheight ? 310 : "", width: this.props.newwidth ? 280 : "" }}  >
                    <div className="heart-main" onClick={() => this.setState({ hearttoggler: !this.state.hearttoggler })}>
                        <img className="heart-div" src={this.state.hearttoggler === true ? heartfill : heart} alt="" />
                    </div>
                    <img onClick={() => window.location.href = `/AddingToCart/${this.props.id}`} height="250px" width="250px" src={this.props.img} alt="not" />
                    <span onClick={() => window.location.href = `/AddingToCart/${this.props.id}`} className="cart-company" >{this.props.Company}</span>
                    <span onClick={() => window.location.href = `/AddingToCart/${this.props.id}`} className="cart-company" >{this.props.Bottle}</span>
                    <span onClick={() => window.location.href = `/AddingToCart/${this.props.id}`} className="cart-size">{this.props.StoreName}</span>
                </div>
            </div>
        )
    }
}
export default CartProduct