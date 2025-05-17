import React, { useState, useEffect } from "react";
import { getFooter } from "../../services/api/user/APIFooter";
import { Link } from "react-router-dom";
import "../../styles/components/user/Footer.css";

function Footer() {
  const [footer, setFooter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setOpenSection(null);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFooter();
        setFooter(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-5">Memuat Footer...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-danger py-5">
        Terjadi kesalahan: {error.message}
      </div>
    );
  }

  const section = (title, id, content) => (
    <div className="footer-section">
      <h3
        className="footer-title"
        onClick={() => isMobile && toggleSection(id)}
      >
        {title}
        {isMobile && <span>{openSection === id ? "−" : "+"}</span>}
      </h3>
      <div
        className={`footer-list ${!isMobile || openSection === id ? "open" : ""}`}
      >
        {content}
      </div>
    </div>
  );

  return (
    <footer className="footer">
      <div className="footer-container">
        {section(
          "TENTANG KAMI",
          "tentang",
          <p className="footer-deskripsi">{footer.FooterDeskripsi}</p>,
        )}

        {section(
          "MENU PROFIL",
          "profil",
          <>
            <Link to="/" className="footer-link">
              › Beranda
            </Link>
            <a href="#struktur" className="footer-link">
              › Struktur Organisasi
            </a>
            <a href="#proker" className="footer-link">
              › Program Kerja
            </a>
            <a href="#kegiatan" className="footer-link">
              › Kegiatan
            </a>
            <a href="#ekskul" className="footer-link">
              › Ekstrakurikuler
            </a>
            <Link to="/informasi" className="footer-link">
              › Informasi
            </Link>
            <a href="#saran" className="footer-link">
              › Kotak Saran
            </a>
          </>,
        )}

        {section(
          "SOSIAL MEDIA",
          "sosmed",
          <>
            <a href={footer.FooterLinkInstagram} className="footer-link">
              › Instagram
            </a>
            <a href={footer.FooterLinkTiktok} className="footer-link">
              › Tiktok
            </a>
          </>,
        )}

        {section(
          "ALAMAT",
          "alamat",
          <>
            <p className="footer-address">
              {footer.FooterAlamatJalan}
              <br />
              {footer.FooterAlamatKecamatan}
              <br />
              {footer.FooterAlamatKota}
              <br />
              {footer.FooterAlamatProvinsi}
            </p>
            <p className="footer-deskripsi">{footer.FooterNarahubung}</p>
          </>,
        )}
      </div>
    </footer>
  );
}

export default Footer;
