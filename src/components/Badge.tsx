import React from 'react'

export const Badge: React.FC = ({ children }) => {
  return (
    <span className="inline-flex items-center py-0.5 px-2.5 text-gray-500 bg-white rounded border">
      {children}
    </span>
  )
}
