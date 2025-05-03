import React, { useState, useRef } from "react";
import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { Clipboard } from "lucide-react";
import "./emotionModal.css";

const moods = [
  { label: "Happy", emoji: "😊", color: "#FFD700" },
  { label: "Sad", emoji: "😢", color: "#87CEEB" },
  { label: "Angry", emoji: "😡", color: "#FF6347" },
  { label: "Calm", emoji: "😌", color: "#90EE90" },
  { label: "Excited", emoji: "🤩", color: "#FF8C00" },
  { label: "Loved", emoji: "❤️", color: "#FF1493" },
  { label: "Celebrating", emoji: "🥳", color: "#FF4500" },
  // { label: "Confident", emoji: "😎", color: "#8B0000" },
  // { label: "Tired", emoji: "🥱", color: "#D3D3D3" },
  // { label: "Surprised", emoji: "😲", color: "#FF4500" },
  // { label: "Nervous", emoji: "😬", color: "#A9A9A9" },
  // { label: "Silly", emoji: "🤪", color: "#FF69B4" },
  // { label: "Grateful", emoji: "🙏", color: "#4682B4" },
  // { label: "Lonely", emoji: "🥺", color: "#483D8B" },
  // { label: "Hopeful", emoji: "🌈", color: "#32CD32" },
  // { label: "Frustrated", emoji: "😖", color: "#B22222" },
  // { label: "Peaceful", emoji: "🕊️", color: "#00CED1" },
];

