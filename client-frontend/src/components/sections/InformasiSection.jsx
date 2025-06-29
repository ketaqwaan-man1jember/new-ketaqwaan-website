import React from 'react'
import { apiService } from '../../services/api'
import { useApi } from '../../hooks/useApi'
import LoadingSpinner from '../LoadingSpinner'

const InformasiSection = () => {
  const { data: informasiData, loading, error } = useApi(apiService.getInformasi)

  if (loading) {
    return (
      <section id="informasi" className="section-padding bg-white">
        <div className="container-custom">
          <LoadingSpinner size="lg" text="Memuat informasi..." />
        </div>
      </section>
    )
  }

  if (error || !informasiData) {
    return (
      <section id="informasi" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center">
            <i className="fas fa-exclamation-circle text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Tidak Tersedia</h3>
            <p className="text-gray-600">Informasi belum tersedia saat ini.</p>
          </div>
        </div>
      </section>
    )
  }

  const informasi = informasiData.informasi

  return (
    <section id="informasi" className="section-padding bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
              <i className="fas fa-info-circle text-2xl text-primary-600"></i>
            </div>
            <h2 className="heading-primary">{informasi.InformasiJudul}</h2>
            <p className="text-body max-w-3xl mx-auto mb-8">{informasi.InformasiDeskripsi}</p>
          </div>

          {/* CTA Button */}
          {informasi.InfomasiLink && (
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
              <div className="mb-6">
                <i className="fas fa-bullhorn text-4xl mb-4 opacity-90"></i>
                <h3 className="text-2xl font-bold mb-2">Pengumuman Penting</h3>
                <p className="opacity-90">Klik tombol di bawah untuk melihat informasi terbaru</p>
              </div>
              
              <a
                href={informasi.InfomasiLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
              >
                <i className="fas fa-external-link-alt mr-2"></i>
                Lihat Pengumuman
              </a>
            </div>
          )}

          {/* No Link State */}
          {!informasi.InfomasiLink && (
            <div className="bg-gray-100 rounded-2xl p-8">
              <i className="fas fa-clock text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Segera Hadir</h3>
              <p className="text-gray-600">Pengumuman akan segera tersedia.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default InformasiSection