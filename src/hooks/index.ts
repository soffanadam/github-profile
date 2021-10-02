import { userState } from '@/selectors'
import { User } from '@/types'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

export const useSearchBar = (onSearchFound: (user: User) => void) => {
  // State
  const { user, error, searching } = useSelector(userState)

  // Refs
  const searchRef = useRef() as React.MutableRefObject<HTMLInputElement>

  // Handler
  const focusSearchHandler = () => searchRef.current.focus()

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
    if (user && searching) onSearchFound(user)
  }, [onSearchFound, searching, user])

  return searchRef
}
