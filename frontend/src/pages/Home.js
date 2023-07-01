import axios from "../axios";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import categories from "../categories";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";
import Navigation from "../components/Navigation";
import video from '../components/images/video.mp4'
function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const latestProducts = products.slice(0, 8);
    useEffect(() => {
        axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
    }, []);
    return (
        <div>
            {/* <img src="https://res.cloudinary.com/dy1pydfmg/image/upload/v1683623491/Pavestone_z0vrip.jpg" className="home-banner" style={{width:"100%",height:"800px"}}     /> */}
            {/* < Carousel /> */}
            <div>
              <Navigation/>
            </div>
            <div className="top" style={{marginTop:"0px", background:"#1f2937"}}>
            <div className="hero">
                {/* <h1 style={{color:"#fff"}}>EARTHY PAVING</h1> */}
                <div className="hero-secondary">
                    <p style={{fontSize:"50px"}}>WE MAKE YOUR DREAM PAVING BEST</p>
                    <p style={{fontSize:"30px", fontFamily:"lora"}}>Your Satisfaction is our responsibility </p>
                     <p style={{fontSize:"30px", fontFamily:"lora"}}>For Best Paving services. </p>
                   <p style={{fontSize:"30px", fontFamily:"lora"}}>Contact <b style={{color:"#BA9364"}}> EARTHY PAVING </b></p> 
                     <p style={{fontSize:"30px", fontFamily:"lora"}}>To see our product.</p>
                     
                     </div>
                <LinkContainer to="/category/all">
                <button className="btn-orderNow"><b>Order Now</b></button>
                </LinkContainer>
            </div>  
            <div className="video">
                <video controls loop="true" autoplay="autoplay" muted style={{height:"550px",width: '1500px', marginRight:"-190px"}}>
                    <source src={video} type="video/mp4"/>
                </video>
            </div>
            </div>



            {/* <div id ="banner">
                <div id = "banner-images">
                    <img src = "https://res.cloudinary.com/dy1pydfmg/image/upload/v1685290967/6_mntjmy.png"></img>
                    <img src = "https://res.cloudinary.com/dy1pydfmg/image/upload/v1685290966/5_enogov.png"></img>
                    <img src = "https://res.cloudinary.com/dy1pydfmg/image/upload/v1685290966/8_ggxebw.png"></img>
                    <img src = "https://res.cloudinary.com/dy1pydfmg/image/upload/v1685290966/7_no6cfp.png"></img>
                    
                </div>
            
            </div> */}
            
            
            <div className="featured-products-container container mt-4">
                <h1 style={{"backgroundColor":"#f3f3f3","font-family":'Raleway', color:"#BA9463"}}>Latest Products</h1>
                {/* last products here */}
                <div className="d-flex justify-content-center flex-wrap" style={{"backgroundColor":"#f3f3f3"}}>
                    {latestProducts.map((product) => (
                        <ProductPreview {...product} />
                    ))}
                </div>
                <div><br /><br />
                    <Link to="/category/all" style={{ "textAlign": "right", "display": "block", "textDecoration": "none", "backgroundColor":"#f3f3f3" }}>
                        <button className="see" style={{"borderRadius":"15px", "background-color": "#152d51", "fontWeight":"bold", "fontSize":"1.3rem", "color":"#BA9364", "font-family":'Raleway'}}>
                        See more
                        </button>
                    </Link>
                </div>
            </div>
            {/* sale banner */}
            <div className="sale__banner--container mt-4">
                {/* <img src="https://res.cloudinary.com/learn-code-10/image/upload/v1654093280/xkia6f13xxlk5xvvb5ed.png" /> */}
            </div>
            <div className="recent-products-container container mt-4">
                <h1 style={{"backgroundColor":"#f3f3f3", "textDecoration":"underline", "font-family":'Raleway', color:"#BA9463"}}>Categories</h1>
                <Row >
                    {categories.map((category) => (
                        <LinkContainer style={{"font-family":'Raleway'}} to={`/category/${category.name.toLocaleLowerCase()}`}>
                            <Col md={4}>
                                <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`, gap: "10px" }} className="category-tile">
                                    {category.name}
                                </div>
                            </Col>
                        </LinkContainer>
                    ))}
                </Row>
            </div>
        </div>
    );
}

export default Home;
