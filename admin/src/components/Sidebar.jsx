import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { AdminContext } from '../context/adminContext'
import { DoctorContext } from '../context/doctorContext.jsx'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return (
    <div className='min-h-screen bg-white border-r border-gray-100 flex flex-col pt-5'>
      {/* Admin Panel Sidebar Menu Items */}
      {aToken && (
        <ul className='text-[#515151] mt-2 flex flex-col'>
          {/* Dashboard Link */}
          <NavLink 
            to='/admin-dashboard' 
            className={({ isActive }) => 
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-black font-semibold' : 'hover:bg-slate-50 text-gray-600'}`
            }
          >
            <img className='w-5 object-contain' src={assets.home_icon} alt="Dashboard Icon" />
            <p className='hidden md:block text-sm font-medium'>Dashboard</p>
          </NavLink>

          {/* All Appointments Link */}
          <NavLink 
            to='/all-appointments' 
            className={({ isActive }) => 
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-black font-semibold' : 'hover:bg-slate-50 text-gray-600'}`
            }
          >
            <img className='w-5 object-contain' src={assets.appointment_icon} alt="Appointments Icon" />
            <p className='hidden md:block text-sm font-medium'>Appointments</p>
          </NavLink>

          {/* Add Doctor Link */}
          <NavLink 
            to='/add-doctor' 
            className={({ isActive }) => 
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-black font-semibold' : 'hover:bg-slate-50 text-gray-600'}`
            }
          >
            <img className='w-5 object-contain' src={assets.add_icon} alt="Add Doctor Icon" />
            <p className='hidden md:block text-sm font-medium'>Add Doctor</p>
          </NavLink>

          {/* Doctor List Link */}
          <NavLink 
            to='/doctor-list' 
            className={({ isActive }) => 
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-black font-semibold' : 'hover:bg-slate-50 text-gray-600'}`
            }
          >
            <img className='w-5 object-contain' src={assets.people_icon} alt="Doctor List Icon" />
            <p className='hidden md:block text-sm font-medium'>Doctors List</p>
          </NavLink>
        </ul>
      )}
      {dToken && (
        <ul className='text-[#515151] mt-2 flex flex-col'>
          {/* Dashboard Link */}
          <NavLink 
            to='/doctor-dashboard' 
            className={({ isActive }) => 
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-black font-semibold' : 'hover:bg-slate-50 text-gray-600'}`
            }
          >
            <img className='w-5 object-contain' src={assets.home_icon} alt="Dashboard Icon" />
            <p className='hidden md:block text-sm font-medium'>Dashboard</p>
          </NavLink>

          {/* All Appointments Link */}
          <NavLink 
            to='/doctor-appointments' 
            className={({ isActive }) => 
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-black font-semibold' : 'hover:bg-slate-50 text-gray-600'}`
            }
          >
            <img className='w-5 object-contain' src={assets.appointment_icon} alt="Appointments Icon" />
            <p className='hidden md:block text-sm font-medium'>Appointments</p>
          </NavLink>

          {/* Doctor Profile Link */}
          <NavLink 
            to='/doctor-profile' 
            className={({ isActive }) => 
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-all duration-300 ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-black font-semibold' : 'hover:bg-slate-50 text-gray-600'}`
            }
          >
            <img className='w-5 object-contain' src={assets.people_icon} alt="Profile Icon" />
            <p className='hidden md:block text-sm font-medium'>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  )
}

export default Sidebar