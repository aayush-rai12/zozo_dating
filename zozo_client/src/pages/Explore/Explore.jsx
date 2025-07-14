 import React, { useState, useEffect } from "react";
import "./Explore.css";

const profiles = [
  {
    id: 1,
    name: "Gabriel",
    age: 27,
    mood: "Happy",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=774&q=80",
    bio: "Adventure seeker and coffee enthusiast.",
    interests: ["Hiking", "Photography", "Travel", "Coffee"],
    compatibility: 78,
    online: true,
    lastActive: "5 min ago",
  },
  {
    id: 2,
    name: "Sophia",
    age: 24,
    mood: "Excited",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=774&q=80",
    bio: "Art lover and music junkie.",
    interests: ["Painting", "Music", "Dancing"],
    compatibility: 85,
    online: false,
    lastActive: "2 hours ago",
  },
  {
    id: 3,
    name: "Ravi",
    age: 29,
    mood: "Romantic",
    image:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
    bio: "Coding ninja who loves long walks.",
    interests: ["Coding", "Cycling", "Movies"],
    compatibility: 92,
    online: true,
    lastActive: "now",
  },
  {
    id: 4,
    name: "Maya",
    age: 26,
    mood: "Calm",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=800&q=80",
    bio: "Yoga teacher and tea enthusiast.",
    interests: ["Yoga", "Tea", "Poetry"],
    compatibility: 74,
    online: true,
    lastActive: "10 min ago",
  },
  {
    id: 5,
    name: "Liam",
    age: 30,
    mood: "Happy",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80",
    bio: "Tech geek and Netflix binger.",
    interests: ["Gaming", "Netflix", "Startups"],
    compatibility: 80,
    online: false,
    lastActive: "1 day ago",
  },
  {
    id: 6,
    name: "Ananya",
    age: 23,
    mood: "Excited",
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
    bio: "Dancer, foodie, and meme queen.",
    interests: ["Dance", "Food", "Memes"],
    compatibility: 88,
    online: false,
    lastActive: "3 hours ago",
  },
];

