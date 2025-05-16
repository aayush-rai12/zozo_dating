import express from 'express';
import {registerUser, loginUser, userDetails} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import multer from 'multer';
import upload from "../config/multer.js";


const router = express.Router();
// Define the routes
router.post('/register', registerUser);
router.post('/login', loginUser);
// router.post('/userDetails', userDetails)
router.post("/userDetails", upload.array("photos", 6), userDetails);


export default router;