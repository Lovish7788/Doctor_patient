import express from 'express'
import { doctorList, loginDoctor, appointmentDoctor, appointmentComplete, appointmentCancel,doctorDashBoard , doctorProfile, updateDoctorProfile} from '../controllers/doctor.controller.js';
import { authDoctor } from '../middleware/auth.doctor.middleware.js';

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorList);
doctorRouter.post('/login', loginDoctor);
doctorRouter.get('/appointments', authDoctor, appointmentDoctor);
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete);
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel);
doctorRouter.get('/dashboard', authDoctor, doctorDashBoard);
doctorRouter.get('/profile', authDoctor, doctorProfile);
doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile);

export default doctorRouter;