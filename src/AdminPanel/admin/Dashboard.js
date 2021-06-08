import React from "react";

import '../styles/adminlte.min.css'
import '../styles/dataTables.bootstrap4.min.css'
import '../styles/responsive.bootstrap4.min.css'
import '../styles/indexNew.css'
import ResponsiveDrawer from './ResponsiveDrawer'
import { connect } from "react-redux";
import { _getOrders, _getTransactions, _getUsers } from "../Store/middlewares/appMiddleware";

class Dashboard extends React.Component {

  componentDidMount() {
    this.props._getUser(this.props.token)
    this.props._getTransactions(this.props.token)

  }

  render() {


    return (
      <div className="dashboard">
        
        <ResponsiveDrawer />

      </div>
    )

  }
}

const mapState = state => {
  return {
    token: state.authReducer.token,
  }
}

const mapDispatch = dispatch => {
  return {
    _getUser: (token) => dispatch(_getUsers(token)),
    _getTransactions: (token) => dispatch(_getTransactions(token)),
  }
}

export default connect(mapState, mapDispatch)(Dashboard)