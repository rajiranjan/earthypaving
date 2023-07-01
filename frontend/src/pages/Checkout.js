import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import CheckoutForm from "../components/CheckoutForm";
// import { useIncreaseCartProductMutation, useDecreaseCartProductMutation, useRemoveFromCartMutation } from "../services/appApi";
// import "./CartPage.css";
import "./Checkout.css";
import Navigation from "../components/Navigation";
// import { Button, Col, Container, Form, Row, Alert } from "react-bootstrap";
import CartDetails from "../components/CartDetails";
import { Link } from "react-router-dom";


const stripePromise = loadStripe("pk_test_51N5lmvDBrkoq40ZPf79HKKIdeGhP2d2jgYW2K6W4RyF2GpxmgwP19r6cXAEJ85AVhqPqoIllCzixzzPt75pwvKCx003YiYCpGH");


// function CartPage() {
//     const user = useSelector((state) => state.user);
//     const products = useSelector((state) => state.products);
//     const userCartObj = user.cart;
//     let cart = products.filter((product) => userCartObj[product._id] != null);
//     const [increaseCart] = useIncreaseCartProductMutation();
//     const [decreaseCart] = useDecreaseCartProductMutation();
//     const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

function Checkout () {
    const user = useSelector((state) => state.user);
    const products = useSelector((state) => state.products);
    const userCartObj = user.cart;
    let cart = products.filter((product) => userCartObj[product._id] != null);
    // const [increaseCart] = useIncreaseCartProductMutation();
    // const [decreaseCart] = useDecreaseCartProductMutation();
    // const [removeFromCart, { isLoading }] = useRemoveFromCartMutation();

    // let cart = products.filter((product) => userCartObj[product._id] != null);
    return (
        <p>
            <Navigation/>
        <Container  style={{ minHeight: "66vh", padding:"10px"}}>
            <Row>
            <Col>
                    {cart.length === 0 ? (
                        <p>
                            
                            <div  style={{textAlign:'center', paddingLeft:'100px', marginBottom:"-200px"}}>
                              <CartDetails/>
                            </div>
                            <div>
                            <Link to="/orders">
                        <button className="see" style={{"borderRadius":"15px", "background-color": "#152d51", "fontWeight":"bold", "fontSize":"1.3rem", "color":"#BA9364", "font-family":'Raleway', marginTop:"250px", marginBottom:"-100px"}}>
                        Order Details
                        </button>
                    </Link>
                            </div>
            </p>
                    ) : (
                        <Elements stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    )}
                    {/* <div>
                <ContactUs/>
            </div> */}
                </Col> 
            </Row>
        </Container>
        </p>
        )
}
// }

export default Checkout;

