import React from 'react'
import '../css/home.css';
import Navbar from './Navbar'
// import main1 from '../assets/main1.png'
// import bgimg1 from '../assets/bgImg1.svg'
import Footer from './Footer';
// import main2 from '../assets/main2.png'
// import OurProducts from './OurProducts'
import Blogs from './Blogs'
import blogarrow from '../assets/blogarrow.png'
// import AskQuestions from './AskQuestions';
class BlogPage extends React.Component {
    render() {
        return (
            <div style={{ position: 'relative', width: '100%' }}>
                {/* <img className="bgimg-1" src={bgimg1} alt="" /> */}

                <Navbar />
                <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', width: '100%', flexDirection: 'column' }}>
                    {/* <span className="section-products-h1 mt-5" style={{ zIndex: 20, position: 'relative', textAlign: 'center', fontWeight: 600, marginBottom: 30 }}>Blogs and News</span> */}
                    {
                        Array(1).fill().map((item, index) =>
                            <Blogs blogpage />
                        )
                    }
                    {/* <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <button onClick={() => window.location.href="/BlogPage"}  className="all-blogs-btn" >All Blogs  <img src={blogarrow} height="10px" width="10px" alt="" /> </button>

                    </div> */}
                </div>

                <Footer />
            </div>
        )
    }

};
export default BlogPage
