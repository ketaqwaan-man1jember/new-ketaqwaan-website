

// src/services/api.js
import axios from "axios";

const BASE_URL = window.location.origin;

export const getInformasi = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/data/InformasiSection.json`);
    return response.data.informasi;
  } catch (error) {
    console.error("Error fetching informasi: ", error);
    throw error;
  }
};
