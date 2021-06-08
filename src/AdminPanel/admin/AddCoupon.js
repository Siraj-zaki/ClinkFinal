import React from "react";

import '../styles/adminlte.min.css'
import '../styles/dataTables.bootstrap4.min.css'
import '../styles/responsive.bootstrap4.min.css'
import '../styles/indexNew.css'
import ResponsiveDrawer from './ResponsiveDrawer'
import { set_loading } from "../Store/actions/globalActions";
import { connect } from "react-redux";
import { _getCoupon } from '../Store/middlewares/appMiddleware'
import api from "../services/api";

class AddCoupon extends React.Component {
  state = {
    couponCode: '',
    couponDiscount: '',
    couponMax: '',
    couponExpiry: '',
    couponID: '',
    edit: false,
  }



  componentDidMount() {
    const search = this.props.location.search; // returns the URL query String
    const params = new URLSearchParams(search);
    const id = parseInt(params.get('id'));
    if (id) {
      let item = this.props.coupons.filter(c => c.couponID === id)
      item = item[0];

      this.setState(item)
      this.setState({ edit: true })
    }
  }


  addCoupon = async (e) => {
    e.preventDefault()

    let res;
    if (this.state.edit) {
      res = await api.editCoupon(this.props.token, this.state)
    }
    else {
      res = await api.addCoupon(this.props.token, this.state)
    }
    if (res) {
      alert('Oparation Successfull!')
      await this.props._getCoupon(this.props.token)
      if (this.state.edit) {
        window.history.back()
      }
    }

  }

  render() {

    console.log(this.state)
    return (
      <div className="dashboard" style={{ paddingTop: 100 }}>
        <ResponsiveDrawer />
        <section class="content-admin">
          <div class="container-fluid">
            <div class="container bg-white p-4 mt-5 shadow" style={{ borderRadius: "10px" }}>
              <h5 class="mb-2">Coupon</h5>
              <hr />
              <form onSubmit={this.addCoupon}>
                <div class="row">
                  <div class="ol-sm-12 col-md-4 col-4">
                    <input type="hidden" name="_token" value="lDU5tVnWtVuj7m96v2TCsgetZ5WDKunqIbJaIVnX"></input>
                    <div class="form-group">
                      <label for="name" class="font-weight-bold">Coupon Code</label>

                      <input type="text" value={this.state.couponCode} required onChange={(e) => this.setState({ couponCode: e.target.value })} class="form-control " aria-describedby="text" placeholder="Coupon Code" disabled=""></input>
                    </div>
                    <div class="form-group">
                      <label for="title" class="font-weight-bold">Discount %</label>
                      <input maxLength={2} type="number" id="sldTitle" required class="form-control" value={this.state.couponDiscount} onChange={(e) => this.setState({ couponDiscount: e.target.value })} name="title" aria-describedby="text" placeholder="%"></input>
                    </div>
                    <div class="form-group">
                      <div className="form-group">
                        <button type="submit" class="btn btn-success"><i class="fa fa-save"></i>Generate</button>
                      </div>
                    </div>

                  </div>
                  <div class="col-sm-12 col-md-4 col-4">
                    <div class="form-group">
                      <div class="form-group">
                        <label for="title" class="font-weight-bold">Max Discount</label>
                        <input type="text" id="sldTitle" class="form-control" required value={this.state.couponMax} onChange={(e) => this.setState({ couponMax: e.target.value })} name="title" aria-describedby="text" placeholder="Max Discount"></input>
                      </div>
                      <div class="form-group">
                        <label for="title" class="font-weight-bold">Expiray Date</label>
                        <input type="date" id="sldTitle" class="form-control" required value={this.state.couponExpiry} onChange={(e) => this.setState({ couponExpiry: e.target.value })} name="title" aria-describedby="text" placeholder="Title"></input>
                      </div>
                    </div>


                  </div>

                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    )

  }
}
const mapState = state => {
  return {
    coupons: state.appReducer.coupons,
    token: state.authReducer.token,
  }
}
const mapDispatch = dispatch => {
  return {
    setLoading: bol => dispatch(set_loading(bol)),
    _getCoupon: (token) => dispatch(_getCoupon(token)),

  }
}
export default connect(mapState, mapDispatch)(AddCoupon)