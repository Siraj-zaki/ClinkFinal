import React from 'react'
// import { Modal, Button } from "bootstrap";
import { Modal, ModalBody, ModalFooter, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import api from '../services/api';
import { set_loading } from '../Store/actions/globalActions';
import { Loading } from './Icons';
import comma from 'comma-number'

class UnitAssignModal extends React.Component {
 
    constructor(props) {
        super(props);
    this.state = {
        loading: false, orders: [],
        checkitem:[],
        checked: false
    }
    this.handleChange = this.handleChange.bind(
        this
      );
}

    async componentDidMount() {
        this.props.setLoading(true)
        let res = await api.getUnit()
        if (res) {
            console.log(res.result);
            this.setState({ orders: res.result})
        }
        this.props.setLoading(false)
    }

    handleChange(id) {
        console.log(id);
        const selectedCheckboxes = this.state?.checkitem;
        console.log(selectedCheckboxes);
    // Find index
    const findIdx = selectedCheckboxes?.indexOf(id);

    // Index > -1 means that the item exists and that the checkbox is checked
    // and in that case we want to remove it from the array and uncheck it
    if (findIdx > -1) {
      selectedCheckboxes.splice(findIdx, 1);
    } else {
      selectedCheckboxes.push(id);
    }

    this.setState({
      checkitem: selectedCheckboxes
    });

  }

     
    render() {
console.log(this.state.checkitem);
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
                                        <th>CheckBox</th>
                                        <th>id</th>
                                        <th>unit</th>
                                        <th>price</th>
                                        <th>photo</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                       this.state.orders && this.state.orders.map((item, index) =>

                                            <tr>
                                                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                                                 <td><input type='checkbox'
                                                  style={{ height: 20, width: 20 }} 
                                                  name="description"
                                                  
                                                   onChange={() => this.handleChange(item.id)} 
                                                      /></td>
                                                <td style={{ textAlign: 'center' }}>{ item.id}</td>
                                                <td style={{ textAlign: 'center' }}>{comma(item.price) + '$'}</td>
                                                <td style={{ textAlign: 'center' }}>{comma(item.unit)}</td>
                                               
                                            </tr>
                                       
                                        )
                                    }

                                </tbody>
                            </table>
                        </ModalBody>
                }

                <ModalFooter>
                    <Button variant='info' onClick={onCancelClick}>{cancelText ? cancelText : 'Hide'}</Button>
                    <Button variant="danger" onClick={() => { onCancelClick(); onDoClick(this.state.checkitem) }}>{doText ? doText : 'Assign Unit'}</Button>
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

export default connect(mapState, mapDispatch)(UnitAssignModal)