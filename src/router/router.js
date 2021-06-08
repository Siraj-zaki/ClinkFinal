import React from "react";
import Home from '../components/Home'
import { Route } from "react-router-dom";
import AboutUs from '../components/AboutUs'
import BlogPage from '../components/BlogPage'
import BlogDetail from '../components/BlogDetail'
import Products from '../components/Products'
import CartPage from '../components/CartPage'
import AddingToCart from '../components/AddingToCart'
import Payment from '../components/Payment'

import Devilvery from '../components/Devilvery'
import Finished from '../components/Finished'
import Navbar from '../components/Navbar'
import Shops from '../components/Shops'
import OrderPage from '../components/OrderPage'
import RecentViewProducts from '../components/RecentViewProducts'
import Favourite from '../components/Favourite'
import OrderDetailPage from '../components/OrderDetailPage'
// import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import Login from '../AdminPanel/auth/Login';

import { connect } from "react-redux";

// admin 
import DashBoard from "../AdminPanel/admin/Dashboard";
import User from "../AdminPanel/admin/Users";
import Orders from "../AdminPanel/admin/Orders";
import ViewStore from "../AdminPanel/admin/viewstore";
import AddCoupon from "../AdminPanel/admin/AddCoupon";
import ViewItem from "../AdminPanel/admin/ViewItem";
import Slider from "../AdminPanel/admin/Slider";
import AddCategory from "../AdminPanel/admin/AddCategory";
import ViewCategory from "../AdminPanel/admin/ViewCategory";
import ViewCoupon from "../AdminPanel/admin/ViewCoupon";
import AddItem from "../AdminPanel/admin/AddItem";
import AddStore from "../AdminPanel/admin/AddStore";
// import ProtectedRoute from "./ProtectedRoute";
import { SET_CITY } from "../AdminPanel/Store/actions/types";
//store
import AddProduct from "../AdminPanel/vendorstore/AddProduct";
import GetProduct from "../AdminPanel/vendorstore/getProduct";
import GetOrder from "../AdminPanel/vendorstore/getOrder";
import AddUnit from "../AdminPanel/vendorstore/addUnit";
import GetUnit from "../AdminPanel/vendorstore/getUnit";

import { _getCategories, _getCoupon, _getFavourite, _getFeatured, _getItems } from "../AdminPanel/Store/middlewares/appMiddleware";


class ReactRouter extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={Home} />
        <Route path="/Home" component={Home} />
        <Route path="/Admin" component={Login} />
        <Route path="/navbar" component={Navbar} />
        <Route path="/CartPage" component={CartPage} />
        <Route path="/BlogPage" component={BlogPage} />
        <Route path="/AboutUs" component={AboutUs} />
        <Route path="/BlogDetail" component={BlogDetail} />
        <Route path="/Products" component={Products} />
        <Route path="/AddingToCart/:id" component={AddingToCart} />
        <Route path="/Payment" component={Payment} />
        <Route path="/Devilvery" component={Devilvery} />
        <Route path="/Finished" component={Finished} />
        <Route path="/Contact" component={Shops} />
        <Route path="/OrderPage" component={OrderPage} />
        <Route path="/OrderDetailPage/:id" component={OrderDetailPage} />
        <Route path="/RecentViewProducts" component={RecentViewProducts} />
        <Route path="/Favourite" component={Favourite} />
      </React.Fragment>
    );
  }
}
export default ReactRouter;
