import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./UserProfileCard.css";
import apiClient from "../../../utils/apiClient";
import { getAge } from "../../allReusableFution"; // Assuming you have a utility function to calculate age
function UserProfileCard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = {
    name: "Zozo",
    age: 24,
    location: "New York",
    mood: "Adventurous",
    profileImage: "https://randomuser.me/api/portraits/men/75.jpg"
  };

  const userId = JSON.parse(localStorage.getItem("user"))?.user_Id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/user/getUserById/${userId}`);
        if (response.status !== 200) {
          throw new Error("Failed to fetch user data");
        }
        const fetchedData = response.data.userDetails;
        setUserData(fetchedData);
      } catch (err) {
        setError("User data fetch failed.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    } else {
      setError("User not logged in");
      setLoading(false);
    }
  }, [userId]);

  const handleEditProfile = () => {
    alert("Edit Profile functionality not implemented yet.");
    console.log("User Data:", userData);
  };

  if (loading) return <div>Loading user profile...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="dashboard_user_card">
      <div className="user_card_left">
        <img
          src={
            userData?.images?.[1]?.url ||
            userData?.images?.[0]?.url ||
            user.profileImage
          }
          alt={userData?.fullName || user.name}
          className="user_img"
        />
        <div className="user_info">
          <h3>
            {userData?.fullName || user.name} <span className="verified_badge">✓</span>
          </h3>
          <p className="user_details">
            <span>{getAge(userData?.birthday) || user.age}</span> •
            <FaMapMarkerAlt className="location_icon" />{" "}
            {userData?.address?.state ||
              userData?.address?.city ||
              "Location not available"}
          </p>
          <p className="user_mood">
            Mood:{" "}
            <span className="mood_highlight">{userData?.mood || user.mood || "Not set"}</span>
          </p>
        </div>
      </div>
      <button className="dashboard_edit_profile" onClick={handleEditProfile}>Edit Profile</button>
    </section>
  );
}

export default UserProfileCard;