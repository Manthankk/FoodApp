import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoutes.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

dotenv.config(); // Load environment variables

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

//api endpoint
app.use("/api/user", userRouter)
app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"))
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

// Basic route
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
