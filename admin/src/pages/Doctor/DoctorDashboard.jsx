import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/doctorContext'
import { assets } from '../../assets/assets.js'

const DoctorDashboard = () => {
  const { getDashData, dashData, dToken, cancelAppointment, completeAppointment } = useContext(DoctorContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
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

  return dashData && (
    <div className='m-5'>

      {/* ─── Stats Cards Row ─── */}
      <div className='flex flex-wrap gap-4 mb-8'>

        {/* Earnings Card */}
        <div className='flex items-center gap-4 bg-white p-5 min-w-52 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 cursor-pointer'>
          <img className='w-12 h-12' src={assets.earning_icon} alt="Earnings" />
          <div>
            <p className='text-2xl font-bold text-zinc-800'>${dashData.earnings}</p>
            <p className='text-gray-500 text-sm font-medium'>Earnings</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className='flex items-center gap-4 bg-white p-5 min-w-52 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 cursor-pointer'>
          <img className='w-12 h-12' src={assets.appointments_icon} alt="Appointments" />
          <div>
            <p className='text-2xl font-bold text-zinc-800'>{dashData.appointments}</p>
            <p className='text-gray-500 text-sm font-medium'>Appointments</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className='flex items-center gap-4 bg-white p-5 min-w-52 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 cursor-pointer'>
          <img className='w-12 h-12' src={assets.patients_icon} alt="Patients" />
          <div>
            <p className='text-2xl font-bold text-zinc-800'>{dashData.patients}</p>
            <p className='text-gray-500 text-sm font-medium'>Patients</p>
          </div>
        </div>

      </div>

      {/* ─── Latest Appointments ─── */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-100'>

        {/* Section Header */}
        <div className='flex items-center gap-2.5 px-5 py-4 border-b border-gray-100'>
          <img src={assets.list_icon} alt="List" className='w-5' />
          <p className='font-semibold text-gray-700'>Latest Bookings</p>
        </div>

        {/* Appointments List */}
        {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
          dashData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className='flex items-center gap-4 px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-all duration-200'
            >
              {/* Doctor (Patient) Avatar */}
              <img
                className='w-10 h-10 rounded-full object-cover border border-zinc-100 flex-shrink-0'
                src={item.userData?.image}
                alt={item.userData?.name}
              />

              {/* Patient Info */}
              <div className='flex-1 min-w-0'>
                <p className='font-semibold text-zinc-800 truncate'>{item.userData?.name}</p>
                <p className='text-xs text-gray-400 mt-0.5'>Booking on {slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              </div>

              {/* Action Buttons / Status Badge */}
              <div className='flex-shrink-0'>
                {item.canceled ? (
                  <span className='text-red-400 text-xs font-semibold bg-red-50 px-3 py-1 rounded-full border border-red-100'>
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className='text-green-500 text-xs font-semibold bg-green-50 px-3 py-1 rounded-full border border-green-100'>
                    Completed
                  </span>
                ) : (
                  <div className='flex items-center gap-2'>
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className='w-9 h-9 p-2 cursor-pointer hover:bg-red-50 rounded-full transition-all duration-300 hover:scale-105'
                      src={assets.cancel_icon}
                      alt="Cancel"
                      title="Cancel Appointment"
                    />
                    <img
                      onClick={() => {
                        completeAppointment(item._id)
                        getDashData()
                      }}
                      className='w-9 h-9 p-2 cursor-pointer hover:bg-green-50 rounded-full transition-all duration-300 hover:scale-105'
                      src={assets.tick_icon}
                      alt="Complete"
                      title="Mark Completed"
                    />
                  </div>
                )}
              </div>

            </div>
          ))
        ) : (
          <div className='flex flex-col items-center justify-center py-12 text-zinc-400'>
            <img className='w-10 opacity-40 mb-3' src={assets.appointment_icon} alt="Empty" />
            <p className='text-sm'>No bookings yet.</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default DoctorDashboard