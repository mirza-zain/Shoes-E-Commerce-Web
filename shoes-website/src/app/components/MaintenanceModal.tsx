'use client'

import { useState } from 'react'

const MaintenanceModal = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-2xl">
        <div className="text-center">
          <div className="text-4xl mb-4">🚧</div>
          <h2 className="text-xl font-bold text-primary-dark mb-3">
            Site Under Maintenance
          </h2>
          <p className="text-gray-600 mb-6">
            We're migrating from static to dynamic Next.js. 
            Thanks for your patience!
          </p>
          <button 
            onClick={() => setIsVisible(false)}
            className="bg-primary-orange hover:bg-primary-dark hover:text-white text-primary-dark font-bold py-2 px-6 rounded transition-colors duration-300"
          >
            Continue to Site
          </button>
        </div>
      </div>
    </div>
  )
}

export default MaintenanceModal
