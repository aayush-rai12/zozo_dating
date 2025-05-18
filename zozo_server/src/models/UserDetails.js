import mongoose from "mongoose";

// Define the schema
const userDetailsSchema = new mongoose.Schema({
  user_Id: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    state: { type: String, required: true },
    city: { type: String, required: true },
    pinCode: { type: String, required: true },
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
  images: {
    type: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
        _id: false //in mongoss jb bhi new structure of array mai data stroe krta hai tb o by default unique id generate krta hai
      }
    ],
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
