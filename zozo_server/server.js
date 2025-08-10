// server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './src/routes/userRoutes.js';
import './src/config/db.js';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const PORT = 5000;
//When I try to upload image on cloudinary without multer that time need to use bodyParser
app.use(bodyParser.json({ limit: "10mb" }));

// Enable CORS for all routes
app.use(cors()); 
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello from zozo!');
});

app.use("/api/auth", userRoutes);

app.use("/api/user",userRoutes)

// Error handling for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
