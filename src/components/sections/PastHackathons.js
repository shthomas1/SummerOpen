import React from 'react';
import '../../styles/sections/PastHackathons.css';
import SectionHeader from '../ui/SectionHeader';

const PastHackathons = () => {
  return (
    <section className="past-hackathons">
      <div className="container">
        <SectionHeader
          title="Past Hackathons"
          subtitle="A look back at previous events"
        />
        <div className="carousel">
          <div className="carousel-item">
            <img src="/hackathon-preview.jpg" alt="Summer 2025" />
            <h3 className="event-name">Summer 2025</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PastHackathons;
