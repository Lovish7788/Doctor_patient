import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctor.model.js'
import appointmentModel from '../models/appointment.model.js'
import Razorpay from 'razorpay'
import crypto from 'crypto'

// api to register user

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json({ success: false, message: "all fields are required" })
        }

        // validating email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "invalid email" })
        }

        // checking if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "password must be at least 8 characters long" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(12);
        const hashpassword = await bcrypt.hash(password, salt)

        // save in database

        const userData = {
            name,
            email,
            password: hashpassword
        }
        // creatiing new user
        const newUser = new userModel(userData)

        // save in database
        const user = await newUser.save();

        // using jwt

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15d" })

        return res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// api for user logi

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesnt exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15d' })

            return res.json({
                success: true,
                token
            })
        }
        else {
            return res.json({ success: false, message: "password is not matching" })
        }


    }
    catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }

}

// api to  get user profile data

const getProfile = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        return res.json({ success: true, user: userData })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

// update user profile

const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body
        const imageFile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "all fields are required" })
        }

        const user = await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

        if (imageFile) {
            // upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,
                { resource_type: 'image' })

            const imageURL = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }

        return res.json({ success: true, message: "User updated successfully" })

    }

    catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}


// api to book apointment

const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime } = req.body

        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData.available) {
            return res.json({ success: false, message: "doctor not available" })
        }

        let slots_booked = docData.slots_booked || {}

        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "slots not available" })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        // Convert Mongoose document to plain object and remove slots_booked before storing
        const docDataPlain = docData.toObject()
        const doctorFees = docDataPlain.fees
        delete docDataPlain.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData: docDataPlain,
            amount: doctorFees,
            date: Date.now(),
            slotDate,
            slotTime
        }

        const newappointment = new appointmentModel(appointmentData)
        await newappointment.save()

        // save slot data 
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        return res.json({ success: true, message: 'appointment booked successfully' })
    }
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// api to get uder appointment

const listAppointment = async (req, res) => {
    try {
        const { userId } = req.body
        const appointments = await appointmentModel.find({ userId })

        res.json({
            success: true,
            appointments
        })


    }
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })

    }

}

// api to cancel appointment

const cancelAppointment = async(req,res)=>{
    try {
        const {userId, appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        // verifying user appointmnet

        if(appointmentData.userId!== userId){
            return res.json({
                success: false,
                message:'Unauthorized action'
            })
        }

        await appointmentModel.findByIdAndUpdate(appointmentId,{canceled: true})
        
        // releasing doctor slot

        const {docId, slotDate, slotTime} = appointmentData;

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e=>e!==slotTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked})

        res.json({
            success: true,
            message:"Appointment Canceled"
        })


    } catch (error) {
       console.log(error);
        res.json({
            success: false,
            message: error.message
        })  
    }
}

///api to make payment using razorpay

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET
})

const paymentRazorpay = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData || appointmentData.canceled) {
            return res.json({
                success: false,
                message: 'Appointment Canceled or not found'
            })
        }

        // creating options for razorpay account
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY || 'INR',
            receipt: appointmentId
        }

        // creation of order
        const order = await razorpayInstance.orders.create(options)

        res.json({
            success: true,
            order,
            key: process.env.RAZORPAY_KEY
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })  
    }
}

// API to verify Razorpay payment
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, appointmentId } = req.body

        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id)
        const generated_signature = hmac.digest('hex')

        if (generated_signature === razorpay_signature) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { payment: true })
            res.json({ success: true, message: "Payment Successful" })
        } else {
            res.json({ success: false, message: "Payment verification failed" })
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay }