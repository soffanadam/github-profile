import React, { createRef } from 'react'
import { fireEvent, render } from '@testing-library/react'

import { SearchForm, SearchFormProps } from '@/components/SearchForm'
import { TestID } from '@/resources/TestID'

const renderComponent = () => {
  const enabledProps: SearchFormProps = {
    prefill: '',
    searchRef: createRef() as React.MutableRefObject<HTMLInputElement>,
    onSubmit: () => {
      // ..
    }
  }

  return render(<SearchForm {...enabledProps} />)
}

describe('<SearchBar />', () => {
  it('renders the component', () => {
    const component = renderComponent()
    expect(component).toBeTruthy()
  })

  it('searches for text', () => {
    const { getByTestId } = renderComponent()

    fireEvent.change(getByTestId(TestID.SEARCH_FORM_INPUT), {
      target: { value: 'welcome' }
    })

    fireEvent.submit(getByTestId(TestID.SEARCH_FORM))
  })
})
