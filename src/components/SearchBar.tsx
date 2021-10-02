import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { TestID } from '@/resources/TestID'
import { LabelText } from '@/resources/LabelText'
import { useDispatch, useSelector } from 'react-redux'
import { userState } from '@/selectors'
import { searchUser, setError } from '@/slices/user'
import { classNames } from '@/utils'

export type SearchBarProps = {
  searchRef?: React.MutableRefObject<HTMLInputElement>
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchRef }) => {
  // State
  const { user, searching, error } = useSelector(userState)
  const [userName, setUserName] = useState('')

  // Handlers
  const dispatch = useDispatch()

  const inputChangeHandler = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    if (error) dispatch(setError(''))
    setUserName(target.value)
  }

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (!userName) return

    dispatch(searchUser(userName))
  }

  // Hooks
  useEffect(() => {
    if (!user) return
    setUserName(user.login)
  }, [user])

  return (
    <form onSubmit={submitHandler}>
      <input
        data-testid={TestID.SEARCH_BAR}
        ref={searchRef}
        value={userName}
        disabled={searching}
        placeholder={LabelText.INPUT_GITHUB_USERNAME}
        className={classNames(
          'py-2.5 px-5 w-full text-lg rounded shadow focus:shadow-lg focus:outline-none border',
          error ? 'border-yellow-500' : 'border-transparent'
        )}
        onChange={inputChangeHandler}
      />
    </form>
  )
}
