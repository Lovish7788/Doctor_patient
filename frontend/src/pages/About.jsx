import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
    return (
        <div className='md:mx-10'>
            {/* ----- Header ----- */}
            <div className='text-center text-2xl pt-10 text-gray-500'>
                <p><span className='text-gray-700 font-semibold'>ABOUT US</span></p>
            </div>

            {/* ----- Side-by-Side Intro Section ----- */}
            <div className='my-10 flex flex-col md:flex-row gap-12'>
                {/* Left Column - Image */}
                <img className='w-full md:max-w-[360px] rounded-lg object-cover' src={assets.about_image} alt="About Prescripto" />

                {/* Right Column - Text Details */}
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600 leading-relaxed'>
                    <p>
                        Welcome to Prescripto, your trusted partner in managing your healthcare needs. We connect you with top-rated,
                        experienced medical professionals in your area, allowing you to book appointments hassle-free, read doctor profiles,
                        and manage your health schedules seamlessly.
                    </p>
                    <p>
                        At Prescripto, we understand the challenges individuals face when it comes to scheduling appointments and finding
                        the right care. Our platform is designed to simplify this process, providing users with a secure and user-friendly
                        experience from booking to care delivery.
                    </p>
                    <b className='text-gray-800 text-base'>Our Vision</b>
                    <p>
                        Our vision at Prescripto is to create a seamless healthcare experience by bridging the gap between patients and providers.
                        We aim to empower patients to take control of their health journeys through technology-driven accessibility, personalization,
                        and convenience.
                    </p>
                </div>
            </div>

            {/* ----- Why Choose Us Header ----- */}
            <div className='text-xl my-4 text-gray-900'>
                <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
            </div>

            {/* ----- Why Choose Us Cards Grid ----- */}
            <div className='flex flex-col md:flex-row text-sm mb-20 border border-gray-100 rounded-lg overflow-hidden'>
                {/* Card 1 - Efficiency */}
                <div className='border-b md:border-b-0 md:border-r border-gray-200 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer group'>
                    <b className='text-gray-800 group-hover:text-white'>EFFICIENCY</b>
                    <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
                </div>

                {/* Card 2 - Convenience */}
                <div className='border-b md:border-b-0 md:border-r border-gray-200 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer group'>
                    <b className='text-gray-800 group-hover:text-white'>CONVENIENCE</b>
                    <p>Access to a network of trusted healthcare professionals in your area.</p>
                </div>

                {/* Card 3 - Personalization */}
                <div className='px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer group'>
                    <b className='text-gray-800 group-hover:text-white'>PERSONALIZATION</b>
                    <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
                </div>
            </div>
        </div>
    )
}

export default About