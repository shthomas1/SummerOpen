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
    // Use the registered callback URL
    const callbackUrl = "https://summeropen.netlify.app/register";

    // Add a state parameter to indicate this is a login flow
    const state = "login";

    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&scope=user:email&state=${state}`;

    // Redirect to GitHub OAuth
    window.location.href = authUrl;
  };
};

export default Header;