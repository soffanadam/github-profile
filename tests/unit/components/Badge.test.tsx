import React from 'react'
import { render } from '@testing-library/react'
import { Badge, BadgeProps } from '@/components/Badge'
import { TestID } from '@/resources/TestID'
import { withBadgeProps } from './utils'

// constants
const TEXT = 'text'

const renderComponent = (props: BadgeProps) => {
  return render(<Badge {...props}>{TEXT}</Badge>)
}

describe('<Badge />', () => {
  it('renders correctly', () => {
    const component = renderComponent(withBadgeProps())
    expect(component).toBeTruthy()
    expect(component.getByTestId(TestID.BADGE)).toHaveTextContent(TEXT)
    expect(component.getByTestId(TestID.BADGE)).toMatchSnapshot()
  })
})
