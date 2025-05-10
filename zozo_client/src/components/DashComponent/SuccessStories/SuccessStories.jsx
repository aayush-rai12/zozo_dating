import React from 'react';
import './SuccessStories.css';
import { storiesData } from './SuccessStoriesData.js';

const SuccessStories = ({ openModal }) => {
  return (
    <section className="success_stories">
      <div className="section_header">
        <h3>Zozo Success Stories</h3>
        <button className="see_all_btn">Share Your Story</button>
      </div>
      
      <div className="story_cards">
        {storiesData.map((story) => (
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
                  onClick={() => openModal(story)} // Use the openModal function passed from the parent
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
    </section>
  );
};

export default SuccessStories;