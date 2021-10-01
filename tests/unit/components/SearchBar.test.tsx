import React, { createRef } from 'react'
import { fireEvent, render } from '@testing-library/react'

import { SearchBar, SearchBarProps } from '@/components/SearchBar'
import { TestID } from '@/resources/TestID'

const renderComponent = () => {
  const enabledProps: SearchBarProps = {
    searchRef: createRef() as React.MutableRefObject<HTMLInputElement>,
    userName: ''
  }

  return render(<SearchBar {...enabledProps} />)
}

describe('<SearchBar />', () => {
  it('renders the component', () => {
    const component = renderComponent()
    expect(component).toBeTruthy()
  })

  it('searches for text', () => {
    const { getByTestId } = renderComponent()

    fireEvent.change(getByTestId(TestID.SEARCH_BAR), {
      target: { value: 'welcome' }
    })
  })
})
