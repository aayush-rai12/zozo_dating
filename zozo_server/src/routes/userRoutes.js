import express from 'express';
import {registerUser, loginUser, userDetails, getUserDetails, saveEotionCardData, getEmotionData, toggleEmotionStatus, deleteEmotionCard} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';
import upload from "../config/multer.js";


const router = express.Router();
// Define the routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/userDetails',upload.array("photos", 6), userDetails);

// Get user details by ID
// This route is protected, meaning it requires authentication
router.get('/getUserById/:id', getUserDetails);
// Save user Emotion Tracker Data
router.post('/saveEmotionData', saveEotionCardData);

router.get('/getEmotionData/:userId', getEmotionData);
// update the emotion card isPublic or not
router.patch('/toggleEmotionStatus/:id',toggleEmotionStatus);
router.delete('/deleteEmotionCard/:id', deleteEmotionCard);



export default router;