import { ADD_TO_CART ,LOGIN_USER1,ZipCode} from "../../constants";

 
export const LOGIN_USER=(data)=>{
    return async dispatch=>{
        console.log("78787878787878",data)
        dispatch({
            type:LOGIN_USER1,
            payload:data
        })
    }

}  

export const zipCode=(data)=>{
    return async dispatch=>{
        console.log("zipcodeeee",data)
        dispatch({
            type:ZipCode,
            payload:data
        })
    }

} 