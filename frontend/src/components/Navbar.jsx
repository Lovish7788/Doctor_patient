import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const [token, setToken] = useState(true) // Temporary token for showing login/logout state

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-400'>
      {/* Logo */}
      <img 
        onClick={() => navigate('/')} 
        className='w-44 cursor-pointer' 
        src={assets.logo} 
        alt="Prescripto Logo" 
      />

      {/* Desktop Navigation Links */}
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <li className='py-1 cursor-pointer'>HOME</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/doctors' className='flex flex-col items-center gap-1'>
          <li className='py-1 cursor-pointer'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <li className='py-1 cursor-pointer'>ABOUT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <li className='py-1 cursor-pointer'>CONTACT</li>
          <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
        </NavLink>
      </ul>

      {/* Right-Side Authentication Button / Profile Dropdown */}
      <div className='flex items-center gap-4'>
        {token ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-8 rounded-full' src={assets.profile_pic} alt="Profile" />
            <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown Icon" />
            
            {/* Hover Profile Dropdown Menu */}
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-md'>
                <p 
                  onClick={() => navigate('/my-profile')} 
                  className='hover:text-black cursor-pointer'
                >
                  My Profile
                </p>
                <p 
                  onClick={() => navigate('/my-appointments')} 
                  className='hover:text-black cursor-pointer'
                >
                  My Appointments
                </p>
                <p 
                  onClick={() => setToken(false)} 
                  className='hover:text-black cursor-pointer'
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => navigate('/login')} 
            className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block cursor-pointer hover:bg-opacity-90 transition-all duration-300'
          >
            Create account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img 
          onClick={() => setShowMenu(true)} 
          className='w-6 md:hidden cursor-pointer' 
          src={assets.menu_icon} 
          alt="Menu Icon" 
        />

        {/* Mobile Menu Drawer */}
        <div className={`md:hidden fixed top-0 right-0 bottom-0 z-30 overflow-hidden bg-white transition-all duration-300 ${showMenu ? 'w-full' : 'w-0'}`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.logo} alt="Logo" />
            <img 
              onClick={() => setShowMenu(false)} 
              className='w-7 cursor-pointer' 
              src={assets.cross_icon} 
              alt="Close Icon" 
            />
          </div>
          <ul className='flex flex-col items-center gap-5 mt-5 px-5 text-lg font-medium'>
            <NavLink 
              onClick={() => setShowMenu(false)} 
              to='/'
            >
              <p className='px-4 py-2 rounded inline-block'>HOME</p>
            </NavLink>
            <NavLink 
              onClick={() => setShowMenu(false)} 
              to='/doctors'
            >
              <p className='px-4 py-2 rounded inline-block'>ALL DOCTORS</p>
            </NavLink>
            <NavLink 
              onClick={() => setShowMenu(false)} 
              to='/about'
            >
              <p className='px-4 py-2 rounded inline-block'>ABOUT</p>
            </NavLink>
            <NavLink 
              onClick={() => setShowMenu(false)} 
              to='/contact'
            >
              <p className='px-4 py-2 rounded inline-block'>CONTACT</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar