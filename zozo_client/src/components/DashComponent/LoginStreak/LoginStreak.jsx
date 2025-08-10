import React from "react";
import { FaFire } from "react-icons/fa";
import "./LoginStreak.css";
function LoginStreak() {
  const milestoneMessage =
    JSON.parse(localStorage.getItem("user")).milestoneMessage ||
    "Kahe etna km login kr rhe ho ji";
  return (
    <section className="dashboard_streak">
      {/* <FaFire className="streak_icon" /> */}
      <p>{milestoneMessage} </p>
    </section>
  );
}

export default LoginStreak;
