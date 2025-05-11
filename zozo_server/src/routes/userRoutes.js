import express from 'express';
import {registerUser, loginUser} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
console.log("User routes loaded");
// Define the routes
router.post('/register', registerUser);
router.post('/login', loginUser)

export default router;