import React from "react";
import { FaHeart } from "react-icons/fa";
import "./MoodSuggestions.css";
function MoodSuggestions() {
  return (
    // <section>
      <div className="dashboard_mood_suggestions">
        <div className="section_header">
          <h3>Mood-Based Suggestions</h3>
          <a href="#" className="view_all">
            View all
          </a>
        </div>
        <div className="suggestions_list">
          <div className="suggestion_user">
            <img
              src="https://randomuser.me/api/portraits/men/40.jpg"
              alt="Michael"
            />
            <div className="suggestion_info">
              <p className="user_name">Michael</p>
              <p className="user_details">30 • San Francisco</p>
              <div className="interests">
                <span>Hiking</span>
                <span>Photography</span>
                <span>Travel</span>
              </div>
            </div>
            <button className="like_button">
              <FaHeart />
            </button>
          </div>
          <div className="suggestion_user">
            <img
              src="https://randomuser.me/api/portraits/women/42.jpg"
              alt="Rachel"
            />
            <div className="suggestion_info">
              <p className="user_name">Rachel</p>
              <p className="user_details">27 • Los Angeles</p>
              <div className="interests">
                <span>Yoga</span>
                <span>Cooking</span>
                <span>Art</span>
              </div>
            </div>
            <button className="like_button">
              <FaHeart />
            </button>
          </div>
        </div>
      </div>
    // </section>
  );
}

export default MoodSuggestions;
