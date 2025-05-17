import React, { useState, useEffect } from "react";
import { getStruktur } from "../../services/api/user/APIStructureSection";
import "../../styles/components/user/StructureSection.css";

function StructureSection() {
  const [struktur, setStruktur] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("chart");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStruktur();
        setStruktur(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch struktur data:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section id="struktur" className="structure-section">
        <div className="container">
          <div className="loading-animation">
            <div className="mosque-loader">
              <div className="dome"></div>
              <div className="base"></div>
            </div>
            <p>Memuat struktur organisasi...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="struktur" className="structure-section">
        <div className="container">
          <div className="error-container">
            <i className="fas fa-exclamation-circle"></i>
            <h3>Gagal memuat data</h3>
            <p>
              Mohon maaf, terjadi kesalahan saat memuat data struktur
              organisasi.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="reload-btn"
            >
              <i className="fas fa-redo-alt"></i> Coba Lagi
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!struktur || !struktur.members) {
    return (
      <section id="struktur" className="structure-section">
        <div className="container">
          <div className="error-container">
            <i className="fas fa-info-circle"></i>
            <h3>Data Tidak Tersedia</h3>
            <p>Struktur organisasi belum tersedia saat ini.</p>
          </div>
        </div>
      </section>
    );
  }

  // Pastikan properties tersedia sebelum mengakses
  const memberCategories = {
    pengurus: (struktur.members || []).filter(
      (m) =>
        m.includes("Koordinator Bidang") ||
        m.includes("Ketua") ||
        m.includes("Wakil Ketua") ||
        m.includes("Sekretaris") ||
        m.includes("Bendahara"),
    ),
    koordinator: (struktur.members || []).filter(
      (m) => m.includes("Koordinator sie") || m.includes("Koordinator ekskul"),
    ),
  };

  return (
    <section id="struktur" className="structure-section">
      <div className="container">
        <div className="structure-header">
          <div className="structure-icon">
            <i className="fas fa-sitemap"></i>
          </div>
          <h2 className="structure-title">
            {struktur.Judul || "Struktur Organisasi"}
          </h2>
          <p className="structure-description">
            {struktur.JudulDeskripsi || ""}
          </p>
          <div className="structure-year">
            <span className="year-badge">
              {struktur.TahunKepengurusan || "Periode Terkini"}
            </span>
          </div>
        </div>

        <div className="structure-tabs">
          <button
            className={`tab-btn ${activeTab === "chart" ? "active" : ""}`}
            onClick={() => setActiveTab("chart")}
          >
            <i className="fas fa-project-diagram"></i> Bagan Struktur
          </button>
          <button
            className={`tab-btn ${activeTab === "list" ? "active" : ""}`}
            onClick={() => setActiveTab("list")}
          >
            <i className="fas fa-list"></i> Daftar Pengurus
          </button>
        </div>

        <div className="structure-content">
          {activeTab === "chart" ? (
            <div className="org-chart">
              <div className="org-tree">
                <div className="org-level level-1">
                  <div className="org-member ketua">
                    <div className="member-avatar">
                      <i className="fas fa-user-circle"></i>
                    </div>
                    <div className="member-info">
                      <h4>{struktur.BaganStukturKorbid}</h4>
                      <p>
                        {(struktur.members || [])
                          .find((m) => m.includes(""))
                          ?.split(": ")[1] || ""}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="connector"></div>

                <div className="org-level level-2">
                  <div className="org-member">
                    <div className="member-avatar">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="member-info">
                      <h4>{struktur.BaganStukturKetua}</h4>
                      <p>
                        {(struktur.members || [])
                          .find((m) => m.includes("Ketua:"))
                          ?.split(": ")[1] || ""}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="connector"></div>

                <div className="org-level level-3">
                  <div className="org-member-group">
                    <div className="org-member">
                      <div className="member-avatar">
                        <i className="fas fa-user-edit"></i>
                      </div>
                      <div className="member-info">
                        <h4>{struktur.BaganStukturSekretaris}</h4>
                        <p>
                          {(struktur.members || [])
                            .find((m) => m.includes("Sekretaris 1"))
                            ?.split(": ")[1] || ""}
                        </p>
                      </div>
                    </div>

                    <div className="org-member">
                      <div className="member-avatar">
                        <i className="fas fa-money-check-alt"></i>
                      </div>
                      <div className="member-info">
                        <h4>{struktur.BaganStukturBendahara}</h4>
                        <p>
                          {(struktur.members || [])
                            .find((m) => m.includes("Bendahara 1"))
                            ?.split(": ")[1] || ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="connector"></div>

                <div className="org-level level-4">
                  <div className="org-member-group">
                    {(struktur.members || [])
                      .filter((m) => m.includes("Koordinator sie"))
                      .map((coordinator, index) => {
                        const parts = coordinator.split(": ");
                        const role = parts[0] || "";
                        const name = parts.length > 1 ? parts[1] : "-";
                        const division = role.replace("Koordinator sie ", "");

                        return (
                          <div className="org-member" key={index}>
                            <div className="member-avatar">
                              <i className="fas fa-users-cog"></i>
                            </div>
                            <div className="member-info">
                              <h4>Sie {division}</h4>
                              <p>{name || "-"}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                <div className="connector"></div>

                <div className="org-level level-5">
                  <div className="org-member-group">
                    {(struktur.members || [])
                      .filter((m) => m.includes("Koordinator ekskul"))
                      .map((coordinator, index) => {
                        const parts = coordinator.split(": ");
                        const role = parts[0] || "";
                        const name = parts.length > 1 ? parts[1] : "-";
                        const ekskul = role.replace("Koordinator ekskul ", "");

                        return (
                          <div className="org-member" key={index}>
                            <div className="member-avatar">
                              <i className="fas fa-star"></i>
                            </div>
                            <div className="member-info">
                              <h4>Ekskul {ekskul}</h4>
                              <p>{name || "-"}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="members-list">
              <div className="members-category">
                <h3 className="category-title">
                  <i className="fas fa-user-tie"></i> Pengurus Inti
                </h3>
                <div className="members-grid">
                  {memberCategories.pengurus.map((member, index) => {
                    const parts = member.split(": ");
                    const position = parts[0] || member;
                    const name = parts.length > 1 ? parts[1] : "-";
                    let icon = "fas fa-user";

                    if (position.includes("Koordinator Bidang"))
                      icon = "fas fa-user-tie";
                    else if (position.includes("Ketua"))
                      icon = "fas fa-user-circle";
                    else if (position.includes("Wakil Ketua"))
                      icon = "fas fa-user-friends";
                    else if (position.includes("Sekretaris"))
                      icon = "fas fa-user-edit";
                    else if (position.includes("Bendahara"))
                      icon = "fas fa-money-check-alt";

                    return (
                      <div className="member-card" key={index}>
                        <div className="member-icon">
                          <i className={icon}></i>
                        </div>
                        <div className="member-details">
                          <h4 className="member-position">{position}</h4>
                          <p className="member-name">{name}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="members-category">
                <h3 className="category-title">
                  <i className="fas fa-users-cog"></i> Koordinator
                </h3>
                <div className="members-grid">
                  {memberCategories.koordinator.map((member, index) => {
                    const parts = member.split(": ");
                    const position = parts[0] || member;
                    const name = parts.length > 1 ? parts[1] : "-";
                    const icon = position.includes("ekskul")
                      ? "fas fa-star"
                      : "fas fa-tasks";

                    return (
                      <div className="member-card" key={index}>
                        <div className="member-icon">
                          <i className={icon}></i>
                        </div>
                        <div className="member-details">
                          <h4 className="member-position">{position}</h4>
                          <p className="member-name">{name}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default StructureSection;
