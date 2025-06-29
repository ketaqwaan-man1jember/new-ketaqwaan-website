import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

// API functions
export const apiService = {
  // Hero Section
  getHeroSection: () => api.get('/hero'),
  
  // Structure Section
  getStructureSection: () => api.get('/struktur'),
  
  // Program Kerja
  getProgramKerja: () => api.get('/program-kerja'),
  
  // Kegiatan
  getKegiatan: () => api.get('/kegiatan'),
  
  // Ekskul
  getEkskul: () => api.get('/ekskul'),
  
  // Settings
  getNavbar: () => api.get('/navbar'),
  getFooter: () => api.get('/footer'),
  getInformasi: () => api.get('/informasi'),
  getSaran: () => api.get('/saran'),
}

export default api