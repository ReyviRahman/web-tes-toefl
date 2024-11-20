import React from 'react'

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="mb-6">
        <svg
          className="w-16 h-16 text-red-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.364 5.636L5.636 18.364M5.636 5.636l12.728 12.728"
          ></path>
        </svg>
      </div>
      <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-gray-400 text-lg mb-8">
        We couldn't process your request. Please try again later.
      </p>
      <button
        onClick={() => window.location.reload()} 
        className="px-6 py-3 bg-red-500 text-white font-medium rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Try Again
      </button>
    </div>
  )
}

export default Error