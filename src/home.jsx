import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon
import Navbar from './components/navbar.jsx';
import Footer from './components/Footer.jsx';
import './css/home.css';
import imageCode from './images/coding.jpg'; // Placeholder path for coding image
import imagePerson from './images/hania.jpg'; // Placeholder path for person image
import { getCurrentUserFromCookie } from './Auth'; // Import the cookie function

const Home = () => {
  const [visibleStats, setVisibleStats] = useState({ projects: 0, clients: 0, hours: 0 });
  const [statsVisible, setStatsVisible] = useState(false);
  const [userData, setUserData] = useState(null); // Store user data
  const navigate = useNavigate();

  // Fetch the current user ID from cookie
  useEffect(() => {
    const fetchUserData = async () => {
      const { user, error } = await getCurrentUserFromCookie();  // Awaiting the result of getCurrentUserFromCookie
      if (user) {
        setUserData(user); // Store the user data if available
      } else {
        console.error(`Error fetching user data: ${error}`);  // Log an error in case of error
      }
    };

    fetchUserData();  // Call the async function
  }, []);  // Empty dependency array ensures this runs once after the component mounts

  useEffect(() => {
    const handleScroll = () => {
      const statsSection = document.querySelector(".stats-section");
      if (statsSection && statsSection.getBoundingClientRect().top < window.innerHeight && !statsVisible) {
        setStatsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [statsVisible]);

  useEffect(() => {
    if (statsVisible) {
      const projectsTarget = 1000;
      const clientsTarget = 500;
      const hoursTarget = 12000;

      let projectsCount = 0;
      let clientsCount = 0;
      let hoursCount = 0;

      const interval = setInterval(() => {
        setVisibleStats({
          projects: Math.min(projectsCount += 10, projectsTarget),
          clients: Math.min(clientsCount += 5, clientsTarget),
          hours: Math.min(hoursCount += 120, hoursTarget)
        });

        if (projectsCount >= projectsTarget && clientsCount >= clientsTarget && hoursCount >= hoursTarget) {
          clearInterval(interval);
        }
      }, 50);
    }
  }, [statsVisible]);

  const handleExploreClick = () => {
    navigate('/services');
  };

  return (
    <div className="home">
      <Navbar />

      <section className="main-content">
        <h1 className="headline">Better Call <br /> Trusty Works</h1>
        
        <div className="image-container">
          <img src={imageCode} alt="Coding" className="image" />
          <img src={imagePerson} alt="Person working" className="image overlapped-image" />
        </div>

        <div className="intro-text">
          <p>Welcome to Trusty Works, where quality and reliability meet. Explore our services and find the perfect solution for your needs.</p>
          <button className="explore-button" onClick={handleExploreClick}>Explore</button>
        </div>
      </section>

      <section className="stats-section">
        <h2>Our Achievements</h2>
        <div className="stats">
          <div className="stat-item">
            <h3>{visibleStats.projects}+</h3>
            <p>Projects Completed</p>
          </div>
          <div className="stat-item">
            <h3>{visibleStats.clients}+</h3>
            <p>Satisfied Clients</p>
          </div>
          <div className="stat-item">
            <h3>{visibleStats.hours}+</h3>
            <p>Hours Worked</p>
          </div>
        </div>
      </section>

      <Footer />

      {/* WhatsApp Icon */}
      <a
        href="https://wa.me/+923279546260" // Replace with actual WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-icon"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
};

export default Home;
