import express from 'express'
import { addDoctor, loginAdmin } from '../controllers/admin.controller.js'
import { upload } from '../middleware/multer.js'
import { authAdmin } from '../middleware/auth.admin.middleware.js'
import { allDoctors } from '../controllers/admin.controller.js'
import { changeAvaibality } from '../controllers/doctor.controller.js'
const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvaibality)


export default adminRouter;