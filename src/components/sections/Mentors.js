import React from 'react';
import '../../styles/sections/Mentors.css';
import SectionHeader from '../ui/SectionHeader';
import { FaLinkedinIn, FaWebsite, FaGithub, FaDribbble, FaMediumM } from 'react-icons/fa';
import { mentorsData } from '../../data/mentors';

const getSocialIcon = (platform) => {
  switch (platform) {
    case 'linkedin':
      return <FaLinkedinIn />;
    case 'website':
      return <FaWebsite />;
    case 'github':
      return <FaGithub />;
    case 'dribbble':
      return <FaDribbble />;
    case 'medium':
      return <FaMediumM />;
    default:
      return null;
  }
};

const Mentors = () => {
  return (
    <section id="mentors" className="mentors-section">
      <div className="container">
        <SectionHeader 
          title="Meet Our Mentors" 
          subtitle="Our experienced mentors will be available throughout the event to guide and support you."
        />
        
        <div className="mentors-grid">
          {mentorsData.map((mentor, index) => (
            <div className="mentor-card" key={index}>
              <div className="mentor-image">
                <img src={`/api/placeholder/300/300?text=${mentor.name}`} alt={mentor.name} />
              </div>
              <div className="mentor-info">
                <h3 className="mentor-name">{mentor.name}</h3>
                <p className="mentor-role">{mentor.role}</p>
                <p className="mentor-bio">{mentor.bio}</p>
                <div className="mentor-social">
                  {Object.entries(mentor.social).map(([platform, url]) => (
                    <a key={platform} href={url} className="social-icon" aria-label={platform}>
                      {getSocialIcon(platform)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mentors;