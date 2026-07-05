import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/adminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setAToken, backendUrl } = useContext(AdminContext)

  /** 
   * Form submission handler for authentcation check.
   */
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
            console.log(data.token);
            
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)
          toast.success("Login Successful!")
        } else {
          toast.error(data.message)
        }
      } else {
        // Doctor Login stub (to be implemen  ted later)
        toast.info("Doctor Login logic to be implemented.")
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-[400px] border border-gray-100 rounded-xl text-[#5E5E5E] text-sm shadow-lg bg-white transition-all duration-300 hover:shadow-xl'>
        {/* Card Header Title */}
        <p className='text-2xl font-semibold m-auto text-primary'>
          <span className='text-[#5F6FFF]'>{state}</span> Login
        </p>

        {/* Email input field */}
        <div className='w-full'>
          <p className='font-medium text-gray-600'>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-gray-300 rounded w-full p-2.5 mt-1 focus:outline-none focus:border-primary text-gray-800'
            type="email"
            placeholder='admin@example.com'
            required
          />
        </div>

        {/* Password input field */}
        <div className='w-full'>
          <p className='font-medium text-gray-600'>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border border-gray-300 rounded w-full p-2.5 mt-1 focus:outline-none focus:border-primary text-gray-800'
            type="password"
            placeholder='••••••••'
            required
          />
        </div>

        {/* Action Login Button */}
        <button className='bg-primary text-white w-full py-2.5 rounded-md text-base mt-4 cursor-pointer hover:bg-opacity-95 hover:scale-[1.01] transition-all duration-300 font-medium shadow-sm'>
          Login
        </button>

        {/* Toggle between Admin and Doctor login states */}
        <div className='w-full text-center mt-2'>
          {state === 'Admin' ? (
            <p className='text-xs text-gray-500'>
              Doctor Login?{' '}
              <span className='text-primary underline cursor-pointer font-medium hover:text-opacity-80' onClick={() => setState('Doctor')}>
                Click here
              </span>
            </p>
          ) : (
            <p className='text-xs text-gray-500'>
              Admin Login?{' '}
              <span className='text-primary underline cursor-pointer font-medium hover:text-opacity-80' onClick={() => setState('Admin')}>
                Click here
              </span>
            </p>
          )}
        </div>
      </div>
    </form>
  )
}

export default Login