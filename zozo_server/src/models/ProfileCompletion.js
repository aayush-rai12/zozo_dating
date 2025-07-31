import mongoose from "mongoose";

// Define the schema
const profileCompletionSchema = new mongoose.Schema({
  user_Id: {
    type: String,
    required: true,
  },

  user_bio: {
    type: String,
    required: true,
    trim: true,
  },

  user_interests: {
    type: [{
      type: String,
      trim: true,
      maxlength: [25, 'Interest cannot exceed 30 characters']
    }],
    validate: {
      validator: function(v) {
        return v.length <= 10;
      },
      message: 'Cannot have more than 10 interests'
    },
  },
  
  personalityAnswers: [{
    questionId: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true,
      trim: true
    },
    answeredAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  user_socialLinks: {
    instagran: {
      type: String,
      required: false,
      trim: true,
    },
    facebook: {
      type: String,
      required: false,
      trim: true,
    },
    twitter: {
      type: String,
      required: false,
      trim: true,
    },
  },

  preferences: {
    lookingFor: {
      type: [String],
      enum: ['friendship', 'dating', 'relationship', 'networking'],
      default: ['dating']
    },
    ageRange: {
      min: { type: Number, min: 18, max: 100 },
      max: { type: Number, min: 18, max: 100 }
    }
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },

});
