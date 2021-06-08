// export const baseUrl = 'http://localhost:5000/v1/'
export const baseUrl = 'https://click-backend12.herokuapp.com/v1/'
// export const baseUrl = 'https://zibaulkhairserver.herokuapp.com/v1/'

// export const baseUrl = 'http://localhost:5000'

export const Path = {
    login: baseUrl + 'login/user',
  
    register: baseUrl + 'user',
    sendEmail: baseUrl + 'email/verification/',
    checkEmail: baseUrl + 'checkEmail/',
    setNewPassword: baseUrl + 'forgotPassword',
    addWeight:baseUrl + 'unitproduct/add',
    user: baseUrl + 'user',
    editUser: baseUrl + 'user',


    orderdelete: baseUrl + 'orderItems',
    // app
    getUsers: baseUrl + 'user',
    getFeaturedItems: baseUrl + 'getFeaturedItems/1',
    category: baseUrl + 'category',
    storeedit: baseUrl + 'store/edit',
    storedelete: baseUrl + 'store',
    
    favourite: baseUrl + 'fav',
    item: baseUrl + 'items',
    product: baseUrl + 'product/get',
    productadd: baseUrl + 'product/add',
    productedit: baseUrl + 'product/edit',
    productdelete: baseUrl + 'product/delete',
    unit: baseUrl + 'unit/add',
    getunit: baseUrl + 'unit/get',
    addstore: baseUrl + 'store',
    deleteStore: baseUrl + 'store/delete',
    coupon: baseUrl + 'coupon',
    transaction: baseUrl + 'transaction',
    transactionWithItem: baseUrl + 'getTransactionsWithItems/',
    order: baseUrl + 'storeid/',
    storeProduct: baseUrl + 'getStore',
    storedata: baseUrl + 'store/getData',
    orderdata: baseUrl + 'orderData',
    unitDelete: baseUrl + 'unit/delete',
    


    

    addProduct:baseUrl +'/product/add',
  


}

