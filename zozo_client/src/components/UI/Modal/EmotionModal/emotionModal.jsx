import React, { useState, useRef, useEffect } from "react";
import { Modal, Button, Form, Row, Col, FloatingLabel } from "react-bootstrap";
import { Clipboard } from "lucide-react";
import "./emotionModal.css";
import apiClient from "../../../../utils/apiClient";

const moods = [
  { label: "Happy", emoji: "😊", color: "#FFD700" },
  { label: "Sad", emoji: "😢", color: "#87CEEB" },
  { label: "Angry", emoji: "😡", color: "#FF6347" },
  { label: "Calm", emoji: "😌", color: "#90EE90" },
  { label: "Excited", emoji: "🤩", color: "#FF8C00" },
  { label: "Loved", emoji: "❤️", color: "#c9184a" },
  { label: "Celebrating", emoji: "🥳", color: "#FF4500" },
];

const EmotionModal = ({ show, handleClose, fetchEmotionData, editItem }) => {
  const [feeling, setFeeling] = useState("");
  const [mood, setMood] = useState(null);
  const [intensity, setIntensity] = useState("");
  const [triggerReason, setTrigger] = useState("");
  const [preferredActivity, setPreferredActivity] = useState("");
  const [partnerReaction, setPartnerReaction] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [customTrigger, setCustomTrigger] = useState("");

  const maxChars = 250;
  const emojiContainerRef = useRef(null);
  useEffect(() => {
    if (editItem) {
      setFeeling(editItem.feelings || "");
      setMood(moods.find((m) => m.label === editItem.mood));
      setIntensity(editItem.intensity || "");
      setTrigger(editItem.triggerReason || "");
      setPreferredActivity(editItem.preferredActivity || "");
      setPartnerReaction(editItem.partnerImpact || "");
      setSelectedOption(editItem.triggerReason || "");
    }
  }, [editItem]);

  const triggerOptions = [
    "They smiled at you",
    "Their voice",
    "The way they talk",
  ];

  useEffect(() => {
    if (!show) {
      // Reset form on modal close
      setFeeling("");
      setMood(null);
      setIntensity("");
      setTrigger("");
      setPreferredActivity("");
      setPartnerReaction("");
      setSelectedOption("");
      setCustomTrigger("");
    }
  }, [show]);

  const handleSubmit = async () => {
    if (editItem) {
      alert("thode din ruko, edit item ka code likhna baaki hai");
      return;
    }
    const newEntry = {
      user_Id: JSON.parse(localStorage.getItem("user"))?.user_Id,
      feelings: feeling.trim(),
      mood: mood?.label || "",
      moodColor: mood?.color || "#fcb1b1",
      intensity,
      triggerReason,
      createdDate: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      preferredActivity: preferredActivity.trim(),
      partnerImpact: partnerReaction.trim(),
    };

    if (
      !newEntry.user_Id ||
      !newEntry.feelings ||
      !newEntry.mood ||
      !newEntry.intensity ||
      !newEntry.triggerReason ||
      !newEntry.preferredActivity ||
      !newEntry.partnerImpact
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await apiClient.post("/user/saveEmotionData", newEntry);
      if (response.status === 200) {
        console.log(
          "Emotion data saved successfully!",
          response.data.emotionCardDetails
        );
        // Re-fetch updated emotion data
        // await fetchEmotionData(newEntry.user_Id);
        await fetchEmotionData();
        // Call the parent handler to update state
        handleClose(); // Close modal after success
      }
    } catch (error) {
      console.error("Failed to save emotion data:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

        <Modal.Body style={{ padding: 0 }}>
          <div
            className="emotionModal_container"
            style={{
              boxShadow: mood
                ? `0px 4px 20px ${mood.color}80`
                : "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="emotionModal_card">
              <Form>
                <Form.Group>
                  <div className="emotionModal_input_container">
                    <textarea
                      className="emotionModal_textarea"
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
                          title={item.label}
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

                {/* Intensity & Trigger */}
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
                    {selectedOption !== "Custom" ? (
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
                    ) : (
                      <Form.Group className="position-relative">
                        <FloatingLabel
                          controlId="floatingTrigger"
                          label="Trigger Reason"
                        >
                          <Form.Control
                            type="text"
                            placeholder="What triggered this feeling?"
                            value={triggerReason}
                            onChange={(e) => setTrigger(e.target.value)}
                          />
                        </FloatingLabel>
                        <span
                          className="position-absolute top-50 translate-middle-y"
                          style={{ right: "10px", cursor: "pointer" }}
                          onClick={() => {
                            setSelectedOption("");
                            setTrigger("");
                          }}
                          title="Back to list"
                        >
                          <i className="fas fa-arrow-left" />
                        </span>
                      </Form.Group>
                    )}
                  </Col>
                </Row>

                {/* Preferred Activity & Partner Reaction */}
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
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmotionModal;
