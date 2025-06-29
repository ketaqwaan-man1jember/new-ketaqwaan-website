import React from 'react'
import { Link } from 'react-router-dom'
import { apiService } from '../services/api'
import { useApi } from '../hooks/useApi'

const Footer = () => {
  const { data: footerData, loading, error } = useApi(apiService.getFooter)
  const { data: navbarData } = useApi(apiService.getNavbar)

  if (loading) {
    return (
      <footer className="bg-primary-800 text-white py-12">
        <div className="container-custom">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </div>
      </footer>
    )
  }

  if (error || !footerData) {
    return (
      <footer className="bg-primary-800 text-white py-12">
        <div className="container-custom">
          <div className="text-center">
            <p>&copy; 2025 SIE 1 KETAQWAAN MAN 1 JEMBER</p>
          </div>
        </div>
      </footer>
    )
  }

  const footer = footerData.footer
  const navbar = navbarData?.navbar

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-primary-800 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <i className="fas fa-mosque text-2xl"></i>
              <div>
                <h3 className="font-bold text-lg">
                  {navbar?.NavbarJudul || 'SIE 1 KETAQWAAN'}
                </h3>
                <p className="text-sm text-gray-300">
                  {navbar?.NavbarSekolah || 'MAN 1 Jember'}
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {footer.FooterDeskripsi}
            </p>
            <div className="flex space-x-4">
              {footer.FooterLinkInstagram && (
                <a
                  href={footer.FooterLinkInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              )}
              {footer.FooterLinkTiktok && (
                <a
                  href={footer.FooterLinkTiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <i className="fab fa-tiktok"></i>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Menu Navigasi</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('beranda')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Beranda
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('struktur')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Struktur Organisasi
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('proker')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Program Kerja
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('kegiatan')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Kegiatan PHBI
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('ekskul')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Ekstrakurikuler
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Alamat</h4>
            <div className="text-gray-300 space-y-2">
              <p>{footer.FooterAlamatJalan}</p>
              <p>{footer.FooterAlamatKecamatan}</p>
              <p>{footer.FooterAlamatKota}</p>
              <p>{footer.FooterAlamatProvinsi}</p>
            </div>
            {footer.FooterNarahubung && (
              <div className="mt-4 p-3 bg-white/10 rounded-lg">
                <p className="text-sm">{footer.FooterNarahubung}</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            {navbar?.NavbarCopyRight || '© 2025 SIE 1 KETAQWAAN MAN 1 JEMBER'}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer