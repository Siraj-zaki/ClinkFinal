import { ADD_TO_CART, ADD_QUANTITY_TO_CART, REMOVE_ITEM_CART, REMOVE_CART } from './types'


export const addToCart = (payload) => ({
    type: ADD_TO_CART,
    payload,
})

export const addQuantity = (payload) => ({
    type: ADD_QUANTITY_TO_CART,
    payload,
})

export const removeItemCart = (payload) => ({
    type: REMOVE_ITEM_CART,
    payload,
})

export const removeCart = (payload) => ({
    type: REMOVE_CART,
    payload,
})
