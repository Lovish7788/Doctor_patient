import React, { useContext } from 'react'
import { assets } from '../assets/assets.js'
import { AdminContext } from '../context/adminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const navigate = useNavigate()

  /**
   * Log out function that clears the authentication tokens and state.
   */
  const logout = () => {
    navigate('/')
    if (aToken) {
      setAToken('')
      localStorage.removeItem('aToken')
    }
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      {/* Left Column - Logo & User Type Status Badge */}
      <div className='flex items-center gap-2 text-xs'>
        <img 
          className='w-36 sm:w-40 cursor-pointer object-contain' 
          src={assets.admin_logo} 
          alt="Prescripto Logo" 
          onClick={() => navigate('/')}
        />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 font-medium'>
          {aToken ? 'Admin' : 'Doctor'}
        </p>
      </div>

      {/* Right Column - Interactive Logout Button */}
      <button 
        onClick={logout} 
        className='bg-primary text-white text-sm px-10 py-2.5 rounded-full cursor-pointer hover:bg-opacity-95 hover:scale-105 transition-all duration-300 shadow-sm font-medium'
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar