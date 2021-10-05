import React from 'react'
import { render } from '@testing-library/react'

import { RepoBadges, RepoBadgesProps } from '@/components/RepoBadges'
import { withRepoBadgesProps } from './utils'

const renderComponent = (props: RepoBadgesProps) => {
  return render(<RepoBadges {...props} />)
}

describe('<RepoBadges />', () => {
  it('renders correctly', () => {
    const props = withRepoBadgesProps()
    const component = renderComponent(props)
    expect(component).toBeTruthy()
    expect(
      component.container.querySelector('[data-stargazers-count]')
    ).toHaveTextContent(String(props.repo.stargazers_count))
    expect(
      component.container.querySelector('[data-forks-count]')
    ).toHaveTextContent(String(props.repo.forks_count))
    expect(component.container.firstChild).toMatchSnapshot()
  })
})
