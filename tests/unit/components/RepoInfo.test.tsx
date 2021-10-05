import React from 'react'
import { render } from '@testing-library/react'
import { RepoInfo, RepoInfoProps } from '@/components/RepoInfo'
import { TestID } from '@/resources/TestID'
import { withRepoInfoProps } from './utils'
import { BrowserRouter } from 'react-router-dom'

// constants
const TEXT = 'text'

const renderComponent = (props: RepoInfoProps) => {
  return render(
    <BrowserRouter>
      <RepoInfo {...props}>{TEXT}</RepoInfo>
    </BrowserRouter>
  )
}

describe('<RepoInfo />', () => {
  it('renders correctly', () => {
    const props = withRepoInfoProps()
    const component = renderComponent(withRepoInfoProps())
    expect(component).toBeTruthy()
    expect(component.getByTestId(TestID.REPO_INFO)).toHaveAttribute(
      'href',
      `/${props.repo.owner.login}/${props.repo.name}`
    )
    expect(component.getByTestId('repo-info-name')).toHaveTextContent(
      props.repo.name
    )
    expect(component.getByTestId('repo-info-description')).toHaveTextContent(
      String(props.repo.description)
    )
    expect(component.getByTestId(TestID.REPO_INFO)).toMatchSnapshot()
  })
})
