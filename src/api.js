// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';  // Update with your backend server URL

// Function for user signup
export const signUpUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { email, password });
    return response.data; // Return response data for use in the frontend
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Function for user login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Return response data for use in the frontend
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};
