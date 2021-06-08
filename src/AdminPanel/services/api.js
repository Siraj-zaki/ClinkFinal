
import { Path } from './Path'
import axios from 'axios';

const loginUser = async (email, pass) => {

    let getData = [];

    let formData = new FormData();
    formData.append('email', email);
    formData.append('password', pass);

    let req = new Request(Path.login, { body: formData, method: 'POST' })


    await fetch(req)
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })

    if (getData?.success === 'false' || getData?.message === 'Auth failed') {
        alert(getData.message); getData = false
    }

    return getData

}
const registerUser = async (user) => {
    let getData = []

    var formdata = new FormData();
    formdata.append("firstName", user.firstName);
    formdata.append("lastName", user.lastName);
    formdata.append("email", user.email);
    formdata.append("password", user.password);
    formdata.append("phone", user.phone);
    formdata.append("address", user.address);
    formdata.append("lat", user.lat);
    formdata.append("lng", user.lng);
    formdata.append("avatar", '');
    formdata.append("country", user.country);
    formdata.append("city", user.city);
    formdata.append("type", "user");


    var req = { method: 'POST', body: formdata, };
    
    await fetch(Path.register, req)
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })

    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }

    return getData


}
const checkEmail = async (email) => {
    //console.log('runn')
    let getData = [];

    let req = new Request(Path.checkEmail + email)

    await fetch(req)
        .then(res => res.json())
        .then(res => getData = res)
        .catch(err => alert(err.message))

    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }

    return getData

}
const setNewPassword = async (email, pass) => {
    //console.log('runn')
    let getData = [];

    let formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", pass);

    let req = new Request(Path.setNewPassword, { body: formdata, method: 'POST' })

    await fetch(req)
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })

    console.log('setNewPass:->', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }
    return getData

}








const getUsers = async () => {

    let getData = [];
    let h = new Headers();
    // h.append('Authorization', token)

    let req = new Request(Path.user, { method: 'GET'})

    await fetch(req)
        .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert(err.message); getData = false })

    console.log('get user->', getData)
    if (getData?.success === 'false' || getData?.success === 'Auth failed') {
        alert(getData.message + getData?.reason); getData = false
    }
    return getData
}
const editUser = async (token, user) => {
    //console.log('runn')
    let getData = [];

    let h = new Headers(); h.append('Authorization', token)

    var formdata = new FormData();
    formdata.append("firstName", user.firstName)
    formdata.append("lastName", user.lastName)
    formdata.append("email", user.email)
    formdata.append("avatar", user.avatar)
    formdata.append("phone", user.phone)
    formdata.append("address", user.address)
    formdata.append("lat", user.lat)
    formdata.append("lng", user.lng)
    formdata.append("country", user.country)
    formdata.append("city", user.city)
    formdata.append("type", user.type ? user.type : 'user')

    let req = new Request(Path.editUser + '/' + user.userID, { body: formdata, method: 'put' })

    await fetch(req)
        .then(res => res.json())
        .then((dat) => { getData = dat; console.log(dat) })
        .catch(err => { alert(err.message); getData = false })

    console.log('edit->', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }

    return getData
}


const getItems = async () => {

    let getData = [];

    let req = new Request(Path.item, { method: 'GET' })

    await fetch(req)
        .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert(err.message); getData = false })

    console.log('get items->', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }
    return getData
}

