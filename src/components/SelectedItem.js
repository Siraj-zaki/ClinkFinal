import React from 'react'
import { connect } from 'react-redux'

import smallcross from '../assets/smallcross.png'
import '../css/selecteditem.css'
import { removeFromCart } from '../services/Store/Actions/cartActions'
class SelectedItem extends React.Component {
    render() {
        console.log(this.props);
        return (

            <div className="inner-cart-div mt-5 border-top pt-5">
                <div className="cart-left-side">
                    <img src={this.props.imgsrc} alt="" />
                </div>
                <div className="cart-center-side">
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%', flexDirection: 'column' }}>
                        <span className="div-right-side-heading m-2" style={{ fontSize: '20px' }} >{this.props.heading}</span>
                        <span className="div-right-side-small-heading m-2" style={{ textAlign: 'left' }} >{this.props.headingsmall}</span>
                        <span className="div-right-side-small-heading m-2" style={{ textAlign: 'left' }} ><p>X{this.props.quantity}</p></span>
                        <div className="m-2" style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center', width: '100%' }} >
                            <span className="li-size" style={{ display: 'flex', justifyContent: "center", alignItems: "center", width: '100%', borderRight:'1px solid black' }} >{this.props.size}</span>
                            <span className="li-size" style={{ display: 'flex', justifyContent: "center", alignItems: "center", width: '100%'  }} >Price {this.props.price * this.props.quantity}</span>
                        </div>
                    </div>
                </div>
                <div className="cart-right-side" onClick={() => this.props.removeFromCart(this.props.id)}>
                    <img src={smallcross} alt="" />
                </div>



            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeFromCart: id => { dispatch(removeFromCart(id)) }
    };
}

export default connect(null,mapDispatchToProps)(SelectedItem);