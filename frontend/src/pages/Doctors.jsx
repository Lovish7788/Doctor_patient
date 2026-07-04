import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
  const { speciality } = useParams()
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)

  // Filter doctors based on speciality route parameter
  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }, [speciality, doctors])

  return (
    <div className='md:mx-10'>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        {/* Mobile Filters Toggle Button */}
        <button 
          onClick={() => setShowFilter(prev => !prev)}
          className={`py-1.5 px-3 border border-gray-300 rounded text-sm transition-all sm:hidden cursor-pointer font-medium ${showFilter ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600'}`}
        >
          Filters
        </button>

        {/* Left Sidebar - Specialty Filters */}
        <div className={`flex-col gap-4 text-sm text-gray-600 w-full sm:w-auto ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p 
            onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} 
            className={`w-[94vw] sm:w-48 pl-3 py-2 pr-16 border border-gray-300 rounded-md transition-all cursor-pointer hover:bg-slate-50 ${speciality === 'General physician' ? 'bg-indigo-50 text-black border-indigo-300 font-medium' : ''}`}
          >
            General physician
          </p>
          <p 
            onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} 
            className={`w-[94vw] sm:w-48 pl-3 py-2 pr-16 border border-gray-300 rounded-md transition-all cursor-pointer hover:bg-slate-50 ${speciality === 'Gynecologist' ? 'bg-indigo-50 text-black border-indigo-300 font-medium' : ''}`}
          >
            Gynecologist
          </p>
          <p 
            onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} 
            className={`w-[94vw] sm:w-48 pl-3 py-2 pr-16 border border-gray-300 rounded-md transition-all cursor-pointer hover:bg-slate-50 ${speciality === 'Dermatologist' ? 'bg-indigo-50 text-black border-indigo-300 font-medium' : ''}`}
          >
            Dermatologist
          </p>
          <p 
            onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} 
            className={`w-[94vw] sm:w-48 pl-3 py-2 pr-16 border border-gray-300 rounded-md transition-all cursor-pointer hover:bg-slate-50 ${speciality === 'Pediatricians' ? 'bg-indigo-50 text-black border-indigo-300 font-medium' : ''}`}
          >
            Pediatricians
          </p>
          <p 
            onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} 
            className={`w-[94vw] sm:w-48 pl-3 py-2 pr-16 border border-gray-300 rounded-md transition-all cursor-pointer hover:bg-slate-50 ${speciality === 'Neurologist' ? 'bg-indigo-50 text-black border-indigo-300 font-medium' : ''}`}
          >
            Neurologist
          </p>
          <p 
            onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} 
            className={`w-[94vw] sm:w-48 pl-3 py-2 pr-16 border border-gray-300 rounded-md transition-all cursor-pointer hover:bg-slate-50 ${speciality === 'Gastroenterologist' ? 'bg-indigo-50 text-black border-indigo-300 font-medium' : ''}`}
          >
            Gastroenterologist
          </p>
        </div>

        {/* Right Main Grid - Doctors Cards */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6'>
          {filterDoc.map((item, index) => (
            <div 
              onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0); }} 
              key={index} 
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500'
            >
              <img className='bg-blue-50 w-full h-auto object-cover' src={item.image} alt={item.name} />
              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-center text-green-500 mb-1'>
                  <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                  <p className='font-medium'>Available</p>
                </div>
                <p className='text-gray-900 text-lg font-medium truncate'>{item.name}</p>
                <p className='text-gray-600 text-sm truncate'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
