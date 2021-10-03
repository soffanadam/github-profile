import React, { useEffect, useRef } from 'react'
import { SearchBar } from '@/components/SearchBar'
import { useHistory, useLocation } from 'react-router'
import { searchUser, setError } from '@/slices/user'
import { useDispatch, useSelector } from 'react-redux'
import { userState } from '@/selectors'
import { toast } from 'react-toastify'

export const Header: React.FC = () => {
  // State
  const { user, searching, error } = useSelector(userState)

  // Router
  const history = useHistory()
  const location = useLocation()

  // Refs
  const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>

  // Handlers
  const dispatch = useDispatch()
  const focusSearchHandler = () => searchRef.current.focus()
  const submitHandler = (userName: string) => {
    dispatch(searchUser(userName))
  }

  // Hooks
  useEffect(focusSearchHandler, [])

  useEffect(() => {
    if (!error) return
    toast.warn(error)
    setTimeout(() => {
      focusSearchHandler()
    }, 100)
  }, [error])

  useEffect(() => {
    if (user && searching) history.push(`/${user.login}`)
  }, [history, searching, user])

  return (
    <header
      className="flex justify-center items-center p-5 bg-gray-400 transition-all"
      style={{
        minHeight: location.pathname === '/' ? '100vh' : '0'
      }}
    >
      <div className="container max-w-2xl">
        <SearchBar
          prefill={user?.login}
          searchRef={searchRef}
          disabled={searching}
          error={error}
          onChange={() => dispatch(setError(''))}
          onSubmit={submitHandler}
        />
      </div>
    </header>
  )
}
