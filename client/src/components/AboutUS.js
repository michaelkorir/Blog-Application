import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const AboutUs = () => {
  return (
    <div className="about-us">
      <h4>About Us</h4>
      <h5>Welcome to our blog!!!</h5>
      <p>We are passionate writers who love sharing our thoughts, ideas, and experiences with the world through this platform.</p>
      <p>Our mission is to provide valuable content on various topics, including technology, lifestyle, travel, and more.</p>
      <p>Feel free to explore our blog, engage with our content, and join us on our journey!</p>
      <p><Link to="/home">Back to Homepage</Link></p>
    </div>
  );
}

export default AboutUs;