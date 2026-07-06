import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'

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
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

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

export { registerUser, loginUser, getProfile, updateProfile }