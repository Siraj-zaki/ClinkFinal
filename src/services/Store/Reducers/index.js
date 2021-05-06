import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import CartReducer from "./cartReducer";

export default combineReducers({
    AuthReducer,
    CartReducer
})