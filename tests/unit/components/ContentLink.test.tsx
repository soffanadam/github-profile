import React from 'react'
import { render } from '@testing-library/react'
import { ContentLink, ContentLinkProps } from '@/components/ContentLink'
import { TestID } from '@/resources/TestID'
import { BrowserRouter } from 'react-router-dom'
import { withContentLinkProps } from './utils'
import { ContentType } from '@/types'

const TEXT = 'text'

const renderComponent = (props: ContentLinkProps) => {
  return render(
    <BrowserRouter>
      <ContentLink {...props}>{TEXT}</ContentLink>
    </BrowserRouter>
  )
}

describe('<ContentLink />', () => {
  it('renders correctly', () => {
    const props = withContentLinkProps(ContentType.DIR)
    const component = renderComponent(props)
    expect(component).toBeTruthy()

    const testElement = component.getByTestId(TestID.CONTENT_LINK)
    expect(testElement).toHaveTextContent(TEXT)
    expect(testElement).toMatchSnapshot()
  })

  it('linked to path if a directory', () => {
    const props = withContentLinkProps(ContentType.DIR)
    const { getByTestId } = renderComponent(props)
    expect(getByTestId(TestID.CONTENT_LINK)).toHaveAttribute(
      'href',
      `${props.repoUrl}/${props.content.path}`
    )
  })

  it('linked to external url if non directory and has html_url', () => {
    const props = withContentLinkProps(ContentType.FILE)
    const { getByTestId } = renderComponent(props)
    expect(getByTestId(TestID.CONTENT_LINK)).toHaveAttribute(
      'href',
      props.content.html_url
    )
  })

  it('has no link', () => {
    const props = withContentLinkProps(ContentType.FILE)
    delete props.content.html_url

    const { getByTestId } = renderComponent(props)
    expect(getByTestId(TestID.CONTENT_LINK)).not.toHaveAttribute('href')
  })
})
