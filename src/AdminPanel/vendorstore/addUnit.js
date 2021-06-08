import React from "react";

import '../styles/adminlte.min.css'
import '../styles/dataTables.bootstrap4.min.css'
import '../styles/responsive.bootstrap4.min.css'
import '../styles/indexNew.css'
import firebase from 'firebase'
import { connect } from "react-redux";
import { _getUnit } from '../Store/middlewares/appMiddleware'
import { set_loading } from '../Store/actions/globalActions'
import api from "../services/api";
import { Loading } from '../components/Icons'
import ResponsiveDrawer from "../admin/ResponsiveDrawer.js";
import { ProgressBar } from 'react-bootstrap'

class AddUnit extends React.Component {
  constructor(props) {
    super(props);
    console.log('categ', this.props);
    this.state = {
      product_id: '',
      unit: '',
      price: '',
      progress: 0,
      loading: true,
      edit: false,
    }
  }

  componentDidMount() {
    const search = this.props.location.search; // returns the URL query String
    const params = new URLSearchParams(search);
    const id = parseInt(params.get('id'));
    if (id) {
      let item = this.props.items.filter(c => c.itemID === id)
      item = item[0];
      console.log(item)
      this.setState({
        unit: item.unit,
        price: parseInt(item.price)
      })
    }
  }




  addItem = async (e, url) => {
    e.preventDefault()
    this.props.setLoading(true)
    // await this.setState({ unit: url })
    // await this.setState({ storeId: this.props.userID })

    let item = {
      unit: this.state.unit,

    }

    let res;

    if (this.state.edit) {
      res = await api.editItem(this.props.token, item)
    } else {
      res = await api.addUnit(this.props.token, item)
    }

    if (res) {
      alert('opertion successfull')
      await this.props._getUnit()
      window.history.back()
    }
    this.props.setLoading(false)
    this.setState({ progress: 0 })
  }

  render() {



    return (
      <div className="dashboard">
        <ResponsiveDrawer />

        <section class="content-admin" style={{ paddingTop: 50, position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, width: '100%' }}>
            <ProgressBar now={this.state.progress} style={{ opacity: this.state.progress, height: 5 }} />
          </div>
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-12">
                <form onSubmit={this.addItem} >
                  <input type="hidden" name="_token" value="hrxeTL0t5hnBVb8Q3Q4vTc42CXU88qyd320Luzkv"></input>

                  <div className='row'>
                    <div class="form-group col-md-6">
                      <label>Unit Name</label>
                      <input type="text" name="name" value={this.state.unit} placeholder="john etc" required class="form-control" onChange={(e) => this.setState({ unit: e.target.value })}></input>
                    </div>
                    {/* <div class="form-group col-md-6">
                      <label>Price</label>
                      <input type="text" name="name" value={this.state.price} placeholder="john etc" required class="form-control" onChange={(e) => this.setState({ price: e.target.value })}></input>
                    </div> */}
                  </div>

                  <button type="submit" class="btn btn-success">{this.props.loading ? <Loading color="#fffa" /> : "Save"}</button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    )

  }
}

const mapState = state => {
  return {
    items: state.appReducer.items,
    categories: state.appReducer.categories,
    token: state.authReducer.token,
    user: state.authReducer.user,
    loading: state.globalReducer.loading,
  }
}
const mapDispatch = dispatch => {
  return {
    setLoading: bol => dispatch(set_loading(bol)),
    _getUnit: () => dispatch(_getUnit()),
  }
}
export default connect(mapState, mapDispatch)(AddUnit)
