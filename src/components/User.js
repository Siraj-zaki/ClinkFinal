import React from 'react'
import userimg from '../assets/userimg.png'
import starfill from '../assets/starfill.png'

class User extends React.Component {
    render() {
        return (
            <div className="border-class" style={{ width: '100% ', minHeight: 200, display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }} >
                <img src={userimg} alt="" />
                <div className="user-data">
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span className="user-data-heading" >Anjum Zaki</span>
                        <span style={{marginLeft:"2rem"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="176" height="40" viewBox="0 0 176 40">
                                <g id="Group_6237" data-name="Group 6237" transform="translate(-745 -2773)">
                                    <g id="Rectangle_1307" data-name="Rectangle 1307" transform="translate(745 2773)" fill="#edf8f6" stroke="#d5d5d5" stroke-width="1">
                                        <rect width="176" height="40" rx="5" stroke="none" />
                                        <rect x="0.5" y="0.5" width="175" height="39" rx="4.5" fill="none" />
                                    </g>
                                    <g id="Group_5331" data-name="Group 5331" transform="translate(756.441 2781.709)">
                                        <path id="Path_3525" data-name="Path 3525" d="M0,0H21.85V21.85H0Z" fill="none" />
                                        <path id="Path_3526" data-name="Path 3526" d="M14.194,2,6,5.642V11.1a11.325,11.325,0,0,0,8.194,10.925A11.325,11.325,0,0,0,22.388,11.1V5.642ZM12.373,16.567,8.731,12.925l1.288-1.288,2.353,2.353,6-6,1.288,1.288Z" transform="translate(-3.269 -1.09)" fill="#233d3a" />
                                    </g>
                                    <text id="Verified_Account" data-name="Verified Account" transform="translate(789 2798)" fill="#233d3a" font-size="14" font-family="Montserrat-Medium, Montserrat" font-weight="500"><tspan x="0" y="0">Verified Account</tspan></text>
                                </g>
                            </svg>

                        </span>
                    </div>
                    <div style={{ justifyContent: 'flex-start', margin: 5, alignItems: 'flex-start', flexDirection: "column" }} >
                        {
                            Array(5).fill().map((item, index) =>
                                <img src={starfill} alt="" />

                            )
                        }
                    </div>
                    <span className="comment">BEST TEQUILA THERE IS</span>
                </div>

            </div>
        )
    }
}
export default User;