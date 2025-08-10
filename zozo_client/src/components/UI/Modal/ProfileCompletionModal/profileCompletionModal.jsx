import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from "react-bootstrap";
import "./profileCompletionModal.css";

export default function ProfileCompletionModal({ showModal, setIsModalOpen, item, onComplete }) {
  const preferencesOptions = ['friendship', 'dating', 'relationship', 'networking', 'Other'];
  const [interests, setInterests] = useState([]);
  const [interestInput, setInterestInput] = useState('');
  const [bio, setBio] = useState('');
  const [preferences, setPreferences] = useState(['dating']);
  const [instagramUsername, setInstagramUsername] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [personalityAnswers, setPersonalityAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const interestInputRef = useRef(null);

  // Reset form when item changes
  useEffect(() => {
    if (item) {
      setInterests([]);
      setInterestInput('');
      setBio('');
      setInstagramUsername('');
      setProfilePhoto(null);
      setPersonalityAnswers({});
    }
  }, [item]);

  const handleSelectAllPreferences = () => {
    if (preferences.length === preferencesOptions.length) {
    setPreferences([]); 
  } else {
    setPreferences([...preferencesOptions]); 
  }
  };

  const handleInterestKeyDown = (e) => {
    if (['Enter', 'Tab', ','].includes(e.key)) {
      e.preventDefault();
      addInterest();
    }
  };

  const addInterest = () => {
    const value = interestInput.trim();
    if (value && !interests.includes(value) && interests.length < 7) {
      setInterests([...interests, value]);
      setInterestInput('');
    }
  };

  const removeInterest = (index) => {
    setInterests(interests.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    setIsLoading(true);
    console.log("Submitting data for photo:", profilePhoto);
    let completionData;
    switch(item?.id) {
      case 'interests':
        completionData = interests;
        break;
      case 'bio':
        completionData = bio;
        break;
      case 'instagram':
        completionData = instagramUsername;
        break;
      case 'preferences':
        completionData = preferences;
        break;
      case 'profilePhoto':
        completionData = profilePhoto;
        break;
      case 'personality':
        completionData = personalityAnswers;
        break;
      default:
        completionData = null;
    }

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
          <div className="procomplition-form-section">
            <label className="procomplition-form-label">Add your interests (up to 7)</label>
            <div className="procomplition-tags-container">
              {interests.map((interest, index) => (
                <div key={index} className="procomplition-tag">
                  {interest}
                  <button 
                    type="button"
                    className="procomplition-tag-remove"
                    onClick={() => removeInterest(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
              <input
                ref={interestInputRef}
                type="text"
                className="procomplition-tag-input"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={handleInterestKeyDown}
                onBlur={addInterest}
                placeholder="Type interest and press Enter"
              />
            </div>
            <div className="procomplition-tags-counter">{interests.length}/7 interests</div>
          </div>
        );
      
      case 'bio':
        return (
          <div className="procomplition-form-section">
            <label className="procomplition-form-label">Write your bio (max 300 characters)</label>
            <textarea
              className="procomplition-bio-input"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={300}
              rows={5}
              placeholder="Tell others about yourself..."
            />
            <div className="procomplition-char-counter">{bio.length}/300 characters</div>
          </div>
        );

      case 'preferences':
        return (
          <div className="procomplition-form-section">
            <label className="procomplition-form-label">What are you looking for?</label>
            <div className="procomplition-preferences-options">
              {preferencesOptions.map((option) => (
                <label key={option} className="procomplition-preference-option">
                  <input className="procomplition-preference-checkbox"
                    type="checkbox"
                    checked={preferences.includes(option)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPreferences([...preferences, option]);
                      } else {
                        setPreferences(preferences.filter(pref => pref !== option));
                      }
                    }}
                  />
                  <span className="procomplition-preference-label">
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </span>
                </label>
              ))}
            </div>
            <button className="procomplition-form-hint" onClick={handleSelectAllPreferences}>  {preferences.length === preferencesOptions.length ? 'Deselect all' : 'Select all'}</button>
          </div>
        );
      
      case 'instagram':
        return (
          <div className="procomplition-form-section">
            <label className="procomplition-form-label">Connect your Instagram account</label>
            <div className="procomplition-instagram-container">
              <span className="procomplition-instagram-at">@</span>
              <input
                type="text"
                className="procomplition-instagram-input"
                placeholder="username"
                value={instagramUsername}
                onChange={(e) => setInstagramUsername(e.target.value.replace('@', ''))}
              />
            </div>
            <p className="procomplition-form-hint">We'll never post without your permission</p>
          </div>
        );
      
      case 'profilePhoto':
        return (
          <div className="procomplition-form-section">
            <label className="procomplition-form-label">Upload profile photo</label>
            <label htmlFor="procomplition-photo-upload" className="procomplition-file-upload-label">
              <div className="procomplition-upload-area">
                {profilePhoto ? (
                  <>
                    <i className="procomplition-upload-icon">✓</i>
                    <p className="procomplition-file-name">{profilePhoto.name}</p>
                  </>
                ) : (
                  <>
                    <i className="procomplition-upload-icon">+</i>
                    <p>Click to browse files</p>
                  </>
                )}
              </div>
              <input
                id="procomplition-photo-upload"
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>
        );
      
      case 'personality':
        return (
          <div className="procomplition-form-section">
            <label className="procomplition-form-label">Answer these questions</label>
            {[
              { id: 'q1', question: "I'm more of an..." },
              { id: 'q2', question: "My ideal date is..." }
            ].map(q => (
              <div key={q.id} className="procomplition-personality-question">
                <p className="procomplition-question-text">{q.question}</p>
                <input
                  type="text"
                  className="procomplition-personality-input"
                  value={personalityAnswers[q.id] || ''}
                  onChange={(e) => setPersonalityAnswers({
                    ...personalityAnswers,
                    [q.id]: e.target.value
                  })}
                  placeholder="Your answer..."
                />
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={() => setIsModalOpen(false)}
      centered
      size="lg"
      className="procomplition-modal"
    >
      <Modal.Header closeButton className="procomplition-modal-header">
        <Modal.Title className="procomplition-modal-title">
          {item ? `Complete Your ${item.label}` : "Profile Completion"}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="procomplition-modal-body">
        {renderFormContent()}
      </Modal.Body>
      
      <Modal.Footer className="procomplition-modal-footer">
        <Button 
          variant="outline-secondary" 
          onClick={() => setIsModalOpen(false)}
          className="procomplition-cancel-btn"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          disabled={isLoading || (
            (item?.id === 'interests' && interests.length === 0) ||
            (item?.id === 'bio' && !bio.trim()) ||
            (item?.id === 'instagram' && !instagramUsername.trim()) ||
            (item?.id === 'profilePhoto' && !profilePhoto) ||
            (item?.id === 'personality' && Object.keys(personalityAnswers).length === 0)
          )}
          className="procomplition-save-btn"
        >
          {isLoading ? (
            <>
              <span className="procomplition-spinner spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Saving...
            </>
          ) : 'Save Changes'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}