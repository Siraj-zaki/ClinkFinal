import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import CartReducer from "./cartReducer";
import AreaProduct from "./areaProduct";
import globalReducer from "./globalReducer";

export default combineReducers({
    AuthReducer,
    CartReducer,
    AreaProduct,
    globalReducer
})