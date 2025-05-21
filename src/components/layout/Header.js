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

  useEffect(() => {
    const checkLoginStatus = () => {
      const storedUser = localStorage.getItem('registeredUser');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setIsLoggedIn(true);
          setUserData(parsedUser);
        } catch (e) {
          console.error('Error parsing stored user data', e);
        }
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    const intervalId = setInterval(checkLoginStatus, 5000);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      clearInterval(intervalId);
    };
  }, [location]);

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
    const clientId = "Ov23liirEqIDwwnIsirA";
    const callbackUrl = "https://summeropen.netlify.app/register";
    const state = "login";
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&scope=user:email&state=${state}`;
    window.location.href = authUrl;
  };

  const handleLogout = () => {
    localStorage.removeItem('registeredUser');
    setIsLoggedIn(false);
    setUserData(null);
    navigate('/');
  };

  const getNavLink = (sectionId, label) => {
    if (isHomePage) {
      return (
        <a href={`#${sectionId}`} className="nav-link" onClick={() => isMenuOpen && toggleMenu()}>
          {label}
        </a>
      );
    } else {
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
          <div className="left-section">
            <Link to="/" className="logo">
              <div className="logo-icon">&lt;/&gt;</div>
              <span>Summer Open</span>
            </Link>
          </div>

          <div className="center-section">
            <Countdown targetDate="2025-06-28T06:00:00" header={true} />
          </div>

          <div className="right-section">
            <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
              <FaBars />
            </button>
            <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
              {/* Your getNavLink and auth buttons */}
              {getNavLink('about', 'About')}
              {/* ... other links */}
              {isLoggedIn ? (
                <div className="user-profile">
                  {/* Avatar and logout */}
                </div>
              ) : (
                <>
                  <button onClick={handleGitHubLogin} className="login-link" disabled={loading}>
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

      </div>
    </header>
  );
};

export default Header;