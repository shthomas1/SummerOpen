import React from 'react';
import '../../styles/sections/Winners.css';
import SectionHeader from '../ui/SectionHeader';
import { winnersData } from '../../data/winners';

const Winners = () => {
  return (
    <section id="winners" className="winners-section">
      <div className="container">
        <SectionHeader
          title="Summer 2025 Winners"
          subtitle="Congratulations to our top projects!"
        />
        <div className="winners-grid">
          {winnersData.map((winner, index) => (
            <div className="winner-card" key={index}>
              <h3 className="winner-category">{winner.category}</h3>
              <p className="winner-team">{winner.team}</p>
              <div className="winner-video">
                <iframe
                  src={winner.embedUrl}
                  title={`${winner.team} demo`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="winner-links">
                <a href={winner.videoUrl} target="_blank" rel="noopener noreferrer">
                  YouTube
                </a>
                <a href={winner.githubUrl} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Winners;
