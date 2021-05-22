import { baseUrl } from "./domain";

export const signUp=baseUrl+'/v1/user/signup'
export const login=baseUrl+'/v1/login/user'
export const getproduct=baseUrl+'/v1/Product/get'
export const adddelivery=baseUrl+'/v1/deliveryaddress/add'
export const getaddressbycustomer=baseUrl+'/v1/deliveryaddress/getcustomer'
export const addcustomerdetail=baseUrl+'/v1/deliveryaddress/getcustomer'
export const addorder=baseUrl+'/v1/orderItems'
export const getProductUnit=baseUrl+'/v1/unitproduct/get'
export const verificationcode=baseUrl+'/v1/verifycode'
export const forgetpassword=baseUrl+'/v1/forgotPassword/'
export const verifiedcode=baseUrl+'/v1/verifiedcustomer'
export const checkareaporduct=baseUrl+'/v1/product/getarea'
export const categories=baseUrl+'/v1/category'




// export default   {
//     signUp,login
//   };