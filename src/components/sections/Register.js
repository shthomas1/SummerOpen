import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const RegisterSection = styled.section`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryDark});
  color: white;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    top: -200px;
    left: -200px;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    bottom: -150px;
    right: -150px;
  }
`;

const RegisterContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
`;

const RegisterTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2.5rem;
  }
`;

const RegisterDescription = styled(motion.p)`
  font-size: 1.2rem;
  margin-bottom: 3rem;
  opacity: 0.9;
`;

const RegisterCTA = styled(Button)`
  display: inline-block;
  background-color: white;
  color: ${props => props.theme.colors.primary};
  padding: 1.2rem 3rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }
`;

const Register = () => {
  return (
    <RegisterSection id="register">
      <div className="container">
        <RegisterContent>
          <RegisterTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Join the Challenge?
          </RegisterTitle>
          <RegisterDescription
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Registration is open to everyone. Secure your spot now and prepare for an exciting weekend of innovation and collaboration!
          </RegisterDescription>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <RegisterCTA href="#" light>Register Now</RegisterCTA>
          </motion.div>
        </RegisterContent>
      </div>
    </RegisterSection>
  );
};

export default Register;