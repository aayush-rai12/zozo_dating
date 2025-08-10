import React, { useState, useEffect } from "react";
import "./ProfileCompletion.css";
import ProfileCompletionModal from "../../UI/Modal/ProfileCompletionModal/profileCompletionModal";
import apiClient from "../../../utils/apiClient";

const ALL_PROFILE_ITEMS = [
  { id: "interests", label: "Add interests" },
  { id: "instagram", label: "Connect Instagram" },
  { id: "preferences", label: "Set preferences" },
  { id: "bio", label: "Write bio" },
  { id: "profilePhoto", label: "Add profile photo" },
  { id: "personality", label: "Answer personality questions" },
];

function ProfileCompletion() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [profileCompletion, setProfileCompletion] = useState({
    completedItems: [],
    pendingItems: [],
    percent: 0,
    isLoading: true,
    error: null,
  });

  let userId = null;
  try {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    userId = storedUser?.user_Id || null;
  } catch (err) {
    console.warn("Invalid user data in localStorage:", err);
  }

  const calculateCompletion = (dataFromBackend = {}) => {
    const completedItems = ALL_PROFILE_ITEMS.filter((item) => {
      const field = dataFromBackend[item.id];
      if (!field) return false;

      const value = field.data;
      return Array.isArray(value)
        ? value.length > 0
        : typeof value === "object"
        ? Object.keys(value || {}).length > 0
        : !!value;
    });

    const pendingItems = ALL_PROFILE_ITEMS.filter(
      (item) => !completedItems.find((ci) => ci.id === item.id)
    );

    return {
      completedItems: completedItems.map((item) => ({
        ...item,
        data: dataFromBackend[item.id]?.data,
      })),
      pendingItems,
      percent: Math.round(
        (completedItems.length / ALL_PROFILE_ITEMS.length) * 100
      ),
    };
  };

  const fetchProfileCompletionData = async () => {
    setProfileCompletion((prev) => ({ ...prev, isLoading: true }));
    if (!userId) {
      setProfileCompletion((prev) => ({
        ...prev,
        isLoading: false,
        error: "User not logged in.",
      }));
      return;
    }

    try {
      const res = await apiClient.get(
        `/user/getProfileCompletionData/${userId}`
      );
      const transformed = calculateCompletion(res.data.profileCompletion);
      setProfileCompletion({ ...transformed, isLoading: false, error: null });
    } catch (error) {
      console.error("Error fetching profile completion data:", error);
      // Fallback to initial empty state (good for new users)
      const transformed = calculateCompletion({});
      setProfileCompletion({ ...transformed, isLoading: false, error: null });
    }
  };

  useEffect(() => {
    if (userId) fetchProfileCompletionData();
  }, [userId]);

  const handleAddClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCompleteItem = async (completedItem, data) => {
    if (!userId) return;

    const payload = { userId, id: completedItem.id, data };
    // Agar image hai to base64 me convert
    if (completedItem.id === "profilePhoto" && data instanceof File) {
      payload.data = await fileToBase64(data);
    }
    console.log("FormData being sent:", payload);
    try {
      await apiClient.post("/user/saveProfileCompletion", payload);

      fetchProfileCompletionData();
    } catch (error) {
      console.error("Error updating profile completion:", error);
    }

    setIsModalOpen(false);
  };
  function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result); 
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

  const { completedItems, pendingItems, percent, isLoading, error } =
    profileCompletion;

  if (!userId) return <div>Please log in to view your profile completion.</div>;
  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="profile_completion">
      <div className="completion_header">
        <h3>Profile Strength</h3>
        <span className="completion_percent">{percent}%</span>
      </div>

      <div className="progress_meter">
        <div className="progress_fill" style={{ width: `${percent}%` }}></div>
      </div>

      <div className="completion_tips">
        <p>
          Complete your profile to get <strong>3× more matches</strong>!
        </p>

        <ul className="todo_list">
          {completedItems.map((item) => (
            // console.log("Completed item:", item),
            <li key={item.id} className="completed">
              <span className="item-label">{item.label}</span>
              <div className="tag-container">
                {Array.isArray(item.data)
                  ? item.data.map((val, index) => (
                      <span key={index} className="profile-tag">
                        {val}
                      </span>
                    ))
                  : typeof item.data === "object" && item.data !== null
                  ? Object.values(item.data).map((val, i) => (
                      <span key={i} className="profile-tag">
                        {val}
                      </span>
                    ))
                    :item.id == "profilePhoto" && item.data ? (<img style={{width:"45px", height:"45px", borderRadius:"50px", objectFit:"cover"}} src={item.data} alt={item.id} />)
                    : item.data &&  (
                      <span className="profile-tag">{item.data}</span>
                    )}
              </div>
              <button
                className="update_button"
                onClick={() => handleAddClick(item)}
              >
                Update
              </button>
            </li>
          ))}

          {pendingItems.map((item) => (
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
