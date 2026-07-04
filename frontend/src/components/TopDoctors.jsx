import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'


const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      {/* Title & Subtitle */}
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm text-gray-600'>
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Doctors Grid */}
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0); }}
            key={index}
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500'
          >
            {/* Image Container with light background */}
            <img className='bg-blue-50 w-full h-auto object-cover' src={item.image} alt={item.name} />

            {/* Details Panel */}
            <div className='p-4'>
              <div className='flex items-center gap-2 text-sm text-center text-green-500 mb-1'>
                <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                <p className='font-medium'>Available</p>
              </div>
              <p className='text-gray-900 text-lg font-medium truncate'>{item.name}</p>
              <p className='text-gray-600 text-sm truncate'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* More Button */}
      <button
        onClick={() => { navigate('/doctors'); window.scrollTo(0, 0); }}
        className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer font-medium'
      >
        more
      </button>
    </div>
  )
}

export default TopDoctors
