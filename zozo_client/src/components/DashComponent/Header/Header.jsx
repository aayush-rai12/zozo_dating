import React from "react";
import "./Header.css";

function Header(profile) {
  return (
    <header className="dashboard_header">
      <div className="dashboard_tabs">
        <span className="active_tab">Home</span>
        <span>Matches</span>
        <span>Messages</span>
      </div>
      <div className="dashboard_profile">
        <div className="notification_badge">3</div>
        <img src={profile.profile_Image} alt="Profile" className="profile_img" />
      </div>
    </header>
  );
}

export default Header;
