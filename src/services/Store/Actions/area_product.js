import { areaProduct } from "../../constants";

export const AreaProduct = (data) => {
    console.log('**',data);
    return async dispatch => {
        dispatch({
            type: areaProduct,
            payload: data
        })
    }

}
