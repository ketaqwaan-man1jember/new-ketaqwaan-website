import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiService } from '../services/api'
import { useApi } from '../hooks/useApi'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('beranda')

  const { data: navbarData, loading, error } = useApi(apiService.getNavbar)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    const handleSectionChange = () => {
      const sections = ['beranda', 'struktur', 'proker', 'kegiatan', 'ekskul', 'informasi', 'saran']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('scroll', handleSectionChange)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleSectionChange)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  if (loading) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="container-custom">
          <div className="flex items-center justify-center h-16">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
          </div>
        </div>
      </nav>
    )
  }

  if (error || !navbarData) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <i className="fas fa-mosque text-primary-600 text-xl"></i>
              <span className="font-bold text-gray-900">SIE 1 KETAQWAAN</span>
            </Link>
          </div>
        </div>
      </nav>
    )
  }

  const navbar = navbarData.navbar

  const navItems = [
    { id: 'beranda', label: navbar.NavbarHome || 'Beranda', icon: 'fas fa-home' },
    { id: 'struktur', label: navbar.NavbarStruktur || 'Struktur', icon: 'fas fa-sitemap' },
    { id: 'proker', label: navbar.NavbarProgramKerja || 'Program Kerja', icon: 'fas fa-tasks' },
    { id: 'kegiatan', label: navbar.NavbarKegiatan || 'PHBI', icon: 'fas fa-calendar-alt' },
    { id: 'ekskul', label: navbar.NavbarEkskul || 'Ekstrakurikuler', icon: 'fas fa-users' },
    { id: 'informasi', label: navbar.NavbarInformasi || 'Informasi', icon: 'fas fa-info-circle' },
    { id: 'saran', label: navbar.NavbarSaran || 'Kotak Saran', icon: 'fas fa-comment-dots' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'navbar-scrolled' : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 navbar-brand">
            <i className="fas fa-mosque text-primary-600 text-xl"></i>
            <div className="flex flex-col">
              <span className="font-bold text-sm leading-tight">
                {navbar.NavbarJudul || 'SIE 1 KETAQWAAN'}
              </span>
              <span className="text-xs text-gray-500 leading-tight">
                {navbar.NavbarSekolah || 'MAN 1 Jember'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`nav-link px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                <i className={`${item.icon} mr-2`}></i>
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          >
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <i className={`${item.icon} mr-3`}></i>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar