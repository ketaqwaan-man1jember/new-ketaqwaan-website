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

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  setAuthToken: (token) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete api.defaults.headers.common['Authorization']
    }
  },
  
  login: (email, password) => 
    api.post('/auth/login', { email, password }),
  
  getCurrentUser: () => 
    api.get('/auth/me'),
  
  changePassword: (currentPassword, newPassword) => 
    api.put('/auth/change-password', { currentPassword, newPassword }),
  
  getUsers: () => 
    api.get('/auth/users'),
  
  registerUser: (userData) => 
    api.post('/auth/register', userData),
  
  toggleUserStatus: (userId) => 
    api.put(`/auth/users/${userId}/toggle-status`),
}

// Content API
export const contentAPI = {
  // Hero Section
  getHeroSection: () => api.get('/hero'),
  updateHeroSection: (id, data) => api.put(`/hero/${id}`, data),
  createHeroSection: (data) => api.post('/hero', data),
  uploadHeroImage: (formData) => api.post('/hero/upload-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  // Structure Section
  getStructureSection: () => api.get('/struktur'),
  updateStructureSection: (id, data) => api.put(`/struktur/${id}`, data),
  createStructureSection: (data) => api.post('/struktur', data),

  // Program Kerja
  getProgramKerja: () => api.get('/program-kerja'),
  updateProgramKerja: (id, data) => api.put(`/program-kerja/${id}`, data),
  createProgramKerja: (data) => api.post('/program-kerja', data),

  // Kegiatan
  getKegiatan: () => api.get('/kegiatan'),
  updateKegiatan: (id, data) => api.put(`/kegiatan/${id}`, data),
  createKegiatan: (data) => api.post('/kegiatan', data),
  uploadKegiatanImage: (formData) => api.post('/kegiatan/upload-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  // Ekskul
  getEkskul: () => api.get('/ekskul'),
  updateEkskul: (id, data) => api.put(`/ekskul/${id}`, data),
  createEkskul: (data) => api.post('/ekskul', data),
  uploadEkskulImage: (formData) => api.post('/ekskul/upload-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  // Settings
  getNavbar: () => api.get('/navbar'),
  updateNavbar: (data) => api.put('/navbar', data),
  
  getFooter: () => api.get('/footer'),
  updateFooter: (data) => api.put('/footer', data),
  
  getInformasi: () => api.get('/informasi'),
  updateInformasi: (data) => api.put('/informasi', data),
  
  getSaran: () => api.get('/saran'),
  updateSaran: (data) => api.put('/saran', data),
}

export default api