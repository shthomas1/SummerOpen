import React from 'react';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram 
} from 'react-icons/fa';
import '../../styles/components/layout/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-column">
            <h3>Summer Open Hackathon</h3>
            <p>A 36-hour virtual coding event bringing together creative minds to build innovative solutions.</p>
            <div className="footer-social">
              <a href="https://facebook.com" aria-label="Facebook" className="social-icon">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" aria-label="Twitter" className="social-icon">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="social-icon">
                <FaLinkedinIn />
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="social-icon">
                <FaInstagram />
              </a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#schedule">Schedule</a></li>
              <li><a href="#benefits">Benefits</a></li>
              <li><a href="#mentors">Mentors</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="/register">Register</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Contact Us</h3>
            <ul className="footer-links">
              <li><a href="mailto:info@summerhackathon.com">info@summerhackathon.com</a></li>
              <li><a href="https://twitter.com/SummerHackathon">Twitter: @SummerHackathon</a></li>
              <li><a href="https://discord.gg/summerhackathon">Discord: Join our community</a></li>
            </ul>
            
            <div className="footer-newsletter">
              <p>Subscribe to our newsletter</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Your email" className="newsletter-input" />
                <button type="submit" className="newsletter-btn">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="copyright">
          &copy; 2025 Summer Open Hackathon. All rights reserved. | <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-of-service">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;