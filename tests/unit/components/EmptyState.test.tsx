import React from 'react'
import { render } from '@testing-library/react'
import { EmptyState, EmptyStateProps } from '@/components/EmptyState'
import { TestID } from '@/resources/TestID'
import { withEmptyStateProps } from './utils'

// constants
const TEXT = 'text'

const renderComponent = (props: EmptyStateProps) => {
  return render(<EmptyState {...props}>{TEXT}</EmptyState>)
}

describe('<EmptyState />', () => {
  it('renders correctly', () => {
    const props = withEmptyStateProps()
    const component = renderComponent(props)
    expect(component).toBeTruthy()

    const testElement = component.getByTestId(TestID.EMPTY_STATE)
    expect(testElement).toHaveTextContent(TEXT)
    expect(testElement).toHaveClass(props.className)
    expect(testElement).toMatchSnapshot()
  })
})
