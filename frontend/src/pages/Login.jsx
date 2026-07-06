import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
const navigate = useNavigate();
  const { backendUrl ,setToken, token} = useContext(AppContext)
  const [state, setState] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    // Authentication endpoint execution logic will go here during the backend integration phase

    try {
      if(state==='Sign Up'){
        const {data} = await axios.post(backendUrl+'/api/user/register',{name , password, email})
        if(data.success){
          localStorage.setItem('token', data.token)
          setToken(data.token);
        }
        else{
          toast.error(data.message)
        }
      }
      else{
        const {data} = await axios.post(backendUrl+'/api/user/login',{password, email})

        if(data.success){
          localStorage.setItem('token', data.token)
          setToken(data.token);
        }
        else{
          toast.error(data.message)
        }
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-zinc-200 rounded-xl text-zinc-600 text-sm shadow-lg bg-white'>
        {/* Title */}
        <p className='text-2xl font-semibold text-gray-800'>
          {state === 'Sign Up' ? "Create Account" : "Login"}
        </p>
        {/* Subtitle */}
        <p className='text-gray-500'>
          Please {state === 'Sign Up' ? "sign up" : "log in"} to book appointment
        </p>
        
        {/* Full Name field (Only on Registration) */}
        {state === 'Sign Up' && (
          <div className='w-full'>
            <p>Full Name</p>
            <input 
              className='border border-zinc-300 rounded w-full p-2.5 mt-1 focus:outline-none focus:border-primary transition-all duration-300' 
              type="text" 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              required 
            />
          </div>
        )}

        {/* Email Field */}
        <div className='w-full'>
          <p>Email</p>
          <input 
            className='border border-zinc-300 rounded w-full p-2.5 mt-1 focus:outline-none focus:border-primary transition-all duration-300' 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            required 
          />
        </div>

        {/* Password Field */}
        <div className='w-full'>
          <p>Password</p>
          <div className='relative w-full mt-1'>
            <input 
              className='border border-zinc-300 rounded w-full p-2.5 pr-10 focus:outline-none focus:border-primary transition-all duration-300 text-gray-800' 
              type={showPassword ? "text" : "password"} 
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
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

        {/* Submit Button */}
        <button 
          type='submit' 
          className='bg-primary text-white w-full py-2.5 rounded-md text-base mt-2 hover:bg-opacity-95 cursor-pointer shadow-sm font-medium transition-all duration-300 hover:scale-[1.01]'
        >
          {state === 'Sign Up' ? "Create Account" : "Login"}
        </button>

        {/* View Switch Trigger */}
        {state === 'Sign Up' ? (
          <p className='text-gray-500 mt-1'>
            Already have an account?{' '}
            <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer font-medium'>
              Login here
            </span>
          </p>
        ) : (
          <p className='text-gray-500 mt-1'>
            Create a new account?{' '}
            <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer font-medium'>
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  )
}

export default Login