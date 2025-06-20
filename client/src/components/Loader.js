import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="flex flex-col items-center animate-fadeIn">
        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-b-transparent border-blue-400 rounded-full opacity-50 animate-spin-slow"></div>
        </div>

        {/* Text */}
        <p className="text-white mt-6 text-xl font-semibold tracking-wide animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  )
}

export default Loader
