import React from "react";

import '../styles/adminlte.min.css'
import '../styles/dataTables.bootstrap4.min.css'
import '../styles/responsive.bootstrap4.min.css'
import Datetime from 'react-datetime';
import '../styles/indexNew.css'
import firebase from 'firebase'
import "react-datetime/css/react-datetime.css";
import { connect } from "react-redux";
import { _getItems } from '../Store/middlewares/appMiddleware'
import { set_loading } from '../Store/actions/globalActions'
import api from "../services/api";
import { Loading } from '../components/Icons'
import ResponsiveDrawer from "./ResponsiveDrawer";
import { ProgressBar } from 'react-bootstrap'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import moment from "moment";

class AddStore extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemName: '',
      selectadd: '',
      emailAddress: '',
      street: '',
      logo: '',
      radius: '',
      storeContact: '',
      startAcceptingTime: '',
      endAcceptingTime: '',
      progress: 0,
      loading: true,
      edit: false,
      address: '',
      lat: '',
      long: '',
      country: '',
      state: '',
      city: '',
      zipcode: '',
      password: '',
      completeAddress: [],
      allDays: [],
      workingDays: [
        {
          days: "Monday",
          checked: true,
        },
        {
          days: "Tuesday",
          checked: true,
        },
        {
          days: "Wednesday",
          checked: true,
        },
        {
          days: "Thursday",
          checked: true,
        },
        {
          days: "Friday",
          checked: true,
        },
        {
          days: "Saturday",
          checked: true,
        },
        {
          days: "Sunday",
          checked: false,
        },
      ]

    }

    this.handleSelect = this.handleSelect.bind(
      this
    );
    this.handleChange = this.handleChange.bind(
      this
    );
  }
  handleDays = (e, index) => {
    let temp = this.state.workingDays
    temp[index].checked = !temp[index].checked

  }
  allDays = () => {
    let temp1 = this.state.workingDays
    let temp2 = this.state.allDays

    temp1.filter(day => day.checked === true); {
      this.setState({ workingDays: temp1 })
      temp2 = this.state.workingDays
    }
    alert(JSON.stringify(this.state.workingDays))
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


    if (!this.state.imgUrl) {
      return alert("please selecet a image")
    }

    this.props.setLoading(true)
    let file = this.state.logo
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


  addItem = async (e, url) => {
    e.preventDefault()
    this.props.setLoading(true)
    await this.setState({ firebaseLink: url })

    let store = {
      itemName: this.state.itemName,
      emailAddress: this.state.emailAddress,
      password: this.state.password,
      longitude: this.state.long,
      latitude: this.state.lat,
      street: this.state.address,
      logo: this.state.logo,
      radius: this.state.radius,
      storeContact: this.state.storeContact,
      startAcceptingTime: this.state.startAcceptingTime,
      endAcceptingTime: this.state.endAcceptingTime,
      address: this.state.address,
      country: this.state.country,
      state: this.state.state,
      city: this.state.city,
      zipcode: this.state.zipcode,

    }
    let res;

    console.log(store);
    try {

      res = await api.addStore(this.props.token, store)
      console.log(res);
      this.props.setLoading(false)
    } catch (err) {


      // console.log(err.data.data.message);
    }



  }

  handleSelect = address => {
    console.log('test hndlseletct', address);
    this.setState({ selectadd: address })
    geocodeByAddress(address)
      .then(results => {
        let country
        let state
        let city
        let zipcode
        console.log(address)
        this.state.completeAddress.push(results[0].formatted_address)
        console.log('resultc geocode', results)
        for (let i = 0; i < results[0].address_components.length; i++) {
          for (let j = 0; j < results[0].address_components[i].types.length; j++) {
            if (results[0].address_components[i].types[j] == "country")
              country = results[0].address_components[i].long_name
          }
        }
        for (let i = 0; i < results[0].address_components.length; i++) {
          for (let j = 0; j < results[0].address_components[i].types.length; j++) {
            if (results[0].address_components[i].types[j] == "administrative_area_level_1")
              state = results[0].address_components[i].long_name
          }
        }

        for (let i = 0; i < results[0].address_components.length; i++) {
          for (let j = 0; j < results[0].address_components[i].types.length; j++) {
            if (results[0].address_components[i].types[j] == "postal_code")
              zipcode = results[0].address_components[i].long_name
          }
        }
        for (let i = 0; i < results[0].address_components.length; i++) {
          for (let j = 0; j < results[0].address_components[i].types.length; j++) {
            if (results[0].address_components[i].types[j] == "administrative_area_level_3") {

              city = results[0].address_components[i].long_name
              console.log('city', city);
            } else if (results[0].address_components[i].types[j] == "political") {
              if (!city) {

                city = results[0].address_components[i].long_name
                console.log('city1', city);
              }

            }
            else if (results[0].address_components[i].types[j] == "locality") {
              city = results[0].address_components[i].long_name
              console.log('city2', city);

            }

          }
        }


        this.setState({
          country,
          state,
          city,
          zipcode,
          address: results.formatted_address
        })
        console.log(this.state.state);
        console.log(this.state.country);
        console.log(this.state.city);
        console.log('zipcode', this.state.zipcode);
        console.log(results);
        if (this.state.zipcode === undefined) {
          return alert("Please Enter Zip Code Manually")
        }


        getLatLng(results[0])
          .then(latLng => {
            console.log('Success', latLng)
            this.setState({ lat: latLng.lat })
            this.setState({ long: latLng.lng })
            console.log(this.state.lat);
            console.log(this.state.long);
          })
          .catch(error => console.error('Error', error));
      })
  };

  handleChange = (address) => {
    console.log('hndlechnge', this.handleSelect);

    this.setState({ address });
  };

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
                      <label>Name</label>
                      <input type="text" name="name" value={this.state.itemName} placeholder="john etc" required class="form-control" onChange={(e) => this.setState({ itemName: e.target.value })}></input>
                    </div>
                    <div class="form-group col-md-6">
                      <label>Email</label>
                      <input type="text" name="name" value={this.state.emailAddress} placeholder="test@mail.com" required class="form-control" onChange={(e) => this.setState({ emailAddress: e.target.value })}></input>
                    </div>
                  </div>
                  <div className='row' >
                    <div class="form-group col-md-6">
                      <label>Password</label>
                      <input type="Password" name="name" value={this.state.password} placeholder="Password" required class="form-control" onChange={(e) => this.setState({ password: e.target.value })}></input>
                    </div>



                    <div class="form-group col-md-6">
                      <label>Contact No</label>
                      <input type="number" name="name" value={this.state.storeContact} placeholder="Number" required class="form-control" onChange={(e) => this.setState({ storeContact: e.target.value })}></input>
                    </div>

                  </div>
                  <div className='row' >
                    <div class="form-group col-md-6">
                      <label>Starting Time</label>
                      <input type="text" name="name" value={this.state.startAcceptingTime} placeholder="start time" required class="form-control" onChange={(e) => this.setState({ startAcceptingTime: e.target.value })}></input>
                    </div>


                    <div class="form-group col-md-6">
                      <label>Ending Time</label>
                      <input type="text" name="name" value={this.state.endAcceptingTime} placeholder="end time" required class="form-control" onChange={(e) => this.setState({ endAcceptingTime: e.target.value })}></input>
                    </div>

                  </div>



                  <div class="form-group row">
                    <div class="form-group col-md-6">

                      <label htmlFor="file-loader">Select Image <label htmlFor="file-loader" type="button" className="btn-success" style={{ padding: 10, borderRadius: 5 }}>Add Image</label></label>
                      <input id="file-loader" required className="form-control" type="file" onChange={(e) => this.setState({ logo: e.target.files[0] })} />
                      {/* <input maxLength='10'  value={this.state.logo?.name} class="input form-control lenght" ></input>
                    <input style={{ display: 'none' }} type="file" multiple className="form-control"  id="customFile" onChange={(e) => this.setState({ logo: e.target.files[0] })}></input> */}
                    </div>
                    <div class="form-group col-md-6">

                      <label>Radius</label>
                      <input type="text" name="name" value={this.state.radius} placeholder="radius" required class="form-control" onChange={(e) => this.setState({ radius: e.target.value })}></input>
                    </div>
                  </div>


                  <div class="form-group row">
                    <div class="form-group col-md-12">

                      <PlacesAutocomplete
                        value={this.state.address}
                        onChange={this.handleChange}
                        onSelect={this.handleSelect}
                      >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                          <div>
                            <label>Address</label>
                            <br />

                            <input    {...getInputProps({
                              placeholder: 'Search Places ...',
                              className: 'location-search-input',
                            })} type="text" name="name" required class="form-control" ></input>

                            <div className="autocomplete-dropdown-container">
                              {loading && <div>Loading...</div>}
                              {suggestions.map(suggestion => {
                                const className = suggestion.active
                                  ? 'suggestion-item--active'
                                  : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                  <div
                                    {...getSuggestionItemProps(suggestion, {
                                      className,
                                      style,
                                    })}
                                  >
                                    <span>{suggestion.description}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </PlacesAutocomplete>

                    </div>
                  </div>
                  <div className='row' >
                    <div class="form-group col-md-6">
                      <label>Country</label>
                      <input type="text" name="name" value={this.state.country} placeholder="Address" required class="form-control" onChange={(e) => this.setState({ country: e.target.value })}></input>
                    </div>
                    <div class="form-group col-md-6">
                      <label>City</label>
                      <input type="text" name="name" value={this.state.city} placeholder="Address" required class="form-control" onChange={(e) => this.setState({ city: e.target.value })}></input>
                    </div>
                  </div>
                  <div className='row' >
                    <div class="form-group col-md-6">
                      <label>State</label>
                      <input type="text" name="name" value={this.state.state} placeholder="Address" required class="form-control" onChange={(e) => this.setState({ state: e.target.value })}></input>
                    </div>
                  </div>
                  <div className='row' >
                    <div class="form-group col-md-6">
                      <label>ZipCode</label>
                      <input type="text" name="name" value={this.state.zipcode} placeholder="zipcode" required class="form-control" onChange={(e) => this.setState({ zipcode: e.target.value })}></input>
                    </div>
                  </div>
                  <button type="button" class="btn btn-success mb-2 mt-2" data-toggle="modal" data-target="#exampleModalCenter">
                    Add Schedule
</button>
                  <br />
                  <button type="submit" class="btn btn-success">{this.props.loading ? <Loading color="#fffa" /> : "Save"}</button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <div style={{ width: '100%' }} className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Add Schedule</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <table id="example1" className="table table-bordered table-hover dataTable no-footer dtr-inline" role="grid" aria-describedby="example1_info">
                  <thead>
                    <tr role="row">
                      <th className='center' rowspan="1" colspan="1"  >Days</th>
                      <th className='center' rowspan="1" colspan="1"  >Starting Time</th>
                      <th className='center' rowspan="1" colspan="1"  >Ending Time</th>
                      <th className='center' rowspan="1" colspan="1">Working</th>

                    </tr>
                  </thead>
                  <tbody>

                    {this.state.workingDays.map((item, index) =>
                      <tr role="row" class="odd">
                        <td className='center' class="sorting_1">{item.days}</td>
                        <td className='center' class="sorting_1">
                          {/* <input type="datetime-local" name="" id="" /> */}
                          <Datetime timeFormat={moment().format('L')} value={"9:00 AM"} input />


                        </td>
                        <td className='center' class="sorting_1">
                          {/* <input type="datetime-local" name="" id="" /> */}
                          <Datetime timeFormat={moment().format('L')} value={"9:00 PM"} input />


                        </td>
                        <td className='center' class="sorting_1">
                          <input onClick={(e) => this.handleDays(e, index)} type="checkbox" defaultChecked={item.checked} name="" id="" />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" onClick={() => this.allDays()} class="btn btn-primary">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div >
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
export default connect(mapState, mapDispatch)(AddStore)
