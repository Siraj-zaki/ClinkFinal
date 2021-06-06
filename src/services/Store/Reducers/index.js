import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import CartReducer from "./cartReducer";
import AreaProduct from "./areaProduct";

export default combineReducers({
    AuthReducer,
    CartReducer,
    AreaProduct
})