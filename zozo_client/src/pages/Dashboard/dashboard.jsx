import React, { useState } from "react";
import "./dashboard.css";
import SideBar from "../../components/DashComponent/SideBar/SideBar";
import Header from "../../components/DashComponent/Header/Header";
import WelcomeMessage from "../../components/DashComponent/WelcomeMessage/WelcomeMessage";
import UserProfileCard from "../../components/DashComponent/UserProfileCard/UserProfileCard";
import ProfileCompletion from "../../components/DashComponent/ProfileCompletion/ProfileCompletion";
import StatsCards from "../../components/DashComponent/StatsCards/StatsCards";
import AIDatePlanner from "../../components/DashComponent/AIDatePlanner/AIDatePlanner";
import EventSuggestions from "../../components/DashComponent/EventSuggestions/EventSuggestions";
import RecentMessages from "../../components/DashComponent/RecentMessages/RecentMessages";
import MoodSuggestions from "../../components/DashComponent/MoodSuggestions/MoodSuggestions";
import LoginStreak from "../../components/DashComponent/LoginStreak/LoginStreak";
import Compatibility from "../../components/DashComponent/Compatibility/Compatibility";
import SuccessStories from "../../components/DashComponent/SuccessStories/SuccessStories";
import UpgradeSection from "../../components/DashComponent/UpgradeSection/UpgradeSection";
import SuccessStoryModal from "../../components/DashComponent/SuccessStoryModal/SuccessStoryModal";

function Dashboard() {

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
      <SideBar />
      {/* Sidebar end */}

      {/* Main Content */}
      <main className="dashboard_main">
        {/* Header */}
        <Header />

        {/* Welcome Message */}
        <WelcomeMessage />
        {/* Welcome Message end */}

        {/* User Info */}
        <UserProfileCard />
        {/* User Info end */}

        {/* Profile Completion */}
        <ProfileCompletion />
        {/* Profile Completion end */}

        {/* Stats Cards */}
        <StatsCards />
        {/* Stats Cards end */}

        {/* login Streak */}
        <LoginStreak />
        {/* login Streak end */}

        {/* Compatibility Section */}
        <Compatibility />
        {/* Compatibility Section end */}

        {/* AI Date Planner */}
        <AIDatePlanner />
        {/* AI Date Planner end */}

        {/* Event Suggestions */}
        <EventSuggestions />
        {/* Event Suggestions end */}

        <section className="dashboard_bottom_section">
          {/* recent messages */}
          <RecentMessages />
          {/* recent messages end */}
          {/* moodSuggestions */}
          <MoodSuggestions />
          {/* Mood Suggestions end */}
        </section>

        {/* Success Stories Section*/}
        <SuccessStories openModal={openModal} /> 
        {/* Success Stories end */}

        {/* Success Stories Section */}
        {isModalOpen && (
          <SuccessStoryModal story={selectedStory} onClose={closeModal} />
        )}
        {/* Success Stories Section end */}

        {/* UpgradeSection */}
        <UpgradeSection />
        {/* UpgradeSection end */}
      </main>
    </div>
  );
}

export default Dashboard;