import React, { useState } from 'react';
import './registeredUserDetails.css';

const UserProfile = () => {
  const [user] = useState({
    name: "Alex Johnson",
    age: 28,
    phone: "+1 (555) 123-4567",
    birthday: "1995-08-15",
    gender: "Male",
    showGender: true,
    interestedIn: "Women",
    state: "California",
    city: "Los Angeles",
    pinCode: "90015",
    bio: "Adventure seeker and coffee enthusiast. Love hiking on weekends and trying new cuisines. Let's explore together!",
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
    ],
    interests: ["Hiking", "Coffee", "Travel", "Photography"]
  });

  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="dating-profile">
      {/* Profile Header with Image */}
      <div className="profile-header">
        <div className="profile-image-container">
          <img src={user.photos[0]} alt={user.name} className="main-profile-image" />
          <div className="profile-overlay">
            <h1>{user.name}, {user.age}</h1>
            <div className="location-badge">
              <span className="material-icons">location_on</span>
              {user.city}, {user.state}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          About
        </button>
        <button 
          className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          Details
        </button>
        <button 
          className={`tab-btn ${activeTab === 'photos' ? 'active' : ''}`}
          onClick={() => setActiveTab('photos')}
        >
          Photos
        </button>
      </div>

      {/* Tab Content */}
      <div className="profile-content">
        {activeTab === 'about' && (
          <div className="tab-panel about-panel">
            <h2>About Me</h2>
            <p>{user.bio}</p>
            
            <div className="interests-section">
              <h3>My Interests</h3>
              <div className="interests-grid">
                {user.interests.map((interest, index) => (
                  <span key={index} className="interest-tag">{interest}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="tab-panel details-panel">
            <div className="detail-card">
              <h3>Basic Info</h3>
              <div className="detail-row">
                <span className="detail-label">Birthday</span>
                <span className="detail-value">{formatDate(user.birthday)} ({getZodiac(user.birthday)})</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Gender</span>
                <span className="detail-value">{user.gender} {user.showGender ? "(Visible)" : "(Hidden)"}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Interested In</span>
                <span className="detail-value">{user.interestedIn}</span>
              </div>
            </div>

            <div className="detail-card">
              <h3>Location</h3>
              <div className="detail-row">
                <span className="detail-label">City</span>
                <span className="detail-value">{user.city}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">State</span>
                <span className="detail-value">{user.state}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">ZIP Code</span>
                <span className="detail-value">{user.pinCode}</span>
              </div>
            </div>

            <div className="detail-card">
              <h3>Contact</h3>
              <div className="detail-row">
                <span className="detail-label">Phone</span>
                <span className="detail-value">{user.phone}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'photos' && (
          <div className="tab-panel photos-panel">
            <div className="photo-grid">
              {user.photos.map((photo, index) => (
                <div key={index} className="photo-item">
                  <img src={photo} alt={`${user.name} ${index}`} />
                </div>
              ))}
              <div className="photo-item add-photo">
                <span className="add-icon">+</span>
                <span>Add Photo</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="action-btn message-btn">
          <span className="material-icons">message</span>
          Message
        </button>
        <button className="action-btn like-btn">
          <span className="material-icons">favorite</span>
          Like
        </button>
      </div>
    </div>
  );
};

// Helper functions remain the same as previous example
function formatDate(dateString) { /* ... */ }
function getZodiac(birthday) { /* ... */ }

export default UserProfile;