import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/adminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/doctorContext'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [showPassword, setShowPassword] = useState(false)

  const { setAToken, backendUrl } = useContext(AdminContext)
  const {setDToken} = useContext(DoctorContext)

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
        const {data} = await axios.post(backendUrl + '/api/doctor/login', {email,password})
        if (data.success) {
           console.log("doc token",data.token);
           
          localStorage.setItem('dToken', data.token)
          setDToken(data.token)
          toast.success("Login Successful!")
        }else{
          toast.error(data.message)
        }
      }
    } 
    catch (error) {
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
          <div className='relative w-full mt-1'>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='border border-gray-300 rounded w-full p-2.5 pr-10 focus:outline-none focus:border-primary text-gray-800'
              type={showPassword ? "text" : "password"}
              placeholder='••••••••'
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 hover:text-gray-600 focus:outline-none'
            >
              {showPassword ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
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