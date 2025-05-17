// src/services/api.js
import axios from "axios";

const BASE_URL = window.location.origin;

export const getProgramKerja = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/data/ProgramKerjaSection.json`,
    );
    return response.data.programKerja;
  } catch (error) {
    console.error("Error fetching program kerja:", error);
    throw error;
  }
};
