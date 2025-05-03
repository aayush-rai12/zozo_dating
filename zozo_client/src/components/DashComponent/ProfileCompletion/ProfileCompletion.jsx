import React, { useState } from "react";
import "./ProfileCompletion.css";
function ProfileCompletion() {
  const [profileCompletion, setProfileCompletion] = useState({
    percent: 75,
    completedItems: ["Add profile photo", "Write bio"],
    pendingItems: [
      "Add interests",
      "Connect Instagram",
      "Answer personality questions",
    ],
  });
  return (
    <section className="profile_completion">
      <div className="completion_header">
        <h3>Profile Strength</h3>
        <span className="completion_percent">{profileCompletion.percent}%</span>
      </div>
      <div className="progress_meter">
        <div
          className="progress_fill"
          style={{ width: `${profileCompletion.percent}%` }}
        ></div>
      </div>
      <div className="completion_tips">
        <p>
          Complete your profile to get <strong>3× more matches</strong>!
        </p>
        <ul className="todo_list">
          {profileCompletion.completedItems.map((item) => (
            <li key={item} className="completed">
              ✓ {item}
            </li>
          ))}
          {profileCompletion.pendingItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ProfileCompletion;
