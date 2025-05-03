import React, { useState, useEffect } from "react";
import EmotionTable from "./EmotionTable";
import EmotionModal from "../UI/Modal/EmotionModal/emotionModal";
import "./EmotionTracker.css";

const EmotionTracker = () => {
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const handleClose = () =>  setShowModal(false);
  const handleShow = () => setShowModal(true);
  const [selectedMood, setSelectedMood] = useState(null);

  const [bgColor, setBgColor] = useState("#fcb1b1");

  // Initialize the data here
  const [data, setData] = useState([
    {
      id: 1,
      feelings: "Happiness is not by chance, but by choice.",
      mood: "Happy",
      moodColor: "#FFC300",
      intensity: "High",
      trigger: "Matched with Alex",
      dateInfluence: "Yes",
      createdDate: new Date().toLocaleDateString(),
      preferredActivity: "Coffee date ☕",
      partnerImpact: "Alex",
    },
    {
      id: 2,
      feelings: "Excitement is the spark that ignites the soul.",
      mood: "Excited",
      moodColor: "#FF8C00",
      intensity: "Moderate",
      trigger: "Romantic Scene",
      dateInfluence: new Date().toLocaleDateString(),
      createdDate: new Date().toLocaleDateString(),
      preferredActivity: "Plan a Fun Date",
      partnerImpact: "N/A",
    },
    {
      id: 3,
      feelings: "Energy flows where attention goes.",
      mood: "Energetic",
      moodColor: "#FF69B4",
      intensity: "High",
      trigger: "Gym Session",
      dateInfluence: "No",
      createdDate: new Date().toLocaleDateString(),
      preferredActivity: "Outdoor Adventure",
      partnerImpact: "N/A",
    },
    {
      id: 4,
      feelings: "Music is the shorthand of emotion.",
      mood: "Relaxed",
      moodColor: "#90EE90",
      intensity: "Low",
      trigger: "Lo-Fi Playlist",
      createdDate: new Date().toLocaleDateString(),
      dateInfluence: "No",
      preferredActivity: "Casual Talk",
      partnerImpact: "N/A",
    },
  ]);

  // Log the data to console when the component mounts or data changes
  console.log(data);

  const startHeartRain = (index) => {
    const card = document.querySelector(`.card-${index}`);
    if (!card) return;

    const button = card.querySelector(".like-button");
    const buttonRect = button.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const offsetX = buttonRect.left - cardRect.left + button.offsetWidth / 2;

    const numberOfHearts = 30;

    // Create a <style> element dynamically
    let styleElement = document.getElementById("dynamic-heart-styles");
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = "dynamic-heart-styles";
      document.head.appendChild(styleElement);
    }

    for (let i = 0; i < numberOfHearts; i++) {
      const heart = document.createElement("span");
      heart.classList.add("heart");
      heart.innerHTML = "❤️";

      heart.style.position = "absolute";
      heart.style.left = `${offsetX}px`;
      heart.style.bottom = `30px`; // start from just above the button
      heart.style.fontSize = `${Math.random() * 10 + 14}px`;

      const delay = Math.random() * 0.4;
      const duration = 1.3 + Math.random() * 0.1;
      const xScatter = (Math.random() - 0.5) * 350; // left or right spread

      const animationName = `floatHeart-${index}-${i}`;
      const keyframes = `
        @keyframes ${animationName} {
          0% {
            transform: translate(0, 0) scale(0.8) rotate(0deg);
            opacity: 0.7;
          }
          100% {
            transform: translate(${xScatter}px, -300px) scale(1.9) rotate(${Math.random() * 360}deg);
            opacity: 0;
          }
        }
      `;

      // Append the keyframes to the <style> element
      styleElement.sheet.insertRule(keyframes, styleElement.sheet.cssRules.length);

      heart.style.animation = `${animationName} ${duration}s linear ${delay}s forwards`;

      card.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, duration * 1000 + delay * 1000);
    }
  };

  useEffect(() => {
    if (selectedMood) {
      setBgColor(moodColor[selectedMood]);
    }
  }, [selectedMood]);

  const handleSave = (newEntry) => {
    if (
      !newEntry.feelings ||
      !newEntry.mood ||
      !newEntry.intensity ||
      !newEntry.trigger ||
      !newEntry.preferredActivity ||
      !newEntry.partnerImpact
    ) {
      alert("Please fill in all required fields.");
      return false;
    }

    // Add the new entry to data
    setData((prevData) => [...prevData, newEntry]);
    return true;
  };


  return (
    <div className="main_emotion_container">
      <div className="wrapper">
        <div className="sub_emotion_container">
          <div className="emotion_container_header">
            <div>
              <h2 className="emotion_title">Zozo's Emotion Tracker</h2>
              <p className="emotion_subtitle text-neutral-700">
                You can track your info about your emotions here.
              </p>
            </div>
            {/* Button Click Handler */}
            <button className="add_emotion_btn" onClick={handleShow}>
              Add New <i className="fas fa-plus"></i>
            </button>
          </div>

          {/* Pass the data state to EmotionTable */}
          <EmotionTable data={data} setData={setData} />

          {/* Pass the correct props to EmotionModal */}
          <EmotionModal show={showModal} handleClose={handleClose} handleSave={handleSave}/>
        </div>
        <div
          className="cards-container"
          style={{
            background: bgColor,
            transition: "background 0.5s ease-in-out",
          }}
        >
          {data.map((card, index) => (
            <div
              className={`emotion-card card-${index}`}
              key={index}
              style={{ backgroundColor: card.moodColor }}
            >
              <div className="emotion-quote">
                <p>{card.feelings}</p>
              </div>

              <div className="emotion-info">
                <div className="info-block">
                  <span className="label">Intensity</span>
                  <span className=" intensity-tag intensity">
                    {card.intensity}
                  </span>
                </div>

                <div className="info-block">
                  <span className="label">Mood</span>
                  <span className="value mood-tag">{card.mood}</span>
                </div>

                <div className="info-block">
                  <span className="label">Reaction Trigger</span>
                  <span className="value">{card.trigger}</span>
                </div>

                <div className="info-block">
                  <span className="label">Preferred Activity</span>
                  <span className="value">{card.preferredActivity}</span>
                </div>
              </div>

              <div className="footer-row">
                <span className="footer-text">date: {card.createdDate}</span>
                <div className="footer-like">
                  <button
                    className="like-button"
                    onClick={() => startHeartRain(index)}
                  >
                    Like
                  </button>
                </div>
                <span className="footer-text" style={{ textAlign: "right" }}>
                  Liked by: You & other 8
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmotionTracker;
