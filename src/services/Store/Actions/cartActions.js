import { ADD_TO_CART, REMOVE_TO_CART,DeliveryAddress,EMPTY_TO_CART } from "../../constants";

export const addToCart = (data) => {
    console.log('**',data);
    return async dispatch => {
        dispatch({
            type: ADD_TO_CART,
            payload: data
        })
    }

}

export const removeFromCart = (id) => {
    return async dispatch => {
        dispatch({
            type: REMOVE_TO_CART,
            id: id
        })
    }

}
export const emptyFromCart = () => {
    console.log('empty');
  
    return async dispatch => {
        dispatch({
            type: EMPTY_TO_CART,
         
        })
    }

}

export const customerAddres = (data) => {
    console.log(data)
    return async dispatch => {
        dispatch({
            type: DeliveryAddress,
            payload: data
        })
    }

}