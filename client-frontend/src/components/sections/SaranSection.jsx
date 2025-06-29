import React from 'react'
import { apiService } from '../../services/api'
import { useApi } from '../../hooks/useApi'
import LoadingSpinner from '../LoadingSpinner'

const SaranSection = () => {
  const { data: saranData, loading, error } = useApi(apiService.getSaran)

  if (loading) {
    return (
      <section id="saran" className="section-padding bg-gray-50">
        <div className="container-custom">
          <LoadingSpinner size="lg" text="Memuat kotak saran..." />
        </div>
      </section>
    )
  }

  if (error || !saranData) {
    return (
      <section id="saran" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center">
            <i className="fas fa-exclamation-circle text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Tidak Tersedia</h3>
            <p className="text-gray-600">Kotak saran belum tersedia saat ini.</p>
          </div>
        </div>
      </section>
    )
  }

  const saran = saranData.saran

  return (
    <section id="saran" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
              <i className="fas fa-comment-dots text-2xl text-primary-600"></i>
            </div>
            <h2 className="heading-primary">{saran.SaranJudul}</h2>
            <p className="text-body max-w-3xl mx-auto mb-4">{saran.SaranDeskripsi}</p>
            <p className="text-body max-w-3xl mx-auto">{saran.SaranSubDeskripsi}</p>
          </div>

          {/* Suggestion Box */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-paper-plane text-2xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Suara Anda Penting</h3>
              <p className="text-gray-600 mb-8">
                Kami menghargai setiap masukan dari Anda. Kritik, saran, dan apresiasi akan membantu kami berkembang lebih baik.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-user-secret text-green-600"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Anonim</h4>
                <p className="text-sm text-gray-600">Identitas Anda terjaga</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-shield-alt text-blue-600"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Aman</h4>
                <p className="text-sm text-gray-600">Data terlindungi dengan baik</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-heart text-purple-600"></i>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Dihargai</h4>
                <p className="text-sm text-gray-600">Setiap masukan berarti</p>
              </div>
            </div>

            {/* CTA Button */}
            {saran.SaranLink && (
              <a
                href={saran.SaranLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-full hover:from-primary-700 hover:to-primary-800 transition-all transform hover:scale-105 shadow-lg"
              >
                <i className="fas fa-external-link-alt mr-2"></i>
                Berikan Masukan
              </a>
            )}

            {/* No Link State */}
            {!saran.SaranLink && (
              <div className="bg-gray-100 rounded-lg p-6">
                <i className="fas fa-tools text-2xl text-gray-400 mb-2"></i>
                <p className="text-gray-600">Kotak saran sedang dalam pengembangan.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SaranSection