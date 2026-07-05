import valdator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctor.model.js'
import jwt from 'jsonwebtoken'

// API for Adding Doctor
const addDoctor = async (req, res) => {

    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;

        const imageFile = req.file;

        // cehcking for all data to add doctor

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({
                succes: false,
                message: 'Missing Details'
            })
        }

        // validating email format

        if (!valdator.isEmail(email)) {
            return res.json({
                succes: false,
                message: 'Please enter valid email'
            })


        }

        //validating strong password
        if (password.length < 8) {
            return res.json({
                succes: false,
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
            fees,
            address: JSON.parse(address),
            date: Date.now(),
        }
        // saving in database
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({
            succes: true,
            message: 'Doctor Added'
        }).status(200);



        // Temporary response so Postman receives a reply and doesn't hang
        res.json({ success: true, message: "Request received successfully!" });
    }
    catch (err) {
        console.log('Something Went Wrong', err);
        res.status(500).json({ success: false, message: err.message });
    }

}

// api for admin login

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // generate json web token
            const payload = email + password
            const token = jwt.sign({payload}, process.env.JWT_SECRET, {
                expiresIn: '1d'
            })
            res.json({
                success: true,
                message: 'Admin Login',
                token
            }).status(200);

        } else {
            res.json({
                succes: false,
                message: 'Invalid credentials'
            }).status(400);
        }



    } catch (err) {
        console.log('Something Went Wrong', err);
        res.status(500).json({ success: false, message: err.message });
    }
}


export { addDoctor, loginAdmin }