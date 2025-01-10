'use client'

import { useState, useEffect } from 'react'

export default function AspectToggle() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--max-width', isMobile ? '480px' : '100%')
  }, [isMobile])

  return (
    <button
      onClick={() => setIsMobile(!isMobile)}
      className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg"
    >
      {isMobile ? 'Desktop View' : 'Mobile View'}
    </button>
  )
}

