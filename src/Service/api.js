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
export const categoriesdist=baseUrl+'/v1/product/getdist'
export const ordercustomer=baseUrl+'/v1/ordermain/customer'
export const orderdetailcustomer=baseUrl+'/v1/order/customer'
export const ordermain=baseUrl+'/v1/ordermain'
export const wish=baseUrl+'/v1/fav'
export const wishuser=baseUrl+'/v1/favuser'




// export default   {
//     signUp,login
//   };