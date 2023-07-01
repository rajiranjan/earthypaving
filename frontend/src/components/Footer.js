import React from 'react';
import "./Footer.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

// npm install bootstrap font-awesome jquery popper.js

import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';

function Footer() {
  return (
    <div >
       {/* Footer */}
<footer className="text-center text-lg-start bg-light text-muted">

  {/* Section: Links  */}
  <section className="footer">
    <div className="container text-center text-md-start mt-5 " style={{paddingTop:"15px"}}>
      {/* Grid row */}
      <div className="row">
        {/* Grid column */}
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          {/* Content */}
          <h6 className="text-uppercase fw-bold mb-4">
            Earthy Paving
          </h6>

          <span>
            Pave Your Waying Earthy Paving.
            We Always Be With You </span>   


          {/* <div > */}
              <div className="me-5 d-none d-lg-block full">
                
                  <a href="https://web.facebook.com/profile.php?id=100093182706511" target='blank' className="me-4 text-reset socialIcon facebook">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a href="#" target='blank' className="me-4 text-reset socialIcon twitter">
                    <i className="fab fa-twitter" />
                  </a>
                  <a href="#" target='blank' className="me-4 text-reset socialIcon google">
                    <i className="fab fa-google" />
                  </a>
                  <a href="#" target='blank' className="me-4 text-reset socialIcon insta">
                    <i className="fab fa-instagram" />
                  </a>
                
              </div>
          {/* </div> */}

          
        </div>

        {/* Grid column */}
        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4" style={{paddingLeft:"80px"}}>
          {/* Links */}
          <h6 className="text-uppercase fw-bold mb-4">
            Products
          </h6>
          <p className='name'>
            <a href="/category/grasses" className="text-reset">Grasses</a>
          </p>
          <p className='name'>
            <a href="/category/stones" className="text-reset">Stones</a>
          </p>
          <p className='name'>
            <a href="/category/works" className="text-reset">Our Works</a>
          </p>
          
        </div>
        {/* Grid column */}
       
        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 Con" style={{paddingLeft:"100px"}}>
          {/* Links */}
          <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
          <p><i className="fas fa-home me-3 ficon" />Achchelu North, Nervely.</p>
          
          <p><i className="fas fa-phone me-3 ficon" /> 0752662427</p>
          <p><i className="fas fa-print me-3 ficon" /> 0763477240</p>
        </div>
        {/* Grid column */}
      </div>
      <hr style={{width:"100%"}}></hr>
      <span style={{marginLeft:"500px"}}>   © 2023 Copyright: All Rights reserved by <b>Earthy Paving </b></span>
    </div>
    

  </section>
  
 
</footer>

    </div>
  )
}

export default Footer;