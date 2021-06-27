import axios from 'axios';
import { signUp,wish,storetiming,recentitem,wishuser,ordercustomer,login,getproduct,categoriesdist,checkareaporduct,adddelivery,getaddressbycustomer,addcustomerdetail,addorder,ordermain,orderdetailcustomer,getProductUnit ,verificationcode,forgetpassword,verifiedcode} from "./api";
import { ToastContainer, toast } from "react-toastify";

export const customerSignUp = (data)=>
{
    console.log("customersignup",data);
return axios
  .post(signUp,data)
  .then(response =>{console.log(response)
  if(response.data.success){
    console.log(response.data.message,'ressssssssssssssssssssssss')
    return toast.dark(response.data.message, {
      style: { fontSize: 13 },
      className: 'dark-toast',
      autoClose: 5000
    })

  }
  })
  .catch(error => {
    
    return toast.dark(error.response.data.message, {
      style: { fontSize: 13 },
      className: 'dark-toast',
      autoClose: 5000
    }
    );

    if (error.response && error.response.status ) {
      console.log();
      return `\u2014`;
    }
  });
}

export const whistlist = (data)=>
{
    console.log("whistlist",data);
return axios
  .post(wish,data)
  .then(response =>response)
  .catch(error => {
    if (error.response && error.response.status === 404) {
      return `\u2014`;
    }
  });
}

export const whistlistALLProduct = (id)=>
{
    console.log("whistlist",id);
return axios
  .get(wish+"/"+id)
  .then(response =>response)
  .catch(error => {
    if (error.response && error.response.status === 404) {
      return `\u2014`;
    }
  });
}
export const whistlistUser = (data)=>
{
    console.log("whistlist",data);
return axios
  .post(wishuser,data)
  .then(response =>response)
  .catch(error => {
    if (error.response && error.response.status === 404) {
      return `\u2014`;
    }
  });
}

export const recentProduct = (data)=>
{
    console.log("recent",data);
return axios
  .post(recentitem,data)
  .then(response =>response)
  .catch(error => {
    if (error.response && error.response.status === 404) {
      return `\u2014`;
    }
  });
}


export const recentProductuser = (id)=>
{
    console.log("recent",id);
return axios
  .get(recentitem+ '/' + id)
  .then(response =>response)
  .catch(error => {
    if (error.response && error.response.status === 404) {
      return `\u2014`;
    }
  });
}

export const customerwiseOrder = (id)=>
{
    console.log("customersignup");
return axios
  .get(ordercustomer + '/' + id)
  .then(response =>response)
  .catch(error => {
    if (error.response && error.response.status === 404) {
      return `\u2014`;
    }
  });
}



export const customerwiseDetailOrder = (id)=>
{
    console.log("customersignup");
return axios
  .get(orderdetailcustomer + '/' + id)
  .then(response =>response)
  .catch(error => {
    if (error.response && error.response.status === 404) {
      return `\u2014`;
    }
  });
}

export const StoreTiming = (id)=>
{
    console.log("customersignup");
return axios
  .get(storetiming + '/' + id)
  .then(response =>response)
  .catch(error => {
    if (error.response && error.response.status === 404) {
      return `\u2014`;
    }
  });
}
const addTransaction = async (token, t) => {
  let getData = []

  let h = new Headers(); h.append('Authorization', token)

  var formdata = new FormData();
  formdata.append("userID", t.userID);
  formdata.append("customerAddress", t.addressID);
  formdata.append("stripeToken", t.stripeToken);
  formdata.append("itemquantity", t.quantity);
  formdata.append("unitID", t.unitID);
 

  await fetch(addorder, { method: 'POST', body: formdata, headers: h })
      .then(res => res.json())
      .then((dat) => getData = dat)
      .catch(err => { alert(err.message); getData = false })
  console.log('add transaction=>', getData)
  if (getData?.success === 'false') {
      alert(getData.message); getData = false
  }

  return getData
}


export const customerLogin = (data)=>
{
    console.log("login",data);
    console.log("login",login);
    return axios
    .post(login,data)
    // .then(response =>response)
    // .catch(error => error);
}

export const getProduct = (data)=>
{
    console.log("login",data);
    console.log("login",getproduct);
    return axios
    .get(getproduct)
    // .then(response =>response)
    // .catch(error => error);
}

export const getCategories = ()=>
{
    
    return axios
    .get(categoriesdist)
    // .then(response =>response)
    // .catch(error => error);
}
export const getVerification = (data)=>
{
   
    return axios
    .post(verificationcode,data)
    // .then(response =>response)
    // .catch(error => error);
}

export const getforgetpassword = (data)=>
{
   
    return axios
    .post(forgetpassword,data)
    // .then(response =>response)
    // .catch(error => error);
}
export const addAreaProduct = (data)=>
{
   
    return axios
    .post(checkareaporduct,data)
    // .then(response =>response)
    // .catch(error => error);
}
export const getVerifiedCustomer = (data)=>
{
   
    return axios
    .post(verifiedcode,data)
    // .then(response =>response)
    // .catch(error => error);
}
export const addDelivery = (data)=>
{
   
  console.log('hit');
    return axios
    .post(adddelivery,data)
    // .then(response =>response)
    // .catch(error => error);
}

export const addOrder = (data)=>
{
   
  console.log('hit');
    return axios
    .post(addorder,data)
    // .then(response =>response)
    // .catch(error => error);
}
export const addmainOrder = (data)=>
{
   
  console.log('hit');
    return axios
    .post(ordermain,data)
    // .then(response =>response)
    // .catch(error => error);
}
export const addCustomerDetail = (data)=>
{
   
  console.log('hit');
    return axios
    .post(adddelivery,data)
    // .then(response =>response)
    // .catch(error => error);
}

export const getProductById = (id)=>
{
    console.log("id",id);
  
    return axios
    .get(getproduct + '/' + id)
    // .then(response =>response)
    // .catch(error => error);
}

export const getProductUnitById = (id)=>
{
    console.log("id",id);
  
    return axios
    .get(getProductUnit + '/' + id)
    // .then(response =>response)
    // .catch(error => error);
}

export const getDeliverybycustomer = (id)=>
{
    
  
    return axios
    .get(getaddressbycustomer + '/' + id)
    // .then(response =>response)
    // .catch(error => error);
}

