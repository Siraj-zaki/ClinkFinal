import React from "react";

import '../styles/adminlte.min.css'
import '../styles/dataTables.bootstrap4.min.css'
import '../styles/responsive.bootstrap4.min.css'
import '../styles/indexNew.css'
import firebase from 'firebase'
import { connect } from "react-redux";
import { _getItems } from '../Store/middlewares/appMiddleware'
import { set_loading } from '../Store/actions/globalActions'
import api from "../services/api";
import { Loading } from '../components/Icons'
import ResponsiveDrawer from "./ResponsiveDrawer";
import { ProgressBar } from 'react-bootstrap'

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemID: '',
      itemName: '', itemNameArabic: '',
      itemPrice: '',
      description: '', descriptionArabic: '',
      imgUrl: '',
      categoryID: props?.categories[0]?.categoryID?props?.categories[0]?.categoryID:'',
      isFeatured: false,
      categories: props.categories?props.categories:'',
      firebaseLink: '',
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
        itemID: item.itemID, itemName: item.itemName, itemNameArabic: item.itemNameArabic,
        itemPrice: parseInt(item.itemPrice), description: item.description, descriptionArabic: item.descriptionArabic,
        isFeatured: parseInt(item.isFeatured) === 0 ? false : true,
        categoryID: item.categoryID, firebaseLink: item.imgUrl, edit: true
      })
    }
  }



  uploadHandler = (e) => {
    e.preventDefault();
    this.setState({ message: false })
    if (this.props.loading)
      return;

    if (this.state.firebaseLink) {
      return this.addItem(this.state.firebaseLink)
    }

    if (!this.state.imgUrl) {
      return alert("please selecet a image")
    }

    this.props.setLoading(true)
    let file = this.state.imgUrl
    let name = this.state.categoryID + '_' + this.state.itemName
    let dir = 'items'
    let t = this;
    const uploadTask = firebase.storage().ref(dir + '/' + name).put(file)
    uploadTask.on('state_changed', function (snapshot) {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      t.setState({ progress })
    }, function (error) {
      return alert(error.message)
    }, function () {
      firebase.storage().ref(dir).child(name).getDownloadURL()
        .then(url => {
          t.addItem(url)
        })
    });
  }


  addItem = async (url) => {
    this.props.setLoading(true)
    await this.setState({ firebaseLink: url })

    let item = {
      itemName: this.state.itemName,
      itemNameArabic: this.state.itemNameArabic,
      itemPrice: this.state.itemPrice,
      description: this.state.description,
      descriptionArabic: this.state.descriptionArabic,
      categoryID: this.state.categoryID,
      isFeatured: this.state.isFeatured ? 1 : 0,
      imgUrl: this.state.firebaseLink,
      itemID: this.state.itemID,
    }

    let res;

    if (this.state.edit) {
      res = await api.editItem(this.props.token, item)
    } else {
      res = await api.addItem(this.props.token, item)
    }

    if (res) {
      alert('opertion successfull')
      await this.props._getItems()
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
                <form onSubmit={this.uploadHandler} >
                  <input type="hidden" name="_token" value="hrxeTL0t5hnBVb8Q3Q4vTc42CXU88qyd320Luzkv"></input>

                  <div className='row'>
                    <div class="form-group col-md-6">
                      <label>Name</label>
                      <input type="text" name="name" value={this.state.itemName} placeholder="john etc" required class="form-control" onChange={(e) => this.setState({ itemName: e.target.value })}></input>
                    </div>
                    <div class="form-group col-md-6">
                      <label>Name Arabic</label>
                      <input type="text" name="name" value={this.state.itemNameArabic} placeholder="john etc" required class="form-control" onChange={(e) => this.setState({ itemNameArabic: e.target.value })}></input>
                    </div>
                  </div>
                  <div className='row' >
                    <div class="form-group col-md-6">
                      <label>Price</label>
                      <input type="number" name="name" value={this.state.itemPrice} placeholder="Enter Price" required class="form-control" onChange={(e) => this.setState({ itemPrice: e.target.value })}></input>
                    </div>
                    <div class="form-group col-md-6">
                      <label>Category</label>
                      <select name="name" className="form-control" value={this.state.categoryID} onChange={(e) => this.setState({ categoryID: e.target.value })}  >
                        {
                          this.props.categories.map((cat, index) =>
                            <option key={index} value={cat.categoryID}>{cat.categoryName}</option>
                          )
                        }
                      </select>
                    </div>
                  </div>
                  <div className='row' >
                    <div class="form-group col-md-6">
                      <label>Description</label>
                      <textarea name="description" required value={this.state.description} class="form-control" onChange={(e) => this.setState({ description: e.target.value })} cols="6" rows="6"></textarea>
                    </div>
                    <div class="form-group col-md-6">
                      <label>Description Arabic</label>
                      <textarea name="description" required value={this.state.descriptionArabic} class="form-control" onChange={(e) => this.setState({ descriptionArabic: e.target.value })} cols="6" rows="6"></textarea>
                    </div>
                  </div>


                  <div class="form-group" style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ margin: 0, marginRight: 5 }}>Is Featured :  </label>
                    <input type='checkbox' style={{ height: 20, width: 20 }} name="description" checked={this.state.isFeatured} onChange={(e) => this.setState({ isFeatured: !this.state.isFeatured })} />
                  </div>
                  <div class="form-group">
                    <label htmlFor="file-loader">Select Image</label>
                    <input maxLength='10' disabled value={this.state.imgUrl?.name ? this.state.imgUrl.name : this.state.firebaseLink} class="input form-control lenght" ></input>
                    <input style={{ display: 'none' }} id="file-loader" type="file" class="input form-control" name="category_bottle" accept="image/*" onChange={(e) => this.setState({ imgUrl: e.target.files[0], firebaseLink: '' })}></input>
                  </div>
                  <button type="submit" onSubmit={(e) => e.preventDefault()} class="btn btn-success">{this.props.loading ? <Loading color="#fffa" /> : "Save"}</button>
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
    loading: state.globalReducer.loading,
  }
}
const mapDispatch = dispatch => {
  return {
    setLoading: bol => dispatch(set_loading(bol)),
    _getItems: () => dispatch(_getItems()),
  }
}
export default connect(mapState, mapDispatch)(AddItem)
