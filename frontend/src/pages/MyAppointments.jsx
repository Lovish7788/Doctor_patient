import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointment] = useState([])
  const navigate = useNavigate()
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const getUserAppointment = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })

      if (data.success) {
        setAppointment(data.appointments.reverse())

      }
    }
    catch (error) {
      console.log(error);

      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {


      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointment()
        getDoctorsData()
      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
      console.log(error);

      toast.error(error.message)
    }

  }

  const initPay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) {
        const options = {
          key: data.key,
          amount: data.order.amount,
          currency: data.order.currency,
          name: 'Prescripto',
          description: 'Appointment Payment',
          order_id: data.order.id,
          handler: async (response) => {
            try {
              const verifyRes = await axios.post(backendUrl + '/api/user/verify-razorpay', { ...response, appointmentId }, { headers: { token } })
              if (verifyRes.data.success) {
                toast.success(verifyRes.data.message)
                getUserAppointment()
                navigate('/my-appointments')
              } else {
                toast.error(verifyRes.data.message)
              }
            } catch (error) {
              toast.error(error.message)
            }
          }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointment();
    }
  }, [token])

  return (
    <div className='md:mx-10 my-10'>
      {/* Page Header */}
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b border-zinc-200 text-lg'>
        My appointments
      </p>

      {/* Appointment Listings Container */}
      <div className='flex flex-col gap-4 mt-5'>
        {appointments.map((item, index) => (
          <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 px-3 border-b border-zinc-200 hover:bg-slate-50/50 hover:shadow-sm rounded-lg transition-all duration-300'>
            {/* Left Column - Doctor Image */}
            <div>
              <img className='w-32 bg-stone-100 rounded-md object-cover transition-all duration-500 hover:scale-[1.03] hover:shadow-sm' src={item.docData.image} alt={item.docData.name} />
            </div>

            {/* Middle Column - Appointment Details */}
            <div className='flex-1 text-xs text-zinc-600 flex flex-col justify-center gap-1.5'>
              <p className='text-neutral-800 font-semibold text-sm leading-snug'>{item.docData.name}</p>
              <p className='text-zinc-500'>{item.docData.speciality}</p>

              <p className='text-zinc-700 font-medium mt-1'>Address:</p>
              <p className='text-neutral-500 leading-snug'>{item.docData.address.line1}</p>
              <p className='text-neutral-500 leading-snug'>{item.docData.address.line2}</p>

                <p className='text-xs mt-1.5'>
                  <span className='text-neutral-700 font-medium'>Date:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                </p>
            </div>

            {/* Right Column - Booking Action Buttons */}
            <div className='flex flex-col gap-2.5 justify-end text-sm'>
              {!item.canceled && !item.payment && (
                <button
                  onClick={() => initPay(item._id)}
                  className='text-stone-500 text-center sm:min-w-48 py-2 border border-zinc-200 rounded hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer font-medium shadow-sm hover:shadow-md bg-white'
                >
                  Pay Online
                </button>
              )}
              {!item.canceled && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className='text-stone-500 text-center sm:min-w-48 py-2 border border-zinc-200 rounded hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer font-medium shadow-sm hover:shadow-md bg-white'
                >
                  Cancel appointment
                </button>
              )}
              {item.canceled && (
                <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500 bg-red-50 cursor-not-allowed font-medium' disabled>
                  Appointment Cancelled
                </button>
              )}
              {item.payment && !item.canceled && (
                <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500 bg-green-50 cursor-not-allowed font-medium' disabled>
                  Paid
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments