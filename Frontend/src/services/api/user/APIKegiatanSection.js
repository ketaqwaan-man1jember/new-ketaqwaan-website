// src/services/api.js
import axios from "axios";

const BASE_URL = window.location.origin;

export const getKegiatan = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/data/KegiatanSection.json`);
    return response.data.kegiatan;
  } catch (error) {
    console.error("Error fetching kegiatan: ", error);
    throw error;
  }
};
