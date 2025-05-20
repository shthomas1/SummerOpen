import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaCalendarAlt, FaDiscord, FaGithub } from "react-icons/fa";
import "../styles/pages/ThankYou.css";

const ThankYou = () => {
  // You could retrieve the user's name from localStorage or URL parameters if needed
  // For this example, I'll just use a generic greeting
  
  return (
    <div className="thank-you-page">
      <div className="container">
        <div className="thank-you-content">
          <div className="success-icon">
            <FaCheckCircle />
          </div>
          
          <h1 className="thank-you-title">Registration Complete!</h1>
          
          <p className="thank-you-message">
            Thank you for registering for the Summer Open Hackathon. We're excited to have you join us for this coding adventure!
          </p>
          
          <div className="confirmation-details">
            <h2>What's Next?</h2>
            
            <div className="next-steps">
              <div className="next-step-item">
                <div className="step-icon">
                  <FaCalendarAlt />
                </div>
                <div className="step-content">
                  <h3>Mark Your Calendar</h3>
                  <p>The hackathon starts on <strong>June 28, 2025 at 6:00 AM</strong> and ends on <strong>June 29, 2025 at 6:00 PM</strong>.</p>
                </div>
              </div>
              
              <div className="next-step-item">
                <div className="step-icon">
                  <FaDiscord />
                </div>
                <div className="step-content">
                  <h3>Join Our Discord</h3>
                  <p>Connect with other participants, mentors, and organizers in our Discord community.</p>
                  <a 
                    href="https://discord.gg/summerhackathon" 
                    className="discord-button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Discord Server
                  </a>
                </div>
              </div>
              
              <div className="next-step-item">
                <div className="step-icon">
                  <FaGithub />
                </div>
                <div className="step-content">
                  <h3>Prepare Your GitHub</h3>
                  <p>Make sure your GitHub account is ready for collaboration. Check out our resources for hackathon preparation.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="email-confirmation">
            <h2>Check Your Email</h2>
            <p>We've sent a confirmation email with additional details and resources to help you prepare for the hackathon.</p>
            <p className="email-note">If you don't see the email, please check your spam folder.</p>
          </div>
          
          <div className="thank-you-actions">
            <Link to="/" className="home-button">Return to Homepage</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;