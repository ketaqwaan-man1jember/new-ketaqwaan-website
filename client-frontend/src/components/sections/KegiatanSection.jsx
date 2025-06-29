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

const KegiatanSection = () => {
  const { data: kegiatanData, loading, error } = useApi(apiService.getKegiatan)

  if (loading) {
    return (
      <section id="kegiatan" className="section-padding bg-white">
        <div className="container-custom">
          <LoadingSpinner size="lg" text="Memuat kegiatan PHBI..." />
        </div>
      </section>
    )
  }

  if (error || !kegiatanData) {
    return (
      <section id="kegiatan" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center">
            <i className="fas fa-exclamation-circle text-4xl text-gray-400 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Tidak Tersedia</h3>
            <p className="text-gray-600">Kegiatan PHBI belum tersedia saat ini.</p>
          </div>
        </div>
      </section>
    )
  }

  const kegiatan = kegiatanData.kegiatan

  return (
    <section id="kegiatan" className="section-padding bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-6">
            <i className="fas fa-calendar-alt text-2xl text-primary-600"></i>
          </div>
          <h2 className="heading-primary">{kegiatan.KegiatanJudul}</h2>
          <p className="text-body max-w-3xl mx-auto">{kegiatan.KegiatanDeskripsi}</p>
        </div>

        {/* Activities Carousel */}
        {kegiatan.KegiatanSlide && kegiatan.KegiatanSlide.length > 0 && (
          <div className="relative">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 5000,
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
              {kegiatan.KegiatanSlide.map((activity, index) => (
                <SwiperSlide key={index}>
                  <div className="card h-full overflow-hidden group">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {/* Date Badge */}
                      {activity.date && (
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                          <div className="flex items-center text-sm font-medium text-gray-900">
                            <i className="far fa-calendar-alt mr-2 text-primary-600"></i>
                            {activity.date}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="font-bold text-lg text-gray-900 mb-3 leading-tight">
                        {activity.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Empty State */}
        {(!kegiatan.KegiatanSlide || kegiatan.KegiatanSlide.length === 0) && (
          <div className="text-center py-12">
            <i className="fas fa-calendar-times text-4xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Belum Ada Kegiatan</h3>
            <p className="text-gray-600">Kegiatan PHBI akan segera ditambahkan.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default KegiatanSection