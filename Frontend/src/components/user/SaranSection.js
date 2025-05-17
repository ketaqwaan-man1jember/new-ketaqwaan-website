import React, { useState, useEffect } from "react";
import { getSaran } from "../../services/api/user/APISaran";
import "../../styles/components/user/SaranSection.css"; // Import the CSS file

function SaranSection() {
  const [saran, setSaran] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSaran();
        setSaran(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Memuat Saran...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-danger py-5">
        Terjadi kesalahan: {error.message}
      </div>
    );
  }

  return (
    <section id="saran" className="saran-section">
      <div className="saran-container">
        <h2 className="saran-title">{saran.SaranJudul}</h2>
        <p className="saran-description">{saran.SaranDeskripsi}</p>
        <p className="saran-subdescription">{saran.SaranSubDeskripsi}</p>
        <a href={saran.SaranLink} className="saran-button">
          Berikan Masukan
        </a>
      </div>
    </section>
  );
}

export default SaranSection;
