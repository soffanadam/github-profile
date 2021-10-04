import { PlainObject } from '@/types'
import { classNames } from '@/utils'
import React from 'react'

export const EmptyState: React.FC<PlainObject> = ({ children, className }) => {
  return (
    <div className={classNames('py-3 px-5 text-xl', className)}>{children}</div>
  )
}
