import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/doctorContext'

const DoctorProfile = () => {
  const { profileData, getProfileData, dToken, updateProfileData } = useContext(DoctorContext)

  const [isEdit, setIsEdit] = useState(false)
  const [fees, setFees] = useState('')
  const [address, setAddress] = useState({ line1: '', line2: '' })
  const [available, setAvailable] = useState(false)

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  // Sync local edit state whenever profileData loads from context
  useEffect(() => {
    if (profileData) {
      setFees(profileData.fees)
      setAddress(profileData.address || { line1: '', line2: '' })
      setAvailable(profileData.available)
    }
  }, [profileData])

  const handleSave = async () => {
    await updateProfileData({ fees, address, available })
    setIsEdit(false)
  }

  const handleCancel = () => {
    setIsEdit(false)
    setFees(profileData.fees)
    setAddress(profileData.address || { line1: '', line2: '' })
    setAvailable(profileData.available)
  }

  return profileData ? (
    <div className='flex flex-col gap-4 m-5'>

      {/* ─── Top Profile Section ─── */}
      <div className='flex flex-col sm:flex-row gap-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6'>

        {/* Doctor Photo */}
        <div className='flex-shrink-0'>
          <img
            src={profileData.image}
            alt={profileData.name}
            className='w-36 h-36 rounded-xl object-cover bg-indigo-50 border border-gray-100'
          />
        </div>

        {/* Doctor Info */}
        <div className='flex-1 flex flex-col gap-3'>

          {/* Name */}
          <p className='text-2xl font-semibold text-neutral-800'>{profileData.name}</p>

          {/* Degree + Speciality + Experience */}
          <div className='flex items-center gap-2 flex-wrap'>
            <p className='text-sm text-gray-600'>
              {profileData.degree} &nbsp;-&nbsp; {profileData.speciality}
            </p>
            <span className='text-xs font-medium py-0.5 px-2.5 border border-primary/30 rounded-full text-primary bg-indigo-50'>
              {profileData.experience}
            </span>
          </div>

          {/* About */}
          <div>
            <p className='text-sm font-semibold text-neutral-700 mb-1 flex items-center gap-1'>About</p>
            <p className='text-sm text-gray-600 max-w-[700px] leading-relaxed'>{profileData.about}</p>
          </div>

          {/* Appointment Fee */}
          <p className='text-sm font-semibold text-neutral-700'>
            Appointment fee:&nbsp;
            <span className='text-neutral-800 font-bold'>
              {isEdit
                ? <input
                    type='number'
                    value={fees}
                    onChange={(e) => setFees(e.target.value)}
                    className='border border-gray-300 rounded px-2 py-0.5 w-24 text-sm focus:outline-none focus:border-primary'
                  />
                : `$${profileData.fees}`
              }
            </span>
          </p>

        </div>
      </div>

      {/* ─── Contact & Availability ─── */}
      <div className='bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col gap-5'>

        {/* Address */}
        <div>
          <p className='text-sm font-semibold text-neutral-700 mb-2'>Address</p>
          <div className='flex flex-col gap-1.5'>
            {isEdit
              ? <>
                  <input
                    type='text'
                    value={address.line1}
                    onChange={(e) => setAddress(prev => ({ ...prev, line1: e.target.value }))}
                    placeholder='Address Line 1'
                    className='border border-gray-300 rounded px-3 py-2 text-sm w-full max-w-sm focus:outline-none focus:border-primary'
                  />
                  <input
                    type='text'
                    value={address.line2}
                    onChange={(e) => setAddress(prev => ({ ...prev, line2: e.target.value }))}
                    placeholder='Address Line 2'
                    className='border border-gray-300 rounded px-3 py-2 text-sm w-full max-w-sm focus:outline-none focus:border-primary'
                  />
                </>
              : <>
                  <p className='text-sm text-gray-600'>{profileData.address?.line1}</p>
                  <p className='text-sm text-gray-600'>{profileData.address?.line2}</p>
                </>
            }
          </div>
        </div>

        {/* Availability */}
        <div className='flex items-center gap-2'>
          <input
            type='checkbox'
            id='available'
            checked={available}
            onChange={() => isEdit && setAvailable(prev => !prev)}
            disabled={!isEdit}
            className='w-4 h-4 accent-primary cursor-pointer'
          />
          <label
            htmlFor='available'
            className={`text-sm font-medium select-none ${isEdit ? 'cursor-pointer' : 'cursor-default'} text-gray-600`}
          >
            Available
          </label>
        </div>

        {/* Divider */}
        <div className='border-t border-gray-100' />

        {/* Edit / Save / Cancel buttons */}
        <div className='flex gap-3'>
          {isEdit ? (
            <>
              <button
                onClick={handleSave}
                className='border border-primary text-primary px-8 py-2 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-all duration-300'
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className='border border-gray-300 text-gray-500 px-8 py-2 rounded-full text-sm font-medium hover:bg-gray-50 transition-all duration-300'
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className='border border-primary text-primary px-8 py-2 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-all duration-300'
            >
              Edit
            </button>
          )}
        </div>

      </div>
    </div>
  ) : null
}

export default DoctorProfile