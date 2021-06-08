import { LOGIN, LOGOUT, UPDATE_INFO, SET_LOGGED, SET_LANGUAGE, SET_CITY } from '../actions/types'

const initialState = {
    logged: false, token: '', user: [], lang: 'en', city: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            {
                // console.log(action.coin)
                return {
                    ...state,
                    logged: true, token: action.token, user: action.user,

                }
            }

        case UPDATE_INFO:
            {
                return {
                    ...state, user: action.info
                }
            }

        case LOGOUT:
            {
                return {
                    ...state, logged: false, user: [], token: ''
                }
            }
        case SET_LOGGED:
            {
                return {
                    ...state, logged: action.payload,
                }
            }
        case SET_LANGUAGE:
            {
                return { ...state, lang: action.payload }
            }
        case SET_CITY:
            {
                return { ...state, city: true }
            }
        default:
            return state;

    }


}
export default authReducer
