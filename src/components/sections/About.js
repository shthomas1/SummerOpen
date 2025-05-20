import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';

const AboutSection = styled.section`
  background-color: ${props => props.theme.colors.light};
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 4rem;
  align-items: center;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const AboutText = styled(motion.div)`
  grid-column: span 5;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-column: span 12;
  }
`;

const AboutImage = styled(motion.div)`
  grid-column: span 7;
  position: relative;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-column: span 12;
  }
  
  img {
    width: 100%;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border: 2px dashed ${props => props.theme.colors.primary};
    border-radius: 20px;
    top: 20px;
    left: 20px;
    z-index: -1;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 150px;
    height: 150px;
    background: linear-gradient(135deg, ${props => props.theme.colors.tertiary}, ${props => props.theme.colors.primary});
    border-radius: 50%;
    bottom: -30px;
    left: -30px;
    z-index: -1;
    opacity: 0.7;
  }
`;

const AboutTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.primary};
`;

const AboutDescription = styled.p`
  margin-bottom: 2rem;
  font-size: 1.1rem;
  color: ${props => props.theme.colors.gray};
`;

const AboutPoints = styled.div`
  margin-bottom: 2rem;
`;

const AboutPoint = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const AboutPointIcon = styled.div`
  min-width: 24px;
  height: 24px;
  background-color: rgba(99, 102, 241, 0.1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.colors.primary};
  margin-right: 1rem;
  margin-top: 0.2rem;
`;

const About = () => {
  return (
    <AboutSection id="about">
      <div className="container">
        <SectionHeader 
          title="About the Hackathon" 
          subtitle="Discover what makes our Summer Open Hackathon a unique and exciting experience for all participants."
        />
        
        <AboutContent>
          <AboutText
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <AboutTitle>A Global Coding Adventure</AboutTitle>
            <AboutDescription>
              The Summer Open Hackathon is a virtual event bringing together coders, designers, and problem-solvers from around the world. For 36 hours, participants will collaborate to create innovative solutions to real-world challenges.
            </AboutDescription>
            
            <AboutPoints>
              <AboutPoint>
                <AboutPointIcon>✓</AboutPointIcon>
                <p>Collaborate with talented individuals across the globe</p>
              </AboutPoint>
              <AboutPoint>
                <AboutPointIcon>✓</AboutPointIcon>
                <p>Access to industry experts and mentors throughout the event</p>
              </AboutPoint>
              <AboutPoint>
                <AboutPointIcon>✓</AboutPointIcon>
                <p>Build solutions that address meaningful challenges</p>
              </AboutPoint>
              <AboutPoint>
                <AboutPointIcon>✓</AboutPointIcon>
                <p>Showcase your skills and win exciting prizes</p>
              </AboutPoint>
            </AboutPoints>
            
            <Button href="register" variant="primary">Join the Challenge</Button>
          </AboutText>
          
          <AboutImage
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img src="/api/placeholder/800/500" alt="Hackathon participants collaborating" />
          </AboutImage>
        </AboutContent>
      </div>
    </AboutSection>
  );
};

export default About;