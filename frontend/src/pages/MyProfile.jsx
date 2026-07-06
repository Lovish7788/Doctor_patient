import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {
  const { userData, loadUserProfileData, backendUrl, token, setUserData } = useContext(AppContext)


  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      formData.append('address', JSON.stringify(userData.address));

      image && formData.append('image', image);

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
      }
      else {
        toast.error(data.message)
      }



    } catch (error) {
      console.log(error);
      toast.error(error.message)


    }
  }

  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm md:mx-10 my-10'>
      {
        isEdit ?
          <label htmlFor='image'>
            <div className='inline-block relative cursor-pointer'>
              <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              <img className='absolute bottom-12 right-12 w-10 ' src={image ? '' : assets.upload_icon} alt="" />
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' hidden />
          </label> :
          <img className='w-36 rounded shadow-sm' src={userData.image} alt="Profile" />
      }
      {/* Profile Picture */}


      {/* User Name */}
      {isEdit ? (
        <input
          className='bg-gray-50 text-3xl font-medium max-w-60 mt-4 border border-gray-300 rounded p-1.5 focus:outline-none focus:border-primary'
          type="text"
          value={userData.name}
          onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
        />
      ) : (
        <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      )}

      {/* Divider */}
      <hr className='bg-zinc-400 h-[1px] border-none my-3' />

      {/* Contact Information Section */}
      <div>
        <p className='text-neutral-500 underline mt-3 font-semibold'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>

          <p className='font-medium'>Phone:</p>
          {isEdit ? (
            <input
              className='bg-gray-100 max-w-52 border border-gray-300 rounded p-1 focus:outline-none focus:border-primary'
              type="text"
              value={userData.phone}
              onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
            />
          ) : (
            <p className='text-blue-400'>{userData.phone}</p>
          )}

          <p className='font-medium'>Address:</p>
          {isEdit ? (
            <div className='flex flex-col gap-1.5'>
              <input
                className='bg-gray-100 border border-gray-300 rounded p-1 focus:outline-none focus:border-primary'
                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                value={userData.address.line1}
                type="text"
              />
              <input
                className='bg-gray-100 border border-gray-300 rounded p-1 focus:outline-none focus:border-primary'
                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                value={userData.address.line2}
                type="text"
              />
            </div>
          ) : (
            <p className='text-gray-500 leading-relaxed'>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      {/* Basic Information Section */}
      <div>
        <p className='text-neutral-500 underline mt-3 font-semibold'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {isEdit ? (
            <select
              className='max-w-28 bg-gray-100 border border-gray-300 rounded p-1 focus:outline-none focus:border-primary'
              onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
              value={userData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className='text-gray-400'>{userData.gender}</p>
          )}

          <p className='font-medium'>Birthday:</p>
          {isEdit ? (
            <input
              className='max-w-36 bg-gray-100 border border-gray-300 rounded p-1 focus:outline-none focus:border-primary'
              type="date"
              onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
              value={userData.dob}
            />
          ) : (
            <p className='text-gray-400'>{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className='mt-10'>
        {isEdit ? (
          <button
            className='border border-primary text-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md font-medium'
            onClick={updateUserProfileData}
          >
            Save information
          </button>
        ) : (
          <button
            className='border border-primary text-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md font-medium'
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  )
}

export default MyProfile