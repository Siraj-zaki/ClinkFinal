import '../css/home.css';
import React from 'react'
import Navbar from './Navbar'
import main1 from '../assets/main1.png'
import Footer from './Footer';
import main2 from '../assets/main2.png'
import OurProducts from './OurProducts'
import blogarrow from '../assets/blogarrow.png'
import Blogs from './Blogs'
import AskQuestions from './AskQuestions';
import { connect } from 'react-redux';

class Home extends React.Component {


  constructor(props) {
    super(props);
    this.state = {

      toggler: 1

    };
    console.log(this.props.cardItems);
  }


  render() {
    return (
      <div className="Home bgimg-1" style={{ position: 'relative' }}>
        {
          this.state.toggler === 1 ?
            <>
              <div ani={this.state.toggler} className="menu alert-new" style={{ alignItems: 'center', width: '50%', height: '60%' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "80%", flexDirection: 'column' }} >
                  <li className="menu-li" style={{ fontSize: "6rem" }}>Hey !</li>
                  <li className="menu-li" style={{ fontSize: "5rem" }}>WE GOTTA ASK</li>
                  <li className="menu-li" style={{ fontSize: "4rem" }}>ARE YOU 21 OR ABOVE</li>
                  <div className="new-grid">
                    <button className="signupbtn btn-2-new" style={{ color: 'white', border: '1px solid white ' }} onClick={() => window.close()} >No , Leave</button>
                    <button onClick={() => this.setState({ toggler: 0 })} className="signupbtn btn-1-new">Yes I am</button>

                  </div>
                </div>
              </div>
              <div ani={this.state.toggler} className="menu-back">

              </div>
            </>
            :
            null
        }
        {/* <img className="bgimg-1" src={bgimg1} alt="" /> */}
        <Navbar />
        <div className="section-main">
          <div className="section-1">
            <div className="left-side">
              <span className="section-left-side-h1">Time to Clink it up</span>
              <p className="section-left-side-p">Every celebration deserves a clink! Have your favorite Alcohol delivered to you instantly with Clink Delivery we provide you with . </p>
              <button className="section-left-side-btn" onClick={() => window.location.href = "/Products"} >Products</button>
            </div>
            <div className="right-side">
              <img className="img-responsive" src={main1} alt="" width="100%" />
            </div>
          </div>
          <div className="section-1">
            <div className="left-side-new">
              <img className="img-responsive" src={main2} alt="" width="100%" />
            </div>
            <div className="right-side-new">
              <span className="section-left-side-h1">About <span className="font"> Clink</span></span>
              <p className="section-left-side-p">Clink Delivery offers safe and convenient alcohol beverage delivery straight to your door. Clink Delivery provides a wide selection of your favorite beverages with low prices of a local convenience store . </p>
              <button className="section-left-side-btn" onClick={() => window.location.href = "/Products"} >Products</button>
            </div>
          </div>
        </div>
        <OurProducts />
        <AskQuestions />
        <Blogs />
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button className="all-blogs-btn" onClick={() => window.location.href = "/BlogPage"}  >All Blogs  <img src={blogarrow} height="10px" width="10px" alt="" /> </button>

        </div>
        <Footer />


      </div>
    )
  }

};
const mapStateToProps = (cardItems) => {
  return cardItems;
};
export default connect(mapStateToProps)(Home);
