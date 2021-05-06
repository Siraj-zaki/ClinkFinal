import { ADD_TO_CART ,LOGIN_USER1} from "../../constants";

 
export const LOGIN_USER=(data)=>{
    return async dispatch=>{
        console.log("78787878787878",data)
        dispatch({
            type:LOGIN_USER1,
            payload:data
        })
    }

}  