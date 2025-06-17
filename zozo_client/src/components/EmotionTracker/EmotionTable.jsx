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
  const [selectedItems, setSelectedItems] = useState([]);
  //  Delete function
  const handleDelete = async (id) => {
    try {
      const userConfirmation = window.confirm(
        "Are you sure you want to delete this emotion entry? This action cannot be undone."
      );
      
      if (userConfirmation) {
        const response = await apiClient.delete(`/user/deleteEmotionCard/${id}`);
        
        if (response.status === 200) {
          const updatedData = data.filter((item) => item._id !== id);
          setData(updatedData);
        } else {
          alert("Failed to delete the emotion entry. Please try again.");
        }
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete the emotion entry. Please try again.");
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

      // update here card status is visible or not
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

  // Handle select all checkbox
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(dataArray.map((item) => item._id));
    } else {
      setSelectedItems([]);
    }
  };
  // Handle individual item selection
  const handleSelectItem = (id) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((item) => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
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

  // Update the bulk delete handler
  const handleBulkDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedItems.length} entries? This action cannot be undone.`
    );

    if (confirmDelete) {
      try {
        // Track successful deletions
        const deletionResults = await Promise.all(
          selectedItems.map(async (id) => {
            try {
              const response = await apiClient.delete(`/user/deleteEmotionCard/${id}`);
              return { id, success: response.status === 200 };
            } catch (error) {
              console.error(`Failed to delete item ${id}:`, error);
              return { id, success: false };
            }
          })
        );

        // Filter out successfully deleted items
        const successfulDeletes = deletionResults
          .filter(result => result.success)
          .map(result => result.id);

        if (successfulDeletes.length > 0) {
          // Update local state to remove successfully deleted items
          setData(prevData => prevData.filter(item => !successfulDeletes.includes(item._id)));
          setSelectedItems(prevSelected => prevSelected.filter(id => !successfulDeletes.includes(id)));

          // Show success message
          console.log(`Successfully deleted ${successfulDeletes.length} items.`);
        }

        // Show warning if some deletions failed
        const failedCount = selectedItems.length - successfulDeletes.length;
        if (failedCount > 0) {
          alert(`Failed to delete ${failedCount} items. Please try again.`);
        }

      } catch (error) {
        console.error("Bulk delete failed:", error);
        alert("Failed to process delete request. Please try again.");
      }
    }
  };

  return (
    <div className="table-responsive">
      <div>
        {selectedItems.length > 1 && (
          <div className="selected-actions">
            <span>{selectedItems.length} items selected</span>
            <button
              className="delete-selected-btn"
              onClick={handleBulkDelete}
            >
              Delete Selected <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        )}
      </div>
      <table className="emotion_table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedItems.length === dataArray.length}
                onChange={handleSelectAll}
              />
            </th>
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
              <td>
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item._id)}
                  onChange={() => handleSelectItem(item._id)}
                />
              </td>
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
