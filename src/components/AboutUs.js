import '../css/home.css';
import React from 'react'
import Navbar from './Navbar'
import liquor from '../assets/liquorstore.png'
import delivery from '../assets/delivery.png'
import experience from '../assets/experience.png'
import clink from '../assets/clink.png'
import aboutusimg from '../assets/aboutusimg.png'
import '../css/aboutus.css'

import Footer from './Footer';

class Home extends React.Component {

    render() {
        return (
            <div className="Home bgimg-1" style={{ position: 'relative' }}>
                {/* <img className="bgimg-1" src={bgimg1} alt="" /> */}
                <Navbar />
                <div className="section-main">
                    <div className="section-1">
                        <div className="left-side">
                            <span className="section-left-side-h1 new-color">Knock Knock !</span>
                            <span className="section-left-side-h1 new-color">Who's There</span>
                            <span style={{ height: '6rem', width: '20rem', marginTop: 40 }}>
                                <img width="100%" height="100%" src={clink} alt="" />
                            </span>
                            <p className="section-left-side-p mt-5">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus </p>
                        </div>
                        <div className="right-side">
                            <img className="img-responsive" src={aboutusimg} alt="" width="100%" />
                        </div>
                    </div>
                </div>
                <div className="about-us">
                    <div className="about-us-grid">
                        <div className="same-class about-us-left-side">
                            <span style={{ width: '7rem', minWidth: '50px' }}>
                                <img width="100%" height="100%" src={liquor} alt="" />
                            </span>
                            <span className="section-left-side-h1 new-color" style={{ fontSize: '3.5rem', marginTop: 10 }}> liquor Store Service</span>
                            <p className="section-left-side-p " style={{ fontSize: '2rem', fontWeight: 'normal', marginLeft: '13rem' }}>You Deserve “At your Fingertips”</p>

                        </div>
                        <div className="same-class about-us-center-side">
                            <span style={{ width: '7rem', minWidth: '50px' }}>
                                <img width="100%" height="100%" src={delivery} alt="" />
                            </span>
                            <span className="section-left-side-h1 new-color" style={{ fontSize: '3.5rem', marginTop: 10 }}> Delivery</span>
                            <p className="section-left-side-p " style={{ fontSize: '2rem', fontWeight: 'normal', marginLeft: '13rem' }}>On Demand</p>

                        </div>
                        <div className="same-class about-us-right-side">
                            <span style={{ width: '7rem', minWidth: '50px' }}>
                                <img width="100%" height="100%" src={experience} alt="" />
                            </span>
                            <span className="section-left-side-h1 new-color" style={{ fontSize: '3.5rem', marginTop: 10 }}> Experience</span>
                            <p className="section-left-side-p " style={{ fontSize: '2rem', fontWeight: 'normal', marginLeft: '13rem' }}>The Best Liquors “Ahhhhh, Refreshing!”</p>
                        </div>
                    </div>
                    <p className="section-left-side-p " style={{ fontSize: '6.5rem', fontWeight: 'bold', marginTop: '10rem' }}>Who are We</p>
                    <p className="section-left-side-p mt-5" style={{ width: '70rem', textAlign: 'center' }}>
                        At Clink Delivery, we bring your local liquor store favorites right to your fingertips. Clink Delivery is here to revolutionize the way you buy liquor, by bringing you the wide variety, convenience, and shelf prices a liquor store offers directly to you. We directly work with all liquor store listed on our site to guarantee the quality service you deserve. What sets us apart from the other delivery services is that we don’t charge stores for our service so that they don’t have to charge you!
 </p>
                    <p className="section-left-side-p mt-5" style={{ width: '70rem', textAlign: 'center' }}>Clink Delivery was founded in 2020 in response to big corporate delivery companies increasing product prices and delivery fees at the expense of both small businesses and average customers. Our mission is to provide local small businesses the ability and the resources to adapt to the new ecommerce business style without having to compromise the revenue that fuels their existence.</p>
                    <p className="section-left-side-p mt-5" style={{ width: '70rem', textAlign: 'center' }}>Clink Delivery, a celebration for all!
</p>

                </div>
                <Footer />
            </div>
        )
    }

};
export default Home;
