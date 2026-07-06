import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctor.model.js'
import jwt from 'jsonwebtoken'

// API for Adding Doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        // checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({
                success: false,
                message: 'Missing Details'
            })
        }

        // validating email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter valid email'
            })
        }

        // validating strong password
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Please Enter Strong Password'
            })
        }

        // encrypt the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageURL = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            image: imageURL,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees: Number(fees),
            address: JSON.parse(address),
            date: Date.now(),
        }

        // saving in database
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.status(200).json({
            success: true,
            message: 'Doctor Added'
        });
    }
    catch (error) {
        console.log('Something Went Wrong', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// api for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email.toLowerCase() === process.env.ADMIN_EMAIL.toLowerCase() && password === process.env.ADMIN_PASSWORD) {
            // generate json web token
            const payload = email + password
            const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
                expiresIn: '1d'
            })
            res.status(200).json({
                success: true,
                message: 'Admin Login',
                token
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
    } catch (error) {
        console.log('Something Went Wrong', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// api to get all doctor details
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.status(200).json({
            success: true,
            message: "All Doctors fetched successfully",
            doctors
        });
    } catch (error) {
        console.log('Something Went Wrong', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { addDoctor, loginAdmin, allDoctors }