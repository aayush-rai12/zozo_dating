import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './profileDetails.css';

const ImageUploadComponent = () => {
  const [photos, setPhotos] = useState(Array(6).fill(null));
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    birthdayDay: '',
    birthdayMonth: '',
    birthdayYear: '',
    gender: '',
    showGender: false,
    interestedIn: '',
    city: '',
    state: '',
    zip: '',
  });

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newPhotos = [...photos];
        newPhotos[index] = event.target.result;
        setPhotos(newPhotos);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (index) => {
    const newPhotos = [...photos];
    newPhotos[index] = null;
    setPhotos(newPhotos);
  };

  const handleInputChange = (e) => {
    const input = e.target;
    const updatedFormData = {
      ...formData,
      [input.name]: input.type === 'checkbox' ? input.checked : input.value,
    };
    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', { ...formData, photos });
  };

  return (
    <div className="container_profile_details d-flex justify-content-center vh-100 p-1">
      <div className="bg-white inside_container p-4 shadow-sm rounded w-100" style={{ maxWidth: '800px', height: 'fit-content' }}>
        <h1 className="text-center pro_heading mb-2">Create Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Left Column */}
            <div className="col-md-6">
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="firstName">Full Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </div>
              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="zozo@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              {/* Birthday */}
              <div className="form-group">
                <label>Birthday</label>
                <div className="row">
                  <div className="col">
                    <input type="text" name="birthdayDay" className="form-control" placeholder="DD" value={formData.birthdayDay} onChange={handleInputChange} />
                  </div>
                  <div className="col">
                    <input type="text" name="birthdayMonth" className="form-control" placeholder="MM" value={formData.birthdayMonth} onChange={handleInputChange} />
                  </div>
                  <div className="col">
                    <input type="text" name="birthdayYear" className="form-control" placeholder="YYYY" value={formData.birthdayYear} onChange={handleInputChange} />
                  </div>
                </div>
              </div>
              {/* Gender */}
              <div className="form-group">
                <label>Gender</label>
                <div className="btn-group btn-group-toggle d-flex">
                  {['man', 'woman', 'other'].map((option) => (
                    <label key={option} className="btn btn-outline-secondary flex-fill">
                      <input
                        type="radio"
                        name="gender"
                        value={option}
                        className="form_radio_input"
                        checked={formData.gender === option}
                        onChange={handleInputChange}
                        autoComplete="off"
                      />
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
              {/* Show Gender */}
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="showGender"
                  name="showGender"
                  checked={formData.showGender}
                  onChange={handleInputChange}
                />
                <label htmlFor="showGender" className="form-check-label">Show my gender on my profile</label>
              </div>
              {/* Interested In */}
              <div className="form-group">
                <label>Interested In</label>
                <div className="btn-group btn-group-toggle d-flex">
                  {['man', 'woman', 'other'].map((option) => (
                    <label key={option} className="btn btn-outline-secondary flex-fill">
                      <input
                        type="radio"
                        name="interestedIn"
                        value={option}
                        className="form_radio_input"
                        checked={formData.interestedIn === option}
                        onChange={handleInputChange}
                        autoComplete="off"
                      />
                      {option === 'other' ? 'Everyone' : option.charAt(0).toUpperCase() + option.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="col-md-6">
              <label>Profile photos</label>
              <div className="row photo-grid">
                {photos.map((photo, index) => (
                  <div className="col-4 mb-3" key={index}>
                    <div
                      className={`photo ${photo ? 'has-image' : 'add-photo'}`}
                      onClick={() => document.getElementById(`file-input-${index}`).click()}
                    >
                      {photo ? (
                        <>
                          <img src={photo} alt={`Profile ${index + 1}`} />
                          <button type="button" onClick={(e) => { e.stopPropagation(); handleRemovePhoto(index); }}>×</button>
                        </>
                      ) : (
                        <>
                          <i className="fas fa-plus"></i>
                          <input
                            id={`file-input-${index}`}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleFileChange(index, e)}
                          />
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-muted photo_text_guide">Upload 2 photos to start. Add 4+ for a standout profile</p>
            </div>

            {/* Address Fields */}
            <div className="col-md-6">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" className="form-control" placeholder="Enter your city" value={formData.city} onChange={handleInputChange} />
            </div>
            <div className="col-md-4">
              <label htmlFor="state">State</label>
              <select id="state" name="state" className="form-select form-control" value={formData.state} onChange={handleInputChange}>
                <option value="Durg">Durg</option>
                <option value="Rajnandgao">Rajnandgao</option>
                <option value="test1">test1</option>
                <option value="test">test...</option>
              </select>
            </div>
            <div className="col-md-2">
              <label htmlFor="zip">Zip</label>
              <input type="text" id="zip" name="zip" className="form-control" placeholder="12345" value={formData.zip} onChange={handleInputChange} />
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-outline-secondary submit_button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageUploadComponent;
