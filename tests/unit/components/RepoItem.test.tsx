import React from 'react'
import { render } from '@testing-library/react'
import { RepoItem, RepoItemProps } from '@/components/RepoItem'
import { withRepoItemProps } from './utils'
import { BrowserRouter } from 'react-router-dom'

const renderComponent = (props: RepoItemProps) => {
  return render(
    <BrowserRouter>
      <RepoItem {...props} />
    </BrowserRouter>
  )
}

describe('<RepoItem />', () => {
  it('renders correctly', () => {
    const component = renderComponent(withRepoItemProps())
    expect(component).toBeTruthy()
    expect(component.container.firstChild).toMatchSnapshot()
  })
})
