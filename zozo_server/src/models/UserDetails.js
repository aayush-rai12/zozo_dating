import mongoose from "mongoose";

// Define the schema
const userDetailsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  InterestedIn: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // Array of image URLs
    validate: {
      validator: function (arr) {
        return arr.length <= 6;
      },
      message: "You can upload a maximum of 6 images",
    },
    default: []
  }
});

// Create model
const UserDetails = mongoose.model("UserDetails", userDetailsSchema);

export default UserDetails;
