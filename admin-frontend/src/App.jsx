import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import HeroSection from './pages/HeroSection'
import StructureSection from './pages/StructureSection'
import ProgramKerja from './pages/ProgramKerja'
import Kegiatan from './pages/Kegiatan'
import Ekskul from './pages/Ekskul'
import Settings from './pages/Settings'
import Users from './pages/Users'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={!user ? <Login /> : <Navigate to="/dashboard" replace />} 
      />
      
      <Route 
        path="/*" 
        element={user ? <Layout /> : <Navigate to="/login" replace />}
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="hero-section" element={<HeroSection />} />
        <Route path="structure" element={<StructureSection />} />
        <Route path="program-kerja" element={<ProgramKerja />} />
        <Route path="kegiatan" element={<Kegiatan />} />
        <Route path="ekskul" element={<Ekskul />} />
        <Route path="settings" element={<Settings />} />
        {user?.role === 'super_admin' && (
          <Route path="users" element={<Users />} />
        )}
        <Route path="" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  )
}

export default App