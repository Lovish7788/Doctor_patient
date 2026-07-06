import doctorModel from '../models/doctor.model.js'

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

export { changeAvaibality, doctorList }