import React, { useState } from "react";
import { FaHeart, FaMapMarkerAlt, FaComments, FaFire } from "react-icons/fa";
import { BsHeartFill, BsHeartArrow } from "react-icons/bs";
import "./main_dashboard.css";
import SuccessStoryModal from "../SuccessStoryModal/SuccessStoryModal";
import Sidebar from "../SideBar/Sidebar";
import Header from "../Header/Header";
import WelcomeMessage from "../WelcomeMessage/WelcomeMessage";
import UserProfileCard from "../UserProfileCard/UserProfileCard";
import ProfileCompletion from "../ProfileCompletion/ProfileCompletion";
import StatsCards from "../StatsCards/StatsCards";
import AIDatePlanner from "../AIDatePlanner/AIDatePlanner";
import EventSuggestions from "../EventSuggestions/EventSuggestions";
import RecentMessages from "../RecentMessages/RecentMessages";
import MoodSuggestions from "../MoodSuggestions/MoodSuggestions";
import LoginStreak from "../LoginStreak/LoginStreak";
import Compatibility from "../Compatibility/Compatibility";
import SuccessStories from "../SuccessStories/SuccessStories";
import UpgradeSection from "../UpgradeSection/UpgradeSection";
function main_dashboard() {
  const [profileCompletion, setProfileCompletion] = useState({
    percent: 75,
    completedItems: ["Add profile photo", "Write bio"],
    pendingItems: [
      "Add interests",
      "Connect Instagram",
      "Answer personality questions",
    ],
  });

  const [selectedStory, setSelectedStory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

 

  const openModal = (story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStory(null);
  };
  return (
    <div className="dashboard_container">
      {/* Sidebar */}
      <Sidebar />
      {/* Sidebar end */}

      {/* Main Content */}
      <main className="dashboard_main">
        {/* Header */}
        {/* Image={stories[1].photos[0]} */}
        <Header  />

        {/* Welcome Message */}
        <WelcomeMessage />
        {/* Welcome Message end */}

        {/* User Info */}
        <UserProfileCard />
        {/* User Info end */}

        {/* Profile Completion Meter */}
        <ProfileCompletion />
        {/* Profile Completion end */}

        {/* Stats */}
        <StatsCards />
        {/* Stats end */}

        {/* Login Streak */}
        <LoginStreak />
        {/* Login Streak end */}
        {/* Compatibility */}
        <Compatibility />
        {/* Compatibility end */}
        {/* AI Date Planner */}
        <AIDatePlanner />
        {/* AI Date Planner end */}

        {/* Event Suggestions Section */}
        <EventSuggestions />
        {/* Event Suggestions end */}

        <section className="dashboard_bottom_section">
          <RecentMessages />
          <MoodSuggestions />
        </section>
        {/* Mood Suggestions end */}
        
        {/* Success Stories Section*/}
        <SuccessStories />
        {/* Success Stories end */}

        {/* Success Story Modal */}
        {isModalOpen && (
          <SuccessStoryModal story={selectedStory} onClose={closeModal} />
        )}

        {/* Upgrade */}
        <UpgradeSection />
        {/* Upgrade end */}

      </main>
    </div>
  );
}

export default main_dashboard;
