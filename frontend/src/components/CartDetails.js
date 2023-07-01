import React from 'react';
import "./CartDetails.css";

const CartDetails = () => {
  return (
    <div style={{textAlign:'center', paddingLeft:'230px', marginTop:'-60px'}}>
    <div className="myCard">
      <div className="innerCard">
        <div className="frontSide">
          <p className="title">Thank You For Your Order.<br/> We Will Contact You Soon.</p>
          {/* <p>For Contact</p> */}
        </div>
        <div className="backSide">
          <p className="title">Our Details</p>
          <p>Name: Earthy Paving</p>
          <p>Email: earthypaving@gmail.com</p>
          <p>Address: 109/1, Poonthoddam, Vavuniya, Sri Lanka.</p>
          <p>Phone: 075 266 2427</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CartDetails;
