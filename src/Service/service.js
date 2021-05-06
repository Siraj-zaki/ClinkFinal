import axios from 'axios';
import { signUp,login,getproduct,adddelivery,getaddressbycustomer,addcustomerdetail,addorder,getProductUnit } from "./api";

export const customerSignUp = (data)=>
{
    console.log("customersignup",data);
return axios
  .post(signUp,data)
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

