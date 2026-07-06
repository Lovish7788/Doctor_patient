import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/adminContext.jsx'

const DoctorList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken]) 

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll scrollbar-none w-full'>
      <p className='text-lg font-medium text-[#565656]'>All Doctors</p>
      
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors && doctors.length > 0 ? (
          doctors.map((item, index) => (
            <div 
              key={index} 
              className='border border-indigo-100 rounded-xl max-w-56 overflow-hidden cursor-pointer group hover:shadow-lg hover:border-primary hover:bg-indigo-50/30 transition-all duration-300 bg-white'
            >
              {/* Doctor Profile Picture */}
              <div className='overflow-hidden bg-indigo-50'>
                <img 
                  className='w-full h-48 object-cover group-hover:scale-105 transition-all duration-500' 
                  src={item.image} 
                  alt={item.name} 
                />
              </div>

              {/* Doctor Details Info */}
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium truncate'>{item.name}</p>
                <p className='text-zinc-500 text-sm'>{item.speciality}</p>
                
                {/* Availability Checkbox Toggle */}
                <div className='mt-2.5 flex items-center gap-2 text-sm'>
                  <input 
                    type="checkbox" 
                    checked={item.available !== false} 
                    onChange={() => changeAvailability(item._id)} 
                    className='cursor-pointer accent-primary' 
                  />
                  <p className='text-xs text-gray-500 font-medium'>Available</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='text-gray-500 text-sm italic mt-5'>No doctors registered in the system yet.</p>
        )}
      </div>
    </div>
  )
}

export default DoctorList