import React from "react";
// import logo from './logo.svg';
// import "./App.css";

import { Provider } from 'react-redux'
import {persistor,store} from './services/Store/index'
import ReactRouter from './router/router';
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { PersistGate } from 'redux-persist/integration/react'
import {loadStripe} from '@stripe/stripe-js';
import {CardElement, Elements, ElementsConsumer} from '@stripe/react-stripe-js';
const stripePromise=loadStripe('pk_test_51IemkCJJroWq1MAWsGWNdkJXrYkL4gsTI2Fd5Vy4MkLS1RlQnw4BmXPGHvehiiIDQVgDDsuCF78IXMav0fH1R9Z700IJAtwteS')

const App = () => {

  return (
    <Router>
      <Provider store={store} >
        {/* <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/> */}

        <PersistGate loading={null} persistor={persistor}>
          <ToastContainer />
          <Elements stripe={stripePromise}>

          <ReactRouter />
          </Elements>
        </PersistGate>
      </Provider>
    </Router>
  )
};

export default App;