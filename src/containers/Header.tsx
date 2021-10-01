import React, { useEffect, useRef } from 'react'
import { SearchBar } from '@/components/SearchBar'
import { User } from '@/types'
import { useHistory, useLocation } from 'react-router'
import { classNames } from '@/utils'

export const Header: React.FC = () => {
  const history = useHistory()
  const location = useLocation()

  // Refs
  const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>

  // Handler
  const focusSearchHandler = () => searchRef.current.focus()
  const userSelectedHandler = (user: User) => history.push(user.login)

  // Hooks
  useEffect(focusSearchHandler)

  return (
    <header
      className={classNames(
        'flex justify-center items-center bg-gray-100 transition-all p-5'
        // location.pathname === '/' ? 'h-full' : 'h-80'
      )}
      style={{
        minHeight: location.pathname === '/' ? '100vh' : '0'
      }}
    >
      <div className="container max-w-2xl">
        <SearchBar searchRef={searchRef} onSelectedUser={userSelectedHandler} />
      </div>
    </header>
  )
}
