// src/services/api.js
import axios from "axios";

const BASE_URL = window.location.origin;

export const getEkskul = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/data/EkskulSection.json`);
    return response.data.ekskul;
  } catch (error) {
    console.error("Error fetching ekskul: ", error);
    throw error;
  }
};
