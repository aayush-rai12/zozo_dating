import mongoose from "mongoose";
import  * as date from 'date-and-time';
const sectionSchema = new mongoose.Schema({
  id: {
    type: String,
    enum: ['interests', 'preferences', 'bio', 'instagram', 'profilePhoto'],
    required: true
  },
  data: { type: mongoose.Schema.Types.Mixed }
}, { _id: false });

const profileCompletionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user_Details',
    required: true,
    unique: true
  },
  interests: sectionSchema,
  preferences: sectionSchema,
  personality: sectionSchema,
  bio: sectionSchema,
  instagram: sectionSchema,
  profilePhoto: sectionSchema
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_, ret) => {
      // Format timestamps
      ret.createdAt = date.format(new Date(ret.createdAt), 'YYYY-MM-DD HH:mm:ss');
      ret.updatedAt = date.format(new Date(ret.updatedAt), 'YYYY-MM-DD HH:mm:ss');
      return ret;
    }
  }
});

export default mongoose.model("ProfileCompletion", profileCompletionSchema, "profile_completions");
