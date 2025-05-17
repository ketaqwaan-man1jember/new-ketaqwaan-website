import React, { useState, useEffect } from "react";
import { getEkskul } from "../../services/api/user/APIEkskulSection";
import EkskulCard from "./EkskulCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/components/user/EkskulSection.css"; // Import CSS kustom untuk Swiper dan sedikit styling Bootstrap

function EkskulSection() {
  const [ekskul, setEkskul] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEkskul();
        setEkskul(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Memuat Ekstrakurikuler...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-danger py-5">
        Terjadi kesalahan: {error.message}
      </div>
    );
  }

  return (
    <section id="ekskul" className="ekskul-section bg-light py-5">
      <div className="container">
        <h2 className="ekskul-title">{ekskul.EkskulJudul}</h2>
        <p className="ekskul-subtitle">{ekskul.EkskulDeskripsi}</p>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={ekskul.length > 1}
          pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          className="ekskul-swiper" // Class kustom tetap digunakan untuk Swiper
        >
          {ekskul.EkskulSlide.map((item, index) => (
            <SwiperSlide key={index}>
              <EkskulCard ekskul={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default EkskulSection;
