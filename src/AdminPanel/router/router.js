import React from "react";
import { Route } from "react-router-dom";
import Login from '../auth/Login';
import "../styles/index.css"
import { connect } from "react-redux";

// admin 
import DashBoard from "../admin/Dashboard";
import User from "../admin/Users";
import Orders from "../admin/Orders";
import ViewStore from "../admin/viewstore";
import AddCoupon from "../admin/AddCoupon";
import ViewItem from "../admin/ViewItem";
import Slider from "../admin/Slider";
import AddCategory from "../admin/AddCategory";
import ViewCategory from "../admin/ViewCategory";
import ViewCoupon from "../admin/ViewCoupon";
import AddItem from "../admin/AddItem";
import AddStore from "../admin/AddStore";
// import ProtectedRoute from "./ProtectedRoute";
import { SET_CITY } from "../Store/actions/types";
//store
import AddProduct from "../vendorstore/AddProduct";
import GetProduct from "../vendorstore/getProduct";
import GetOrder from "../vendorstore/getOrder";
import AddUnit from "../vendorstore/addUnit";
import GetUnit from "../vendorstore/getUnit";

import { _getCategories, _getCoupon, _getFavourite, _getFeatured, _getItems } from "../Store/middlewares/appMiddleware";





class ReactRouter extends React.Component {


  state = {
    showModal: false, city: '',
  }
  render() {
    console.log(this.props.user.type)
    const { type, path, component, logged, } = this.props

    console.log('propss', this.props);

    return (
      <React.Fragment>
        {
          this.props.user.type == 'admin' ?
            <>
              <Route exact path="/admin/addItem" component={AddItem} />
              <Route exact path="/admin/addStore" component={AddStore} />
              <Route exact path="/admin/ViewItem" component={ViewItem} />
              <Route path="/admin/Users" component={User} />
              <Route path="/admin/Orders" component={Orders} />
              <Route path="/admin/viewStore" component={ViewStore} />
              <Route path="/admin/Slider" component={Slider} />
              <Route path="/admin/addCoupon" component={AddCoupon} />
              <Route path="/admin/ViewCoupon" component={ViewCoupon} />
              <Route path="/admin/AddCategory" component={AddCategory} />
              <Route path="/admin/ViewCategory" component={ViewCategory} />
              <Route exact path="/" component={Login} />
            </>
            :
            <>
              <Route exact path="/" component={Login} />
              <Route login='login' exact path="/store" component={DashBoard} />
              <Route exact path="/store/addProduct" component={AddProduct} />
              <Route exact path="/store/getProduct" component={GetProduct} />
              <Route exact path="/store/addUnit" component={AddUnit} />
              <Route exact path="/store/getUnit" component={GetUnit} />
              <Route exact path="/store/getOrder" component={GetOrder} />
            </>
        }
      </React.Fragment>
    );
  }
}

const mapState = state => {
  return {
    logged: state.authReducer.logged,
    token: state.authReducer.token,
    user: state.authReducer.user,
    city: state.authReducer.city,
    logged: state.authReducer.logged,
    type: state.authReducer.user.type,
    // lang: state.globalReducer.lang,
  }
}
const mapDispatch = dispatch => {
  return {
    setCity: () => dispatch({ type: SET_CITY, }),
    _getItems: () => dispatch(_getItems()),
    _getCategories: () => dispatch(_getCategories()),
    _getFeatured: () => dispatch(_getFeatured()),
    _getFavourite: (token, uid) => dispatch(_getFavourite(token, uid)),
    _getCoupon: (token) => dispatch(_getCoupon(token))
  }
}



export default connect(mapState, mapDispatch)(ReactRouter);
