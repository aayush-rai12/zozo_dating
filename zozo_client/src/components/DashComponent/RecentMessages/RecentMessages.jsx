import React from "react";
import { FaHeart } from "react-icons/fa";
import "./RecentMessages.css";

function RecentMessages() {
  return (
    // <section className="dashboard_bottom_section">
      <div className="dashboard_recent_messages">
        <div className="section_header">
          <h3>Recent Messages</h3>
          <a href="#" className="view_all">
            View all
          </a>
        </div>
        <ul>
          <li>
            <img
              src="https://randomuser.me/api/portraits/women/33.jpg"
              alt="Emma"
            />
            <div className="message_content">
              <span className="sender">Emma</span>
              <span className="message_text">Sure! Let's meet tomorrow</span>
            </div>
            <span className="message_time">8:33 PM</span>
          </li>
          <li>
            <img
              src="https://randomuser.me/api/portraits/men/22.jpg"
              alt="James"
            />
            <div className="message_content">
              <span className="sender">James</span>
              <span className="message_text">How's your day going?</span>
            </div>
            <span className="message_time">9:20 AM</span>
          </li>
          <li>
            <img
              src="https://randomuser.me/api/portraits/women/28.jpg"
              alt="Sarah"
            />
            <div className="message_content">
              <span className="sender">Sarah</span>
              <span className="message_text">Free this weekend?</span>
            </div>
            <span className="message_time">8:26 PM</span>
          </li>
        </ul>
      </div>

     
    // </section>
  );
}

export default RecentMessages;
