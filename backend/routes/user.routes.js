import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile } from '../controllers/user.controler.js';
import { authUser } from '../middleware/auth.user.js';
import {upload} from '../middleware/multer.js'

const userRoute = express.Router();

userRoute.post('/register', registerUser);
userRoute.post('/login', loginUser);
userRoute.post('/update-profile',upload.single('image'),authUser,updateProfile)

userRoute.get('/get-profile', authUser, getProfile);

export default userRoute
