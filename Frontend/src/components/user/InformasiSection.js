import React, { useState, useEffect } from "react";
import { getInformasi } from "../../services/api/user/APIInformasiSection";
import "../../styles/components/user/InformasiSection.css";
import { Link } from "react-router-dom"; // Import Link

function InformasiSection() {
  const [informasi, setInformasi] = useState(null);
  const [loadingInformasi, setLoadingInformasi] = useState(true);
  const [errorInformasi, setErrorInformasi] = useState(null);

  useEffect(() => {
    const fetchInformasi = async () => {
      try {
        const data = await getInformasi();
        setInformasi(data);
        setLoadingInformasi(false);
      } catch (error) {
        console.error("Error fetching informasi: ", error);
        setErrorInformasi(error);
        setLoadingInformasi(false);
      }
    };

    fetchInformasi();
  }, []);

  if (loadingInformasi) {
    return <div className="loading-indicator">Loading Informasi...</div>;
  }

  if (errorInformasi) {
    return <div className="error-message">Error loading informasi.</div>;
  }

  return (
    <section id="informasi" className="informasi-section">
      <div className="container">
        <div className="informasi-content-wrapper">
          <h2 className="informasi-title">{informasi.InformasiJudul}</h2>
          <p className="informasi-description">
            {informasi.InformasiDeskripsi}
          </p>
          {informasi && (
            <Link // Menggunakan Link di sini
              to="/" // Path ke halaman anggota
              className="announcement-button"
            >
              Pengumuman
            </Link>
          )}
          {!informasi && !loadingInformasi && !errorInformasi && (
            <p>Informasi pengumuman belum tersedia.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default InformasiSection;
