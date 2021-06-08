import React from 'react'
import { connect } from 'react-redux';
import Logo from './../assets/Logo'
import { _login } from '../Store/middlewares/authMiddleware';
import { Loading } from '../components//Icons'
import '../styles/new.css'
import { set_loading } from '../Store/actions/globalActions';
import api from '../services/api';

class Login extends React.Component {
    state = {
        email: '',
        password: "",
        checkbox: '',
        loading: true,
    }

    login = async (e) => {
      
        console.log(this.state);
        e.preventDefault()

        this.props.setLoading(true)
        let res = await this.props._login(this.state.email.trim(), this.state.password.trim())
        let res1 = await api.loginUser(this.state.email, this.state.password);
        console.log(res1.data.type);
        console.log(this.props.user.type);
        if (res1.data.type) {
            
                
                            if (res1.data.type=='admin') {
                                window.location.href = "/admin/Orders" 
                          
                               
                            }
                            else if(res1.data.type=='store') {
                                window.location.href = "/store/getProduct" 
                                // window.history.back()
                
                            }
                
            
        }
        this.props.setLoading(false)
    }

    render() {
        return (
            <div className="login">
                <div className="login- -light">
                    <nav className=" -expand-lg -light">
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}} className="col-sm-6 img-div">
                        <Logo />
                        </div>
                    </nav>
                </div>
                <div class="global-container" style={{ background: 'rgba(155,146,146)', display: 'flex', alignItems:'center',minHeight:"100%", justifyContent: 'center' }}>
                    <div class="card login-form"  >
                        <div class="card-body">
                            <h3 class="card-title text-center">Log in </h3>
                            <div class="card-text">

                                {/* <div class="alert alert-danger alert-dismissible fade show" role="alert">Incorrect username or password.</div> */}
                                <form onSubmit={this.login}  >
                                    <div class="form-group">
                                        <label for="Email">Email address</label>
                                        <input value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} type="email" class="form-control form-control-sm" id="Email" aria-describedby="emailHelp" required />
                                    </div>
                                    <div class="form-group">
                                        <label for="password">Password</label>
                                        <a href="#" style={{ float: "right", fontSize: "12px" }}>Forgot password?</a>
                                        <input value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} type="password" class="form-control form-control-sm" id="password" required />
                                    </div>
                                    <button type="submit" style={{ backgroundColor: '#a10949' }} class="btn btn-primary btn-block">{this.props.loading ? <Loading color="#fffa" /> : "Sign in"}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = state => {
    return {
        user: state.authReducer.user,
        logged: state.authReducer.logged,
        loading: state.globalReducer.loading,
    }
}
const mapDispatch = dispatch => {
    return {
        _login: (email, pass) => dispatch(_login(email, pass)),
        setLoading: (bol) => dispatch(set_loading(bol)),
    }
}

export default connect(mapState, mapDispatch)(Login)