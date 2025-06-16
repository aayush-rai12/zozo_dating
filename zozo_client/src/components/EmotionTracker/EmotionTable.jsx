import React, { useState } from "react";
import "./EmotionTracker.css";
import apiClient from "../../utils/apiClient";
import { useEffect } from "react";
import { use } from "react";

const ToggleSwitch = ({ isPublic, onToggle }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async () => {
    try {
      setIsLoading(true);
      await onToggle();
    } catch (error) {
      console.error("Toggle failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <label className="emotion_toggle_switch">
      <input
        type="checkbox"
        checked={isPublic}
        onChange={handleChange}
        disabled={isLoading}
      />
      <span className={`switch ${isLoading ? "loading" : ""}`} />
    </label>
  );
};

const EmotionTable = ({ data, setData, setShowModal, setEditItem }) => {
  //  Delete function
  const handleDelete = (id) => {
    // const updatedData = data.filter((item) => item._id !== id);
    // setData(updatedData);
    const userConfirmation = window.confirm(
      "Are you sure you want to delete this emotion entry? This action cannot be undone."
    );
    if (userConfirmation) {
      const deleteReponse = apiClient.delete(`/user/deleteEmotionCard/${id}`);
      if(deleteReponse) {
        const updatedData = data.filter((item) => item._id !== id);
        setData(updatedData);
      } else {
        alert("Failed to delete the emotion entry. Please try again.");
      }
    }
  };

  // Edit function (will be implemented later)
  const handleEdit = (id) => {
    alert(`Edit function will be implemented for ID: ${id}`);
    const entry = data.find((item) => item._id === id);
    if (entry) {
      console.log("Editing entry:", entry);
      setEditItem(entry);
      setShowModal(true);
    }
  };

  // Update handleToggle to be more optimistic
  const handleToggle = async (id) => {
    try {
      const itemToToggle = data.find((item) => item._id === id);
      if (!itemToToggle) return;

      // Optimistically update UI
      setData(
        data.map((item) =>
          item._id === id ? { ...item, isPublic: !item.isPublic } : item
        )
      );

      // Make API call
      const response = await apiClient.patch(
        `/user/toggleEmotionStatus/${id}`,
        {
          isPublic: !itemToToggle.isPublic,
        }
      );

      if (response.status !== 200) {
        setData(
          data.map((item) =>
            item._id === id
              ? { ...item, isPublic: itemToToggle.isPublic }
              : item
          )
        );
        throw new Error("Toggle failed");
      }
    } catch (error) {
      console.error("Failed to toggle status:", error);
    }
  };

  const dataArray = Array.isArray(data) ? data : Object.values(data);

  // Ensure data is an array
  if (dataArray.length === 0) {
    return (
      <div className="no-data-message">
        <p>No emotions recorded yet. Start tracking your feelings!</p>
        <p className="text-neutral-700">
          Click the button below to add your first entry.
        </p>
        <button className="add_emotion_btn" onClick={setShowModal}>
          Add your first entry<i className="fas fa-plus"></i>
        </button>
      </div>
    );
  }

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
          {dataArray.map((item) => (
            <tr key={item._id}>
              <td>{item.feelings}</td>
              <td>
                <span
                  className={`mood-tag ${
                    item.mood ? item.mood.toLowerCase() : ""
                  }`}
                >
                  {item.mood || "N/A"}
                </span>
              </td>
              <td>
                <span
                  className={`intensity-tag ${item.intensity
                    .toLowerCase()
                    .replace(/\s/g, "_")}`}
                >
                  {item.intensity}
                </span>
              </td>
              <td>{item.triggerReason}</td>
              <td>{new Date().toLocaleDateString()}</td>
              <td>{item.preferredActivity}</td>
              <td>{item.partnerImpact}</td>
              <td>
                <div className="emotion_action_buttons">
                  <button
                    className="emotion_edit_btn"
                    onClick={() => {
                      handleEdit(item._id);
                      setEditItem(item);
                      setShowModal(true);
                    }}
                  >
                    <i className="fa-regular fa-pen-to-square"></i>
                  </button>
                  <ToggleSwitch
                    isPublic={item.isPublic}
                    onToggle={() => handleToggle(item._id)}
                  />
                  <button
                    className="emotion_delete_btn"
                    onClick={() => handleDelete(item._id)}
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
