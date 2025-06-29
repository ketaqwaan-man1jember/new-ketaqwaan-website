import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { apiService } from '../../services/api'
import { useApi } from '../../hooks/useApi'
import LoadingSpinner from '../LoadingSpinner'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const ProgramKerjaSection = () => {
  const { data: programData, loading, error } = useApi(apiService.getProgramKerja)

  if (loading) {
    return (
      <section id="proker" className="section-padding bg-gray-50">
        <div className="container-custom">
          <LoadingSpinner size="lg" text="Memuat program kerja..." />
        </div>
      </section>
    )
  }

  if (error || !programData) {
    return (
      <section id="proker" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center">
            <i className="fas fa-exclamation-circle text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Tidak Tersedia</h3>
            <p className="text-gray-600">Program kerja belum tersedia saat ini.</p>
          </div>
        </div>
      </section>
    )
  }

  const program = programData.programKerja

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selesai':
        return 'bg-green-100 text-green-800'
      case 'Sedang-Berlangsung':
        return 'bg-yellow-100 text-yellow-800'
      case 'Direncanakan':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <section id="proker" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
            <i className="fas fa-tasks text-2xl text-primary-600"></i>
          </div>
          <h2 className="heading-primary">{program.ProgramKerjaJudul}</h2>
          <p className="text-body max-w-3xl mx-auto mb-8">{program.ProgramKerjaDeskripsi}</p>
          
          {/* Total Programs */}
          <div className="inline-block bg-white rounded-lg shadow-sm p-6">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {program.programs?.length || 0}
            </div>
            <div className="text-gray-600 font-medium">Total Program Kerja</div>
          </div>
        </div>

        {/* Programs Carousel */}
        {program.programs && program.programs.length > 0 && (
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 32,
                },
              }}
              className="pb-12"
            >
              {program.programs.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="card h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                            <i className={`${item.icon} text-primary-600 text-xl`}></i>
                          </div>
                          <div className="text-sm font-semibold text-gray-500">
                            #{index + 1}
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 leading-tight">
                        {item.title}
                      </h3>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1">
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {item.description}
                      </p>
                      
                      {item.date && (
                        <div className="flex items-center text-sm text-gray-500 mt-auto">
                          <i className="far fa-calendar-alt mr-2"></i>
                          {item.date}
                        </div>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Empty State */}
        {(!program.programs || program.programs.length === 0) && (
          <div className="text-center py-12">
            <i className="fas fa-clipboard-list text-4xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Program</h3>
            <p className="text-gray-600">Program kerja akan segera ditambahkan.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProgramKerjaSection