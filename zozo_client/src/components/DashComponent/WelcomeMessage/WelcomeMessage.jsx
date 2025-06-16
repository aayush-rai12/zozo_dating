import React from "react";

function WelcomeMessage() {
  const userName = JSON.parse(localStorage.getItem("user"))?.firstName;
  return (
    <section className="dashboard_welcome">
      <h1>Hi {userName}! Ready to find your match today?</h1>
      <p className="welcome_subtext">You have 3 new matches waiting for you!</p>
    </section>
  );
}

export default WelcomeMessage;
