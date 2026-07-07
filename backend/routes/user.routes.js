import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay } from '../controllers/user.controler.js';
import { authUser } from '../middleware/auth.user.js';
import { upload } from '../middleware/multer.js'

const userRoute = express.Router();

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);
userRoute.post('/update-profile', upload.single('image'), authUser, updateProfile)
userRoute.post('/book-appointment', authUser, bookAppointment)
userRoute.post('/cancel-appointment', authUser, cancelAppointment)
userRoute.post('/payment-razorpay', authUser, paymentRazorpay)
userRoute.post('/verify-razorpay', authUser, verifyRazorpay)

userRoute.get('/get-profile', authUser, getProfile);
userRoute.get('/appointments', authUser, listAppointment)

export default userRoute;