const getProduct = async () => {

    let getData = [];

    let req = new Request(Path.product, { method: 'GET' })

    await fetch(req)
        .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert(err.message); getData = false })

    console.log('get items->', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }
    return getData
}
const getUnit = async () => {

    let getData = [];

    // let req = new Request(Path.getunit, { method: 'GET' })

    let req =await  axios.get(Path.getunit)
      .then((dat) => { getData = dat.data; })
      .catch(err => { alert(err.message); getData = false })

    // await fetch(req)
    //     .then(res => res.json())
    //     .then((dat) => { getData = dat; })
    //     .catch(err => { alert(err.message); getData = false })

    console.log('get items->', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }
    return getData
}
const addStore = async (token, item) => {

    let getData = [];

    let h = new Headers(); h.append('Authorization', token)

    var formdata = new FormData();
    formdata.append("itemName", item.itemName);
    formdata.append("itemNameArabic", item.itemNameArabic);
    formdata.append("itemPrice", item.itemPrice);
    formdata.append("description", item.description);
    formdata.append("descriptionArabic", item.descriptionArabic);
    formdata.append("imgUrl", item.imgUrl);
    formdata.append("categoryID", item.categoryID);
    formdata.append("isFeatured", item.isFeatured);
    console.log(item);
    let data = {
        storeName: item.itemName,
        emailAddress: item.emailAddress,
        password: item.password,
        longitude:item.longitude,
        latitude:item.latitude,
        street:item.street,
        storeContact:item.storeContact,
        radius:item.radius,
        endAcceptingTime:item.endAcceptingTime,
        startAcceptingTime:item.startAcceptingTime,
        country:item.country,
        state:item.state,
        city:item.city,
        zipcode:item.zipcode,
        
      };
      try {
          

        
          await axios.post(Path.addstore,data)
          .then(res => res.json())
            .then((dat) => { getData = dat; })
            .catch(err => { alert(err.response.data.message) ;getData = false })
      } catch (error) {
          console.log(error);
      }

    // await fetch(new Request(Path.addstore, { method: 'POST', body: data, headers: h }))
    //     .then(res => res.json())
    //     .then((dat) => { getData = dat; })
    //     .catch(err => { alert(err.message); getData = false })

    console.log('add items->', getData)
    // if (getData?.success === 'false' || getData?.success === 'Auth failed') {
    //     alert('User Already'); getData = false
    // }
    return getData
}
const addItemWeight = async (token, body) => {

    let getData = [];

    let h = new Headers(); h.append('Authorization', token)

    var formdata = new FormData();
    formdata.append("itemId", body.itemId);
    formdata.append("itemUnit", body.itemUnit);
    formdata.append("itemPrice", body.itemPrice);
    
    console.log(body);
    let data = {
        cvr: body.cvr,
        itemPrice: body.itemPrice,
        ProductId:body.itemID,
        itemUnit:body.itemUnit,

      };
     
      await axios.post(Path.addWeight,data,{headers: h})
      .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert(err.message); getData = false })

    // await fetch(new Request(Path.addstore, { method: 'POST', body: data, headers: h }))
    //     .then(res => res.json())
    //     .then((dat) => { getData = dat; })
    //     .catch(err => { alert(err.message); getData = false })

    console.log('add items->', getData)
    if (getData?.success === 'false' || getData?.success === 'Auth failed') {
        alert(getData.message); getData = false
    }
    return getData
}

const addItem = async (token, item) => {

    let getData = [];

    let h = new Headers(); h.append('Authorization', token)

    var formdata = new FormData();
    formdata.append("itemName", item.itemName);
    formdata.append("itemNameArabic", item.itemNameArabic);
    formdata.append("itemPrice", item.itemPrice);
    formdata.append("description", item.description);
    formdata.append("descriptionArabic", item.descriptionArabic);
    formdata.append("imgUrl", item.imgUrl);
    formdata.append("categoryID", item.categoryID);
    formdata.append("isFeatured", item.isFeatured);


    await fetch(new Request(Path.item, { method: 'POST', body: formdata, headers: h }))
        .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert(err.message); getData = false })

    console.log('add items->', getData)
    if (getData?.success === 'false' || getData?.success === 'Auth failed') {
        alert(getData.message); getData = false
    }
    return getData
}

