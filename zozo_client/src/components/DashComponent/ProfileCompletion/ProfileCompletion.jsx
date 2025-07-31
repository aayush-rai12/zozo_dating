import React, { useState } from "react";
import "./ProfileCompletion.css";
import ProfileCompletionModal from "../../UI/Modal/ProfileCompletionModal/profileCompletionModal";

const TOTAL_ITEMS = 5; // ya jitne bhi aapke profile steps hain

function ProfileCompletion() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [profileCompletion, setProfileCompletion] = useState({
    completedItems: [],
    pendingItems: [
      { id: 'interests', label: 'Add interests' },
      { id: 'instagram', label: 'Connect Instagram' },
      { id: 'bio', label: 'Write bio' },
      { id: 'profilePhoto', label: 'Add profile photo' },
      { id: 'personality', label: 'Answer personality questions' },
    ],
    percent: 0,
  });

  const calculatePercent = (completedCount) => {
    return Math.round((completedCount / TOTAL_ITEMS) * 100);
  };

  const handleAddClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCompleteItem = (completedItem, data) => {
    const updatedPending = profileCompletion.pendingItems.filter(
      (i) => i.id !== completedItem.id
    );
    const updatedCompleted = [
      ...profileCompletion.completedItems,
      { ...completedItem, data }
    ];
    
    setProfileCompletion({
      completedItems: updatedCompleted,
      pendingItems: updatedPending,
      percent: calculatePercent(updatedCompleted.length),
    });
  };

  return (
    <section className="profile_completion">
      <div className="completion_header">
        <h3>Profile Strength</h3>
        <span className="completion_percent">{profileCompletion.percent}%</span>
      </div>
      
      <div className="progress_meter">
        <div
          className="progress_fill"
          style={{ width: `${profileCompletion.percent}%` }}
        ></div>
      </div>
      
      <div className="completion_tips">
        <p>
          Complete your profile to get <strong>3× more matches</strong>!
        </p>
        
        <ul className="todo_list">
          {profileCompletion.completedItems.map((item) => (
            <li key={item.id} className="completed">
              <span className="item-label">{item.label}</span>
              {item.data && <span className="item-value">{item.data}</span>}
            </li>
          ))}
          
          {profileCompletion.pendingItems.map((item) => (
            <li key={item.id} className="pending">
              <span className="item-label">{item.label}</span>
              <button
                className="add_button"
                onClick={() => handleAddClick(item)}
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ProfileCompletionModal
        showModal={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        item={selectedItem}
        onComplete={handleCompleteItem}
      />
    </section>
  );
}

export default ProfileCompletion;