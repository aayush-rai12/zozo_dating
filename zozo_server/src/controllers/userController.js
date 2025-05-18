import User from "../models/User.js";
import UserDetails from "../models/UserDetails.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
      firstName,
      lastName,
      email,
      password: password,
    });

    //  Save the user to the database
    await newUser.save();
    console.log("User saved successfully");

    //  Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "3600", // 1 hour
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
      expiresIn,
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
      expiresIn: "3600", // 1 hour
    });

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
        expiresIn: 3600,
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
    // await userDetails.save();

    return res.status(200).json({
      success: true,
      message: "User details saved with uploaded images",
      userDetails: userDetails,
    });
  } catch (error) {
    console.error("Failed to save userDetails data:", error); 
    return res
      .status(500)
      .json({
        success: false,
        message: "Internal server error while userDetails",
        error: error.message, // Add error message to response
      });
  }
};
