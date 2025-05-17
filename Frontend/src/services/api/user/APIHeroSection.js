// src/services/api.js
import axios from "axios";

const BASE_URL = window.location.origin;

export const getHeroData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/data/HeroSection.json`);
    return response.data.heroSection;
  } catch (error) {
    console.error("Error fetching hero data:", error);
    throw error;
  }
};