function Explore() {
  const [theme, setTheme] = useState("light");
  const [activeMood, setActiveMood] = useState(null);
  const [activeInterest, setActiveInterest] = useState(null);
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);
  const [loading, setLoading] = useState(false);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [likedProfiles, setLikedProfiles] = useState([]);

  // Filter profiles based on selected mood and interest
  useEffect(() => {
    setLoading(true);
    let filtered = profiles;

    if (activeMood) {
      filtered = filtered.filter((profile) => profile.mood === activeMood);
    }

    if (activeInterest) {
      filtered = filtered.filter((profile) =>
        profile.interests.includes(activeInterest)
      );
    }

    setTimeout(() => {
      setFilteredProfiles(filtered);
      setLoading(false);
    }, 500);
  }, [activeMood, activeInterest]);

  // Get unique moods and interests for filters
  const allMoods = [...new Set(profiles.map((profile) => profile.mood))];
  const allInterests = [
    ...new Set(profiles.flatMap((profile) => profile.interests)),
  ];

  const handleLike = (profile) => {
    setLikedProfiles([...likedProfiles, profile.id]);

    // Show match modal if compatibility is high
    if (profile.compatibility > 85) {
      setCurrentMatch(profile);
      setShowMatchModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowMatchModal(false);
    setCurrentMatch(null);
  };

  return (
    <div className={`explore-page ${theme}`}>
      {/* Top Navbar */}
      <header className="top-nav">
        <div className="logo">Zozo ❤️</div>
        <nav className="nav-links">
          <a href="#" className="nav-link">
            Home
          </a>
          <a href="#" className="nav-link active">
            Explore
          </a>
          <a href="#" className="nav-link">
            Matches
          </a>
          <a href="#" className="nav-link">
            Chat
          </a>
          <a href="#" className="nav-link">
            Profile
          </a>
        </nav>
        <div className="nav-right">
          <div className="notification-bell">
            🔔<span className="notification-badge">3</span>
          </div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="theme-btn"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="main-grid">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          <h3>🎭Mood Filters</h3>
          <div className="filter-tags">
            {allMoods.map((mood) => (
              <span
                key={mood}
                className={`tag ${activeMood === mood ? "active" : ""}`}
                onClick={() => setActiveMood(activeMood === mood ? null : mood)}
              >
                {mood}
              </span>
            ))}
          </div>

          <h3 className="filter-title">✨ Interests</h3>
          <div className="filter-tags">
            {allInterests.slice(0, 10).map((interest) => (
              <span
                key={interest}
                className={`tag ${activeInterest === interest ? "active" : ""}`}
                onClick={() =>
                  setActiveInterest(
                    activeInterest === interest ? null : interest
                  )
                }
              >
                {interest}
              </span>
            ))}
          </div>

          <div
            className="reset-filters"
            onClick={() => {
              setActiveMood(null);
              setActiveInterest(null);
            }}
          >
            Clear all filters
          </div>
        </aside>

        {/* Center Grid */}
        <section className="center-grid">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          ) : filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile) => (
              <div className="profile-card" key={profile.id}>
                <div className="profile-img-container">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="profile-img"
                    loading="lazy"
                  />
                  <div className="profile-badge">
                    <span
                      className={`online-status ${
                        profile.online ? "online" : "offline"
                      }`}
                    >
                      {profile.online ? "Online" : profile.lastActive}
                    </span>
                    <span className="compatibility-badge">
                      {profile.compatibility}% match
                    </span>
                  </div>
                </div>
                <div className="profile-info">
                  <div className="profile-header">
                    <h4>
                      {profile.name}, {profile.age}
                    </h4>
                    <span className={`mood ${profile.mood.toLowerCase()}`}>
                      {profile.mood}
                    </span>
                  </div>
                  <p className="bio">{profile.bio}</p>
                  <div className="tags">
                    {profile.interests.map((interest, i) => (
                      <span key={i} className="tag">
                        {interest}
                      </span>
                    ))}
                  </div>
                  <div className="profile-actions">
                    <button
                      className={`like-btn ${
                        likedProfiles.includes(profile.id) ? "liked" : ""
                      }`}
                      onClick={() => handleLike(profile)}
                    >
                      {likedProfiles.includes(profile.id)
                        ? "❤️ Liked"
                        : "🤍 Like"}
                    </button>
                    <button className="message-btn">💬 Message</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <img
                src="https://cdn.dribbble.com/users/888330/screenshots/2653750/media/b7459526d4bdf6dae512f3ce1d5a7616.png"
                alt="No results found"
                className="no-results-img"
              />
              <h3>No profiles found</h3>
              <p>Try adjusting your filters</p>
            </div>
          )}
        </section>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          {/* Match of the Day */}
          <div className="widget-box">
            <h3>💖 Match of the Day</h3>
            <img
              src={profiles[1].image}
              alt={profiles[1].name}
              className="match-img"
            />
            <h4>{profiles[1].name}</h4>
            <p>{profiles[1].bio}</p>
            <div className="compatibility-meter">
              <div
                className="meter-fill"
                style={{ width: `${profiles[1].compatibility}%` }}
              ></div>
            </div>
            <button className="cta-btn">Connect Now</button>
          </div>

          {/* Your Profile */}
          <div className="widget-box">
            <h3>👤 Your Profile</h3>
            <img
              src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=500&q=80"
              alt="Your profile"
              className="your-img"
            />
            <h4>Ayush Rai</h4>
            <p>Developer | Dreamer 💭</p>
            <div className="profile-stats">
              <div className="stat">
                <strong>24</strong>
                <span>Matches</span>
              </div>
              <div className="stat">
                <strong>15</strong>
                <span>Likes</span>
              </div>
              <div className="stat">
                <strong>89%</strong>
                <span>Profile</span>
              </div>
            </div>
            <a href="#" className="edit-btn">
              Edit Profile
            </a>
          </div>

    
          {/* Recent Chats Widget */}
          <div className="explore-chat-widget">
            <div className="explore-chat-header">
              <h3>Recent Chats</h3>
              <span className="explore-new-message-count">3 new</span>
            </div>

            <div className="explore-chat-list">
              {/* Chat Item 1 */}
              <div className="explore-chat-item explore-unread">
                <div className="explore-chat-content">
                  <div className="explore-chat-meta">
                    <span className="explore-chat-name">Priya</span>
                    <span className="explore-chat-time">2:00 PM</span>
                  </div>
                  <p className="explore-chat-message">
                    Hey there! How are you?
                    <span className="explore-unread-dot"></span>
                  </p>
                </div>
              </div>

              {/* Chat Item 2 */}
              <div className="explore-chat-item">
                <div className="explore-chat-content">
                  <div className="explore-chat-meta">
                    <span className="explore-chat-name">Rahul</span>
                    <span className="explore-chat-time">10:45 AM</span>
                  </div>
                  <p className="explore-chat-message">
                    Let's meet this weekend!
                  </p>
                </div>
              </div>
            </div>

            <div className="explore-chat-footer">
              <button className="explore-view-all-btn">
                View all messages
              {/* need to add icon here */}
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Match Modal */}
      {showMatchModal && currentMatch && (
        <div className="match-modal-overlay">
          <div className="match-modal">
            <button className="close-modal" onClick={handleCloseModal}>
              ×
            </button>
            <div className="match-content">
              <h2>It's a Match! 🎉</h2>
              <p>You and {currentMatch.name} have liked each other!</p>
              <div className="match-images">
                <img
                  src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=500&q=80"
                  alt="Your profile"
                  className="match-user-img"
                />
                <img
                  src={currentMatch.image}
                  alt={currentMatch.name}
                  className="match-user-img"
                />
              </div>
              <div className="match-actions">
                <button className="send-message-btn">💬 Send Message</button>
                <button className="keep-swiping-btn" onClick={handleCloseModal}>
                  Keep Swiping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Explore;
