import { ADD_TO_CART ,LOGIN_USER1,ZipCode,EMPTY_TO_AUTH} from "../../constants";

 
export const LOGIN_USER=(data)=>{
    return async dispatch=>{
        console.log("78787878787878",data)
        dispatch({
            type:LOGIN_USER1,
            payload:data
        })
    }

}  

export const emptyFromAuth = () => {
    console.log('empty');
  
    return async dispatch => {
        dispatch({
            type: EMPTY_TO_AUTH,
         
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