const addProduct = async (token, item) => {

    let getData = [];

    let h = new Headers(); h.append('Authorization', token)

    var formdata = new FormData();
    formdata.append("itemName", item.itemName);
    formdata.append("itemNameArabic", item.itemNameArabic);
    formdata.append("itemPrice", item.itemPrice);
    formdata.append("description", item.description);
    formdata.append("descriptionArabic", item.descriptionArabic);
    formdata.append("imgUrl", item.imgUrl);
    formdata.append("categoryID", item.categoryID);
    formdata.append("isFeatured", item.isFeatured);
    formdata.append("storeId", item.storeId);
    formdata.append("unit_id", item.unit_id);


    await fetch(new Request(Path.productadd, { method: 'POST', body: formdata, headers: h }))
        .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert(err.message); getData = false })

    console.log('add items->', getData)
    if (getData?.success === 'false' || getData?.success === 'Auth failed') {
        alert(getData.message); getData = false
    }
    return getData
}
const addUnit = async (token, item) => {

    let getData = [];

    let h = new Headers(); h.append('Authorization', token)

    var formdata = new FormData();
    formdata.append("unit", item.unit);
    formdata.append("price", item.price);

    


    await fetch(new Request(Path.unit, { method: 'POST', body: formdata, headers: h }))
        .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert(err.message); getData = false })

    console.log('add items->', getData)
    if (getData?.success === 'false' || getData?.success === 'Auth failed') {
        alert(getData.message); getData = false
    }
    return getData
}
const editItem = async (token, item) => {

    let getData = [];
    console.log(item)
    let h = new Headers(); h.append('Authorization', token)

  

    var formdata = new FormData();
    formdata.append("itemName", item.itemName);
    formdata.append("itemNameArabic", item.itemNameArabic);
    formdata.append("itemPrice", item.itemPrice);
    formdata.append("description", item.description);
    formdata.append("descriptionArabic", item.descriptionArabic);
    formdata.append("imgUrl", item.imgUrl);
    formdata.append("categoryID", item.categoryID);
    formdata.append("isFeatured", item.isFeatured);
    formdata.append("storeId", item.storeId);
    formdata.append("unit_id", item.unit_id);


    await fetch(new Request(Path.productedit + '/' + item.id, { method: 'PUT', body: formdata, headers: h }))
        .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert(err.message); getData = false })

    console.log('edit item->', getData)
    if (getData?.success === 'false' || getData?.success === 'Auth failed') {
        alert(getData.message); getData = false
    }
    return getData
}
const editProduct = async (token, item) => {

    let getData = [];
    console.log(item)
    let h = new Headers(); h.append('Authorization', token)

    var formdata = new FormData();
    formdata.append("itemName", item.itemName);
    formdata.append("itemNameArabic", item.itemNameArabic);
    formdata.append("itemPrice", item.itemPrice);
    formdata.append("description", item.description);
    formdata.append("descriptionArabic", item.descriptionArabic);
    formdata.append("imgUrl", item.imgUrl);
    formdata.append("categoryID", item.categoryID);
    formdata.append("storeId", item.storeId);
    


    await fetch(new Request(Path.productedit + '/' + item.id, { method: 'PUT', body: formdata, headers: h }))
        .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert(err.message); getData = false })

    console.log('edit item->', getData)
    if (getData?.success === 'false' || getData?.success === 'Auth failed') {
        alert(getData.message); getData = false
    }
    return getData
}
const deleteItem = async (token, id) => {
    let getData = []

    let h = new Headers(); h.append('Authorization', token)

    await fetch(Path.item + '/' + id, { method: 'DELETE', headers: h, })
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })

    console.log('delete item->', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }

    return getData
}

const deleteProduct = async ( id) => {
    let getData = []

   

    await fetch(Path.productdelete + '/' + id, { method: 'DELETE'  })
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })

    console.log('delete item->', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }

    return getData
}

const getFeatured = async () => {
    //console.log('runn')
    let getData = [];
    let req = new Request(Path.getFeaturedItems, { method: 'GET' })

    await fetch(req)
        .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert(err.message); getData = false })

    console.log('get featured->', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }
    return getData
}



const getFavourite = async (token, uid) => {
    //console.log('runn')
    let getData = [];
    let h = new Headers();
    h.append('Authorization', token)
    let req = new Request(Path.favourite + '/' + uid, { headers: h, method: 'GET' })

    await fetch(req)
        .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert(err.message); getData = false })

    console.log('get favourite->', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }
    return getData
}
const addFavourite = async (token, uid, iID) => {
    let getData = []

    let h = new Headers(); h.append('Authorization', token)

    var formdata = new FormData();
    formdata.append("userID", uid)
    formdata.append("itemID", iID)

    await fetch(Path.favourite, { method: 'POST', body: formdata, headers: h })
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })
    console.log('add fav=>', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }

    return getData
}
const deleteFav = async (token, uid, iID) => {
    let getData = []

    let h = new Headers(); h.append('Authorization', token)

    var formdata = new FormData();
    formdata.append("userID", uid)
    formdata.append("itemID", iID)

    await fetch(Path.favourite + 'Delete', { method: 'POST', body: formdata, headers: h })
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })
    console.log('delete fav=>', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }

    return getData
}



