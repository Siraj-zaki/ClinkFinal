import React from 'react'
import blogdetailimg from '../assets/blogdetailimg.png'
import youtube from '../assets/youtube.png'
import instagram from '../assets/instagram.png'
import linkedin from '../assets/linkedin.png'
import facebook from '../assets/facebook.png'
import Navbar from './Navbar'
import Footer from './Footer';
import greaterthan from '../assets/greaterthan.png'
import '../css/blogdetail.css'

class BlogDetail extends React.Component {
    render() {
        return (
            <div style={{ width: '100%' }}>
                <Navbar />
                <div className="blog-detail">
                    <div className="blog-left-side">
                        <div className="left-side-top-side" style={{ textAlign: 'left' }}>
                            <div style={{cursor:'pointer'}} className="m-5" onClick={() => window.location.href="/BlogPage" } >
                                <img src={greaterthan} alt="" />
                                <span className="blog-heading ml-5" style={{ fontSize: 15 }} >See All Blogs</span>
                            </div>
                            <div className="m-5">
                                <span className="blog-heading mr-5 " style={{ fontSize: 15 }} >Share</span>
                                <a href="#">
                                    <img className="ico-footer" src={youtube} alt="" />
                                </a>
                                <a href="#">
                                    <img className="ico-footer" src={instagram} alt="" />
                                </a>
                                <a href="#">
                                    <img className="ico-footer" src={linkedin} alt="" />
                                </a>
                                <a href="#">
                                    <img className="ico-footer" src={facebook} alt="" />
                                </a>
                            </div>
                        </div>
                        <div className="left-side-center-side">
                            <p className="section-left-side-p " style={{ fontSize: '5.5rem', fontWeight: 'normal', textAlign: 'left' }}>Red wine a classy<br />
                                touch to evening
                                </p>
                        </div>
                        <div className="left-side-bottom-side">
                            <p className="section-left-side-p mt-1" style={{ textAlign: 'left', paddingRight: '6rem' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dapibus tristique sem in molestie. Phasellus ac justo et libero consectetur laoreet. Donec varius tellus sit amet justo faucibus lobortis. Nam vehicula eros sit amet porttitor lacinia. Donec ut ex eu magna mollis viverra non at metus. Cras ligula libero, pulvinar a elit ac, pellentesque sodales lacus. Donec augue nulla, pretium et aliquet at, pellentesque et turpis. Etiam ultricies porta pulvinar. Mauris nunc lorem, suscipit ut rhoncus ac, maximus ac libero. </p>
                        </div>

                    </div>
                    <div className="blog-right-side" style={{ width: "65rem", height: "50rem" }} >
                        <img src={blogdetailimg} width="100%" height="100%" alt="" />

                    </div>


                </div>
                <Footer />
            </div>
        )
    }
}
export default BlogDetail;