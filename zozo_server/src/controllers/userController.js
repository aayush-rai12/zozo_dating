import User from "../models/User.js";
import UserDetails from "../models/UserDetails.js";
import EmotionCardEntry from "../models/emotionTableTracker.js";
import bcrypt from "bcryptjs";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
import { uploadImage, deleteImage } from "../config/cloudinary.js";

// User registration controller
export const registerUser = async (req, res) => {
  console.log("User registration request received");
  const { firstName, lastName, email, password } = req.body;
  console.log("User registration data:", req.body);

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //  Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    //  Create new user with hashed password
    const newUser = new User({
      firstName:
        firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),
      lastName,
      email,
      password: password,
    });

    //  Save the user to the database
    await newUser.save();
    console.log("User saved successfully");

    //  Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h", // 1 hour
    });
    console.log("pahuch gaya frontend se");
    //  Send response
    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error saving user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// User login controller
export const loginUser = async (req, res) => {
  console.log("User login request received");
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log(user || "User not found");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    //  Compare hashed password
    // const isMatch = await bcrypt.compare(password, user.password);
    if (!password == user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    //  Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3600",
    });

    const decoded = jwt.decode(token);
    console.log("Decoded JWT payload:", decoded);
    console.log("Token generated:", token);

    return res.status(200).json({
      success: "success",
      message: "User logged in successfully",
      user: {
        user_Id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ success: "error", message: "Internal server error" });
  }
};

//userDetails
export const userDetails = async (req, res) => {
  try {
    // For multiple files, use req.files; for single file, use req.file
    const {
      user_Id,
      fullName,
      email,
      phone,
      birthday,
      gender,
      showGender,
      interestedIn,
      state,
      city,
      pinCode,
    } = req.body;
    // Check if file was uploaded
    const userAlreadyExists = await UserDetails.findOne({ user_Id });
    if (userAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "User details already exist for this user",
      });
    }
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload an image" });
    }
    // Use correct property: file.path (not file.Path)
    const filePaths = req.files.map((file) => file.path);
    // Upload each file to Cloudinary
    const uploadResults = await Promise.all(
      filePaths.map((filePath) => uploadImage(filePath, "register_User_Images"))
    );

    // Save both url and public_id for schema [{url, public_id}]
    const images = uploadResults.map((result) => ({
      url: result.secure_url,
      public_id: result.public_id,
    }));

    // Log the data to be saved for debugging
    console.log("Saving userDetails with:", {
      user_Id,
      phoneNumber: phone,
      fullName,
      email,
      birthday,
      gender,
      showGender,
      InterestedIn: interestedIn,
      address: {
        city,
        state,
        pinCode,
      },
      images: images,
    });

    const userDetails = new UserDetails({
      user_Id,
      fullName,
      email,
      phoneNumber: phone,
      address: {
        state,
        city,
        pinCode,
      },
      birthday,
      gender,
      InterestedIn: interestedIn,
      images: images,
    });
    await userDetails.save();

    return res.status(200).json({
      success: true,
      message: "User details saved with uploaded images",
      userDetails: userDetails,
    });
  } catch (error) {
    console.error("Failed to save userDetails data:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while userDetails",
      error: error.message, // Add error message to response
    });
  }
};

//getUserDetails
export const getUserDetails = async (req, res) => {
  const { id } = req.params;
  console.log("Aa gya kya", id);
  try {
    const userDetails = await UserDetails.findOne({ user_Id: id });
    console.log("User details found:", userDetails);
    if (!userDetails) {
      return res.status(404).json({ message: "user Details not found" });
    }
    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      userDetails: userDetails,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Save user Emotion Tracker Data
export const saveEotionCardData = async (req, res) => {
  const {
    user_Id,
    feelings,
    mood,
    moodColor,
    intensity,
    triggerReason,
    preferredActivity,
    partnerReacted,
    createdAt
  } = req.body;

  try {
    if (!user_Id ||
      !feelings ||
      !mood ||
      !moodColor ||
      !intensity ||
      !triggerReason
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if user exists
    const user = await User.findById(user_Id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Save new emotion entry
    const newEntry = new EmotionCardEntry({
      user_Id,
      feelings,
      mood,
      moodColor,
      intensity,
      triggerReason,
      preferredActivity,
      partnerReacted,
      createdAt: createdAt ? new Date(createdAt) : new Date()
    });
    await newEntry.save();

    return res.status(200).json({
      success: true,
      message: "Emotion data saved successfully",
      emotionCardDetails: newEntry,
    });
  } catch (error) {
    console.error("Error saving emotion data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get emotion data for a user
export const getEmotionData = async (req, res) => {
  const { userId } = req.params;
  console.log("Fetching emotion data for user:", userId);
  try {
    const emotionData = await EmotionCardEntry.find({ user_Id: userId }).select('-user_Id');
    console.log("Emotion data found:", emotionData);
    if (!emotionData || emotionData.length === 0) {
      return res.status(404).json({ message: "No emotion data found for this user" });
    }
    return res.status(200).json({
      success: true,
      message: "Emotion data fetched successfully",
      emotionData: emotionData,
    });
  }
  catch (error) {
    console.error("Error fetching emotion data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// update the user emotion card is visible to public or not 
export const toggleEmotionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isPublic } = req.body;
    console.log(isPublic, "isPublic value received");
    if (typeof isPublic !== 'boolean') {
      return res.status(400).json({ message: "isPublic must be a boolean value" });
    }
    const updatedEmotion = await EmotionCardEntry.findByIdAndUpdate(
      id,
      { isPublic },
      { new: true }
    );
    console.log("new update",updatedEmotion);
    if (!updatedEmotion) {
      return res.status(404).json({ message: "Emotion entry not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Status updated successfully",
      emotionData: updatedEmotion
    });
  } catch (error) {
    console.error("Error updating emotion status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete emotion card
export const deleteEmotionCard = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmotion = await EmotionCardEntry.findByIdAndDelete(id);
    if (!deletedEmotion) {
      return res.status(404).json({ message: "Emotion entry not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Emotion entry deleted successfully",
      emotionData: deletedEmotion
    });
  } catch (error) {
    console.error("Error deleting emotion card:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update emotion card
export const updateEmotionCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_Id, ...updateFields } = req.body;
    console.log("Update card ID:", id, user_Id);
    console.log("Update fields:", updateFields);
    // Validate if ID exists
    if (!id || !user_Id) {
      return res.status(400).json({
        success: false,
        message: "Emotion card ID and user ID are required"
      });
    }

    // Find the existing emotion card
    const existingCard = await EmotionCardEntry.findById(id);
    
    if (!existingCard) {
      return res.status(404).json({
        success: false,
        message: "Emotion card not found"
      });
    }

    // Check if the user owns this card
    if (existingCard.user_Id.toString() !== user_Id) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to update this emotion card"
      });
    }

    // Proceed with update if authorized
    const updatedCard = await EmotionCardEntry.findByIdAndUpdate(
      id,
      { 
        $set: {
          ...updateFields,
          updatedAt: new Date()
        }
      },
      { 
        new: true,
        runValidators: true
      }
    );

    return res.status(200).json({
      success: true,
      message: "Emotion card updated successfully",
      emotionCardDetails: updatedCard
    });

  } catch (error) {
    console.error("Update emotion card error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update emotion card",
      error: error.message
    });
  }
};