const EmotionModal = ({ show, handleClose, handleSave }) => {
  const [feeling, setFeeling] = useState("");
  const [mood, setMood] = useState(null);
  const [intensity, setIntensity] = useState("");
  const [trigger, setTrigger] = useState("");
  const [preferredActivity, setPreferredActivity] = useState("");
  const [partnerReaction, setPartnerReaction] = useState("");
  const emojiContainerRef = useRef(null);

  const maxChars = 250;

  const handleSubmit = () => {
    const newEntry = {
      id: Date.now(),
      feelings: feeling,
      mood: mood ? mood.label : "",
      moodColor: mood?.color || "#fcb1b1", // Optional, if you want to keep colors
      intensity,
      trigger,
      createdDate: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      preferredActivity,
      partnerImpact: partnerReaction,
    };

    const isSaved = handleSave(newEntry); // <-- This comes from props now

    if (!isSaved) {
      console.log("Save failed due to validation.");
      return;
    }

    // Reset form & close modal
    setFeeling("");
    setMood(null);
    setIntensity("");
    setTrigger("");
    setPreferredActivity("");
    setPartnerReaction("");
    handleClose();
    console.log("Save successful.");
  };

  const triggerOptions = [
    "They smiled at you",
    "Their voice",
    "The way they talk",
    // "Custom",
  ];
  const [selectedOption, setSelectedOption] = useState("");
  const [customTrigger, setCustomTrigger] = useState("");

  return (
    <div
      className="feel_bg-gradient"
      style={{
        background: mood?.color || "#fcb1b1",
        transition: "background 0.5s ease-in-out",
      }}
    >
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="custom_modal"
        size="lg"
        style={{
          backgroundColor: `${mood?.color}20`,
          boxShadow: mood
            ? `0px 4px 20px ${mood.color}80`
            : "0px 4px 10px rgba(0, 0, 0, 0.1)",
          transition: "all 0.5s ease-in-out",
        }}
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: `${mood?.color}20` }}
        >
          <Modal.Title>Share Your Feeling</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ padding: "0" }}>
          <div
            className="emotionModal_container "
            style={{
              // backgroundColor: mood?.color || "#f0f0f0",
              boxShadow: mood
                ? `0px 4px 20px ${mood.color}80`
                : "0px 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "all 0.5s ease-in-out",
            }}
          >
            <div
              className="emotionModal_card"
              style={{
                // backgroundColor: mood?.color || "#f0f0f0",
                boxShadow: mood
                  ? `0px 4px 20px ${mood.color}80`
                  : "0px 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "all 0.5s ease-in-out",
              }}
            >
              <Form>
                <Form.Group>
                  <div className="emotionModal_input_container">
                    <textarea
                      className="emotionModal_textarea"
                      // rows="1"
                      placeholder="Share your feeling..."
                      value={feeling}
                      onChange={(e) => setFeeling(e.target.value)}
                      maxLength={maxChars}
                    ></textarea>
                    <div className="emotionModal_char_counter">
                      <Clipboard className="emotionModal_clipboard_icon" />
                      {feeling.length}/{maxChars}
                    </div>
                  </div>
                </Form.Group>

                {/* Mood Selector */}
                <Form.Group>
                  <div className="emoji-section">
                    <div className="mood-selector" ref={emojiContainerRef}>
                      {moods.map((item) => (
                        <button
                          type="button"
                          key={item.label}
                          className={`mood_btn ${
                            mood?.label === item.label ? "selected" : ""
                          }`}
                          style={{
                            backgroundColor:
                              mood?.label === item.label
                                ? item.color
                                : "#f0f0f0",
                          }}
                          onClick={() => setMood(item)}
                          aria-label={`Select mood ${item.label}`}
                        >
                          {item.emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </Form.Group>

                {/* Intensity & Trigger Reason in One Row */}
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingIntensity"
                        label="Intensity"
                      >
                        <Form.Select
                          value={intensity}
                          onChange={(e) => setIntensity(e.target.value)}
                        >
                          <option value="">Select Intensity</option>
                          <option value="Very Low">Very Low</option>
                          <option value="Low">Low</option>
                          <option value="Moderate">Moderate</option>
                          <option value="High">High</option>
                          <option value="Very High">Very High</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    {/* Show dropdown only if not "Custom" */}
                    {selectedOption !== "Custom" && (
                      <Form.Group>
                        <FloatingLabel
                          controlId="floatingTriggerSelect"
                          label="Trigger Reason"
                        >
                          <Form.Select
                            value={selectedOption}
                            onChange={(e) => {
                              const value = e.target.value;
                              setSelectedOption(value);
                              if (value !== "Custom") {
                                setTrigger(value);
                                setCustomTrigger("");
                              } else {
                                setTrigger("");
                              }
                            }}
                          >
                            <option value="">Select a reason</option>
                            {triggerOptions.map((reason, index) => (
                              <option key={index} value={reason}>
                                {reason}
                              </option>
                            ))}
                            <option value="Custom">Custom</option>
                          </Form.Select>
                        </FloatingLabel>
                      </Form.Group>
                    )}

                    {/* Show custom input with icon inside */}
                    {selectedOption === "Custom" && (
                      <Form.Group className="position-relative">
                        <FloatingLabel
                          controlId="floatingTrigger"
                          label="Trigger Reason"
                        >
                          <Form.Control
                            type="text"
                            placeholder="What triggered this feeling?"
                            value={trigger}
                            onChange={(e) => setTrigger(e.target.value)}
                            style={{ paddingRight: "2.5rem" }} // make room for icon
                          />
                        </FloatingLabel>

                        {/* Icon inside input */}
                        <span
                          className="position-absolute top-50 translate-middle-y"
                          style={{
                            right: "10px",
                            cursor: "pointer",
                            color: "#6c757d",
                          }}
                          onClick={() => {
                            setSelectedOption("");
                            setTrigger("");
                          }}
                          title="Back to list"
                        >
                          <i
                            className="fas fa-arrow-left position-absolute"
                            style={{
                              top: "50%",
                              right: "10px",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                              color: "#6c757d",
                            }}
                          ></i>
                        </span>
                      </Form.Group>
                    )}
                  </Col>
                </Row>

                {/* Preferred Activity & Partner Reacted in Second Row */}
                <Row className="mt-3">
                  <Col md={6}>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingPreferredActivity"
                        label="Preferred Activity"
                      >
                        <Form.Control
                          type="text"
                          placeholder="What would make you feel better?"
                          value={preferredActivity}
                          onChange={(e) => setPreferredActivity(e.target.value)}
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <FloatingLabel
                        controlId="floatingPartnerReaction"
                        label="Partner Reacted"
                      >
                        <Form.Control
                          type="text"
                          placeholder="How did your partner react?"
                          value={partnerReaction}
                          onChange={(e) => setPartnerReaction(e.target.value)}
                        />
                      </FloatingLabel>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmotionModal;
