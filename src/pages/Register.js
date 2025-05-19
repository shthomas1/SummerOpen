import React, { useState } from 'react';
import '../styles/pages/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    teamSize: '1',
    experience: 'beginner',
    interests: '',
    agreeTerms: false
  });
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    alert('Registration successful! Check your email for confirmation.');
  };
  
  return (
    <div className="register-page">
      <div className="container">
        <div className="register-content">
          <h1 className="register-title">Register for Summer Open Hackathon</h1>
          <p className="register-description">
            Join us on June 28-29, 2025 for an exciting 36-hour coding adventure!
          </p>
          
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="firstName">First Name</label>
              <input 
                className="form-input"
                type="text" 
                id="firstName" 
                name="firstName" 
                value={formData.firstName}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="lastName">Last Name</label>
              <input 
                className="form-input"
                type="text" 
                id="lastName" 
                name="lastName" 
                value={formData.lastName}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group full-width">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input 
                className="form-input"
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="teamSize">Team Size</label>
              <select 
                className="form-select"
                id="teamSize" 
                name="teamSize" 
                value={formData.teamSize}
                onChange={handleChange}
              >
                <option value="1">Individual</option>
                <option value="2">2 Members</option>
                <option value="3">3 Members</option>
                <option value="4">4 Members</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="experience">Experience Level</label>
              <select 
                className="form-select"
                id="experience" 
                name="experience" 
                value={formData.experience}
                onChange={handleChange}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <div className="form-group full-width">
              <label className="form-label" htmlFor="interests">What are you interested in building?</label>
              <textarea 
                className="form-textarea"
                id="interests" 
                name="interests" 
                value={formData.interests}
                onChange={handleChange}
                placeholder="Tell us about your project ideas or areas of interest..." 
              />
            </div>
            
            <div className="form-group full-width">
              <div className="checkbox-group">
                <input 
                  className="form-checkbox"
                  type="checkbox" 
                  id="agreeTerms" 
                  name="agreeTerms" 
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required 
                />
                <label className="checkbox-label" htmlFor="agreeTerms">
                  I agree to the Terms of Service and have read the Privacy Policy
                </label>
              </div>
            </div>
            
            <div className="submit-group">
              <button 
                className="submit-button"
                type="submit"
              >
                Complete Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;