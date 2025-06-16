import mongoose from "mongoose";

const emotionTableSchema = new mongoose.Schema(
  {
    user_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    feelings: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      required: true,
    },
    moodColor: {
      type: String,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    partnerReacted:{
      type: Boolean,
      default: false,
    },
    intensity: {
      type: String,
      enum: ["Low", "Moderate", "High", "Very High", "Very Low"],
      required: true,
    },
    triggerReason: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    preferredActivity: {
      type: String,
    },
    partnerReacted: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Create model
const emotionCardDetails = mongoose.model(
  "emotion_Card_Details",
  emotionTableSchema
);

export default emotionCardDetails;
