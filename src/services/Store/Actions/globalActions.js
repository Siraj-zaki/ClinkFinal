import { LOADING, ERROR, } from '../../constants'

export const set_loading = (payload) => (
    {
        type: LOADING,
       payload
    }
)
export const set_error = (payload) => (
    {
        type: ERROR,
       payload
    }
)
 