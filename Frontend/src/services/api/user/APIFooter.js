// src/services/api.js
import axios from "axios";

const BASE_URL = window.location.origin;

export const getFooter = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/data/Footer.json`);
    return response.data.footer;
  } catch (error) {
    console.error("Failed to fetch footer data:", error);
    throw error;
  }
};