const getCoupon = async (token) => {

    let getData = [];

    var h = new Headers(); h.append("Authorization", token);

    await fetch(new Request(Path.coupon, { method: 'GET', headers: h }))
        .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert(err.message); getData = false })

    console.log('get coupon->', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }
    return getData
}
const addCoupon = async (token, coupon) => {
    let getData = []

    var h = new Headers(); h.append("Authorization", token);

    var formdata = new FormData();
    formdata.append("couponCode", coupon.couponCode);
    formdata.append("couponDiscount", coupon.couponDiscount);
    formdata.append("couponMax", coupon.couponMax);
    formdata.append("couponExpiry", coupon.couponExpiry);


    await fetch(Path.coupon, { method: 'POST', body: formdata, headers: h })
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })

    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }

    return getData
}
const editCoupon = async (token, coupon) => {
    let getData = []

    var h = new Headers(); h.append("Authorization", token);

    var formdata = new FormData();
    formdata.append("couponCode", coupon.couponCode);
    formdata.append("couponDiscount", coupon.couponDiscount);
    formdata.append("couponMax", coupon.couponMax);
    formdata.append("couponExpiry", coupon.couponExpiry);


    await fetch(Path.coupon + '/' + coupon.couponID, { method: 'PUT', body: formdata, headers: h })
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })

    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }

    return getData
}
const deleteCoupon = async (token, id) => {
    let getData = []

    let h = new Headers(); h.append('Authorization', token)

    await fetch(Path.coupon + '/' + id, { method: 'DELETE', headers: h, })
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })

    console.log('delete coupon->', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }

    return getData
}




const getCategory = async () => {
    //console.log('runn')
    let getData = [];

    await fetch(new Request(Path.category, { method: 'GET' }))
        .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert(err.message); getData = false })

    console.log('get category->', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }
    return getData
}
const addCategory = async (token, cat) => {
    let getData = []

    let h = new Headers(); h.append('Authorization', token)

    var formdata = new FormData();
    formdata.append("categoryName", cat.categoryName);
    formdata.append("categoryNameArabic", cat.categoryNameArabic);
    formdata.append("categoryDescription", cat.categoryDescription);
    formdata.append("categoryDescriptionArabic", cat.categoryDescriptionArabic);
    formdata.append("categoryImage", cat.categoryImage);


    var req = { method: 'POST', body: formdata, };

    await fetch(Path.category, req)
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })

    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }

    return getData
}
const editCategory = async (token, cat) => {
    let getData = []

    let h = new Headers(); h.append('Authorization', token)

    var formdata = new FormData();
    formdata.append("categoryName", cat.categoryName);
    formdata.append("categoryNameArabic", cat.categoryNameArabic);
    formdata.append("categoryDescription", cat.categoryDescription);
    formdata.append("categoryDescriptionArabic", cat.categoryDescriptionArabic);
    formdata.append("categoryImage", cat.categoryImage);

    await fetch(Path.category + '/' + cat.categoryID, { method: 'PUT', body: formdata, })
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })

    console.log('edit category->', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }

    return getData
    
}
const deleteCategory = async ( cid) => {
    let getData = []

    

    await fetch(Path.category + '/' + cid, { method: 'DELETE' })
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })

    console.log('delete category=>', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }

    return getData
}

const deletestore= async ( cid) => {
    let getData = []



    await fetch(Path.deleteStore + '/' + cid, { method: 'DELETE' })
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })

    console.log('delete store=>', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }

    return getData
}
const deleteunit= async ( cid) => {
    let getData = []

   

    await fetch(Path.unitDelete + '/' + cid, { method: 'DELETE' })
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })

    console.log('delete store=>', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }

    return getData
}
const deleteOrder= async ( cid) => {
    let getData = []
console.log(cid);
    await fetch(Path.orderdelete + '/' + cid, { method: 'DELETE' })
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })

    console.log('delete store=>', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }

    return getData
}

const editstore = async (token, item) => {
    let getData = []

    let h = new Headers(); h.append('Authorization', token)

    let data = {
        storeName: item.itemName,
        emailAddress: item.emailAddress,
        password: item.password,
        longitude:item.longitude,
        latitude:item.latitude,
        street:item.street,
        storeContact:item.storeContact,
        radius:item.radius,
        endAcceptingTime:item.endAcceptingTime,
        startAcceptingTime:item.startAcceptingTime,
        country:item.country,
        state:item.state,
        city:item.city,
        
      };

    await fetch(Path.storeedit + '/' + item.categoryID, { method: 'PUT', body: data, })
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })

    console.log('edit category->', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }

    return getData
}

