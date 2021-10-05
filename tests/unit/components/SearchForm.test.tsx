import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import {
  SearchForm,
  SearchFormProps,
  ERROR_CLASS
} from '@/components/SearchForm'
import { TestID } from '@/resources/TestID'
import { withSearchFormProps } from './utils'

const renderComponent = (props: SearchFormProps) => {
  return render(<SearchForm {...props} />)
}

describe('<SearchForm />', () => {
  it('renders the component', () => {
    const component = renderComponent(withSearchFormProps())
    expect(component).toBeTruthy()
    expect(component).toMatchSnapshot()
  })

  it('searches for text and submit', () => {
    const props = withSearchFormProps()
    const { getByTestId } = renderComponent(props)

    const input = getByTestId(TestID.SEARCH_FORM_INPUT)
    expect(input).toHaveValue('')
    fireEvent.change(input, {
      target: { value: 'welcome' }
    })
    expect(input).toHaveValue('welcome')

    fireEvent.submit(getByTestId(TestID.SEARCH_FORM))
    expect(props.onSubmit).toHaveBeenCalledTimes(1)
  })

  it('update update prefill', () => {
    const props = withSearchFormProps()
    const { getByTestId, rerender } = renderComponent(props)

    const input = getByTestId(TestID.SEARCH_FORM_INPUT)
    expect(input).toHaveValue('')

    props.prefill = 'aaaa'
    rerender(<SearchForm {...props} />)
    expect(input).toHaveValue(props.prefill)
  })

  it('indicate error', () => {
    const props = withSearchFormProps()
    props.error = 'error'
    const { getByTestId } = renderComponent(props)
    expect(getByTestId(TestID.SEARCH_FORM_INPUT)).toHaveClass(ERROR_CLASS)
  })

  it('indicate loading', () => {
    const props = withSearchFormProps()
    props.disabled = true
    const { getByTestId } = renderComponent(props)
    expect(getByTestId(TestID.SEARCH_FORM_INPUT)).toBeDisabled()
  })

  it('cannot submit empty value', () => {
    const props = withSearchFormProps()
    renderComponent(props)
    expect(props.onSubmit).toHaveBeenCalledTimes(0)
  })
})
