import React from 'react';
import './AboutUs.css';
import Navigation from './Navigation';
import ContactUs from './ContactUs';

const AboutUs = () => {
  return (
    <div id='About'>
      <Navigation/> 
            <div className="about-us-container">
        <div className="about-us-header">
          <h1 style={{fontSize:"70px", fontFamily:"Futurama Bold Font"}}>About Us</h1>
          <p style={{fontFamily:"sans-serif", fontSize:"25px", color:"#fff"}}>Welcome to our website! We are a team of passionate individuals dedicated to providing high-quality products and excellent customer service.</p>
        </div>

        <div class="about-us-section">
    <div class="about-us-content">
        <h2>Our Story</h2>
        <p>Over the years, our dedication and passion have propelled us forward. We started as a small group of enthusiasts, driven by a common goal. With relentless determination, we overcame challenges and seized opportunities, steadily growing our company. Our commitment to excellence and customer satisfaction has been the foundation of our success. As word spread about our innovative products, more and more people joined us on this incredible journey.</p>
    </div>
    <div class="about-us-image">
        <img src="https://res.cloudinary.com/dejwpag1r/image/upload/v1686327680/our-story-new-removebg-preview_gdrbpa.png" alt="Teamwork" />
    </div>
</div>

<div class="about-us-section">
<div class="about-us-image">
        <img src="https://res.cloudinary.com/dejwpag1r/image/upload/v1686117739/our-mission-removebg-preview_psrymz.png" alt="Mission" />
    </div>
    <div class="about-us-content">
        <h2>Our Mission</h2>
        <p>At <b>Earthy Paving</b>, we believe that innovation is the key to transforming the world. We adopt a forward-thinking approach, combining cutting-edge technology with creative thinking to develop groundbreaking solutions. Our team of talented individuals, with diverse backgrounds and expertise, collaborates closely to explore new possibilities and push the boundaries of what's possible. By fostering a culture of collaboration, curiosity, and openness, we encourage the free flow of ideas and ensure that every voice is heard.</p>
    </div>
    
</div>

<div class="about-us-section">
    <div class="about-us-content">
        <h2>Our Values</h2>
        <p>At <b>Earthy Paving</b>, our vision is to create a better future through innovation and technology. We envision a world where our products and services empower individuals and businesses to thrive, where barriers are broken, and new possibilities are realized. With a focus on sustainability and social responsibility, we aim to contribute to a more equitable and environmentally conscious society. Through our unwavering commitment to our vision, we strive to make a lasting impact on the world.</p>
    </div>
    <div class="about-us-image">
        <img src="https://res.cloudinary.com/dejwpag1r/image/upload/v1686118751/human-resources-vector-removebg-preview_iq0efb.png" alt="Values" />
    </div>
</div>


        {/* <div className="about-us-section">
          <div className="about-us-content">
            <h2>Join Our Team</h2>
            <p>We are always looking for talented individuals who share our passion and values. If you are interested in joining our team, visit our Careers page to learn more about current opportunities.</p>
            <a href="/careers" className="btn">Explore Careers</a>
          </div>
          <div className="about-us-image">
            <img src="https://res.cloudinary.com/dejwpag1r/image/upload/v1686118502/Hybrid-Meeting-Room-removebg-preview_a8ev4j.png" alt="Join Our Team" />
          </div>
        </div> */}

        <div className="about-us-section2">
          <div className="about-us-content">
            <h2 style={{color:"#fff"}}>Our Team</h2>
          </div>
          <br/>
          <div className="team-members">
            <div className="team-member">
              <img
                className="team-member-avatar"
                src="https://res.cloudinary.com/dejwpag1r/image/upload/v1686115991/raji01-removebg-preview_vtung7.png"
                alt="Member 1"
              />
              <div className="team-member-info">
                <h3 className="team-member-name">Rajitha.M</h3>
                <p className="team-member-role">CEO</p>
              </div>
            </div>
            <div className="team-member">
              <img
                className="team-member-avatar"
                src="https://res.cloudinary.com/dejwpag1r/image/upload/v1686116156/sathu02-removebg-preview_esq560.png"
                alt="Member 2"
              />
              <div className="team-member-info">
                <h3 className="team-member-name">Saju.S</h3>
                <p className="team-member-role">CTO</p>
              </div>
            </div>
            <div className="team-member">
              <img
                className="team-member-avatar"
                src="https://res.cloudinary.com/dejwpag1r/image/upload/v1686116193/saju1-removebg-preview_clitic.png"
                alt="Member 3"
              />
              <div className="team-member-info">
                <h3 className="team-member-name">Sathu.K</h3>
                <p className="team-member-role">CTO</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ContactUs />
        </div>
 </div>
      </div>
  );
};

export default AboutUs;

