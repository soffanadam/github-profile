import React from 'react'

export type BadgeProps = {
  dataTestID?: string
}

export const Badge: React.FC<BadgeProps> = ({ dataTestID, children }) => {
  return (
    <span
      data-testid={dataTestID}
      className="inline-flex items-center py-0.5 px-2.5 text-gray-500 bg-white rounded border"
    >
      {children}
    </span>
  )
}
