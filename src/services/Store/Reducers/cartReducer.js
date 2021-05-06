import { ADD_TO_CART, REMOVE_TO_CART,DeliveryAddress,EMPTY_TO_CART } from "../../constants";

const initialstate = {
    cartData: [],
    customerAddress: []
}

export default function CartReducer(state = initialstate, action) {
    switch (action.type) {
        case ADD_TO_CART:
            let filterData1 = state.cartData.length && state.cartData.find(p => p.id === action.payload.id);
            if (filterData1) {
                let ind = state.cartData.findIndex(p => p.id === action.payload.id);
                let dup = state.cartData;
                dup[ind].quantity = action.payload.quantity;
                return{
                    ...state,
                    cartData: dup
                }
            }
            else{
                return {
                    ...state,
                    cartData: [...state.cartData,action.payload]
                }
            }
            break;
        case REMOVE_TO_CART:
            let filterData = state.cartData.length && state.cartData.filter(p => p.id !== action.id);
            return {
                ...state,
                cartData: filterData
            }
            break;
            case EMPTY_TO_CART:
                
                console.log('empty card')
                
                return {
                  ...state,
                  cartData: [],
                };
            
break
            case DeliveryAddress:
            console.log(action);
                return {
                    ...state,
                    customerAddress: action.payload
                }
                
            break;
        default:
            return state

    }

}