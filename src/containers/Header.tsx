import React from 'react'
import { SearchBar } from '@/components/SearchBar'
import { useHistory, useLocation } from 'react-router'
import { useSearchBar } from '@/hooks'

export const Header: React.FC = () => {
  // Router
  const history = useHistory()
  const location = useLocation()

  // Handlers
  const searchRef = useSearchBar((user) => {
    // on search found
    history.push(`/${user.login}`)
  })

  return (
    <header
      className="flex justify-center items-center p-5 bg-gray-400 transition-all"
      style={{
        minHeight: location.pathname === '/' ? '100vh' : '0'
      }}
    >
      <div className="container max-w-2xl">
        <SearchBar searchRef={searchRef} />
      </div>
    </header>
  )
}
