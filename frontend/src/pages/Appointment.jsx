import React from 'react'
import { useParams } from 'react-router-dom'

const Appointment = () => {
  const { docId } = useParams()
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Appointment Details</h1>
      <p className="text-gray-600">Booking Doctor ID: {docId}</p>
    </div>
  )
}

export default Appointment