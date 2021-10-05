import React from 'react'
import { render } from '@testing-library/react'
import { UserInfo, UserInfoProps } from '@/components/UserInfo'
import { TestID } from '@/resources/TestID'
import { withUserInfoProps } from './utils'
import { BrowserRouter } from 'react-router-dom'

// constants
const TEXT = 'text'

const renderComponent = (props: UserInfoProps) => {
  return render(
    <BrowserRouter>
      <UserInfo {...props}>{TEXT}</UserInfo>
    </BrowserRouter>
  )
}

describe('<UserInfo />', () => {
  it('renders correctly', () => {
    const props = withUserInfoProps()
    const component = renderComponent(props)
    expect(component).toBeTruthy()
    expect(component.getByTestId(TestID.USER_INFO_AVATAR)).toHaveAttribute(
      'href',
      `/${props.user.login}`
    )
    expect(
      component.getByTestId(TestID.USER_INFO_AVATAR).querySelector('img')
    ).toHaveAttribute('src', props.user.avatar_url)

    expect(component.getByTestId(TestID.USER_INFO_NAME)).toHaveAttribute(
      'href',
      `/${props.user.login}`
    )

    if (props.user.name) {
      expect(component.getByTestId(TestID.USER_INFO_NAME)).toHaveTextContent(
        props.user.name
      )
    }

    expect(component.getByTestId(TestID.USER_INFO_HTML_URL)).toHaveTextContent(
      props.user.html_url
    )
    expect(component.getByTestId(TestID.USER_INFO)).toMatchSnapshot()
  })

  it('show username as alternative to empty name', () => {
    const props = withUserInfoProps()
    props.user.name = null
    const component = renderComponent(props)
    expect(component.getByTestId(TestID.USER_INFO_NAME)).toHaveTextContent(
      props.user.login
    )
  })
})
