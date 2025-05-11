// server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './src/routes/userRoutes.js';
import './src/config/db.js';

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); 
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello from zozo backend!');
});

app.use("/api/auth", (req, res) => {
  console.log("Auth route hit2");
  // Authentication routes would go here
  res.send('Auth route created');
});

app.use("/api/user",userRoutes)

// Error handling for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
