import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./FeatureCard.css";

const FeatureCard = ({ image, title, delay }) => {
  return (
    <div className="card" data-aos="fade-up" data-aos-delay={delay}>
      <img src={image} alt={title} className="card-image" />
      <div className="card-text">
        <h2 className="card-title" data-aos="zoom-in-left">{title}</h2>
      </div>
    </div>
  );
};

export default FeatureCard;
