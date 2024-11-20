import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
        <p className="text-white mt-4 text-lg">Loading...</p>
      </div>
    </div>
  )
}

export default Loader