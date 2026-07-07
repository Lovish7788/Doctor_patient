import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import RelatedDoctors from '../components/RelatedDoctors.jsx'
import { toast } from 'react-toastify'
import axios from 'axios'

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const Appointment = () => {
  const navigate = useNavigate()
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  /**
   * Loads the doctor details from context matching the URL parameter `docId`.
   */

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book Appointment')
      return navigate('/login');
    }

    if (!slotTime) {
      toast.warn('Please select a time slot before booking')
      return;
    }

    try {
      const date = docSlots[slotIndex][0].datetime
      let day = date.getDate()
      let month = date.getMonth()+1
      let year = date.getFullYear();

      const slotDate = day+"_"+month+"_"+year;

      const {data} = await axios.post(backendUrl+'/api/user/book-appointment',{docId, slotDate, slotTime},{headers:{token}})

      if(data.success){
        toast.success(data.message)
        getDoctorsData();
        navigate('/my-appointments')
      }
      else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(() => {
    const doc = doctors.find(d => d._id === docId)
    setDocInfo(doc)
  }, [docId, doctors])

  /**
   * Generates available booking time slots for the next 7 days in 30-minute intervals.
   * Daily booking slots operate from 10:00 AM to 9:00 PM.
   * If calculating for today, it starts after the current hour to prevent past bookings.
   */
  const getAvailableSlots = async () => {
    setDocSlots([])

    let today = new Date()
    let allSlots = []

    for (let i = 0; i < 7; i++) {
      // Get date for the current day index
      let currentDate = new Date()
      currentDate.setDate(today.getDate() + i)

      // Set booking end limit of 9:00 PM
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      // Set booking start limit of 10:00 AM (or current hour if today)
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()
        const slotDate = day + "_" + month + "_" + year
        

        // Check if slot is already booked
        const isBooked = docInfo.slots_booked && docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(formattedTime)

        if (!isBooked) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

        // Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      allSlots.push(timeSlots)
    }

    setDocSlots(allSlots)
  }

  // Generate slots when doctor info finishes loading
  useEffect(() => {
    if (docInfo) {
      getAvailableSlots()
    }
  }, [docInfo])

  return docInfo && (
    <div className='md:mx-10'>
      {/* ----- Doctor Details Card ----- */}
      <div className='flex flex-col sm:flex-row gap-4'>
        {/* Left column - Doctor Image */}
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt={docInfo.name} />
        </div>

        {/* Right column - Info Details Panel */}
        <div className='flex-1 border border-gray-300 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* Doctor Name & Verified Badge */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="Verified Badge" />
          </p>

          {/* Education & Experience Details */}
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border border-gray-300 text-xs rounded-full bg-gray-50'>{docInfo.experience}</button>
          </div>

          {/* About Doctor Profile description */}
          <div className='mt-4'>
            <p className='flex items-center gap-1.5 text-sm font-medium text-gray-900'>
              About
              <img className='w-3.5' src={assets.info_icon} alt="Info Icon" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1 leading-relaxed'>{docInfo.about}</p>
          </div>

          {/* Booking Fees */}
          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee: <span className='text-gray-900 font-semibold'>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* ----- Booking Slots Calendar ----- */}
      <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-gray-700'>
        <p className='text-gray-900 font-semibold'>Booking slots</p>

        {/* Days Scrollable Picker */}
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4 scrollbar-none'>
          {docSlots.length > 0 && docSlots.map((item, index) => (
            <div
              onClick={() => setSlotIndex(index)}
              key={index}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer transition-all duration-300 ${slotIndex === index ? 'bg-primary text-white border-primary' : 'border border-gray-200 text-gray-500 hover:bg-slate-50'}`}
            >
              <p className='text-xs font-semibold'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p className='text-lg font-bold mt-1'>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        {/* Times Scrollable Picker */}
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4 scrollbar-none'>
          {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
            <p
              onClick={() => setSlotTime(item.time)}
              key={index}
              className={`text-sm font-normal flex-shrink-0 px-5 py-2.5 rounded-full cursor-pointer transition-all duration-300 ${item.time === slotTime ? 'bg-primary text-white border-primary' : 'text-gray-400 border border-gray-200 hover:bg-slate-50'}`}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        {/* Action Book Button */}
        <button
          onClick={bookAppointment}
          className='bg-primary text-white text-sm font-normal px-14 py-3 rounded-full my-6 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:bg-opacity-95'>
          Book an appointment
        </button>
      </div>

      {/* ----- Related Doctors Component ----- */}
      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </div>
  )
}

export default Appointment