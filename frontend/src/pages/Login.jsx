import React, { useState } from 'react'

const Login = () => {
  const [state, setState] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    // Authentication endpoint execution logic will go here during the backend integration phase
  }

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
          <input 
            className='border border-zinc-300 rounded w-full p-2.5 mt-1 focus:outline-none focus:border-primary transition-all duration-300' 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            required 
          />
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