import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm text-gray-600'>
                {/* ----- Left Column ----- */}
                <div>
                    <img className='mb-5 w-40' src={assets.logo} alt="Prescripto Logo" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>
                        Prescripto is your trusted partner in managing healthcare needs. We connect you with top-rated,
                        experienced medical professionals in your area, allowing you to book appointments hassle-free,
                        read doctor profiles, and manage your health schedules seamlessly.
                    </p>
                </div>

                {/* ----- Center Column ----- */}
                <div>
                    <p className='text-xl font-medium mb-5 text-gray-800'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <Link onClick={() => window.scrollTo(0, 0)} to="/" className='hover:text-black cursor-pointer'>
                            <li>Home</li>
                        </Link>
                        <Link onClick={() => window.scrollTo(0, 0)} to="/about" className='hover:text-black cursor-pointer'>
                            <li>About us</li>
                        </Link>
                        <Link onClick={() => window.scrollTo(0, 0)} to="/contact" className='hover:text-black cursor-pointer'>
                            <li>Contact us</li>
                        </Link>
                        <li className='hover:text-black cursor-pointer'>Privacy policy</li>
                    </ul>
                </div>

                {/* ----- Right Column ----- */}
                <div>
                    <p className='text-xl font-medium mb-5 text-gray-800'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li className='hover:text-black cursor-pointer'>+91-6284912714</li>
                        <li className='hover:text-black cursor-pointer'>companymail@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* ----- Bottom Copyright Section ----- */}
            <div>
                <hr className='border-gray-300' />
                <p className='py-5 text-sm text-center text-gray-500'>
                    Copyright © 2024 Company Name - All Rights Reserved.
                </p>
            </div>
        </div>
    )
}

export default Footer