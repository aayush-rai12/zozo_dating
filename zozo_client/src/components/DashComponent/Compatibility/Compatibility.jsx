import React from "react";
import "./Compatibility.css";
function Compatibility() {
  return (
    <section className="dashboard_compatibility">
      <div className="section_header">
        <h3>Compatibility Scores</h3>
        <a href="#" className="view_all">
          View all
        </a>
      </div>
      <div className="dashboard_compatibility_users">
        <div className="dashboard_user">
          <img
            src="https://randomuser.me/api/portraits/women/50.jpg"
            alt="Danielle"
          />
          <div className="dashboard_user_info">
            <p className="user_name">Danielle</p>
            <div className="compatibility_score">
              <div className="score_bar" style={{ width: "92%" }}></div>
              <span>92%</span>
            </div>
          </div>
        </div>
        <div className="dashboard_user">
          <img
            src="https://randomuser.me/api/portraits/men/52.jpg"
            alt="Robert"
          />
          <div className="dashboard_user_info">
            <p className="user_name">Robert</p>
            <div className="compatibility_score">
              <div className="score_bar" style={{ width: "87%" }}></div>
              <span>87%</span>
            </div>
          </div>
        </div>
        <div className="dashboard_user">
          <img
            src="https://randomuser.me/api/portraits/women/55.jpg"
            alt="Sophia"
          />
          <div className="dashboard_user_info">
            <p className="user_name">Sophia</p>
            <div className="compatibility_score">
              <div className="score_bar" style={{ width: "85%" }}></div>
              <span>85%</span>
            </div>
          </div>
        </div>
        <div className="dashboard_user">
          <img
            src="https://randomuser.me/api/portraits/women/45.jpg"
            alt="Emma"
          />
          <div className="dashboard_user_info">
            <p className="user_name">Emma</p>
            <div className="compatibility_score">
              <div className="score_bar" style={{ width: "82%" }}></div>
              <span>82%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Compatibility;
