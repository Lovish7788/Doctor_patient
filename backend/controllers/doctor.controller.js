import doctorModel from '../models/doctor.model.js'
import appointmentModel from '../models/appointment.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
/**
 * Toggles a doctor's availability status in the database.
 */
const changeAvaibality = async (req, res) => {
  try {
    const { docId } = req.body
    const docData = await doctorModel.findById(docId)
    await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })

    res.status(200).json({ success: true, message: "Availability Changed" })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

/**
 * Returns a list of all registered doctors, excluding sensitive credentials (email, password).
 */
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select('-password -email')
    res.status(200).json({ success: true, doctors })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body
    const doctor = await doctorModel.findOne({ email })
    if (!doctor) {
      return res.json({
        success: false,
        message: 'Doctor not found'
      })
    }
    const isMatch = await bcrypt.compare(password, doctor.password)

    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '10d' })
      res.status(200).json({
        success: true,
        message: 'Doctor logged in successfully',
        token
      })
    }
    else {
      res.status(400).json({ success: false, message: 'Invalid Credentials' })
    }

  } catch (error) {
    res.status(400).json({ success: false, message: 'Error in Login', error })
  }
}

// api t get doctor for doctor panner

const appointmentDoctor = async (req,res)=>{
  try {
    const {docId}= req.body
    const appointments = await appointmentModel.find({docId});
    res.status(200).json({success:true,message:'Appointments fetched Successfully',appointments})

  } catch (error) {
        res.status(400).json({ success: false, message: 'Error in getting Appointment', error })

  }

}

const appointmentComplete = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: "Appointment Completed" })
        } else {
            return res.json({ success: false, message: "Failed to mark as completed" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}

const appointmentCancel = async (req, res) => {
    try {
        const { docId, appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { canceled: true })

            // release doctor slot
            const { slotDate, slotTime } = appointmentData
            const doctorData = await doctorModel.findById(docId)

            let slots_booked = doctorData.slots_booked
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

            await doctorModel.findByIdAndUpdate(docId, { slots_booked })

            return res.json({ success: true, message: "Appointment Cancelled" })
        } else {
            return res.json({ success: false, message: "Failed to cancel appointment" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}
// api tp get dashboard data

const doctorDashBoard = async(req,res)=>{
try {
  const {docId} = req.body
  const appointment = await appointmentModel.find({docId})
  let earnings = 0;

  appointment.map((item)=>{
    if(item.isCompleted || item.payment){
      earnings+=item.amount
    }
  })
  let patients =[];
  appointment.map((item)=>{
    if(!patients.includes(item.userId)){
      patients.push(item.userId)
    }
  })
  const dashData = {
    earnings,
    appointments: appointment.length,
    patients: patients.length,
    latestAppointments: appointment.reverse().slice(0, 5)
  }


  return res.status(200).json({success:true,message:'Dashboard data fetched',dashData})
} catch (error) {
   res.status(500).json({ success: false, message: 'Failed to get dashboard Data',error })

}
}
const doctorProfile = async(req,res)=>{
  try {
    const {docId}= req.body
    const profileData = await doctorModel.findById(docId).select('-password');
    if(profileData){
      return res.status(200).json({success:true,message:'Doctor Profile fetched successfully',profileData})
    }
    else{
      return res.status(404).json({success:false,message:'Doctor not found'})
    }

  } catch (error) {
       res.status(500).json({ success: false, message: 'Failed to get Doctor Profile',error })

  }
}

// api to update doctr profile
const updateDoctorProfile = async(req,res)=>{
try {
  const {docId, fees , address, available} = req.body;
  await doctorModel.findByIdAndUpdate(docId,{fees,address,available});
  return res.json({success: true, message:'Doctor Profile Updated'})
} catch (error) {
         res.status(500).json({ success: false, message: 'Failed to update Doctor Profile',error })

}
}

export { changeAvaibality,
   doctorList,
   loginDoctor,
   appointmentDoctor,
   appointmentComplete,
   appointmentCancel,
  doctorDashBoard, 
  doctorProfile ,
  updateDoctorProfile}