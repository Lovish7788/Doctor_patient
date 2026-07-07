import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/adminContext'
import { assets } from '../../assets/assets.js'

function Dashboard() {
  const { dashData, aToken, getDashData, cancelAppointment } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  
  /**
   * Helper to format database date keys (e.g. 25_7_2024) to readable strings (e.g. 25 Jan 2024).
   */
  const slotDateFormat = (slotDate) => {
    if (!slotDate) return 'N/A'
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  return dashData && (
    <div className='w-full max-w-6xl m-5'>
      
      {/* Stats Cards Section */}
      <div className='flex flex-wrap gap-5 mb-8'>
        
        {/* Doctors Stat Card */}
        <div className='flex items-center gap-4 bg-white p-6 min-w-64 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300'>
          <div className='w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center p-3'>
            <img className='w-full object-contain' src={assets.doctor_icon} alt="Doctors Icon" />
          </div>
          <div>
            <p className='text-2xl font-bold text-gray-800'>{dashData.doctors}</p>
            <p className='text-sm text-gray-400 font-medium'>Doctors</p>
          </div>
        </div>

        {/* Appointments Stat Card */}
        <div className='flex items-center gap-4 bg-white p-6 min-w-64 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300'>
          <div className='w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center p-3'>
            <img className='w-full object-contain' src={assets.appointments_icon} alt="Appointments Icon" />
          </div>
          <div>
            <p className='text-2xl font-bold text-gray-800'>{dashData.appointments}</p>
            <p className='text-sm text-gray-400 font-medium'>Appointments</p>
          </div>
        </div>

        {/* Patients Stat Card */}
        <div className='flex items-center gap-4 bg-white p-6 min-w-64 rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300'>
          <div className='w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center p-3'>
            <img className='w-full object-contain' src={assets.patients_icon} alt="Patients Icon" />
          </div>
          <div>
            <p className='text-2xl font-bold text-gray-800'>{dashData.patient}</p>
            <p className='text-sm text-gray-400 font-medium'>Patients</p>
          </div>
        </div>

      </div>

      {/* Latest Bookings Section */}
      <div className='bg-white border border-gray-200 rounded-lg shadow-sm'>
        
        {/* Section Header */}
        <div className='flex items-center gap-2.5 px-6 py-4 border-b border-gray-200 bg-gray-50/30'>
          <img className='w-5 opacity-70' src={assets.list_icon} alt="List Icon" />
          <p className='font-semibold text-gray-800 text-base'>Latest Bookings</p>
        </div>

        {/* Bookings List */}
        <div className='flex flex-col'>
          {dashData.latestAppointments.length > 0 ? (
            dashData.latestAppointments.map((item, index) => (
              <div 
                key={index}
                className='flex items-center px-6 py-4 gap-4 hover:bg-slate-50/40 border-b border-gray-150 last:border-0 transition-all duration-200'
              >
                {/* Doctor Image */}
                <img 
                  className='rounded-full w-10 h-10 object-cover border border-zinc-200 bg-stone-100' 
                  src={item.docData.image} 
                  alt={item.docData.name} 
                />

                {/* Booking & Patient Info */}
                <div className='flex-1 text-sm'>
                  <p className='text-neutral-800 font-semibold leading-snug'>{item.docData.name}</p>
                  <p className='text-gray-400 text-xs mt-0.5 font-medium'>
                    Booking for {item.userData.name} on {slotDateFormat(item.slotDate)} at {item.slotTime}
                  </p>
                </div>

                {/* Cancel Action / Status badge */}
                <div className='flex items-center'>
                  {item.canceled ? (
                    <p className='text-red-400 text-xs font-semibold bg-red-50 px-2.5 py-1 rounded-full border border-red-100'>Cancelled</p>
                  ) : item.isCompleted ? (
                    <p className='text-green-500 text-xs font-semibold bg-green-50 px-2.5 py-1 rounded-full border border-green-100'>Completed</p>
                  ) : (
                    <img 
                      onClick={() => cancelAppointment(item._id)}
                      className='w-9 h-9 p-2 cursor-pointer hover:bg-red-50 rounded-full transition-all duration-300 hover:scale-105' 
                      src={assets.cancel_icon} 
                      alt="Cancel" 
                      title="Cancel Appointment"
                    />
                  )}
                </div>

              </div>
            ))
          ) : (
            <div className='flex flex-col items-center justify-center py-12 text-zinc-400'>
              <p className='text-sm'>No bookings found.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  )
}

export default Dashboard