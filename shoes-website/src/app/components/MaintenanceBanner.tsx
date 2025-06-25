'use client'

import { useState } from 'react'

const MaintenanceBanner = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-primary-orange text-primary-dark text-center py-3 px-4 relative">
      <div className="flex items-center justify-center gap-2">
        <span className="text-lg">🚧</span>
        <span className="font-semibold">
          Site Under Maintenance | Migrating from static to dynamic Next.js
        </span>
      </div>
      
      {/* Close button */}
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary-dark hover:text-white transition-colors duration-200 text-xl font-bold"
        aria-label="Close banner"
      >
        ×
      </button>
    </div>
  )
}

export default MaintenanceBanner