const getTransactions = async (token, id) => {
    //console.log('runn')
    let getData = [];

    let h = new Headers(); h.append('Authorization', token)

    let path = Path.transaction + (id ? `/+${id}` : '')
    await fetch(new Request(path, { method: 'GET', headers: h }))
        .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert(err.message); getData = false })

    console.log('get transaction->', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }
    return getData
}
const getTransactionsWithItemByID = async (token, orderID) => {
    //console.log('runn')
    let getData = [];

    let h = new Headers(); h.append('Authorization', token)


    await fetch(new Request(Path.transactionWithItem + orderID, { method: 'GET', headers: h }))
        .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert(err.message); getData = false })

    console.log('get transaction->', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }
    return getData
}
const addTransaction = async (token, t) => {
    let getData = []

    let h = new Headers(); h.append('Authorization', token)

    var formdata = new FormData();
    formdata.append("userID", t.userID);
    formdata.append("orderDate", t.orderDate);
    formdata.append("remarks", t.remarks);
    formdata.append("discount", t.discount);
    formdata.append("orderAmmount", t.orderAmmount);
    formdata.append("status", t.status);
    formdata.append("tax", t.tax);
    formdata.append("orderTime", t.orderTime);
    formdata.append("deliveryDate", t.deliveryDate);
    formdata.append("specialInstructions", t.specialInstructions);

    await fetch(Path.transaction, { method: 'POST', body: formdata, headers: h })
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })
    console.log('add transaction=>', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }

    return getData
}



const getOrders = async (token, id) => {
    //console.log('runn')
    let getData = [];

    let h = new Headers(); h.append('Authorization', token)

    let path = Path.order + (id ? `/+${id}` : '')
    await fetch(new Request(path, { method: 'GET', headers: h }))
        .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert(err.message); getData = false })

    console.log('get order->', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }
    return getData
}

const getStoreProduct = async ( id) => {
    //console.log('runn')
    let getData = [];

    // let h = new Headers(); h.append('Authorization', token)

    let path = Path.storeProduct + (id ? `/+${id}` : '')
    await fetch(new Request(path, { method: 'GET' }))
        .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert(err.message); getData = false })

    console.log('get order->', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }
    return getData
}
const getOrdersData = async () => {
    //console.log('runn')
    let getData = [];

    // let h = new Headers(); h.append('Authorization', token)

    let path = Path.orderdata
    await fetch(new Request(path, { method: 'GET' }))
        .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert(err.message); getData = false })

    console.log('get order->', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }
    return getData
}
const getStore = async () => {
    //console.log('runn')
    let getData = [];

    // let h = new Headers(); h.append('Authorization', token)

    let path = Path.storedata
    await fetch(new Request(path, { method: 'GET' }))
        .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert(err.message); getData = false })

    console.log('get order->', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }
    return getData
}


const getOrder = async ( id) => {
    console.log('id',id)
    let getData = [];

    // let h = new Headers(); h.append('Authorization', token)

    let path = Path.order + (id ? `${id}` :'')
    console.log(path);
    await fetch(new Request(path, { method: 'GET' }))
        .then(res => res.json())
        .then((dat) => { getData = dat; })
        .catch(err => { alert(err.message); getData = false })

    console.log('get order->', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }
    return getData
}


const addOrder = async (token, order) => {
    let getData = []

    let h = new Headers(); h.append('Authorization', token)

    var formdata = new FormData();
    formdata.append("orderID", order.orderID)
    formdata.append("itemID", order.itemID)
    formdata.append("itemQuantity", order.itemQuantity)

    await fetch(Path.order, { method: 'POST', body: formdata, headers: h })
        .then(res => res.json())
        .then((dat) => getData = dat)
        .catch(err => { alert(err.message); getData = false })
    console.log('add order=>', getData)
    if (getData?.success === 'false') {
        alert(getData.message); getData = false
    }

    return getData
}


const api = {
    loginUser, registerUser, checkEmail, setNewPassword, editUser,

    getUsers,

    getItems, addItem,addProduct,getProduct,getOrder,addUnit,getUnit, editItem, editProduct, deleteItem,deleteProduct,

    getFavourite, addFavourite, deleteFav,

    getFeatured,addItemWeight,

    getCategory, addCategory, editCategory, deleteCategory,

    getCoupon, addCoupon, editCoupon, deleteCoupon,

    getTransactions, getTransactionsWithItemByID, addTransaction,

    getOrders, addOrder,addStore,getStore,editstore,deletestore,getOrdersData,getStoreProduct,deleteOrder,deleteunit

}


export default api
