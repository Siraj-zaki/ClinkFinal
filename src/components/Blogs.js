import React from 'react'
import '../css/blogs.css'
import blogpic from '../assets/blogpic.png'
import blogarrow from '../assets/blogarrow.png'
import Footer from './Footer';
class Blogs extends React.Component {
    state = {
        blogs: [
            {
                img: blogpic,
                blogHeading: "Why your beer needs to be chill",
                blogP: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices...',
            },
            {
                img: blogpic,
                blogHeading: "Why your beer needs to be chill",
                blogP: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices...',
            },
            {
                img: blogpic,
                blogHeading: "Why your beer needs to be chill",
                blogP: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices...',
            },
            {
                img: blogpic,
                blogHeading: "Why your beer needs to be chill",
                blogP: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices...',
            },
            {
                img: blogpic,
                blogHeading: "Why your beer needs to be chill",
                blogP: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices...',
            },
            {
                img: blogpic,
                blogHeading: "Why your beer needs to be chill",
                blogP: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices...',
            },
        ]
    }
    render() {
        return (
            <div style={{ width: '100%', padding: '6rem', paddingTop: this.props.blogpage ? "0px" : '6rem', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: "column" }}>
                <span className="section-products-h1 mt-5" style={{ zIndex: 20, position: 'relative',fontWeight:200 ,marginBottom:20}}>Blogs and News</span>
                <div className="css-grid-2" style={{ marginTop: this.props.blogpage ? "0px " : "10rem" }}>
                    {
                        this.state.blogs.map((blog, index) =>
                            <div onClick={() => window.location.href = "/BlogDetail"} className="inner-blog" key={index}>
                                <div className="blog-pic" style={{ width: '100%' }}>
                                    <img src={blog.img} alt="" width="100%" />
                                </div>
                                <div className="blog-heading">
                                    <span>{blog.blogHeading}</span>
                                </div>
                                <div className="blog-p">
                                    {blog.blogP}
                                </div>

                                <button className="blog-btn">Read more</button>
                            </div>
                        )
                    }

                </div>


            </div>

        )
    }
}
export default Blogs