import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {
  const { doctors } = useContext(AppContext)

  return (
    <div className='md:mx-10 my-10'>
      {/* Page Header */}
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b border-zinc-200 text-lg'>
        My appointments
      </p>

      {/* Appointment Listings Container */}
      <div className='flex flex-col gap-4 mt-5'>
        {doctors.slice(0, 3).map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b border-zinc-200'>
            {/* Left Column - Doctor Image */}
            <div>
              <img className='w-32 bg-stone-100 rounded-md object-cover' src={item.image} alt={item.name} />
            </div>

            {/* Middle Column - Appointment Details */}
            <div className='flex-1 text-xs text-zinc-600 flex flex-col justify-center gap-1.5'>
              <p className='text-neutral-800 font-semibold text-sm leading-snug'>{item.name}</p>
              <p className='text-zinc-500'>{item.speciality}</p>
              
              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-neutral-500 leading-snug'>{item.address.line1}</p>
              <p className='text-neutral-500 leading-snug'>{item.address.line2}</p>
              
              <p className='text-xs mt-1.5'>
                <span className='text-neutral-700 font-medium'>Date & Time:</span> 25, July, 2024 | 08:30 PM
              </p>
            </div>

            {/* Right Column - Booking Action Buttons */}
            <div className='flex flex-col gap-2.5 justify-end text-sm'>
              <button className='text-stone-500 text-center sm:min-w-48 py-2 border border-zinc-200 rounded hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer font-medium shadow-sm hover:shadow-md bg-white'>
                Pay Online
              </button>
              <button className='text-stone-500 text-center sm:min-w-48 py-2 border border-zinc-200 rounded hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer font-medium shadow-sm hover:shadow-md bg-white'>
                Cancel appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments