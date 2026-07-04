import React from 'react'
import { useParams } from 'react-router-dom'

const Doctors = () => {
  const { speciality } = useParams()
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Doctors Page</h1>
      {speciality && <p className="text-gray-600">Filtering by: {speciality}</p>}
    </div>
  )
}

export default Doctors
