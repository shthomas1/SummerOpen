import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./styles/globals.css";
import theme from "./styles/Theme";
import ThankYou from "./pages/ThankYou";
import UpdateProfile from "./pages/UpdateProfile"; // Adjust path if it's not in 'pages'
import WinnersPage from "./pages/Winners";

// Layout components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Sections for home page
import Hero from "./components/sections/Hero";
import EventDetails from "./components/sections/EventDetails";
import About from "./components/sections/About";
// import Schedule from "./components/sections/Schedule";
import Winners from "./components/sections/Winners";
import Prompts from "./components/sections/Prompts";
import Benefits from "./components/sections/Benefits";
import Team from "./components/sections/Team";
import PastHackathons from "./components/sections/PastHackathons";
import FAQ from "./components/sections/FAQ";
import Sponsors from "./components/sections/Sponsors";

// Pages
import Teams from "./pages/Teams";

// HomePage component that combines all sections
const HomePage = () => (
  <>
    <Hero />
    <EventDetails />
    <About />
    {/* <Schedule /> */}
    <Winners />
    <Prompts />
    <Benefits />
    <Team />
    <PastHackathons />
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
          <Route path="/thank-you" element={<ThankYou />} />{" "}
          <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/prompts" element={<Prompts />} />
          <Route path="/winners" element={<WinnersPage />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;