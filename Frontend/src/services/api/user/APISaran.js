// src/services/api.js
import axios from "axios";

const BASE_URL = window.location.origin;

export const getSaran = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/data/Saran.json`);
    return response.data.saran;
  } catch (error) {
    console.error("Failed to fetch saran data:", error);
    throw error;
  }
};
