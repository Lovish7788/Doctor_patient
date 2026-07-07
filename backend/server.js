import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/connectDB.config.js';
import adminRouter from './routes/admin.route.js';
import connectCloudinary from './config/cloudinary.config.js';
import doctorRouter from './routes/doctor.route.js';
import userRouter from './routes/user.routes.js';
const app = express();
const port = process.env.PORT || 4000

// middle ware
connectDB();
connectCloudinary();
app.use(express.json());
app.use(cors({
  origin: [
    'https://doctor-patient-frontend.onrender.com',
    process.env.ADMIN_FRONTEND_URL || 'https://doctor-patient-9amh.onrender.com'
  ]
}));
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)


app.get('/', (req, res) => {
    res.send("Hello ji kaise ho");
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
