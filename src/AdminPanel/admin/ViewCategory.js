import React from "react";

import '../styles/adminlte.min.css'
import '../styles/dataTables.bootstrap4.min.css'
import '../styles/responsive.bootstrap4.min.css'
import '../styles/indexNew.css'
import ResponsiveDrawer from './ResponsiveDrawer'
import { connect } from "react-redux";
import ConfirmModal from '../components/ConfirmModal'
import { _getCategories } from '../Store/middlewares/appMiddleware'
import api from "../services/api";

class ViewCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deleteID: '',
            showModal: false,
            orderdata:[]
        }
    }
    async componentDidMount(){
        console.log(this.props);
    
        let res = await api.getCategory();
        console.log(res.result);
        this.setState({orderdata:res.result})
    }
    

    deleteHandler = async () => {
        console.log(this.state.deleteID)
        this.setState({ showModal: false })
        let res = await api.deleteCategory( this.state.deleteID)
        if (res) {
            window.location.reload();

        }
    }

    render() {


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
                                                            Name
                                                                    </th>
                                                        <th class="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Bottle Image: activate to sort column ascending">
                                                            Image
                                                                    </th>
                                          
                                                        <th class="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Category: activate to sort column ascending">
                                                            Description
                                                                        </th>
                                                      
                                                        <th class="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="edit: activate to sort column ascending">
                                                            Delete
                                                            </th>
                                                        <th class="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="edit: activate to sort column ascending">
                                                            Edit
                                                            </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.orderdata.map((item, index) =>
                                                            <tr key={index} role="row" class="odd">
                                                                <td tabindex="0" class="">{index + 1}</td>
                                                                <td class="sorting_1">
                                                                    {item.categoryName  }
                                                                </td>
                                                                <td>

                                                                    <img src={item.categoryImage || "./viewitemhtml_files/1603476881.png"} style={{ width: "80px", height: "80px" }}></img>

                                                                </td>
                                                               
                                                                <td>{item.categoryDescription }</td>
                                                               
                                                               
                                                                <td><a onClick={() => this.setState({ showModal: true, deleteID: item.id })} className="btn btn-danger white">Delete</a></td>
                                                                <td><a href={'/admin/addItem?id=' + item.itemID} className="btn btn-info white">Edit</a></td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12 col-md-5">
                                            <div class="dataTables_info" id="example1_info" role="status" aria-live="polite">Showing 1 to 6 of {this.props.categories.length} entries</div></div><div class="col-sm-12 col-md-7"><div class="dataTables_paginate paging_simple_numbers" id="example1_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="example1_previous"><a href="https://clinkdelivery.com/admin/categories#" aria-controls="example1" data-dt-idx="0" tabindex="0" class="page-link">Previous</a></li><li class="paginate_button page-item active"><a href="https://clinkdelivery.com/admin/categories#" aria-controls="example1" data-dt-idx="1" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item next disabled" id="example1_next"><a href="https://clinkdelivery.com/admin/categories#" aria-controls="example1" data-dt-idx="2" tabindex="0" class="page-link">Next</a></li></ul></div></div></div></div>
                            </div>
                        </div>
                    </div>
                </section>
                {
                    this.state.showModal &&
                    <ConfirmModal onCancelClick={() => this.setState({ showModal: true })}
                        onDoClick={this.deleteHandler} />
                }

            </div>
        )

    }
}

const mapState = state => {
    return {
        categories: state.appReducer.categories,
    }
}
const mapDispatch = dispatch => {
    return {
        _getCategory: () => dispatch(_getCategories())
    }
}

export default connect(mapState, mapDispatch)(ViewCategory)