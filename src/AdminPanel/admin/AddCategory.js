import React from "react";
import '../styles/adminlte.min.css'
import '../styles/dataTables.bootstrap4.min.css'
import '../styles/responsive.bootstrap4.min.css'
import '../styles/indexNew.css'
import ResponsiveDrawer from './ResponsiveDrawer'
import { Alert } from '@material-ui/lab';
import { connect } from "react-redux";
import { set_loading } from "../Store/actions/globalActions";
import firebase from 'firebase'
import api from "../services/api";
import { _getCategories } from "../Store/middlewares/appMiddleware";
import { Loading } from '../components/Icons'
import { ProgressBar } from 'react-bootstrap'

class AddCategory extends React.Component {
    state = {
        categoryName: "",
        categoryNameArabic: "",
        categoryDescription: "",
        categoryDescriptionArabic: "",
        categoryImage: "",
        message: '',
        firebaseLink: '',
        progress: 0, edit: false,
    }

    componentDidMount() {
        const search = this.props.location.search; // returns the URL query String
        const params = new URLSearchParams(search);
        const id = parseInt(params.get('id'));
        if (id) {
            let item = this.props.categories.filter(c => c.categoryID === id)
            item = item[0];

            this.setState({
                categoryName: item.categoryName, categoryNameArabic: item.categoryNameArabic,
                categoryDescription: item.categoryDescription,
                categoryDescriptionArabic: item.categoryDescriptionArabic,
                categoryID: item.categoryID, firebaseLink: item.categoryImage, edit: true,
            })
        }
    }

    uploadHandler = (e) => {
        e.preventDefault();
        this.setState({ message: false })
        if (this.props.loading)
            return;

        if (this.state.firebaseLink) {
            return this.addCategory(this.state.firebaseLink)
        }

        if (!this.state.categoryImage) {
            return alert("please selecet a image")
        }

        this.props.setLoading(true)
        let file = this.state.categoryImage
        let name = this.state.categoryName
        let dir = 'category'
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
                    t.addCategory(url)
                })
        });


    }

    addCategory = async (url) => {
        this.props.setLoading(true)
        await this.setState({ firebaseLink: url })
        let category = {
            categoryID: this.state.categoryID,
            categoryName: this.state.categoryName,
           
            categoryDescription: this.state.categoryDescription,
            
            categoryImage: this.state.firebaseLink,
        }

        let res;

        if (this.state.edit) {
            res = await api.editCategory(this.props.token, category)
        }
        else {

            res = await api.addCategory(this.props.token, category)
        }
        if (res) {
            this.setState({ message: 'Operation successfull' })
            await this.props._getCategory()
            if (this.state.edit) {
                window.location.reload()
            }
        }
        this.setState({ progress: 0 })
        this.props.setLoading(false)
    }

    render() {


        return (
            <div className="dashboard">
                <ResponsiveDrawer />
                <section class="content-admin" style={{ paddingTop: 100, position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, width: '100%' }}>
                        <ProgressBar now={this.state.progress} style={{ opacity: this.state.progress, height: 5 }} />
                    </div>

                    {
                        this.state.message &&
                        <div style={{ position: 'absolute', top: 0 }}>
                            <Alert onClose={() => this.setState({ message: false })}>{this.state.message}</Alert>
                        </div>
                    }
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-12">
                                <form onSubmit={this.uploadHandler} >
                                    <input type="hidden" name="_token" value="hrxeTL0t5hnBVb8Q3Q4vTc42CXU88qyd320Luzkv"></input>
                                    <div className="row">
                                        <div class="form-group col-md-5">
                                            <label>Category Name</label>
                                            <input type="text" name="name" value={this.state.categoryName} placeholder="john etc" required class="form-control" onChange={(e) => this.setState({ categoryName: e.target.value })}></input>


                                        </div>
                                      
                                    </div>
                                    <div className='row'>
                                        <div class="form-group col-md-5">
                                            <label>Description</label>
                                            <textarea name="description" required value={this.state.categoryDescription} class="form-control" onChange={(e) => this.setState({ categoryDescription: e.target.value })} cols="6" rows="6"></textarea>
                                        </div>
                                       
                                    </div>
                                    <div class="form-group">
                                        <label htmlFor="file-loader">Select Image</label>
                                        <input maxLength='10' disabled value={this.state.categoryImage?.name ? this.state.categoryImage.name : this.state.firebaseLink} class="input form-control lenght" ></input>
                                        <input style={{ display: 'none' }} id="file-loader" type="file" class="input form-control" name="category_bottle" accept="image/*" onChange={(e) => this.setState({ categoryImage: e.target.files[0], firebaseLink: '' })}></input>
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
        loading: state.globalReducer.loading,
        categories: state.appReducer.categories,
    }
}
const mapDispatch = dispatch => {
    return {
        setLoading: bol => dispatch(set_loading(bol)),
        _getCategory: () => dispatch(_getCategories())
    }
}

export default connect(mapState, mapDispatch)(AddCategory)