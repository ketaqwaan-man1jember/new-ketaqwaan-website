import React, { useState } from 'react'
import { apiService } from '../../services/api'
import { useApi } from '../../hooks/useApi'
import LoadingSpinner from '../LoadingSpinner'

const StructureSection = () => {
  const { data: strukturData, loading, error } = useApi(apiService.getStructureSection)
  const [activeTab, setActiveTab] = useState('chart')

  if (loading) {
    return (
      <section id="struktur" className="section-padding bg-white">
        <div className="container-custom">
          <LoadingSpinner size="lg" text="Memuat struktur organisasi..." />
        </div>
      </section>
    )
  }

  if (error || !strukturData) {
    return (
      <section id="struktur" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center">
            <i className="fas fa-exclamation-circle text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Tidak Tersedia</h3>
            <p className="text-gray-600">Struktur organisasi belum tersedia saat ini.</p>
          </div>
        </div>
      </section>
    )
  }

  const struktur = strukturData.struktur

  // Categorize members
  const memberCategories = {
    pengurus: (struktur.members || []).filter(
      (m) =>
        m.includes('Koordinator Bidang') ||
        m.includes('Ketua') ||
        m.includes('Wakil Ketua') ||
        m.includes('Sekretaris') ||
        m.includes('Bendahara')
    ),
    koordinator: (struktur.members || []).filter(
      (m) => m.includes('Koordinator sie') || m.includes('Koordinator ekskul')
    ),
  }

  return (
    <section id="struktur" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
            <i className="fas fa-sitemap text-2xl text-primary-600"></i>
          </div>
          <h2 className="heading-primary">{struktur.Judul}</h2>
          <p className="text-body max-w-3xl mx-auto mb-6">{struktur.JudulDeskripsi}</p>
          <div className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-semibold">
            {struktur.TahunKepengurusan}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('chart')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'chart'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className="fas fa-project-diagram mr-2"></i>
              Bagan Struktur
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`px-6 py-3 rounded-md font-medium transition-all ${
                activeTab === 'list'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <i className="fas fa-list mr-2"></i>
              Daftar Pengurus
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gray-50 rounded-2xl p-8">
          {activeTab === 'chart' ? (
            <div className="overflow-x-auto">
              <div className="min-w-[800px] mx-auto">
                {/* Organizational Chart */}
                <div className="flex flex-col items-center space-y-8">
                  {/* Level 1: Koordinator Bidang */}
                  <div className="flex justify-center">
                    <div className="bg-primary-600 text-white p-6 rounded-xl text-center shadow-lg">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i className="fas fa-user-tie text-2xl"></i>
                      </div>
                      <h4 className="font-bold text-lg">{struktur.BaganStukturKorbid}</h4>
                      <p className="opacity-90">
                        {struktur.members?.find((m) => m.includes('Koordinator Bidang'))?.split(': ')[1] || ''}
                      </p>
                    </div>
                  </div>

                  {/* Connector */}
                  <div className="w-px h-8 bg-gray-300"></div>

                  {/* Level 2: Ketua */}
                  <div className="flex justify-center">
                    <div className="bg-blue-500 text-white p-6 rounded-xl text-center shadow-lg">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i className="fas fa-user-circle text-2xl"></i>
                      </div>
                      <h4 className="font-bold text-lg">{struktur.BaganStukturKetua}</h4>
                      <p className="opacity-90">
                        {struktur.members?.find((m) => m.includes('Ketua:'))?.split(': ')[1] || ''}
                      </p>
                    </div>
                  </div>

                  {/* Connector */}
                  <div className="w-px h-8 bg-gray-300"></div>

                  {/* Level 3: Sekretaris & Bendahara */}
                  <div className="flex justify-center space-x-12">
                    <div className="bg-green-500 text-white p-6 rounded-xl text-center shadow-lg">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i className="fas fa-user-edit text-2xl"></i>
                      </div>
                      <h4 className="font-bold text-lg">{struktur.BaganStukturSekretaris}</h4>
                      <p className="opacity-90">
                        {struktur.members?.find((m) => m.includes('Sekretaris 1'))?.split(': ')[1] || ''}
                      </p>
                    </div>
                    <div className="bg-orange-500 text-white p-6 rounded-xl text-center shadow-lg">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <i className="fas fa-money-check-alt text-2xl"></i>
                      </div>
                      <h4 className="font-bold text-lg">{struktur.BaganStukturBendahara}</h4>
                      <p className="opacity-90">
                        {struktur.members?.find((m) => m.includes('Bendahara 1'))?.split(': ')[1] || ''}
                      </p>
                    </div>
                  </div>

                  {/* Connector */}
                  <div className="w-px h-8 bg-gray-300"></div>

                  {/* Level 4: Koordinator Sie */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {struktur.members?.filter((m) => m.includes('Koordinator sie')).map((coordinator, index) => {
                      const parts = coordinator.split(': ')
                      const role = parts[0] || ''
                      const name = parts.length > 1 ? parts[1] : '-'
                      const division = role.replace('Koordinator sie ', '')

                      return (
                        <div key={index} className="bg-purple-500 text-white p-4 rounded-lg text-center shadow-lg">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                            <i className="fas fa-users-cog"></i>
                          </div>
                          <h5 className="font-semibold text-sm">Sie {division}</h5>
                          <p className="text-xs opacity-90">{name}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Pengurus Inti */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <i className="fas fa-user-tie text-primary-600 mr-3"></i>
                  Pengurus Inti
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {memberCategories.pengurus.map((member, index) => {
                    const parts = member.split(': ')
                    const position = parts[0] || member
                    const name = parts.length > 1 ? parts[1] : '-'
                    
                    let icon = 'fas fa-user'
                    let bgColor = 'bg-gray-100'
                    
                    if (position.includes('Koordinator Bidang')) {
                      icon = 'fas fa-user-tie'
                      bgColor = 'bg-primary-100'
                    } else if (position.includes('Ketua')) {
                      icon = 'fas fa-user-circle'
                      bgColor = 'bg-blue-100'
                    } else if (position.includes('Sekretaris')) {
                      icon = 'fas fa-user-edit'
                      bgColor = 'bg-green-100'
                    } else if (position.includes('Bendahara')) {
                      icon = 'fas fa-money-check-alt'
                      bgColor = 'bg-orange-100'
                    }

                    return (
                      <div key={index} className="card p-6">
                        <div className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <i className={`${icon} text-2xl text-gray-700`}></i>
                        </div>
                        <h4 className="font-semibold text-gray-900 text-center mb-2">{position}</h4>
                        <p className="text-primary-600 text-center font-medium">{name}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Koordinator */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <i className="fas fa-users-cog text-primary-600 mr-3"></i>
                  Koordinator
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {memberCategories.koordinator.map((member, index) => {
                    const parts = member.split(': ')
                    const position = parts[0] || member
                    const name = parts.length > 1 ? parts[1] : '-'
                    const icon = position.includes('ekskul') ? 'fas fa-star' : 'fas fa-tasks'
                    const bgColor = position.includes('ekskul') ? 'bg-yellow-100' : 'bg-purple-100'

                    return (
                      <div key={index} className="card p-6">
                        <div className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <i className={`${icon} text-2xl text-gray-700`}></i>
                        </div>
                        <h4 className="font-semibold text-gray-900 text-center mb-2">{position}</h4>
                        <p className="text-primary-600 text-center font-medium">{name}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default StructureSection