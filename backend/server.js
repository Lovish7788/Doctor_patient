import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/connectDB.config.js';
import adminRouter from './routes/admin.route.js';
import connectCloudinary from './config/cloudinary.config.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 4000

// middle ware
connectDB();
connectCloudinary();
app.use(express.json());
app.use(cors());
app.use('/api/admin', adminRouter)


app.get('/', (req, res) => {
    res.send("Hello ji kaise ho");
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})