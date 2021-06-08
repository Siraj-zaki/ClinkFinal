import { LOGIN, LOGOUT, UPDATE_INFO, SET_LOGGED, SET_LANGUAGE,   } from './types';


export const login = (token, user) => (
    {
        type: LOGIN,
        token: token,
        user,
    }
)

export const logout = () => (
    {
        type: LOGOUT
    }
)

export const update_user = (info) => (
    {
        type: UPDATE_INFO,
        info: info
    }
)
 

export const set_logged = (payload) => (
    {
        type: SET_LOGGED,
        payload
    }
)

export const set_lang = (payload) => (
    {
        type: SET_LANGUAGE,
        payload
    }
)