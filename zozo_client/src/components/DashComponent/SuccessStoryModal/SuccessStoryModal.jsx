import React from 'react';
import { FaShare, FaTimes } from 'react-icons/fa';
import './SuccessStoryModal.css'; // We'll create this next

const SuccessStoryModal = ({ story, onClose }) => {
  if (!story) return null;

  return (
    <div className="story_modal_overlay">
      <div className="story_modal">
        <button 
          className="close_modal"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes />
        </button>
        
        <div className="modal_couple_header">
          <div className="modal_couple_photos">
            <img 
              src={story.photos[0]} 
              alt={story.names.split('&')[0].trim()} 
              className="modal_partner_photo left" 
              loading="lazy"
            />
            <img 
              src={story.photos[1]} 
              alt={story.names.split('&')[1].trim()} 
              className="modal_partner_photo right" 
              loading="lazy"
            />
            <div className="modal_heart_badge">❤️</div>
          </div>
          <h2>{story.names}</h2>
          <p className="modal_timeline">{story.timeline}</p>
        </div>
        
        <div className="modal_story_content">
          <div className="story_quote">
            <p>"{story.story}"</p>
          </div>
          
          <div className="story_details">
            <div className="detail_card">
              <h4>How They Met</h4>
              <p>{story.howTheyMet || "Connected through mutual interests"}</p>
            </div>
            
            <div className="detail_card">
              <h4>First Date</h4>
              <p>{story.firstDate || "A memorable first encounter"}</p>
            </div>
          </div>
          
          <div className="story_tags">
            {story.tags.map(tag => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        
        <div className="modal_footer">
          <button className="share_story_btn">
            <FaShare /> Share Their Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoryModal;