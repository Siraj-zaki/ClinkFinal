import api from '../../services/api';
import { login, update_user } from '../actions/authActions'
import { set_loading,  } from '../actions/globalActions'
import jwt_decode from "jwt-decode";

export const _login = (email, pass) => {

    return async (dispatch, getState) => {
        dispatch(set_loading(true))
        let res = await api.loginUser(email, pass);
      
        console.log("res",res);
        if (res) {

            let info = jwt_decode(res.token)
            dispatch(login(res.token, info))
            return true
        }

        dispatch(set_loading(false));
        return false
    }
}
export const _socialLogin = (socialID, type) => {

    return async (dispatch, getState) => {
        dispatch(set_loading(true))
        let res = await api.socialLogin(socialID, type);

        if (res) {

            let info = jwt_decode(res.token)
            dispatch(login(res.token, info))
        }

        dispatch(set_loading(false));
    }
}



export const _sendEmail = (email, num) => {

    return async (dispatch, getState) => {
        // let res = await api.sendEmail(email, num)
    }
}


export const _editUser = (user) => {

    return async (dispatch, getState) => {

        dispatch(set_loading(true))
        let res = await api.editUser(user);
        dispatch(set_loading(false));
        if (res) {

            dispatch(update_user(user))
            return true
        }
    }
}



