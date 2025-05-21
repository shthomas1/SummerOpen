import React, { useState, useEffect } from 'react';
import { FaBars, FaGithub } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Countdown from '../ui/Countdown';
import '../../styles/layout/Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  
  // Check if user is already logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('registeredUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setIsLoggedIn(true);
        setUserData(parsedUser);
      } catch (e) {
        console.error('Error parsing stored user data', e);
      }
    }
  }, []);
  
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
    if (isMenuOpen) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  };
  
  const handleGitHubLogin = () => {
    setLoading(true);
    // Hard-code the values for now to make sure it works
    const clientId = "Ov23liirEqIDwwnIsirA";
    const callbackUrl = "https://summeropen.netlify.app/login"; // Using a different callback URL for login vs registration
    
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&scope=user:email`;
    
    // Redirect to GitHub OAuth
    window.location.href = authUrl;
  };
  
  const handleLogout = () => {
    localStorage.removeItem('registeredUser');
    setIsLoggedIn(false);
    setUserData(null);
    // Redirect to home page
    navigate('/');
  };
  
  // Function to create navigation links based on current page
  const getNavLink = (sectionId, label) => {
    if (isHomePage) {
      // If we're already on the home page, use hash links
      return (
        <a href={`#${sectionId}`} className="nav-link" onClick={() => isMenuOpen && toggleMenu()}>
          {label}
        </a>
      );
    } else {
      // If we're on another page, navigate to home page with hash
      return (
        <Link to={`/#${sectionId}`} className="nav-link" onClick={() => isMenuOpen && toggleMenu()}>
          {label}
        </Link>
      );
    }
  };
  
  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar">
          <Link to="/" className="logo">
            <div className="logo-icon">&lt;/&gt;</div>
            <span>Summer Open</span>
          </Link>
          
          <Countdown targetDate="2025-06-28T06:00:00" header={true} />
          
          <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
            <FaBars />
          </button>
          
          <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            {getNavLink('about', 'About')}
            {getNavLink('schedule', 'Schedule')}
            {getNavLink('benefits', 'Benefits')}
            {getNavLink('mentors', 'Mentors')}
            {getNavLink('faq', 'FAQ')}
            
            {isLoggedIn ? (
              <div className="user-profile">
                <span className="username">{userData?.name}</span>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={handleGitHubLogin} 
                  className="login-link"
                  disabled={loading}
                >
                  {loading ? 'Connecting...' : 'Login'}
                </button>
                <Link to="/register" className="nav-cta" onClick={() => isMenuOpen && toggleMenu()}>
                  Register Now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;