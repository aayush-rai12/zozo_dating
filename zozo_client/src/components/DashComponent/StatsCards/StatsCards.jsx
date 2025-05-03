import React from "react";
import { BsHeartArrow, BsHeartFill } from "react-icons/bs";
import { FaComments } from "react-icons/fa";
import "./StatsCards.css";
function StatsCards() {
  return (
    <section className="dashboard_stats">
      <div className="dashboard_stat_card dashboard_purple">
        <div className="stat_icon">
          <BsHeartArrow />
        </div>
        <h2>56</h2>
        <p>Total Matches</p>
      </div>
      <div className="dashboard_stat_card dashboard_pink">
        <div className="stat_icon">
          <BsHeartFill />
        </div>
        <h2>210</h2>
        <p>Likes Received</p>
      </div>
      <div className="dashboard_stat_card dashboard_blue">
        <div className="stat_icon">
          <FaComments />
        </div>
        <h2>12</h2>
        <p>Messages Sent</p>
      </div>
    </section>
  );
}

export default StatsCards;
