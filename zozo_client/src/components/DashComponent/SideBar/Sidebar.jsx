import React from "react";
import {FaHome,FaUsers,FaCog,FaSignOutAlt,FaComments} from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import "./Sidebar.css";
function Sidebar() {
  return (
    <aside className="dashboard_sidebar">
      <div className="sidebar_top">
        <h2 className="dashboard_logo">Zozo</h2>
        <nav>
          <ul>
            <li className="dashboard_nav_item active">
              <FaHome className="nav_icon" /> Home
            </li>
            <li className="dashboard_nav_item">
              <FaUsers className="nav_icon" /> Explore Users
            </li>
            <li className="dashboard_nav_item">
              <IoPeople className="nav_icon" /> My Matches
            </li>
            <li className="dashboard_nav_item">
              <FaComments className="nav_icon" /> Messages
            </li>
            <li className="dashboard_nav_item">
              <FaCog className="nav_icon" /> Settings
            </li>
          </ul>
        </nav>
      </div>
      <button className="dashboard_logout">
        <FaSignOutAlt className="logout_icon" /> Logout
      </button>
    </aside>
  );
}

export default Sidebar;
