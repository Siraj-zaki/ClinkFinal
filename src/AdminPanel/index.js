import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactRouter from './router/router';
import { Provider } from 'react-redux';
import store from './Store/Store'
import { PersistGate } from 'redux-persist/integration/react';
import './styles/indexNew.css'
import firebase from 'firebase'


ReactDOM.render(
    <PersistGate loading={false} persistor={store.persistor} >
        <Provider store={store.store}  >
            <Router>
                <ReactRouter />
            </Router>
        </Provider>
    </PersistGate>
    ,
    document.getElementById('root'));

var firebaseConfig = {
    apiKey: "AIzaSyBRnM9pGwphCXmh5YVXSPpCnLZtJUfO7Uk",
    authDomain: "zibah-ul-kheir.firebaseapp.com",
    projectId: "zibah-ul-kheir",
    storageBucket: "zibah-ul-kheir.appspot.com",
    messagingSenderId: "137721441550",
    appId: "1:137721441550:web:4439fd39df36d7b2ecfb5f",
    measurementId: "G-M24PD1L1MZ"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}