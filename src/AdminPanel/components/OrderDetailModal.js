import React from 'react'
// import { Modal, Button } from "bootstrap";
import { Modal, ModalBody, ModalFooter, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import api from '../services/api';
import { set_loading } from '../Store/actions/globalActions';
import { Loading } from './Icons';
import comma from 'comma-number'

class OrderDetailModal extends React.Component {

    state = {
        loading: false, orders: []
    }

    async componentDidMount() {
        this.props.setLoading(true)
        let res = await api.getTransactionsWithItemByID(this.props.token, this.props.orderID)
        if (res) {
            this.setState({ orders: res.result[0].products })
        }
        this.props.setLoading(false)
    }

    render() {

        let { onCancelClick, onDoClick, cancelText, doText,  } = this.props

        return (

            <Modal show={true} backdrop={onCancelClick} onHide={onCancelClick} keyboard={true}           >

                {
                    this.props.loading ?
                        <Loading color='#960400' />
                        :
                        <ModalBody>
                            <table id="example1" class="table table-bordered table-hover dataTable no-footer dtr-inline" role="grid" aria-describedby="example1_info">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>quantity</th>
                                        <th>photo</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.orders.map((item, index) =>
                                            <tr>
                                                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                <td style={{ textAlign: 'center' }}>{item.itemName}</td>
                                                <td style={{ textAlign: 'center' }}>{comma(item.itemPrice) + '$'}</td>
                                                <td style={{ textAlign: 'center' }}>{comma(item.itemQuantity)}</td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <img style={{ width: 50, height: 50, }} alt='img' src={item.imgUrl} ></img>
                                                </td>
                                            </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                        </ModalBody>
                }

                <ModalFooter>
                    <Button variant='info' onClick={onCancelClick}>{cancelText ? cancelText : 'Hide'}</Button>
                    <Button variant="danger" onClick={() => { onCancelClick(); onDoClick() }}>{doText ? doText : 'Delete'}</Button>
                </ModalFooter>
            </Modal>

        );
    }
}

const mapState = (state) => {
    return {
        token: state.authReducer.token,
        items: state.appReducer.items,
        orders: state.appReducer.orders,
        loading: state.globalReducer.loading,
    }
}
const mapDispatch = dispatch => {
    return {
        setLoading: bol => dispatch(set_loading(bol)),
    }
}

export default connect(mapState, mapDispatch)(OrderDetailModal)