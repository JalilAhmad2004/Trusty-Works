// src/projects.jsx

import React, { useState } from 'react';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import { FaWhatsapp } from 'react-icons/fa';
import './css/projects.css';

const initialProjects = [
  {
    title: 'Cybersecurity Dashboard',
    description: 'A comprehensive dashboard to monitor and analyze network security threats.',
    githubLink: 'https://github.com/yourusername/cybersecurity-dashboard'
  },
  {
    title: 'E-commerce Website',
    description: 'A complete e-commerce solution with a dynamic product catalog and checkout system.',
    githubLink: 'https://github.com/yourusername/ecommerce-website'
  },
  {
    title: 'Data Visualization Tool',
    description: 'An interactive tool for visualizing large datasets, built with D3.js and React.',
    githubLink: 'https://github.com/yourusername/data-visualization-tool'
  },
];

const Projects = ({ isAdmin }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', githubLink: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    const updatedLink = newProject.githubLink.startsWith('http')
      ? newProject.githubLink
      : `https://${newProject.githubLink}`;
    setProjects([...projects, { ...newProject, githubLink: updatedLink }]);
    setNewProject({ title: '', description: '', githubLink: '' });
    setShowForm(false);
  };

  return (
    <div className="projects">
      <Navbar />
      <div className="projects-page">
        <div className="projects-container">
          <h2>Our Projects</h2>
          <p>Explore some of the projects we have successfully completed.</p>
          <div className="projects-list">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
                >
                  View on GitHub
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Plus Icon and Form for Adding New Projects - Only Visible for Admin */}
        {isAdmin && (
          <div className="add-service-wrapper">
            <div className="add-service-icon" onClick={() => setShowForm(!showForm)}>
              +
            </div>
            {showForm && (
              <div className="add-service-form">
                <form onSubmit={handleAddProject}>
                  <input
                    type="text"
                    name="title"
                    placeholder="Project Title"
                    value={newProject.title}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                  <textarea
                    name="description"
                    placeholder="Project Description"
                    value={newProject.description}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                  <input
                    type="url"
                    name="githubLink"
                    placeholder="GitHub Link"
                    value={newProject.githubLink}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                  <button type="submit" className="add-service-button">Add Project</button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />

      {/* WhatsApp Icon */}
      <a
        href="https://wa.me/+923279546260"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-icon"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
};

export default Projects;
