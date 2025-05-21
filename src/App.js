import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./styles/globals.css";
import theme from "./styles/Theme";
import ThankYou from './pages/ThankYou';

// Layout components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Sections for home page
import Hero from "./components/sections/Hero";
import EventDetails from "./components/sections/EventDetails";
import About from "./components/sections/About";
import Schedule from "./components/sections/Schedule";
import Benefits from "./components/sections/Benefits";
import Mentors from "./components/sections/Mentors";
import FAQ from "./components/sections/FAQ";
import Sponsors from "./components/sections/Sponsors";

// Pages
import Register from "./pages/Register";

// HomePage component that combines all sections
const HomePage = () => (
  <>
    <Hero />
    <EventDetails />
    <About />
    <Schedule />
    <Benefits />
    <Mentors />
    <FAQ />
    <Sponsors />
  </>
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/thank-you" element={<ThankYou />} />{" "}
          <Route path="/update-profile" element={<UpdateProfile />} />

        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
