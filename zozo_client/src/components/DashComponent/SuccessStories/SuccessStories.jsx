import React, { useState } from 'react';
import SuccessStoryModal from '../SuccessStoryModal/SuccessStoryModal';
import './SuccessStories.css';

function SuccessStories() {
  const [selectedStory, setSelectedStory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stories = [
    {
      id: 1,
      names: "Sarah & Mike",
      timeline: "Matched in 2022 • Engaged 2023",
      story: "We matched during the pandemic and bonded over our love for hiking...",
      howTheyMet: "Through Zozo's 'Adventure Lovers' category",
      firstDate: "A 6-hour hike at sunrise",
      tags: ["#Outdoorsy", "#LongDistance"],
      photos: [
        "https://randomuser.me/api/portraits/women/44.jpg",
        "https://randomuser.me/api/portraits/men/32.jpg"
      ] 
    },
    // ... other stories
  ];

  const openModal = (story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStory(null);
  };

  return (
    <section className="success_stories">
      <div className="section_header">
        <h3>Zozo Success Stories</h3>
        <button className="see_all_btn">Share Your Story</button>
      </div>
      
      <div className="story_cards">
        {stories.map((story) => (
          <div className="story_card" key={story.id}>
            <div className="couple_photos">
              <img
                src={story.photos[0]}
                alt={story.names.split("&")[0].trim()}
                className="partner_photo left"
              />
              <img
                src={story.photos[1]}
                alt={story.names.split("&")[1].trim()}
                className="partner_photo right"
              />
              <div className="heart_badge">❤️</div>
            </div>
            <div className="story_content">
              <h4>{story.names}</h4>
              <p className="story_meta">{story.timeline}</p>
              <p className="story_text">{story.story}</p>
              <div className="story_actions">
                <button
                  className="read_more_btn"
                  onClick={() => openModal(story)}
                >
                  Read Full Story
                </button>
              </div>
              <div className="story_tags">
                {story.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {isModalOpen && (
        <SuccessStoryModal story={selectedStory} onClose={closeModal} />
      )}
    </section>
  );
}

export default SuccessStories;