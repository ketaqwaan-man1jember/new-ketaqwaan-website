// src/services/api.js
import axios from "axios";

const BASE_URL = window.location.origin;

export const getStruktur = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/data/StructureSection.json`);
    return response.data.struktur;
  } catch (error) {
    console.error("Failed to fetch struktur data:", error);
    throw error;
  }
};
