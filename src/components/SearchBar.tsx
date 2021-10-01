import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { TestID } from '@/resources/TestID'
import { LabelText } from '@/resources/LabelText'
import { useDispatch, useSelector } from 'react-redux'
import { userState } from '@/selectors'
import { getUser, resetUserError } from '@/slices/user'
import { toast } from 'react-toastify'
import { classNames } from '@/utils'
import { User } from '@/types'

export type SearchBarProps = {
  searchRef: React.MutableRefObject<HTMLInputElement>
  onSelectedUser(user: User): void
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchRef,
  onSelectedUser
}) => {
  // State
  const { user, loading, error } = useSelector(userState)
  const [userName, setUserName] = useState('')

  // Handlers
  const dispatch = useDispatch()

  const inputChangeHandler = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    if (error) dispatch(resetUserError())
    setUserName(target.value)
  }

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (!userName) return

    dispatch(getUser(userName))
  }

  // Hooks
  useEffect(() => {
    if (!user) return
    onSelectedUser(user)
    setUserName(user.login)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  useEffect(() => {
    if (!error) return
    toast.error(error)
    searchRef.current.focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  return (
    <form onSubmit={submitHandler}>
      <input
        data-testid={TestID.SEARCH_BAR}
        ref={searchRef}
        value={userName}
        disabled={loading}
        placeholder={LabelText.INPUT_GITHUB_USERNAME}
        className={classNames(
          'py-2.5 px-5 w-full text-lg rounded shadow focus:shadow-md focus:outline-none border',
          error ? 'border-red-500' : 'border-transparent'
        )}
        onChange={inputChangeHandler}
      />
    </form>
  )
}
