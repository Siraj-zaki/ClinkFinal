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
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";

class ReactRouter extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path="/" component={Home} />
        <Route path="/Home" component={Home} />
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
      </React.Fragment>
    );
  }
}
export default ReactRouter;
