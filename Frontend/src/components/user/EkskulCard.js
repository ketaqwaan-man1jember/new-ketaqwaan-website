import React from "react";
import "../../styles/components/user/EkskulCard.css"; // Import CSS kustom untuk sedikit styling card

const EkskulCard = ({ ekskul }) => {
  if (!ekskul) {
    return null;
  }

  const { title, description, image, schedule } = ekskul;
  const imageUrl = image || "path/to/default-image.jpg"; // Placeholder default image

  return (
    <div className="ekskul-card">
      <img src={imageUrl} alt={title} className=" ekskul-card-image" />
      <div className="ekskul-card-content">
        <div>
          <h5 className="ekskul-card-title">{title}</h5>
          <p className=" ekskul-card-description">{description}</p>
        </div>
        <div className=" ekskul-card-schedule">
          {schedule && (
            <>
              <p>
                <i className="far fa-calendar-alt "></i>{" "}
                <span className="font-weight-bold">Hari:</span> {schedule.day}
                <br></br>
                <i className="far fa-clock"></i>{" "}
                <span className="font-weight-bold">Waktu:</span> {schedule.time}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EkskulCard;
