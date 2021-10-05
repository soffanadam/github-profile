import React, { useCallback, useEffect, useRef } from 'react'
import { SearchForm } from '@/components/SearchForm'
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router'
import { getUser } from '@/slices/user'
import { useDispatch, useSelector } from 'react-redux'
import { userState } from '@/selectors'
import { useError, useMounted } from '@/hooks'
import { PlainObject } from '@/types'

export const SearchBar: React.FC = () => {
  // State
  const { user, loading, error } = useSelector(userState)

  // Router
  const history = useHistory()
  const location = useLocation()

  // Refs
  const mounted = useMounted()
  const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>

  // Handlers
  const dispatch = useDispatch()
  const focusSearchHandler = useCallback(() => {
    searchRef.current.focus()
  }, [])
  const submitHandler = (input: string) => {
    dispatch(getUser(input))
  }

  // Hooks
  useEffect(() => {
    focusSearchHandler()
  }, [focusSearchHandler])

  useError(error, focusSearchHandler)

  useEffect(() => {
    if (mounted) return
    if (user) {
      const [userName] = location.pathname.split('/').filter((p) => p)
      if (userName !== user.login) history.push(`/${user.login}`)
    } else if (!loading) {
      history.push('/')
    }
  }, [history, loading, location.pathname, mounted, user])

  return (
    <header
      className="flex sticky top-0 z-10 justify-center items-center p-5 bg-gray-500 bg-opacity-75 transition-all"
      style={{
        minHeight: location.pathname === '/' ? '100vh' : '0'
      }}
    >
      <div className="container max-w-2xl">
        <SearchForm
          prefill={user?.login}
          searchRef={searchRef}
          disabled={loading}
          error={error}
          onSubmit={submitHandler}
        />
      </div>
    </header>
  )
}
