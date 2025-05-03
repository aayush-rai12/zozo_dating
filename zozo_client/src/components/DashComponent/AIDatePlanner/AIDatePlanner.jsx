import React from "react";
import "./AIDatePlanner.css";
function AIDatePlanner() {
  return (
    <section className="dashboard_ai_planner">
      <h3>AI Date Planner</h3>
      <p>
        Zozo AI suggests a <strong>coffee date</strong> nearby at{" "}
        <strong>5:00 PM</strong>.
      </p>
      <div className="ai_actions">
        <button className="ai_accept">Accept Suggestion</button>
        <button className="ai_regenerate">Regenerate</button>
      </div>
    </section>
  );
}

export default AIDatePlanner;
