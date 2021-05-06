import React from 'react'
import bgImg2 from '../assets/bgImg2.png'
import tec1 from '../assets/tequila.png'
import tecquila from '../assets/tecquila.svg'
import tec2 from '../assets/whiskey.svg'
import tec3 from '../assets/vodka.svg'
import tec4 from '../assets/wine.svg'
import Carousel from 'react-bootstrap/Carousel'
import tec5 from '../assets/beer.svg'
import carouselimg from '../assets/carousel-img.png'
// import { Wine } from './Wine'
import carouselbottomimg from '../assets/carsouselbottomimg.png'
import '../css/ourproducts.css'
class OurProducts extends React.Component {
    render() {
        return (
            <div className="products bgimg-2" style={{ position: 'relative', display: 'flex', justifyContent: "center", alignItems: 'center' }} >
                {/* <img className="bgimg-2" src={bgImg2} alt="" /> */}
                <div className="section-products" style={{ display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'column', width: '100%' }}>
                    <span className="section-products-h1" style={{ zIndex: 20, position: 'relative' }}>Our <span style={{ color: " #a10948" }}>Products</span></span>
                    <div className="css-grid">
                        <div style={{ width: "33rem", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={tecquila} width='90%' alt="" />
                            {/* <Wine /> */}
                        </div>
                        <div style={{ width: "33rem", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={tec2} width='90%' alt="" />
                        </div>
                        <div style={{ width: "33rem", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={tec3} width='90%' alt="" />
                        </div>
                        <div style={{ width: '33rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={tec4} width='90%' alt="" />
                        </div>
                        <div style={{ width: '33rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={tec5} width='90%' alt="" />
                        </div>
                    </div>
                    <div>
                        <span className="section-products-h1" style={{ zIndex: 20, position: 'relative' }}>Our <span style={{ color: " #a10948" }}>Reputation</span></span>
                        <Carousel className="carousel-main-div" style={{ position: 'relative' }}>
                            <Carousel.Item className="carousel-item-new" interval={1000}>
                                <div className="carousel-div">
                                    <img src={carouselimg} alt="" />
                                    <p className="carousel-p">Lorem ipsum dolor sit amet,
                                    consetetur sadipscing elitr, sed diam nonumy eirmod
                                    tempor invidunt ut labore et dolore magna aliquyam erat,
                                    sed diam voluptua. At vero eos et accusam et justo duo
                                    dolores et ea rebum. Stet clita kasd gubergren, no sea
                                 takimata sanctus</p>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item interval={500}>
                                <div className="carousel-div">
                                    <img src={carouselimg} alt="" />
                                    <p className="carousel-p">Lorem ipsum dolor sit amet,
                                    consetetur sadipscing elitr, sed diam nonumy eirmod
                                    tempor invidunt ut labore et dolore magna aliquyam erat,
                                    sed diam voluptua. At vero eos et accusam et justo duo
                                    dolores et ea rebum. Stet clita kasd gubergren, no sea
                                 takimata sanctus</p>
                                </div>
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="carousel-div">
                                    <img src={carouselimg} alt="" />
                                    <p className="carousel-p">Lorem ipsum dolor sit amet,
                                    consetetur sadipscing elitr, sed diam nonumy eirmod
                                    tempor invidunt ut labore et dolore magna aliquyam erat,
                                    sed diam voluptua. At vero eos et accusam et justo duo
                                    dolores et ea rebum. Stet clita kasd gubergren, no sea
                                 takimata sanctus</p>
                                </div>
                            </Carousel.Item>

                        </Carousel>
                        <div className="new-carousel-img">
                            <img src={carouselbottomimg} alt="" />
                        </div>
                        <span className="custom-text">Anjum Babu</span>
                    </div>
                </div>
            </div>

        )
    }
}
export default OurProducts