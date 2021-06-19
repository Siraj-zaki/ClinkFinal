import { delivery_time } from "../../constants";

export const deliveryTime = (data) => {
    console.log(data)
    return async dispatch => {
        dispatch({
            type: delivery_time,
            payload: data
        })
    }

}