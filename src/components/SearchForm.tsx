import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { TestID } from '@/resources/TestID'
import { LabelText } from '@/resources/LabelText'
import { classNames } from '@/utils'

export type SearchFormProps = {
  prefill?: string
  searchRef: React.MutableRefObject<HTMLInputElement>
  error?: string
  disabled?: boolean
  onSubmit: (userName: string) => void
}

export const SearchForm: React.FC<SearchFormProps> = ({
  prefill,
  searchRef,
  error,
  disabled,
  onSubmit
}) => {
  // State
  const [userName, setUserName] = useState(prefill ? prefill : '')
  const [inputError, setInputError] = useState(error ? error : '')

  // Handlers
  const inputChangeHandler = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setUserName(target.value)
    setInputError('')
  }

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (!userName) return

    onSubmit(userName)
  }

  useEffect(() => {
    if (prefill) setUserName(prefill)
  }, [prefill])

  useEffect(() => {
    if (error) setInputError(error)
  }, [error])

  return (
    <form onSubmit={submitHandler}>
      <input
        data-testid={TestID.SEARCH_FORM_INPUT}
        ref={searchRef}
        value={userName}
        disabled={disabled}
        placeholder={LabelText.INPUT_GITHUB_USERNAME}
        className={classNames(
          'py-2.5 px-5 w-full text-lg rounded shadow focus:shadow-lg focus:outline-none border',
          inputError ? 'border-yellow-500' : 'border-transparent'
        )}
        onChange={inputChangeHandler}
      />
    </form>
  )
}
