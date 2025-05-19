import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import Countdown from '../ui/Countdown';
import '../../styles/layout/Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar">
          <div className="logo">
            <div className="logo-icon">&lt;/&gt;</div>
            <span>Summer Open</span>
          </div>
          
          <Countdown targetDate="2025-06-28T06:00:00" header={true} />
          
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            <FaBars />
          </button>
          
          <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <a href="#about" className="nav-link">About</a>
            <a href="#schedule" className="nav-link">Schedule</a>
            <a href="#benefits" className="nav-link">Benefits</a>
            <a href="#mentors" className="nav-link">Mentors</a>
            <a href="#faq" className="nav-link">FAQ</a>
            <a href="/register" className="nav-cta">Register Now</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;