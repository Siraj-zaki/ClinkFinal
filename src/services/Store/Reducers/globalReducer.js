

import { LOADING, ERROR,  } from '../../constants'

const initialState = {
    err: false,
    loading: false, 

}

const globalReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOADING:
            {
                return { ...state, loading: action.payload }
            }
        case ERROR:
            {
                return { ...state, err: action.payload }
            }



        default:
            return state;

    }

}

export default globalReducer