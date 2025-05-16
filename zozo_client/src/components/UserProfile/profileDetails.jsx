import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./profileDetails.css";
import apiClient from "../../utils/apiClient";

const UserDetails = () => {
  const registeredUser = JSON.parse(localStorage.getItem("user"));
  const [photos, setPhotos] = useState(Array(6).fill(null));
  const [formData, setFormData] = useState({
    firstName: registeredUser
      ? `${registeredUser.firstName || ""} ${
          registeredUser.lastName || ""
        }`.trim()
      : "",
    email: registeredUser ? `${registeredUser.email || ""}` : "",
    phone: "",
    birthday: "",
    birthdayDay: "",
    birthdayMonth: "",
    birthdayYear: "",
    gender: "",
    showGender: false,
    interestedIn: "",
    city: "",
    state: "",
    zip: "",
  });
  const [errors, setErrors] = useState({});
  const genders = ["man", "woman", "other"];
  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file && file.type.startsWith("image/")) {
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
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateFormData = () => {
    const matchZip = /^\d{6}$/;
    const matchEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const matchPhone = /^\d{10}$/;
    const matchName = /^[a-zA-Z\s]+$/;
    const matchCity = /^[a-zA-Z\s]+$/;

    const newErrors = {};
    const currentDate = new Date();
    // const eighteenYearsAgo = new Date();
    // eighteenYearsAgo.setFullYear(currentDate.getFullYear() - 18);

    // Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Full name is required";
    } else if (!matchName.test(formData.firstName)) {
      newErrors.firstName = "Please enter a valid name";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!matchEmail.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    // Interested in validation
    if (!formData.interestedIn) {
      newErrors.interestedIn = "Please select who you are interested in";
    }

    // Location validation
    if (!formData.state) {
      newErrors.state = "Please select your state";
    }

    if (!formData.city) {
      newErrors.city = "Please enter your city";
    } else if (!matchCity.test(formData.city)) {
      newErrors.city = "Please enter a valid city";
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Please enter your phone number";
    } else if (!matchPhone.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    // Zip validation
    if (!formData.zip) {
      newErrors.zip = "Please enter your zip code";
    } else if (!matchZip.test(formData.zip)) {
      newErrors.zip = "Please enter a valid zip code";
    }

    // Birthday validation
    if (
      !formData.birthdayDay ||
      !formData.birthdayMonth ||
      !formData.birthdayYear
    ) {
      newErrors.birthdayDay = "Please enter your complete birthday";
    } else {
      const day = parseInt(formData.birthdayDay, 10);
      const month = parseInt(formData.birthdayMonth, 10);
      const year = parseInt(formData.birthdayYear, 10);

      // Validate date components
      if (isNaN(day) || isNaN(month) || isNaN(year)) {
        newErrors.birthdayDay = "Please enter valid date numbers";
      } else {
        const birthday = new Date(year, month - 1, day);

        // Check if date is valid
        if (isNaN(birthday.getTime())) {
          newErrors.birthdayDay = "Please enter a valid date";
        } else {
          const today = new Date();

          // Check if birthday is in the future
          if (birthday > today) {
            newErrors.birthdayDay = "Birthday cannot be in the future";
          }
          // Check if user is at least 18 years old
          // else if (birthday > eighteenYearsAgo) {
          //   newErrors.birthdayDay = "You must be at least 18 years old";
          // }
        }
      }
    }

    // Photo validation
    const photoCount = photos.filter((photo) => photo !== null).length;
    if (photoCount < 1) {
      newErrors.photos = "Please upload at least 2 photos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateFormData();
    if (!isValid) return;

    const form = new FormData();

    // Append form data
    form.append("firstName", formData.firstName);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append(
      "birthday",
      `${formData.birthdayYear}-${formData.birthdayMonth}-${formData.birthdayDay}`
    );
    form.append("gender", formData.gender);
    form.append("showGender", formData.showGender);
    form.append("interestedIn", formData.interestedIn);
    form.append("city", formData.city);
    form.append("state", formData.state);
    form.append("pinCode", formData.zip);

    // Append images
    // A Blob (Binary Large Object) is a type of file-like object in JavaScript used to hold raw binary data, such as image or audio files.
    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      if (photo) {
        const blob = await fetch(photo).then((res) => res.blob());
        form.append("photos", blob, `photo${i + 1}.jpg`);
      }
    }

    try {
      console.log("Form Detais test", form);
      const response = await apiClient.post("/user/userDetails", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile created successfully!");
      console.log(response.data);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="container_profile_details d-flex justify-content-center vh-100 p-1">
      <div
        className="bg-white inside_container p-4 shadow-sm rounded w-100"
        style={{ maxWidth: "800px", height: "fit-content" }}
      >
        <h1 className="text-center pro_heading mb-2">
          Create Zozo Partner Account
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Left Column */}
            <div className="">
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
                  disabled
                />
                {errors.firstName && (
                  <span className="errors_label">{errors.firstName}</span>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled
                />
                {errors.email && (
                  <span className="errors_label">{errors.email}</span>
                )}
              </div>

              {/* Birthday */}
              <div className="form-group">
                <label>Birthday</label>
                <div className="row">
                  <div className="col-3">
                    <input
                      type="text"
                      name="birthdayDay"
                      className="form-control"
                      placeholder="DD"
                      maxLength="2"
                      value={formData.birthdayDay}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-3">
                    <input
                      type="text"
                      name="birthdayMonth"
                      className="form-control"
                      placeholder="MM"
                      maxLength="2"
                      value={formData.birthdayMonth}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-3">
                    <input
                      type="text"
                      name="birthdayYear"
                      className="form-control"
                      placeholder="YYYY"
                      maxLength="4"
                      value={formData.birthdayYear}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-3">
                    <div className="form-control date-preview">
                      {formData.birthdayDay ||
                      formData.birthdayMonth ||
                      formData.birthdayYear ? (
                        `${formData.birthdayDay || "DD"}/${
                          formData.birthdayMonth || "MM"
                        }/${formData.birthdayYear || "YYYY"}`
                      ) : (
                        <span className="text-muted">Preview</span>
                      )}
                    </div>
                  </div>
                </div>
                {errors.birthdayDay && (
                  <span className="errors_label">{errors.birthdayDay}</span>
                )}
              </div>

              {/* Gender */}
              <div className="form-group">
                <label>Gender</label>
                <div className="btn-group btn-group-toggle d-flex gap-4">
                  {genders.map((option) => (
                    <label
                      key={option}
                      className={`btn btn-outline-secondary flex-fill col-4 ${
                        formData.gender === option ? "active" : ""
                      }`}
                    >
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
                {errors.gender && (
                  <span className="errors_label">{errors.gender}</span>
                )}
              </div>

              {/* Show Gender */}
              <div className="form-check mb-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="showGender"
                  name="showGender"
                  checked={formData.showGender}
                  onChange={handleInputChange}
                />
                <label htmlFor="showGender" className="form-check-label">
                  Show my gender on my profile
                </label>
              </div>

              {/* Interested In */}
              <div className="col-md-6"></div>
              <div className="form-group">
                <label>Interested In</label>
                <div className="btn-group btn-group-toggle d-flex gap-4">
                  {genders.map((option) => (
                    <label
                      key={option}
                      className={`btn btn-outline-secondary flex-fill col-4 ${
                        formData.interestedIn === option ? "active" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="interestedIn"
                        value={option}
                        className="form_radio_input"
                        checked={formData.interestedIn === option}
                        onChange={handleInputChange}
                        autoComplete="off"
                      />
                      {option === "other"
                        ? "Everyone"
                        : option.charAt(0).toUpperCase() + option.slice(1)}
                    </label>
                  ))}
                </div>
                {errors.interestedIn && (
                  <span className="errors_label">{errors.interestedIn}</span>
                )}
              </div>
            </div>

            {/* Right Column - Photo Upload */}
            <div className="">
              <label>Profile photos</label>
              <div className="row photo-grid">
                {photos.map((photo, index) => (
                  <div className="col-4 mb-4" key={index}>
                    <div
                      className={`photo ${photo ? "has-image" : "add-photo"}`}
                      onClick={() =>
                        document.getElementById(`file-input-${index}`).click()
                      }
                    >
                      {photo ? (
                        <>
                          <img src={photo} alt={`Profile ${index + 1}`} />
                          <button
                            type="button"
                            className="remove-photo-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemovePhoto(index);
                            }}
                          >
                            ×
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="upload-placeholder">
                            <i className="fas fa-camera"></i>
                            <span>Add Photo</span>
                          </div>
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
              {errors.photos && (
                <span className="errors_label">{errors.photos}</span>
              )}
              <p className="text-muted photo_text_guide">
                Upload 2 photos to start. Add 4+ for a standout profile
              </p>
            </div>

            {/* Address Fields - Full width at bottom */}
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="state">State</label>
                <select
                  id="state"
                  name="state"
                  className="form-select form-control"
                  value={formData.state}
                  onChange={handleInputChange}
                >
                  <option value="">Select State</option>
                  <option value="Durg">Durg</option>
                  <option value="Rajnandgao">Rajnandgao</option>
                  <option value="test1">test1</option>
                  <option value="test">test...</option>
                </select>
                {errors.state && (
                  <span className="errors_label">{errors.state}</span>
                )}
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="form-control"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
                {errors.city && (
                  <span className="errors_label">{errors.city}</span>
                )}
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="zip">Zip</label>
                <input
                  type="text"
                  id="zip"
                  name="zip"
                  className="form-control"
                  placeholder="12345"
                  value={formData.zip}
                  onChange={handleInputChange}
                />
                {errors.zip && (
                  <span className="errors_label">{errors.zip}</span>
                )}
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="form-control"
                  placeholder="1234567890"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && (
                  <span className="errors_label">{errors.phone}</span>
                )}
              </div>
            </div>
          </div>

          <div className="text-center mt-3">
            <button type="submit" className="btn submit_button">
              Create Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
