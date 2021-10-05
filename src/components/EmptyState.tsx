import { classNames } from '@/utils'
import React from 'react'

export type EmptyStateProps = {
  dataTestID?: string
  className?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  children,
  dataTestID,
  className
}) => {
  return (
    <div
      data-testid={dataTestID}
      className={classNames('py-3 px-5 text-xl', className)}
    >
      {children}
    </div>
  )
}
