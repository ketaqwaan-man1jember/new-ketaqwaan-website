import React from "react";
import "../../styles/components/user/KegiatanCard.css";

const KegiatanCard = ({ kegiatan }) => {
  if (!kegiatan) {
    return null;
  }

  const { title, description, image, date } = kegiatan;
  const imageUrl = image || "path/to/default-image.jpg"; // Placeholder default image

  return (
    <div className="kegiatan-card">
      <img src={imageUrl} alt={title} className="kegiatan-card-image" />
      <div className="kegiatan-card-content">
        <h3 className="kegiatan-card-title">{title}</h3>
        <p className="kegiatan-card-description">{description}</p>

        {date && (
          <p className="kegiatan-card-schedule">
            <i className="far fa-calendar-alt"></i>{" "}
            <span className="font-weight-bold">Tanggal:</span> {date}
          </p>
        )}
        {/* <button className="kegiatan-button">Lihat Detail</button>{" "} */}
      </div>
    </div>
  );
};

export default KegiatanCard;
