import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; // Tetap import useNavigate
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import "../../styles/components/user/Navbar.css";
import { getNavbar } from "../../services/api/user/APINavbar";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("beranda");
  const [navbarData, setNavbarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navbarRef = useRef(null);
  const navigate = useNavigate(); // Tetap inisialisasi useNavigate

  // ... (useEffect dan fungsi-fungsi lain tetap sama) ...
  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const data = await getNavbar();
        setNavbarData(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch navbar data:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchNavbarData();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".navbar")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleLinkClick = (linkName) => {
    if (linkName === "admin") {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        navigate(process.env.WEB_SIE1_ADMIN_ROUTE); //  ke dashboard jika sudah login
      } else {
        navigate("/login"); //  ke login jika belum
      }
    } else {
      setActiveLink(linkName);
      const element = document.getElementById(linkName);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  // ... (Loading dan error handling) ...

  // ... (Loading dan Error handling tetap sama) ...
  if (loading) {
    return (
      <nav className="navbar navbar-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <span>Loading navigation...</span>
        </div>
      </nav>
    );
  }

  // Render fallback for error state
  if (error || !navbarData) {
    console.error("Error loading navbar data:", error);
    // Fallback to static content
    return (
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link to="/" className="navbar-brand">
            <i className="fas fa-mosque mr-2"></i>
            <span className="brand-text">SIE 1 KETAQWAAN</span>
            <span className="d-none d-sm-inline">MAN 1 JEMBER</span>
          </Link>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="#beranda" className="nav-link">
                <i className="fas fa-home nav-icon"></i>
                <span>Beranda</span>
              </a>
            </li>
            <li className="nav-item">
              <Link
                to={`${process.env.WEB_SIE1_ADMIN_ROUTE}/*`}
                className="nav-link"
              >
                <i className="fas fa-user-shield nav-icon"></i>
                <span>Admin</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  // Define navigation items (Kembali ke semula, tapi dengan isButton)
  const navItems = [
    { id: "beranda", icon: "fas fa-home", label: navbarData.NavbarHome },
    {
      id: "struktur",
      icon: "fas fa-sitemap",
      label: navbarData.NavbarStruktur,
    },
    {
      id: "proker",
      icon: "fas fa-tasks",
      label: navbarData.NavbarProgramKerja,
    },
    {
      id: "kegiatan",
      icon: "fas fa-calendar-alt",
      label: navbarData.NavbarKegiatan,
    },
    { id: "ekskul", icon: "fas fa-users", label: navbarData.NavbarEkskul },
    {
      id: "informasi",
      icon: "fas fa-info-circle",
      label: navbarData.NavbarInformasi,
    },
    { id: "saran", icon: "fas fa-comment-dots", label: navbarData.NavbarSaran },
    {
      id: "admin",
      icon: "fas fa-user-shield",
      label: navbarData.NavbarAdmin,
      isButton: true,
    },
  ];

  return (
    <nav
      ref={navbarRef}
      className={`navbar navbar-expand-lg ${scrolled ? "navbar-scrolled" : ""} ${
        isOpen ? "menu-open" : ""
      }`}
    >
      <div className="container">
        <Link to="/" className="navbar-brand">
          <i className="fas fa-mosque mr-2"></i>
          <span className="brand-text">{navbarData.NavbarJudul}</span>
          <span className="d-none d-sm-inline">
             {navbarData.NavbarSekolah}
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className={`navbar-toggler ${isOpen ? "toggler-active" : ""}`}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span className="toggler-icon">
            {isOpen ? (
              <XIcon className="menu-icon" aria-hidden="true" />
            ) : (
              <MenuIcon className="menu-icon" aria-hidden="true" />
            )}
          </span>
        </button>

        {/* Menu (Desktop & Mobile) */}
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarContent"
        >
          <div className="mobile-menu-header d-lg-none">
            <span>{navbarData.NavbarMenuMobile}</span>
            <button className="close-menu" onClick={() => setIsOpen(false)}>
              <XIcon className="close-icon" />
            </button>
          </div>

          <ul className="navbar-nav">
            {navItems.map((item) => (
              <li
                key={item.id}
                className={`nav-item ${activeLink === item.id ? "active" : ""}`}
              >
                <a
                  href={item.id === "admin" ? undefined : `#${item.id}`} // Cek admin
                  className={`nav-link ${item.isButton ? "btn-admin" : ""}`}
                  onClick={(e) => {
                    if (item.id !== "admin") {
                      e.preventDefault(); // Hanya preventDefault jika bukan admin
                    }
                    handleLinkClick(item.id);
                  }}
                >
                  <i className={`${item.icon} nav-icon`}></i>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mobile-menu-footer d-lg-none">
            {/* ... (social icons dan footer text) ... */}
            <div className="social-icons">
              <a
                href={navbarData.NavbarInstagramLink}
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href={navbarData.NavbarTiktokLink}
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tiktok"
              >
                <i className="fas fa-envelope"></i>
              </a>
            </div>
            <div className="footer-text mt-3">{navbarData.NavbarCopyRight}</div>
          </div>
        </div>
      </div>
      {/* Scroll progress indicator */}
      <div className="scroll-progress">
        <div
          className="scroll-progress-bar"
          style={{
            width: `${Math.min(
              (window.scrollY /
                (document.body.scrollHeight - window.innerHeight)) *
                100,
              100,
            )}%`,
          }}
        ></div>
      </div>
    </nav>
  );
}

export default Navbar;
