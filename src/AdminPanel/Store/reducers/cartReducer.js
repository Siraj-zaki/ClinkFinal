import { ADD_TO_CART, ADD_QUANTITY_TO_CART, REMOVE_ITEM_CART, REMOVE_CART } from '../actions/types'
// import update from 'immutability-helper';

const initialState = {
  products: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      let allProducts = state.products
      let modifier = state.products.findIndex((product) => {
        return product?.itemID == action?.payload?.itemID
      })

      if (modifier !== -1 && allProducts?.length) {
        //
      } else {
        action.payload.quantity = 1
        return {
          ...state,
          products: state.products.concat(action.payload),
        }
      }
    }
    case ADD_QUANTITY_TO_CART: {

      return {
        ...state,
        products: state.products.map((pro) =>
          pro.itemID === action.payload.id
            ? { ...pro, quantity: action.payload.quantity }
            : pro
        ),
      }
    }
    case REMOVE_CART:
      return {
        ...state,
        products: [],
      }
    case REMOVE_ITEM_CART:
      return {
        ...state,
        products: state.products.filter(
          (item) => item.itemID !== action.payload
        ),
      }
   
    default:
      return state
  }
}
