import React, { useState } from "react";
import "./EmotionTracker.css";

const EmotionTable = ({ data, setData }) => {
  
  // 🗑 Delete function
  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  // ✏ Edit function (will be implemented later)
  const handleEdit = (id) => {
    alert(`Edit function will be implemented for ID: ${id}`);
  };

  // handle toggle function
  const handleToggle = (id) => {
    console.log(`Toggle function will be implemented for ID: ${id}`);
  }
  // Simple ToggleSwitch component
  const ToggleSwitch = ({ isActive, onToggle }) => (
    <label className="emotion_toggle_switch">
      <input type="checkbox" checked={isActive} onChange={onToggle} />
      <span className="switch" />
    </label>
  );

  return (
    <div className="table-responsive">
  <table className="emotion_table">
    <thead>
      <tr>
        <th>Feeling</th>
        <th>Mood</th>
        <th>Intensity</th>
        <th>Trigger Reason</th>
        <th>Date</th>
        <th>Preferred Activity</th>
        <th>Partner Reacted</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          <td>{item.feelings}</td>
          <td>
            <span className={`mood-tag ${item.mood.toLowerCase()}`}>
              {item.mood}
            </span>
          </td>
          <td>
            <span className={`intensity-tag ${item.intensity.toLowerCase().replace(/\s/g, "_")}`}>
              {item.intensity}
            </span>
          </td>
          <td>{item.trigger}</td>
          <td>{new Date().toLocaleDateString()}</td>
          <td>{item.preferredActivity}</td>
          <td>{item.partnerImpact}</td>
          <td>
            <div className="emotion_action_buttons">
              <button
                className="emotion_edit_btn"
                onClick={() => handleEdit(item.id)}
              >
                <i className="fa-regular fa-pen-to-square"></i>
              </button>
              <ToggleSwitch
                isActive={item.isActive}
                onToggle={() => handleToggle(item.id)}
              />
              <button
                className="emotion_delete_btn"
                onClick={() => handleDelete(item.id)}
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default EmotionTable;
