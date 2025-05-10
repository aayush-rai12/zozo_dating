import React, { useState } from "react";
import "./Explore.css";

function Explore() {
  // Sample profile data
  const profiles = [
    {
      id: 1,
      name: "Gabriel",
      age: 27,
      mood: "Happy",
      bio: "Adventure seeker and coffee enthusiast. Let's explore the world together!",
      interests: ["Hiking", "Photography", "Travel", "Coffee"],
      compatibility: 78,
      audioTitle: "My Vibe Introduction",
      audioDuration: "0:30",
      audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Sample audio
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=774&q=80",
      online: true,
    },
    {
      id: 2,
      name: "Sophia",
      age: 24,
      mood: "Excited",
      bio: "Art lover and music junkie. Let's create memories together!",
      interests: ["Painting", "Music", "Dancing", "Reading"],
      compatibility: 85,
      audioTitle: "About Me",
      audioDuration: "0:45",
      audioSrc: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", // Sample audio
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=774&q=80",
      online: true,
    },
  ];

  const [theme, setTheme] = useState("light");

  const [isPlaying, setIsPlaying] = useState(false);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleAudio = (profileId) => {
    playingAudio = profileId;
    if (profileId === profileId) {
      // Pause audio if clicking the currently playing profile
      setPlayingAudio(null);
    } else {
      // Play audio for the clicked profile
      setPlayingAudio(profileId);
    }
  };

  return (
    <div className="explore_container">
      <div className={`explore_main_container ${theme}`} data-theme={theme}>
        {/* Dark Mode Toggle */}
        <button className="theme-toggle" onClick={toggleTheme}>
          <i className={`fas ${theme === "dark" ? "fa-sun" : "fa-moon"}`}></i>
        </button>

        {/* Header */}
        <div className="header">
          <h2 className="tagline">Spark New Connections</h2>
          <p className="subtagline">Find your perfect vibe match</p>
          <div className="music-tab">
            <i className="fas fa-music"></i> Play My Vibe
          </div>
        </div>

        {/* Profile Card */}
        {/* {profiles.map((profile, index) => console.log("test", index))} */}

        {/* <div className="profile-container">
          <div className="profile-card">
            <div className="profile-badge">Online Now</div>
            <div className="profile-image-container">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=774&q=80"
                alt="Gabriel"
                className="profile-image"
              />
            </div>
            <div className="profile-info">
              <div className="name-CurrectMood">
                <h3 className="profile-name">
                  Gabriel <span className="profile-age">27</span>
                </h3>
                <span className="current-mood">Happy</span>
              </div>
              <p className="profile-bio">
                Adventure seeker and coffee enthusiast. Let's explore the world
                together!
              </p>

              <div className="interest-tags">
                <span className="interest-tag">Hiking</span>
                <span className="interest-tag">Photography</span>
                <span className="interest-tag">Travel</span>
                <span className="interest-tag">Coffee</span>
              </div>

              <div className="compatibility-meter">
                <div className="compatibility-label">
                  <span>Compatibility</span>
                  <span>78%</span>
                </div>
                <div className="meter-bar">
                  <div className="meter-fill" style={{ width: "78%" }}></div>
                </div>
              </div>

              <div className="audio-preview" onClick={toggleAudio}>
                <div className="audio-play-btn">
                  <i
                    className={`fas ${isPlaying ? "fa-pause" : "fa-play"}`}
                  ></i>
                </div>
                <div className="audio-info">
                  <div className="audio-title">My Vibe Introduction</div>
                  <div className="audio-duration">1:24</div>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Profile Cards - using map() */}
        <div className="profile-container">
          {profiles.map((profile) => (
            <div className="profile-card" key={profile.id}>
              {profile.online && (
                <div className="profile-badge">Online Now</div>
              )}
              <div className="profile-image-container">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="profile-image"
                />
              </div>
              <div className="profile-info">
                <div className="name-CurrectMood">
                  <h3 className="profile-name">
                    {profile.name}{" "}
                    <span className="profile-age">{profile.age}</span>
                  </h3>
                  <span className="current-mood">{profile.mood}</span>
                </div>
                <p className="profile-bio">{profile.bio}</p>

                <div className="interest-tags">
                  {profile.interests.map((interest, index) => (
                    <span key={index} className="interest-tag">
                      {interest}
                    </span>
                  ))}
                </div>

                <div className="compatibility-meter">
                  <div className="compatibility-label">
                    <span>Compatibility</span>
                    <span>{profile.compatibility}%</span>
                  </div>
                  <div className="meter-bar">
                    <div
                      className="meter-fill"
                      style={{ width: `${profile.compatibility}%` }}
                    ></div>
                  </div>
                </div>

                <div className="audio-preview" onClick={toggleAudio}>
                  <div className="audio-play-btn">
                    <i
                      className={`fas ${isPlaying ? "fa-pause" : "fa-play"}`}
                    ></i>
                  </div>
                  <div className="audio-info">
                    <div className="audio-title">{profile.audioTitle}</div>
                    <div className="audio-duration">
                      {profile.audioDuration}
                    </div>
                  </div>
                  <audio
                    src={profile.audioSrc}
                    // autoPlay={playingAudio === profile.id}
                    onEnded={() => setPlayingAudio(null)}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Features */}
        <div className="features-section">
          <div className="section-header">
            <h4 className="section-title">Premium Features</h4>
            <a href="#" className="see-all">
              See All
            </a>
          </div>
          <div className="feature-cards">
            {[
              {
                title: "VIP Events",
                desc: "Exclusive parties and meetups for premium members",
                img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1740&q=80",
              },
              {
                title: "Audio Dating",
                desc: "Connect through voice before meeting",
                img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1740&q=80",
              },
              {
                title: "Date Planner",
                desc: "AI-powered date ideas based on mutual interests",
                img: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=1740&q=80",
              },
            ].map((feature, idx) => (
              <div className="feature-card" key={idx}>
                <img
                  src={feature.img}
                  className="feature-image"
                  alt={feature.title}
                />
                <div className="feature-content">
                  <div className="feature-title">{feature.title}</div>
                  <div className="feature-desc">{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bottom-nav">
          <a href="#" className="nav-item active">
            <i className="fas fa-home"></i>
            <span>Home</span>
          </a>
          <a href="#" className="nav-item">
            <i className="fas fa-comment-dots"></i>
            <span>Messages</span>
            <span className="nav-notification">3</span>
          </a>
          <a href="#" className="nav-item">
            <i className="fas fa-heart"></i>
            <span>Matches</span>
          </a>
          <a href="#" className="nav-item active">
            <i className="fas fa-user"></i>
            <span>Profile</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Explore;
