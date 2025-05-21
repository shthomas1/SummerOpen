import React, { useState, useEffect } from 'react';
import { FaBars, FaGithub } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Countdown from '../ui/Countdown';
import '../../styles/layout/Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  
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
  
  const toggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
    setLoginError('');
  };
  
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoading(true);
    
    try {
      // Check if the email exists in our database
      const apiUrl = 'https://summeropenreg-esbcg8bgekgrabfu.canadacentral-01.azurewebsites.net/api/Registrations';
      
      // First try to get all registrations and find the one with matching email
      const response = await fetch(`${apiUrl}?email=${encodeURIComponent(loginEmail)}`);
      
      if (response.ok) {
        const registrations = await response.json();
        const matchingUser = Array.isArray(registrations) && registrations.find(
          reg => reg.email.toLowerCase() === loginEmail.toLowerCase()
        );
        
        if (matchingUser) {
          // Email found - user is registered
          // Store user data in localStorage
          const userData = {
            name: matchingUser.name,
            email: matchingUser.email,
            githubUsername: "",
            registrationDate: matchingUser.registeredAt,
            categories: matchingUser.expectations || ""
          };
          
          localStorage.setItem('registeredUser', JSON.stringify(userData));
          setIsLoggedIn(true);
          setUserData(userData);
          setShowLoginForm(false);
          
          // Redirect to dashboard or thank you page
          navigate('/thank-you');
        } else {
          // Email not found
          setLoginError("This email is not registered. Please register first.");
        }
      } else {
        // API error
        setLoginError("Unable to verify email. Please try again later.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
  
  // Login form JSX
  const loginFormJSX = (
    <div className="login-overlay" onClick={toggleLoginForm}>
      <div className="login-form-container" onClick={(e) => e.stopPropagation()}>
        <h3>Login with Email</h3>
        {loginError && <div className="login-error">{loginError}</div>}
        <form onSubmit={handleLoginSubmit}>
          <div className="login-form-group">
            <label htmlFor="loginEmail">Email Address</label>
            <input
              type="email"
              id="loginEmail"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? "Checking..." : "Login"}
          </button>
        </form>
        <p className="login-helper">
          Not registered yet? <Link to="/register" onClick={toggleLoginForm}>Register here</Link>
        </p>
      </div>
    </div>
  );
  
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
              <>
                <div className="user-profile">
                  <span className="username">{userData?.name}</span>
                  <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <button onClick={toggleLoginForm} className="login-link">
                  Login
                </button>
                <Link to="/register" className="nav-cta" onClick={() => isMenuOpen && toggleMenu()}>
                  Register Now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Login Form Modal */}
      {showLoginForm && loginFormJSX}
      
    </header>
  );
};

export default Header;