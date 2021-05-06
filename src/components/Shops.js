import '../css/home.css';
import React from 'react'
import googlemap from '../assets/google.svg'
import yandex from '../assets/yandex.svg'
import location from '../assets/location.svg'
// import location2 from '../assets/location2.svg'
import Navbar from './Navbar'
import Footer from './Footer';



class Shops extends React.Component {
    state = {
        toggler: 1,
        surName: "",
        email: '',
        subject: '',
        message: '',
    }
    render() {
        console.log(this.state);
        return (
            <div className="Home bgimg-1" style={{ position: 'relative', backgroundColor: 'white' }}>
                {/* <img className="bgimg-1" src={bgimg1} alt="" /> */}
                <Navbar />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '11rem', flexDirection: 'column' }} >
                    <div className="map w-100">
                        <div style={{ width: "100%" }}><iframe width="100%" height="600" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=12121%20magnolia%20boulevard+(Clink)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe></div>
                    </div>
                    <div className="map-locations"><button className="map-btn" ><img src={googlemap} alt="" /> Go to map </button> <button className="map-btn" style={{ backgroundColor: '#35345a' }} ><img src={yandex} alt="" /> Go to map </button></div>
                    <div className="our-shops" ><span className="our-shops-heading" >Our Shops:</span></div>
                    <div className="locations">
                        <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', width: 'auto' }} >
                            <img src={location} alt="" />
                            <div>
                                <a href="https://www.google.com/maps/place/Hughie's+Liquor/@34.1652179,-118.3992583,17z/data=!4m14!1m8!3m7!1s0x80c296091e23052d:0xc4631310f97ede02!2s12115+W+Magnolia+Blvd,+Valley+Village,+CA+91607,+USA!3b1!8m2!3d34.1653214!4d-118.397141!10e3!3m4!1s0x80c2960921dcd7ad:0xda31b08e82a9be02!8m2!3d34.1651235!4d-118.3976071" className="location-heading">Hughies Liquor
</a>
                                <p className="location-p">
                                    <a href="https://www.google.com/maps/place/Hughie's+Liquor/@34.1652179,-118.3992583,17z/data=!4m14!1m8!3m7!1s0x80c296091e23052d:0xc4631310f97ede02!2s12115+W+Magnolia+Blvd,+Valley+Village,+CA+91607,+USA!3b1!8m2!3d34.1653214!4d-118.397141!10e3!3m4!1s0x80c2960921dcd7ad:0xda31b08e82a9be02!8m2!3d34.1651235!4d-118.3976071" > 12121 Magnolia Blvd Valley Village, CA 91607</a>

                                    <br />
                                    <a href="https://www.google.com/maps/place/Hughie's+Liquor/@34.1652179,-118.3992583,17z/data=!4m14!1m8!3m7!1s0x80c296091e23052d:0xc4631310f97ede02!2s12115+W+Magnolia+Blvd,+Valley+Village,+CA+91607,+USA!3b1!8m2!3d34.1653214!4d-118.397141!10e3!3m4!1s0x80c2960921dcd7ad:0xda31b08e82a9be02!8m2!3d34.1651235!4d-118.3976071" >(818) 853-7733</a>
                                </p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', width: 'auto' }}>
                            <img src={location} alt="" />
                            <div>
                                <a href="https://www.google.com/maps/place/3801+W+Burbank+Blvd,+Burbank,+CA+91505,+USA/@34.1745264,-118.3538448,17z/data=!3m1!4b1!4m5!3m4!1s0x80c2959caf295555:0xc7277cac2fa6e5d4!8m2!3d34.174522!4d-118.3516508" className="location-heading">Liquor Palace
</a>
                                <p className="location-p">
                                    <a href="https://www.google.com/maps/place/3801+W+Burbank+Blvd,+Burbank,+CA+91505,+USA/@34.1745264,-118.3538448,17z/data=!3m1!4b1!4m5!3m4!1s0x80c2959caf295555:0xc7277cac2fa6e5d4!8m2!3d34.174522!4d-118.3516508" >3801 W Burbank Blvd, Burbank, CA 91505
</a>

                                    <br />
                                    <a href="https://www.google.com/maps/place/3801+W+Burbank+Blvd,+Burbank,+CA+91505,+USA/@34.1745264,-118.3538448,17z/data=!3m1!4b1!4m5!3m4!1s0x80c2959caf295555:0xc7277cac2fa6e5d4!8m2!3d34.174522!4d-118.3516508" >(818) 563-4600
</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="locations">
                        <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', width: 'auto' }} >
                            <img src={location} alt="" />
                            <div>
                                <a href="https://www.google.com/maps/place/4545+Sepulveda+Blvd,+Torrance,+CA+90505,+USA/@33.8265453,-118.3630183,17z/data=!3m1!4b1!4m5!3m4!1s0x80dd4b3107f72597:0xb176c478209975c5!8m2!3d33.8265409!4d-118.3608243" className="location-heading">Chateau Liquor
</a>
                                <p className="location-p">
                                    <a href="https://www.google.com/maps/place/4545+Sepulveda+Blvd,+Torrance,+CA+90505,+USA/@33.8265453,-118.3630183,17z/data=!3m1!4b1!4m5!3m4!1s0x80dd4b3107f72597:0xb176c478209975c5!8m2!3d33.8265409!4d-118.3608243" > 4545 Sepulveda Blvd, Torrance, CA 90505</a>

