import React from "react";

import '../styles/adminlte.min.css'
import '../styles/dataTables.bootstrap4.min.css'
import '../styles/responsive.bootstrap4.min.css'
import '../styles/indexNew.css'
import ResponsiveDrawer from './ResponsiveDrawer'
import { connect } from "react-redux";
import ConfirmModal from '../components/ConfirmModal'
import OrderDetailModal from '../components/OrderDetailModal'
import api from '../services/api'
import { ToastContainer, toast } from "react-toastify";

class Orders extends React.Component {
  state = {
    productname: '',
    price: '',
    image: '',
    orderdata:[],
    showModal: false, deleteID: '', showDetailModal: false, orderID: "",
  }
  async componentDidMount(){
    console.log(this.props);

    let customer = await api.getOrdersData()
    console.log(customer);
    this.setState({orderdata:customer.id})
}


  deleteHandler = async (id) => {
    console.log(id);
    // this.setState({ showModal: true })
    await api.deleteOrder(id)
    .then(r4=>{
      console.log(r4);
     alert('Orde Delete Successfully')
     setTimeout(() => {
       window.location.reload()
       
     }, 500);
     
    })
  }

  render() {

console.log(this.state.orderdata);
    return (
      <div className="dashboard" style={{ paddingTop: 100 }}>
        <ResponsiveDrawer />
        <section class="content-admin">

          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12">
                <tfooter>
                </tfooter>
                <div id="example1_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                  <div class="row">
                    <div class="col-sm-12 col-md-6">
                      <div class="dataTables_length" id="example1_length">
                        <label>Show <select name="example1_length" aria-controls="example1" class="custom-select custom-select-sm form-control form-control-sm">
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                        </select>
                                        entries
                                        </label>
                      </div>
                    </div>
                    <div class="col-sm-12 col-md-6">
                      <div id="example1_filter" class="dataTables_filter">
                        <label>Search:
                                                    <input type="search" class="form-control form-control-sm" placeholder="" aria-controls="example1"></input>
                        </label>
                      </div>
                    </div>


                  </div>
                  <div class="row">
                    <div class="col-sm-12">
                      <table id="example1" class="table table-bordered table-hover dataTable no-footer dtr-inline" role="grid" aria-describedby="example1_info">
                        <thead>
                          <tr role="row">
                            <th class="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Sr.#: activate to sort column ascending">
                              Sr.#
                            </th>
                            <th class="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Bottle Image: activate to sort column ascending">
                              User Name
                            </th>
                            <th class="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Bottle Image: activate to sort column ascending">
                              Order Date
                            </th>
                            {/* <th class="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Bottle Image: activate to sort column ascending">
                              Order Delivery Date
                            </th> */}
                            <th class="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Category: activate to sort column ascending">
                              Item Quantity
                            </th>
                            <th class="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Category: activate to sort column ascending">
                              Product Name
                            </th>

                            <th class="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Category: activate to sort column ascending">
                              Price
                              </th>
                            <th class="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Category: activate to sort column ascending">
                              Action
                              </th>

                          </tr>
                        </thead>
                        <tbody>
                          {
                            this.state?.orderdata.map((t, index) =>
                              <tr role="row" class="odd" key={index}  >
                                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                <td style={{ textAlign: 'center' }}>{t.customerName}</td>
                                <td style={{ textAlign: 'center' }}>{t.createdat}</td>
                                {/* <td style={{ textAlign: 'center' }}>{new Date(t.deliveryDate).toDateString()}</td> */}
                                <td style={{ textAlign: 'center' }}>{t.itemquantity}</td>
                                <td style={{ textAlign: 'center' }}>{t.itemName}</td>
                                <td style={{ textAlign: 'center' }}>{t.product_amount}$</td>
                                <td style={{ textAlign: 'center' }} >
                                  {/* <a onClick={event => this.setState({ orderID: t.orderID, showDetailModal: true })} style={{ color: '#fff' }} className="btn btn-primary">View</a> */}
                                  <a onClick={() => this.deleteHandler(t.id)} style={{ color: '#fff', marginLeft: 5, marginRight: 5 }} className="btn btn-danger">Delete</a>
                                  {/* <a href="https://clinkdelivery.com/admin/categories/edit/1" class="btn btn-info">Edit</a> */}
                                </td>
                              </tr>
                            )
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12 col-md-5">
                      <div class="dataTables_info" id="example1_info" role="status" aria-live="polite">Showing 1 to 6 of {this.props.transactions.length} entries</div></div><div class="col-sm-12 col-md-7"><div class="dataTables_paginate paging_simple_numbers" id="example1_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="example1_previous"><a href="https://clinkdelivery.com/admin/categories#" aria-controls="example1" data-dt-idx="0" tabindex="0" class="page-link">Previous</a></li><li class="paginate_button page-item active"><a href="https://clinkdelivery.com/admin/categories#" aria-controls="example1" data-dt-idx="1" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item next disabled" id="example1_next"><a href="https://clinkdelivery.com/admin/categories#" aria-controls="example1" data-dt-idx="2" tabindex="0" class="page-link">Next</a></li></ul></div></div></div></div>
              </div>
            </div>
          </div>
        </section>
        {
          this.state.showModal &&
          // <ConfirmModal onDoClick={() => this.setState({ showModal: false }, () => this.deleteHandler())}
          <ConfirmModal onDoClick={() => this.setState({ showModal: false } )}
            onCancelClick={() => this.setState({ showModal: false })} />
        }
        {
          this.state.showDetailModal &&
          <OrderDetailModal orderID={this.state.orderID} onDoClick={() => null}
            onCancelClick={() => this.setState({ showDetailModal: false })}
          />
        }
      </div>
    )

  }
}
const mapState = state => {
  return {
    token: state.authReducer.token,
    transactions: state.appReducer.transactions,
    user: state.authReducer.user,
  }
}

const mapDispatch = dispatch => {
  return {
    // _getUser: (token) => dispatch(_getUsers(token)),
    // _getOrders: (token) => dispatch(_getOrders(token)),
  }
}

export default connect(mapState, mapDispatch)(Orders)