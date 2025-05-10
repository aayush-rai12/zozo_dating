import React from "react";
import "./ExplorerHeader.css";
function ExplorerHeader({darkMode}) {
  return (
    <header className={`explore_header ${darkMode ? "dark" : ""}`}>
      <h2 className="tagline">Spark New Connections</h2>
      <p className="subtagline">Find your perfect vibe match</p>
      <div className="music-tab">
        <i className="fas fa-music"></i> Play My Vibe
      </div>
    </header>
  );
}

export default ExplorerHeader;