                                    <br />
                                    <a href="https://www.google.com/maps/place/4545+Sepulveda+Blvd,+Torrance,+CA+90505,+USA/@33.8265453,-118.3630183,17z/data=!3m1!4b1!4m5!3m4!1s0x80dd4b3107f72597:0xb176c478209975c5!8m2!3d33.8265409!4d-118.3608243" >(310) 540-0021</a>
                                </p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', width: 'auto' }}>
                            <img src={location} alt="" />
                            <div>
                                <a href="https://www.google.com/maps/place/400+S+Pacific+Coast+Hwy,+Redondo+Beach,+CA+90277,+USA/@33.8345319,-118.3870981,17z/data=!3m1!4b1!4m5!3m4!1s0x80c2b4aef1d26805:0x37116fd6ea2d75d!8m2!3d33.8345275!4d-118.3849041" className="location-heading">House of Cigar & Liquor
</a>
                                <p className="location-p">
                                    <a href="https://www.google.com/maps/place/400+S+Pacific+Coast+Hwy,+Redondo+Beach,+CA+90277,+USA/@33.8345319,-118.3870981,17z/data=!3m1!4b1!4m5!3m4!1s0x80c2b4aef1d26805:0x37116fd6ea2d75d!8m2!3d33.8345275!4d-118.3849041" >400 S Pacific Coast Hwy Redondo Beach, CA 90277
</a>

                                    <br />
                                    <a href="https://www.google.com/maps/place/400+S+Pacific+Coast+Hwy,+Redondo+Beach,+CA+90277,+USA/@33.8345319,-118.3870981,17z/data=!3m1!4b1!4m5!3m4!1s0x80c2b4aef1d26805:0x37116fd6ea2d75d!8m2!3d33.8345275!4d-118.3849041">(310) 540-7075
</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="locations">
                        <div style={{ display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap', width: 'auto' }} >
                            <img src={location} alt="" />
                            <div>
                                <a href="https://www.google.com/maps/place/4879+Topanga+Canyon+Blvd,+Woodland+Hills,+CA+91364,+USA/@34.1566206,-118.6082746,17z/data=!3m1!4b1!4m5!3m4!1s0x80c29eebcd301b2f:0x5033575f372c30f6!8m2!3d34.1566162!4d-118.6060806" className="location-heading">Embassy Liquor
</a>
                                <p className="location-p">
                                    <a href="https://www.google.com/maps/place/4879+Topanga+Canyon+Blvd,+Woodland+Hills,+CA+91364,+USA/@34.1566206,-118.6082746,17z/data=!3m1!4b1!4m5!3m4!1s0x80c29eebcd301b2f:0x5033575f372c30f6!8m2!3d34.1566162!4d-118.6060806" > 4879 Topanga Canyon Blvd, Woodland Hills, CA 91364</a>

                                    <br />
                                    <a href="https://www.google.com/maps/place/4879+Topanga+Canyon+Blvd,+Woodland+Hills,+CA+91364,+USA/@34.1566206,-118.6082746,17z/data=!3m1!4b1!4m5!3m4!1s0x80c29eebcd301b2f:0x5033575f372c30f6!8m2!3d34.1566162!4d-118.6060806" >(818) 340-2092</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="locations-inputs mt-5">
                        <p className="location-input-heading w-100" >
                            Need help? Please use the contact form below for further assistance.
                        </p>
                        <div className="w-100 d-flex " style={{ alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <input value={this.state.surName} onChange={(e) => this.setState({ surName: e.target.value })} type="text" placeholder="Name Surname" className="adresses-input mt-4 ml-3" style={{ width: '30.3%' }} />
                            <input value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} type="text" placeholder="Your Email" className="adresses-input mt-4 ml-3" style={{ width: '30.3%' }} />
                            <input value={this.state.subject} onChange={(e) => this.setState({ subject: e.target.value })} type="text" placeholder="Subject" className="adresses-input mt-4 ml-3" style={{ width: '30.3%' }} />
                        </div>
                        <div className="w-100 d-flex " style={{ alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <textarea value={this.state.message} onChange={(e) => this.setState({ message: e.target.value })} className="adresses-input mt-4" name="" id="" cols="30" rows="10" placeholder="Message" style={{ width: '100%', minHeight: 170, paddingTop: 10, paddingRight: 40 }}></textarea>
                            <button className="li-size  addtocart " style={{ minHeight: 70, border: 'none', width: 270, margin: '6rem', minWidth: 270 }} onClick={() => window.location.href = "/"} >Send Message </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

};
export default Shops;
