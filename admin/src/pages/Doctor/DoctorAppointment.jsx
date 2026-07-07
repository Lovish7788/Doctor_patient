import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/doctorContext'
import { assets } from '../../assets/assets.js'

const DoctorAppointment = () => {
  const { getAppointments, appointments, dToken, completeAppointment, cancelAppointment } = useContext(DoctorContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  
  /**
   * Helper to format database date keys (e.g. 25_7_2024) to readable strings (e.g. 25 Jan 2024).
   */
  const slotDateFormat = (slotDate) => {
    if (!slotDate) return 'N/A'
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  /**
   * Calculates age in years based on birthday string (YYYY-MM-DD).
   */
  const calculateAge = (dob) => {
    if (!dob || dob === 'Not Selected') return 'N/A'
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    
    // Check if birthday hasn't occurred yet this year
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium text-gray-800'>All Appointments</p>

      {/* Main Table Container */}
      <div className='bg-white border border-gray-200 rounded-lg shadow-sm text-sm max-h-[80vh] overflow-y-scroll scrollbar-none'>
        
        {/* Table Header Row */}
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1.5fr_1fr_3fr_1fr_1.5fr] grid-flow-col items-center py-3 px-6 border-b border-gray-200 text-gray-500 font-semibold text-xs uppercase bg-gray-50/50'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p className='text-center'>Action</p>
        </div>

        {/* Table Content Row Mapping */}
        {appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div 
              key={index}
              className='grid grid-cols-[1fr_3fr_1.5fr_1fr_3fr_1fr_1.5fr] sm:grid-cols-[0.5fr_3fr_1.5fr_1fr_3fr_1fr_1.5fr] items-center text-gray-700 py-4 px-6 border-b border-gray-150 last:border-0 hover:bg-slate-50/40 transition-all duration-200'
            >
              {/* Row Index */}
              <p className='text-zinc-500 font-medium hidden sm:block'>{index + 1}</p>

              {/* Patient Profile */}
              <div className='flex items-center gap-3'>
                <img 
                  className='w-8 h-8 rounded-full object-cover border border-zinc-200' 
                  src={item.userData.image} 
                  alt={item.userData.name} 
                />
                <p className='font-medium text-neutral-800'>{item.userData.name}</p>
              </div>

              {/* Payment Type Badge */}
              <div>
                {item.payment ? (
                  <span className='text-xs font-semibold bg-green-50 text-green-500 border border-green-100 rounded-full px-3 py-1'>ONLINE</span>
                ) : (
                  <span className='text-xs font-semibold bg-blue-50 text-blue-500 border border-blue-100 rounded-full px-3 py-1'>CASH</span>
                )}
              </div>

              {/* Patient Age */}
              <p className='text-zinc-600 font-medium'>{calculateAge(item.userData.dob)}</p>

              {/* Date & Time */}
              <p className='text-zinc-600 font-medium'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

              {/* Fees */}
              <p className='font-semibold text-zinc-900'>${item.amount}</p>

              {/* Action Column */}
              <div className='flex justify-center items-center gap-3'>
                {item.canceled ? (
                  <p className='text-red-400 text-xs font-semibold bg-red-50 px-2.5 py-1 rounded-full border border-red-100'>Cancelled</p>
                ) : item.isCompleted ? (
                  <p className='text-green-500 text-xs font-semibold bg-green-50 px-2.5 py-1 rounded-full border border-green-100'>Completed</p>
                ) : (
                  <div className='flex items-center gap-2'>
                    {/* Cancel Button */}
                    <img 
                      onClick={() => cancelAppointment(item._id)}
                      className='w-9 h-9 p-2 cursor-pointer hover:bg-red-50 rounded-full transition-all duration-300 hover:scale-105' 
                      src={assets.cancel_icon} 
                      alt="Cancel" 
                      title="Cancel Appointment"
                    />
                    {/* Complete Check Button */}
                    <img 
                      onClick={() => completeAppointment(item._id)}
                      className='w-9 h-9 p-2 cursor-pointer hover:bg-green-50 rounded-full transition-all duration-300 hover:scale-105' 
                      src={assets.tick_icon} 
                      alt="Complete" 
                      title="Complete Appointment"
                    />
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className='flex flex-col items-center justify-center py-16 text-zinc-400'>
            <img className='w-12 opacity-50 mb-3' src={assets.appointment_icon} alt="Empty appointments" />
            <p className='text-sm'>No appointments booked yet.</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default DoctorAppointment;
