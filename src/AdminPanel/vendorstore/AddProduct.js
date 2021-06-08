import React from "react";

import '../styles/adminlte.min.css'
import '../styles/dataTables.bootstrap4.min.css'
import '../styles/responsive.bootstrap4.min.css'
import '../styles/indexNew.css'
import firebase from 'firebase'
import { connect } from "react-redux";
import { _getProduct } from '../Store/middlewares/appMiddleware'
import { set_loading } from '../Store/actions/globalActions'
import api from "../services/api";
import { Loading } from '../components/Icons'
import ResponsiveDrawer from "./../admin/ResponsiveDrawer.js";

import { ProgressBar } from 'react-bootstrap'

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    console.log('categ', this.props);
    this.state = {
      itemID: '',
      itemName: '',
      itemPrice: '',
      description: '',
      imgUrl: '',
      categoryID: '',
      isFeatured: false,
      categories: [],
      firebaseLink: '',
      storeId: this.props.user.user_ID,
      data: [],
      unit_id: 0,
      progress: 0,
      itemDetails: [{ itemUnit: '', itemPrice: '', cvr: '' }],
      loading: true,
      edit: false,
    }
  }

  async componentDidMount() {
    console.log(this.props.categories);
    console.log(this.props.user);

    let res3 = await api.getCategory()
    console.log(res3);
    this.setState({ categories: res3.result })


    let res2 = await api.getUnit();


    this.setState({ data: res2.result })



    console.log(this.state.data);





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


  weightHandler = (number, index) => {
    let temp = this.state.itemDetails;
    temp[index].itemUnit = number
    this.setState({ itemDetails: temp })
  }
  priceHandler = (number, index) => {
    let temp = this.state.itemDetails;
    temp[index].itemPrice = number
    this.setState({ itemDetails: temp })
  }

  cvrHandler = (number, index) => {
    let temp = this.state.itemDetails;
    temp[index].cvr = number
    this.setState({ itemDetails: temp })
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
    await this.setState({ storeId: this.props.user.user_ID })

    let item = {
      itemName: this.state.itemName,
      // itemNameArabic: this.state.itemNameArabic,
      description: this.state.description,
      // descriptionArabic: this.state.descriptionArabic,
      categoryID: this.state.categoryID,
      imgUrl: this.state.firebaseLink,
      itemID: this.state.itemID,
      storeId: this.state.storeId,
      unit_id: this.state.unit_id,

    }
    console.log(item)
    let res;

    if (this.state.edit) {
      res = await api.editProduct(this.props.token, item)
    } else {
      res = await api.addProduct(this.props.token, item)
    }

    if (res) {
      this.state.itemDetails.forEach(async (item, index) => {
        // if (JSON.stringify(item) !== JSON.stringify(this.state.prevDetails[index])) {
        let body = {
          itemPrice: item.itemPrice,
          itemID: res.id,
          itemUnit: item.itemUnit,
          cvr: item.cvr,


        }
        console.log(body)
        let res1 = await api.addItemWeight(this.props.token, body)
        // }
        // else {
        //   console.log('value not changed',index)
        // }

      })
      alert('opertion successfull')
      await this.props._getProduct()
      window.location.reload();

    }
    this.props.setLoading(false)
    this.setState({ progress: 0 })
  }

  render() {
    console.log(this.state.itemDetails);
    const newinput = () => {
      let temp = this.state.itemDetails
      temp.push({ itemUnit: '', itemPrice: '', cvr: '' })
      this.setState({ itemDetails: temp })
    }
    const deleteinput = () => {
      let temp = this.state.itemDetails
      temp.pop()
      this.setState({ itemDetails: temp })
    }


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
                      <label>Category</label>
                      <select name="name" className="form-control" value={this.state.categoryID} onChange={(e) => this.setState({ categoryID: e.target.value })} required  >
                        {

                          this.state.categories.map((cat, index) =>
                            <option key={index} value={cat.id}>{cat.categoryName}</option>
                          )
                        }
                      </select>
                    </div>
                    {/* <div class="form-group col-md-6">
                      <label>Unit</label>
                      <select name="name" className="form-control" value={this.state.unit_id} onChange={(e) => this.setState({ unit_id: e.target.value })}  >
                        {
                          this.state.data.map((cat, index) =>
                            <option key={index} value={cat.id}>{cat.unit}</option>
                          )
                        }
                      </select>
                    </div> */}
                    {/* <div class="form-group col-md-6">
                      <label>Name Arabic</label>
                      <input type="text" name="name" value={this.state.itemNameArabic} placeholder="john etc" required class="form-control" onChange={(e) => this.setState({ itemNameArabic: e.target.value })}></input>
                    </div> */}
                  </div>
                  <div className='row' >

                    <div class="form-group col-md-6">
                      <label>Description</label>
                      <textarea name="description" required value={this.state.description} class="form-control" onChange={(e) => this.setState({ description: e.target.value })} cols="6" rows="6"></textarea>
                    </div>

                  </div>
                  <div className='row' >
                    {/* <div class="form-group col-md-6">
                      <label>Description</label>
                      <textarea name="description" required value={this.state.description} class="form-control" onChange={(e) => this.setState({ description: e.target.value })} cols="6" rows="6"></textarea>
                    </div> */}
                    {/* <div class="form-group col-md-6">
                      <label>Description Arabic</label>
                      <textarea name="description" required value={this.state.descriptionArabic} class="form-control" onChange={(e) => this.setState({ descriptionArabic: e.target.value })} cols="6" rows="6"></textarea>
                    </div> */}
                  </div>


                  {/* <div class="form-group" style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ margin: 0, marginRight: 5 }}>Is Featured :  </label>
                    <input type='checkbox' style={{ height: 20, width: 20 }} name="description" checked={this.state.isFeatured} onChange={(e) => this.setState({ isFeatured: !this.state.isFeatured })} />
                  </div> */}
                  <div class="form-group">
                    <label htmlFor="file-loader">Select Image <label htmlFor="file-loader" type="button" className="btn-success" style={{ padding: 10, borderRadius: 5 }}>Add Image</label></label>
                    {/* <input required maxLength='10' disabled value={this.state.imgUrl?.name ? this.state.imgUrl.name : this.state.firebaseLink} class="input form-control lenght" ></input>
                    <input required style={{ display: 'none' }} id="file-loader" type="file" class="input form-control" name="category_bottle" accept="image/*" onChange={(e) => this.setState({ imgUrl: e.target.files[0], firebaseLink: '' })}></input> */}
                    <input required className="form-control" type="file" placeholder="Please Select Image"
                      id="file-loader"
                      // onChange={(e) => this.setState({ logo: e.target.files[0] })}
                      accept="image/*" onChange={(e) => this.setState({ imgUrl: e.target.files[0], firebaseLink: '' })}
                    />
                  </div>
                  {
                    this.state.itemDetails.map((item, index) =>
                      <div key={index} class="form-group col-md-6 d-flex flex-wrap">
                        <div class="form-group col-md-3">
                          <label>Unit</label>
                          <select required placeholder="Please Select Unit" name="name" className="form-control" value={this.state.itemDetails[index].itemUnit} onChange={val => this.weightHandler(val.target.value, index)}  >

                            {


                              this.state.data.map((cat, index) =>

                                <option key={index} value={cat.id}>{cat.unit}</option>
                              )
                            }
                          </select>

                        </div>
                        <div class="form-group col-md-3" style={{ flexDirection: 'row' }}>
                          <label>Price</label>
                          <input type="number" name="" id="" value={item.itemPrice} placeholder="Enter Price" required class="form-control"
                            onChange={val => this.priceHandler(val.target.value, index)}
                          ></input>
                        </div>
                        <div class="form-group col-md-3" style={{ flexDirection: 'row' }}>
                          <label>CVR</label>
                          <input type="number" name="" id="" value={item.crv} placeholder="Enter CRV" required class="form-control"
                            onChange={val => this.cvrHandler(val.target.value, index)}
                          ></input>
                        </div>
                        <div className="new-input-style" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          {this.state.edit == false ?
                            <p onClick={newinput} style={{ margin: 8, marginTop: 8, visibility: this.state.itemDetails.length - 1 === index ? "visible" : "hidden" }}>Add    </p>
                            // <img src={img1} onClick={newinput} alt="" style={{ margin: 8, marginTop: 8, visibility: this.state.itemDetails.length - 1 === index ? "visible" : "hidden" }} />
                            : null}
                          {this.state.edit == false ?



                            index !== 0 &&

                            <p onClick={deleteinput}>  Delete </p>

                            // <img src={img2} onClick={deleteinput} alt="" />
                            : null
                          }
                        </div>
                      </div>
                    )}
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
    user: state.authReducer.user,
    loading: state.globalReducer.loading,
  }
}
const mapDispatch = dispatch => {
  return {
    setLoading: bol => dispatch(set_loading(bol)),
    _getProduct: () => dispatch(_getProduct()),
  }
}
export default connect(mapState, mapDispatch)(AddProduct)
