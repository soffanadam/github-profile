import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { TestID } from '@/resources/TestID'
import { LabelText } from '@/resources/LabelText'
import { classNames } from '@/utils'

export type SearchBarProps = {
  prefill?: string
  searchRef: React.MutableRefObject<HTMLInputElement>
  error?: string
  disabled?: boolean
  onChange: () => void
  onSubmit: (userName: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({
  prefill,
  searchRef,
  error,
  disabled,
  onChange,
  onSubmit
}) => {
  // State
  const [userName, setUserName] = useState(prefill ? prefill : '')

  // Handlers
  const inputChangeHandler = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setUserName(target.value)
    onChange()
  }

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (!userName) return

    onSubmit(userName)
  }

  useEffect(() => {
    if (prefill) setUserName(prefill)
  }, [prefill])

  return (
    <form onSubmit={submitHandler}>
      <input
        data-testid={TestID.SEARCH_BAR}
        ref={searchRef}
        value={userName}
        disabled={disabled}
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
