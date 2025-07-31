import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import Tags from '@yaireo/tagify/dist/react.tagify';
import '@yaireo/tagify/dist/tagify.css';
import "./profileCompletionModal.css";

export default function ProfileCompletionModal({ showModal, setIsModalOpen, item, onComplete }) {
  const [interests, setInterests] = useState([]);
  const [bio, setBio] = useState('');
  const [instagramUsername, setInstagramUsername] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [personalityAnswers, setPersonalityAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleTagChange = (e) => {
    try {
      const tagValues = JSON.parse(e.detail.value);
      setInterests(tagValues.map(tag => tag.value));
    } catch {
      setInterests([]);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    
    let completionData;
    switch(item?.id) {
      case 'interests':
        completionData = interests.join(', ');
        console.log("Interests submitted:", completionData);
        break;
      case 'bio':
        completionData = bio;
        break;
      case 'instagram':
        completionData = instagramUsername;
        break;
      case 'profilePhoto':
        completionData = profilePhoto?.name || '';
        break;
      case 'personality':
        completionData = Object.values(personalityAnswers).join(' | ');
        break;
      default:
        completionData = '';
    }

    // Simulate API call
    setTimeout(() => {
      onComplete(item, completionData);
      setIsModalOpen(false);
      setIsLoading(false);
    }, 1000);
  };

  const renderFormContent = () => {
    if (!item) return null;

    switch(item.id) {
      case 'interests':
        return (
          <div className="form-section">
            <label>Add your interests (up to 7)</label>
            <Tags
              value={interests.join(',')}
              settings={{
                whitelist: [
                  "Travel", "Music", "Dancing", "Photography", "Food",
                  "Movies", "Coding", "Sports", "Reading", "Gaming", "Art", "Cooking"
                ],
                maxTags: 7,
                dropdown: {
                  enabled: 0,
                  maxItems: 8,
                  classname: "tagify-dropdown",
                  closeOnSelect: false
                }
              }}
              placeholder="Type interest and press Enter"
              autoFocus
              onChange={handleTagChange}
            />
          </div>
        );
      
      case 'bio':
        return (
          <div className="form-section">
            <label>Write your bio (max 300 characters)</label>
            <textarea
              className='profile-bio'
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={300}
              rows={4}
            />
            <div className="char-counter">{bio.length}/300</div>
          </div>
        );
      
      case 'instagram':
        return (
          <div className="form-section">
            <label>Connect your Instagram account</label>
            <input
              type="text"
              placeholder="@username"
              value={instagramUsername}
              onChange={(e) => setInstagramUsername(e.target.value)}
            />
            <p className="form_hint_insta">We'll never post without your permission</p>
          </div>
        );
      
      case 'profilePhoto':
        return (
          <div className="form-section">
            <label>Upload profile photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePhoto(e.target.files[0])}
            />
            {profilePhoto && (
              <p className="form_hint_insta">Selected: {profilePhoto.name}</p>
            )}
          </div>
        );
      
      case 'personality':
        return (
          <div className="form-section">
            <label>Answer these questions</label>
            {[
              { id: 'q1', question: "I'm more of an..." },
              { id: 'q2', question: "My ideal date is..." }
            ].map(q => (
              <div key={q.id} className="personality-question">
                <p>{q.question}</p>
                <input
                  type="text"
                  value={personalityAnswers[q.id] || ''}
                  onChange={(e) => setPersonalityAnswers({
                    ...personalityAnswers,
                    [q.id]: e.target.value
                  })}
                />
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    if (!item) return "Complete Profile";
    switch(item.id) {
      case 'interests': return "Add Your Interests";
      case 'bio': return "Write Your Bio";
      case 'instagram': return "Connect Instagram";
      case 'profilePhoto': return "Add Profile Photo";
      case 'personality': return "Personality Questions";
      default: return item.label;
    }
  };

  return (
    <Modal
      className="profile-completion-modal"
      show={showModal}
      onHide={() => setIsModalOpen(false)}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>{getModalTitle()}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body className='profile-completion-body'>
        {renderFormContent()}
      </Modal.Body>
      
      <Modal.Footer className='profile-completion-footer'> 
        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
          Cancel
        </Button>
        <Button className='profile-completion-save-btn'
          variant="primary" 
          onClick={handleSubmit}
          disabled={isLoading || (
            (item?.id === 'interests' && interests.length === 0) ||
            (item?.id === 'bio' && !bio.trim()) ||
            (item?.id === 'instagram' && !instagramUsername.trim()) ||
            (item?.id === 'profilePhoto' && !profilePhoto) ||
            (item?.id === 'personality' && Object.keys(personalityAnswers).length === 0)
          )}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}