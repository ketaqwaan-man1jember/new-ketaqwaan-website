import React, { useState, useEffect } from "react";
import { getKegiatan } from "../../services/api/user/APIKegiatanSection"; // Asumsi API endpoint
import KegiatanCard from "./KegiatanCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/components/user/KegiatanSection.css";

function KegiatanSection() {
  const [kegiatan, setKegiatan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getKegiatan();
        setKegiatan(data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching kegiatan:", error);
        setError(error);
        setKegiatan([]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading-indicator">Memuat Kegiatan PHBI...</div>;
  }

  if (error) {
    return (
      <div className="error-message">Terjadi kesalahan: {error.message}</div>
    );
  }

  if (!kegiatan || kegiatan.length === 0) {
    return (
      <section id="kegiatan" className="kegiatan-section">
        <div className="kegiatan-container">
          <h2 className="kegiatan-title">Peringatan Hari Besar Islam</h2>
          <p className="no-data-message">
            Saat ini belum ada kegiatan PHBI yang tersedia.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="kegiatan" className="kegiatan-section">
      <div className="kegiatan-container">
        <h2 className="kegiatan-title">{kegiatan.KegiatanJudul}</h2>
        <p className="kegiatan-subtitle">{kegiatan.KegiatanDeskripsi}</p>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation={kegiatan.length > 1}
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
          className="kegiatan-swiper"
        >
          {kegiatan.KegiatanSlide.map((item, index) => (
            <SwiperSlide key={item.title || index}>
              <KegiatanCard kegiatan={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default KegiatanSection;
