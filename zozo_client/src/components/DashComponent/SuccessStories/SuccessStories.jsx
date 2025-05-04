import React, { useState } from 'react';
import SuccessStoryModal from '../SuccessStoryModal/SuccessStoryModal';
import './SuccessStories.css';
import { storiesData } from './SuccessStoriesData.js';

function SuccessStories() {
  console.log(storiesData);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const stories = [
  //   {
  //     id: 1,
  //     names: "Sarah & Mike",
  //     timeline: "Matched in 2022 • Engaged 2023",
  //     storiesData: "We matched during the pandemic and bonded over our love for hiking...",
  //     howTheyMet: "Through Zozo's 'Adventure Lovers' category",
  //     firstDate: "A 6-hour hike at sunrise",
  //     tags: ["#Outdoorsy", "#LongDistance"],
  //     photos: [
  //       "https://randomuser.me/api/portraits/women/44.jpg",
  //       "https://randomuser.me/api/portraits/men/32.jpg"
  //     ] 
  //   },
  //   // ... other stories
  // ];

  const openModal = (storiesData) => {
    setSelectedStory(storiesData);
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
        {storiesData.map((storiesData) => (
          <div className="story_card" key={storiesData.id}>
            <div className="couple_photos">
              <img
                src={storiesData.photos[0]}
                alt={storiesData.names.split("&")[0].trim()}
                className="partner_photo left"
              />
              <img
                src={storiesData.photos[1]}
                alt={storiesData.names.split("&")[1].trim()}
                className="partner_photo right"
              />
              <div className="heart_badge">❤️</div>
            </div>
            <div className="story_content">
              <h4>{storiesData.names}</h4>
              <p className="story_meta">{storiesData.timeline}</p>
              <p className="story_text">{storiesData.storiesData}</p>
              <div className="story_actions">
                <button
                  className="read_more_btn"
                  onClick={() => openModal(storiesData)}
                >
                  Read Full Story
                </button>
              </div>
              <div className="story_tags">
                {storiesData.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {isModalOpen && (
        <SuccessStoryModal storiesData={selectedStory} onClose={closeModal} />
      )}
    </section>
  );
}

export default SuccessStories;