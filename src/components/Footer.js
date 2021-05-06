import React from 'react'
import youtube from '../assets/youtube.png'
import instagram from '../assets/instagram.png'
import linkedin from '../assets/linkedin.png'
import facebook from '../assets/facebook.png'
import tele from '../assets/tele.png'
import whatsapp from '../assets/whatsapp.png'
import Logo from './Logo'
import '../css/footer.css'
class Footer extends React.Component {
    render() {
        return (
            <div className="footer-img">
                <div style={{ padding: '11rem' }}>

                    <div className="footer">
                        <div className="footer-top">
                            <div style={{ marginTop: 50 }} className="basic-style footer-top-left">
                                <Logo />
                                <span className="footer-top-left-heading">Social Media</span>
                                <div className="footer-icons">
                                    <img className="ico-footer" src={youtube} alt="" />
                                    <img className="ico-footer" src={instagram} alt="" />
                                    <img className="ico-footer" src={linkedin} alt="" />
                                    <img className="ico-footer" src={facebook} alt="" />
                                </div>
                            </div>
                            <div style={{ marginTop: 50 }} className=" basic-style footer-top-center">
                                <div>
                                    <label style={{ position: 'absolute' }} htmlFor="telephone"><img src={tele} alt="" /></label>
                                    <input className="footer-input input-1" type="number" id="telephone" placeholder="xxxxxxxx" />
                                </div>
                                <span className="or">or</span>
                                <div>
                                    <label style={{ position: 'absolute' }} htmlFor="telephone"><img src={whatsapp} alt="" /></label>
                                    <input className="footer-input input-2" type="number" id="telephone" placeholder="xxxxxxxx" />
                                </div>

                            </div>
                            <div style={{ marginTop: 50 }} className=" basic-style footer-top-right">
                                <span style={{ marginTop: 20 }} className="footer-heading">Be a part of clink</span>
                                <span style={{ marginTop: 20 }} className="footer-p">Enter your email and get new about
                                offers and products.
                        </span>
                                <div style={{ marginTop: 20 }} style={{ position: 'relative' }}>
                                    <button className="footer-btn" style={{ position: 'absolute', right: 0, marginTop: 20, zIndex: 20 }}>Enter</button>
                                    <input style={{ marginTop: 20 }} className="footer-input input-3" type="email" id="email" placeholder="xxxxxxxx" />
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default Footer;