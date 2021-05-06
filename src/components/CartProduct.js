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
        hearttoggler: false

    }




    render() {

        return (
            <div>
                {
                    this.state.cartproduct.map((cart, index) =>
                        <div className="add-products" style={{ position: 'relative', minHeight: this.props.newheight ? 310 : "", width: this.props.newwidth ? 280 : "" }} key={index} >
                            <div className="heart-main" onClick={() => this.setState({ hearttoggler: !this.state.hearttoggler })}>
                                <img className="heart-div" src={this.state.hearttoggler === true ? heartfill : heart} alt="" />
                            </div>
                            {/* <div className="add-products" > */}
                            <img onClick={() => window.location.href = `/AddingToCart/${this.props.product.id}`} height="250px" width="250px" src={cart.img} alt="not" />
                            <span onClick={() => window.location.href = `/AddingToCart/${this.props.product.id}`} className="cart-company" >{cart.Company}</span>
                            <span onClick={() => window.location.href = `/AddingToCart/${this.props.product.id}`} className="cart.bottle" >{cart.Bottle}</span>
                            <span onClick={() => window.location.href = `/AddingToCart/${this.props.product.id}`} className="cart-size">{cart.Size}</span>
                        </div>
                        // </div>
                    )
                }
            </div>

        )
    }
}
export default CartProduct