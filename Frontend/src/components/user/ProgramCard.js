import React from "react";
import "../../styles/components/user/ProgramCard.css";

const ProgramCard = ({ program, index }) => {
  return (
    <div className="program-card">
      <div className="program-card-header">
        <i
          className={`program-card-icon ${program.icon}`}
          aria-hidden="true"
        ></i>
        <h3 className="program-card-title">
          {index}. {program.title}
        </h3>
      </div>
      <div className="program-card-body">
        <p className="program-card-description">{program.description}</p>
        {program.date && (
          <p className="program-card-date">
            <i className="far fa-calendar-alt icon-date"></i> {program.date}
          </p>
        )}
        {program.status && (
          <p
            className={`program-card-status status-${program.status
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            <i className="fas fa-check-circle icon-status"></i> Status:{" "}
            {program.status}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProgramCard;
