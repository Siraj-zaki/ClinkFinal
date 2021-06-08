import api from '../../services/api';
// import { setError, setLoading } from '../actions/globalActions'
import { set_items, set_category, set_favourite, set_featured, set_user, set_coupon, set_orders, set_transactions } from '../actions/appActions'

export const _getItems = () => {

    return async (dispatch, getState) => {


        let res = await api.getItems();
        if (res) {
            dispatch(set_items(res.result))
        }
    }
}
export const _getProduct = () => {

    return async (dispatch, getState) => {


        let res = await api.getProduct();
        if (res) {
            dispatch(set_items(res.result))
        }
    }
}

export const _getUnit = () => {

    return async (dispatch, getState) => {


        let res = await api.getUnit();
        if (res) {
            dispatch(set_items(res.result))
        }
    }
}
export const _getFeatured = () => {

    return async (dispatch, getState) => {

        let res = await api.getFeatured();
        if (res) {
            dispatch(set_featured(res.result))
        }
    }
}
export const _getCategories = () => {

    return async (dispatch, getState) => {

        let res = await api.getCategory();
        console.log(res.result);
        if (res) {
            dispatch(set_category(res.result))
        }
    }
}
export const _getFavourite = (token, uid) => {

    return async (dispatch, getState) => {

        let res = await api.getFavourite(token, uid);
        if (res) {
            dispatch(set_favourite(res.result))
        }
    }
}

export const _getUsers = (token) => {

    return async (dispatch, getState) => {

        let res = await api.getUsers(token);
        if (res) {
            dispatch(set_user(res.result))
        }
    }
}
export const _getCoupon = (token) => {

    return async (dispatch, getState) => {

        let res = await api.getCoupon(token);
        if (res) {
            dispatch(set_coupon(res.result))
        }
    }
}
export const _getOrders = (token, id) => {

    return async (dispatch, getState) => {

        let res = await api.getOrders(token, id);
        if (res) {
            dispatch(set_orders(res.result))
        }
    }
}
export const _getTransactions = (token, id) => {

    return async (dispatch, getState) => {

        let res = await api.getTransactions(token, id);
        if (res) {
            dispatch(set_transactions(res.result))
        }
    }
}


