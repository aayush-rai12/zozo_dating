import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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
    const newUser = new User({ firstName, lastName, email, password: password });

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
    console.log(user || 'User not found');

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
      },
      token,
      expiresIn: 3600,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ success:"error", message: "Internal server error" });
  }
};