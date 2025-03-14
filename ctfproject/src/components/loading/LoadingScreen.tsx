import React from 'react'

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-light tracking-widest text-gray-700">Furagu</h1>
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gray-700 animate-spin"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen