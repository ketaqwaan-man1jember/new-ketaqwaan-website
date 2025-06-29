import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules'
import { apiService } from '../../services/api'
import { useApi } from '../../hooks/useApi'
import LoadingSpinner from '../LoadingSpinner'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const HeroSection = () => {
  const { data: heroData, loading, error } = useApi(apiService.getHeroSection)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  if (loading) {
    return (
      <section id="beranda" className="min-h-screen gradient-bg flex items-center justify-center">
        <LoadingSpinner size="xl" text="Memuat konten hero..." />
      </section>
    )
  }

  if (error || !heroData) {
    return (
      <section id="beranda" className="min-h-screen gradient-bg flex items-center justify-center text-white">
        <div className="text-center">
          <i className="fas fa-exclamation-triangle text-6xl mb-4 opacity-50"></i>
          <h2 className="text-2xl font-bold mb-2">Gagal Memuat Konten</h2>
          <p className="opacity-75">Silakan refresh halaman atau coba lagi nanti</p>
        </div>
      </section>
    )
  }

  const hero = heroData.heroSection

  return (
    <section id="beranda" className="relative min-h-screen gradient-bg text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className={`space-y-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              {/* Logo */}
              {hero.HeroLogoSie1 && (
                <div className="flex justify-center lg:justify-start">
                  <img
                    src={hero.HeroLogoSie1}
                    alt={hero.HeroDeskripsiLogoSie1}
                    className="w-24 h-24 lg:w-32 lg:h-32 animate-pulse"
                  />
                </div>
              )}

              {/* Text Content */}
              <div className="text-center lg:text-left">
                <p className="text-lg lg:text-xl mb-2 opacity-90">
                  {hero.HeroWelcomeText}
                </p>
                <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
                  <span className="block">{hero.HeroPrimaryText}</span>
                  <span className="block text-2xl lg:text-3xl font-semibold opacity-90">
                    {hero.HeroSecondaryText}
                  </span>
                </h1>
                <p className="text-lg lg:text-xl opacity-90 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  {hero.HeroDescription}
                </p>
              </div>

              {/* Statistics */}
              {hero.HeroInforSie1 && hero.HeroInforSie1.length > 0 && (
                <div className="grid grid-cols-3 gap-4 lg:gap-8">
                  {hero.HeroInforSie1.map((stat, index) => (
                    <div key={index} className="text-center lg:text-left">
                      <div className="text-2xl lg:text-4xl font-bold text-yellow-300">
                        {Object.values(stat)[0]}
                      </div>
                      <div className="text-sm lg:text-base opacity-90">
                        {Object.values(stat)[1]}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* CTA Buttons */}
              {hero.cta && hero.cta.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  {hero.cta.map((button, index) => (
                    <a
                      key={index}
                      href={button.link}
                      className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 ${
                        button.type === 'primary'
                          ? 'bg-white text-primary-600 hover:bg-gray-100'
                          : 'border-2 border-white text-white hover:bg-white hover:text-primary-600'
                      }`}
                    >
                      {button.text}
                      {button.icon && <i className={`${button.icon} ml-2`}></i>}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Image Carousel */}
            {hero.slides && hero.slides.length > 0 && (
              <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectFade]}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                    effect="fade"
                    navigation
                    pagination={{ clickable: true }}
                    className="h-96 lg:h-[500px]"
                  >
                    {hero.slides.map((slide) => (
                      <SwiperSlide key={slide.id}>
                        <div className="relative h-full">
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
                            <p className="opacity-90">{slide.description}</p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="hero-wave">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </section>
  )
}

export default HeroSection