import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './UserProfileCard.css';

function UserProfileCard() {
  const user= {
    name: "Aayush",
    age: 29,
    location: "New York",
    mood: "Adventurous",
    profileImage: "https://randomuser.me/api/portraits/men/75.jpg"
  }
  return (
    <section className="dashboard_user_card">
      <div className="user_card_left">
        <img
          src={user.profileImage}
          alt={user.name}
          className="user_img"
        />
        <div className="user_info">
          <h3>
            {user.name} <span className="verified_badge">✓</span>
          </h3>
          <p className="user_details">
            <span>{user.age}</span> • 
            <FaMapMarkerAlt className="location_icon" /> {user.location}
          </p>
          <p className="user_mood">
            Mood: <span className="mood_highlight">{user.mood}</span>
          </p>
        </div>
      </div>
      <button className="dashboard_edit_profile">Edit Profile</button>
    </section>
  );
}

// UserProfileCard.defaultProps = {
 
// };

export default UserProfileCard;