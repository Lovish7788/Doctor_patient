import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets.js'
import { AdminContext } from '../../context/adminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [about, setAbout] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { aToken, backendUrl } = useContext(AdminContext)

  /**
   * Submits the form data including files using Multipart FormData.
   */
  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      if (!docImg) {
        return toast.error('Image Not Selected')
      }

      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('experience', experience)
      formData.append('about', about)
      formData.append('fees', Number(fees))
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, {
        headers: { atoken: aToken }
      })

      if (data.success) {
        toast.success(data.message)
        // Reset form inputs upon success
        setDocImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setFees('')
        setDegree('')
        setAbout('')
        setAddress1('')
        setAddress2('')
        setSpeciality('General physician')
        setExperience('1 Year')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium text-[#565656]'>Add Doctor</p>

      <div className='bg-white px-8 py-8 border border-gray-100 rounded-xl w-full max-w-4xl max-h-[85vh] overflow-y-scroll text-[#5E5E5E] text-sm shadow-md scrollbar-none'>
        {/* Profile Image Upload Trigger */}
        <div className='flex items-center gap-4 mb-8'>
          <label htmlFor="doc-img" className='cursor-pointer flex items-center gap-4'>
            <img 
              className='w-16 h-16 bg-gray-50 rounded-full object-cover border border-gray-200' 
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} 
              alt="Upload placeholder" 
            />
            <p className='text-gray-500 font-medium leading-tight'>
              Upload doctor <br /> picture
            </p>
          </label>
          <input 
            onChange={(e) => setDocImg(e.target.files[0])} 
            type="file" 
            id="doc-img" 
            hidden 
          />
        </div>

        {/* Form Input Columns */}
        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          
          {/* Left Inputs Column */}
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='w-full'>
              <p className='font-medium text-xs text-gray-500'>Doctor name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className='border border-gray-300 rounded px-3 py-2 w-full mt-1.5 focus:outline-none focus:border-primary text-gray-800 text-xs'
                type="text"
                placeholder='Name'
                required
              />
            </div>

            <div className='w-full'>
              <p className='font-medium text-xs text-gray-500'>Doctor Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className='border border-gray-300 rounded px-3 py-2 w-full mt-1.5 focus:outline-none focus:border-primary text-gray-800 text-xs'
                type="email"
                placeholder='Email'
                required
              />
            </div>

            <div className='w-full'>
              <p className='font-medium text-xs text-gray-500'>Doctor Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className='border border-gray-300 rounded px-3 py-2 w-full mt-1.5 focus:outline-none focus:border-primary text-gray-800 text-xs'
                type="password"
                placeholder='Password'
                required
              />
            </div>

            <div className='w-full'>
              <p className='font-medium text-xs text-gray-500'>Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className='border border-gray-300 rounded px-3 py-2 w-full mt-1.5 bg-white text-gray-800 text-xs'
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
                <option value="8 Years">8 Years</option>
                <option value="9 Years">9 Years</option>
                <option value="10 Years">10 Years</option>
              </select>
            </div>

            <div className='w-full'>
              <p className='font-medium text-xs text-gray-500'>Fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className='border border-gray-300 rounded px-3 py-2 w-full mt-1.5 focus:outline-none focus:border-primary text-gray-800 text-xs'
                type="number"
                placeholder='Fees'
                required
              />
            </div>
          </div>

          {/* Right Inputs Column */}
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='w-full'>
              <p className='font-medium text-xs text-gray-500'>Speciality</p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                className='border border-gray-300 rounded px-3 py-2 w-full mt-1.5 bg-white text-gray-800 text-xs'
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div> 

            <div className='w-full'>
              <p className='font-medium text-xs text-gray-500'>Education</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className='border border-gray-300 rounded px-3 py-2 w-full mt-1.5 focus:outline-none focus:border-primary text-gray-800 text-xs'
                type="text"
                placeholder='Education'
                required
              />
            </div>

            <div className='w-full'>
              <p className='font-medium text-xs text-gray-500'>Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className='border border-gray-300 rounded px-3 py-2 w-full mt-1.5 focus:outline-none focus:border-primary text-gray-800 text-xs'
                type="text"
                placeholder='Address Line 1'
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className='border border-gray-300 rounded px-3 py-2 w-full mt-2 focus:outline-none focus:border-primary text-gray-800 text-xs'
                type="text"
                placeholder='Address Line 2'
                required
              />
            </div>
          </div>

        </div>

        {/* Text Area Description */}
        <div className='w-full mt-6'>
          <p className='font-medium text-xs text-gray-500 mb-1.5'>About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className='border border-gray-300 rounded px-3 py-2 w-full mt-1 focus:outline-none focus:border-primary text-gray-800 text-xs'
            placeholder='write about doctor'
            rows={4}
            required
          />
        </div>

        {/* Action Button */}
        <button 
          type='submit' 
          className='bg-primary text-white text-sm px-14 py-3 rounded-full mt-6 cursor-pointer hover:bg-opacity-95 hover:scale-105 transition-all duration-300 font-medium shadow-sm'
        >
          Add doctor
        </button>
      </div>
    </form>    
  )
}

export default AddDoctor