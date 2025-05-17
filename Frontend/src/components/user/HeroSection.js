import React, { useState, useEffect } from "react";
import { getHeroData } from "../../services/api/user/APIHeroSection";
import "../../styles/components/user/HeroSection.css";

function HeroSection() {
  const [heroData, setHeroData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hero data
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await getHeroData();
        setHeroData(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch hero data:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // Animation and visibility effect
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!heroData || !heroData.slides) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroData.slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroData]);

  // Manual slide change
  const goToSlide = (index) => {
    setActiveSlide(index);
  };

  // Render loading state
  if (loading) {
    return (
      <section id="beranda" className="hero-section loading-hero">
        <div className="loading-container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <span>Loading content...</span>
          </div>
        </div>
      </section>
    );
  }

  // Render error state
  if (error || !heroData) {
    return (
      <section id="beranda" className="hero-section error-hero">
        <div className="error-container">
          <div className="error-message">
            <i className="fas fa-exclamation-triangle"></i>
            <h2>Oops! Something went wrong</h2>
            <p>We couldn't load the hero content. Please try again later.</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="beranda" className="hero-section">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>

      <div className="hero-container">
        <div className={`hero-content ${isVisible ? "fade-in" : ""}`}>
          <div className="logo-container">
            <img
              src={heroData.HeroLogoSie1}
              alt={heroData.HeroDeskripsiLogoSie1}
              className="hero-logo pulse"
            />
          </div>

          <div className="text-content">
            <h1 className="hero-title">
              <span className="welcome-text">{heroData.HeroWelcomeText}</span>
              <span className="primary-text">{heroData.HeroPrimaryText}</span>
              <span className="secondary-text">
                {heroData.HeroSecondaryText}
              </span>
            </h1>

            <p className="hero-description">{heroData.HeroDescription}</p>

            <div className="hero-stats">
              {heroData.HeroInforSie1.map((stat, index) => (
                <div className="stat-item" key={index}>
                  <span className="stat-number">{Object.values(stat)[0]}</span>
                  <span className="stat-label">{Object.values(stat)[1]}</span>
                </div>
              ))}
            </div>

            <div className="hero-cta">
              {heroData.cta.map((button, index) => (
                <a
                  key={index}
                  href={button.link}
                  className={`cta-button ${button.type}`}
                >
                  {button.text}
                  <i className={button.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={`hero-carousel ${isVisible ? "slide-in-right" : ""}`}>
          <div className="carousel-container">
            <div
              className="carousel-slides"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {heroData.slides.map((slide, index) => (
                <div className="carousel-slide" key={slide.id}>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="slide-image"
                    onError={(e) => {
                      e.target.src = "/image-index/fallback-image.jpg"; // Fallback image
                      console.warn(`Failed to load image: ${slide.image}`);
                    }}
                  />
                  <div className="slide-content">
                    <h3>{slide.title}</h3>
                    <p>{slide.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="carousel-controls">
              <button
                className="control prev"
                onClick={() =>
                  goToSlide(
                    (activeSlide - 1 + heroData.slides.length) %
                      heroData.slides.length,
                  )
                }
                aria-label="Previous slide"
              >
                <i className="fas fa-chevron-left"></i>
              </button>

              <div className="carousel-indicators">
                {heroData.slides.map((_, index) => (
                  <button
                    key={index}
                    className={`indicator ${
                      activeSlide === index ? "active" : ""
                    }`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  ></button>
                ))}
              </div>

              <button
                className="control next"
                onClick={() =>
                  goToSlide((activeSlide + 1) % heroData.slides.length)
                }
                aria-label="Next slide"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="hero-wave"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 1,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          height="100"
        >
          <defs>
            <linearGradient
              id="wave-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#f9fafb" />
              <stop offset="50%" stopColor="#f9fafb" />
              <stop offset="100%" stopColor="#f9fafb" />
            </linearGradient>
          </defs>
          <path
            fill="url(#wave-gradient)"
            d="M0,17L34.3,21C68.6,25,137,33,206,31C274.3,29,343,17,411,15C480,13,549,21,617,29C685.7,37,754,45,823,43C891.4,41,960,29,1029,27C1097.1,25,1166,33,1234,37C1302.9,41,1371,41,1406,41L1440,41L1440,100L1405.7,100C1371.4,100,1303,100,1234,100C1165.7,100,1097,100,1029,100C960,100,891,100,823,100C754.3,100,686,100,617,100C548.6,100,480,100,411,100C342.9,100,274,100,206,100C137.1,100,69,100,34,100L0,100Z"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
                M0,17L34.3,21C68.6,25,137,33,206,31C274.3,29,343,17,411,15C480,13,549,21,617,29C685.7,37,754,45,823,43C891.4,41,960,29,1029,27C1097.1,25,1166,33,1234,37C1302.9,41,1371,41,1406,41L1440,41L1440,100L1405.7,100C1371.4,100,1303,100,1234,100C1165.7,100,1097,100,1029,100C960,100,891,100,823,100C754.3,100,686,100,617,100C548.6,100,480,100,411,100C342.9,100,274,100,206,100C137.1,100,69,100,34,100L0,100Z;

                M0,5L34.3,11C68.6,17,137,29,206,33C274.3,37,343,33,411,27C480,21,549,13,617,15C685.7,17,754,29,823,37C891.4,45,960,49,1029,47C1097.1,45,1166,37,1234,35C1302.9,33,1371,37,1406,39L1440,41L1440,100L1405.7,100C1371.4,100,1303,100,1234,100C1165.7,100,1097,100,1029,100C960,100,891,100,823,100C754.3,100,686,100,617,100C548.6,100,480,100,411,100C342.9,100,274,100,206,100C137.1,100,69,100,34,100L0,100Z;

                M0,17L34.3,21C68.6,25,137,33,206,31C274.3,29,343,17,411,15C480,13,549,21,617,29C685.7,37,754,45,823,43C891.4,41,960,29,1029,27C1097.1,25,1166,33,1234,37C1302.9,41,1371,41,1406,41L1440,41L1440,100L1405.7,100C1371.4,100,1303,100,1234,100C1165.7,100,1097,100,1029,100C960,100,891,100,823,100C754.3,100,686,100,617,100C548.6,100,480,100,411,100C342.9,100,274,100,206,100C137.1,100,69,100,34,100L0,100Z"
            />
          </path>
          <path
            fill="url(#wave-gradient)"
            fillOpacity="0.5"
            d="M0,64L34.3,59C68.6,53,137,41,206,43C274.3,45,343,60,411,60C480,60,549,45,617,35C685.7,25,754,21,823,27C891.4,33,960,49,1029,57C1097.1,64,1166,64,1234,60C1302.9,57,1371,49,1406,45L1440,41L1440,100L1405.7,100C1371.4,100,1303,100,1234,100C1165.7,100,1097,100,1029,100C960,100,891,100,823,100C754.3,100,686,100,617,100C548.6,100,480,100,411,100C342.9,100,274,100,206,100C137.1,100,69,100,34,100L0,100Z"
          >
            <animate
              attributeName="d"
              dur="15s"
              repeatCount="indefinite"
              values="
                M0,64L34.3,59C68.6,53,137,41,206,43C274.3,45,343,60,411,60C480,60,549,45,617,35C685.7,25,754,21,823,27C891.4,33,960,49,1029,57C1097.1,64,1166,64,1234,60C1302.9,57,1371,49,1406,45L1440,41L1440,100L1405.7,100C1371.4,100,1303,100,1234,100C1165.7,100,1097,100,1029,100C960,100,891,100,823,100C754.3,100,686,100,617,100C548.6,100,480,100,411,100C342.9,100,274,100,206,100C137.1,100,69,100,34,100L0,100Z;

                M0,53L34.3,55C68.6,57,137,60,206,57C274.3,53,343,41,411,43C480,45,549,60,617,62C685.7,64,754,53,823,45C891.4,37,960,33,1029,37C1097.1,41,1166,53,1234,60C1302.9,69,1371,72,1406,74L1440,76L1440,100L1405.7,100C1371.4,100,1303,100,1234,100C1165.7,100,1097,100,1029,100C960,100,891,100,823,100C754.3,100,686,100,617,100C548.6,100,480,100,411,100C342.9,100,274,100,206,100C137.1,100,69,100,34,100L0,100Z;

                M0,64L34.3,59C68.6,53,137,41,206,43C274.3,45,343,60,411,60C480,60,549,45,617,35C685.7,25,754,21,823,27C891.4,33,960,49,1029,57C1097.1,64,1166,64,1234,60C1302.9,57,1371,49,1406,45L1440,41L1440,100L1405.7,100C1371.4,100,1303,100,1234,100C1165.7,100,1097,100,1029,100C960,100,891,100,823,100C754.3,100,686,100,617,100C548.6,100,480,100,411,100C342.9,100,274,100,206,100C137.1,100,69,100,34,100L0,100Z"
            />
          </path>
        </svg>
      </div>
    </section>
  );
}

export default HeroSection;
