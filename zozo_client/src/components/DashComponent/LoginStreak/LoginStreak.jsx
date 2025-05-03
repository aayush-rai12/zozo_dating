import React from "react";
import { FaFire } from "react-icons/fa";
import "./LoginStreak.css";
function LoginStreak() {
  return (
    <section className="dashboard_streak">
      <FaFire className="streak_icon" />
      <p>
        You have logged in <strong>5 days</strong> in a row! Keep it up!
      </p>
    </section>
  );
}

export default LoginStreak;
