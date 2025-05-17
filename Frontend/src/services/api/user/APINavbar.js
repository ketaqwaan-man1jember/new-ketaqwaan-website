// src/services/api.js
import axios from "axios";

const BASE_URL = window.location.origin;

export const getNavbar = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/data/Navbar.json`);
    return response.data.navbar; // Ubah dari struktur ke navbar
  } catch (error) {
    console.error("Error fetching navbar:", error);
    throw error;
  }
};
