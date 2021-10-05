import React from 'react'
import { render } from '@testing-library/react'
import { ContentItem, ContentItemProps } from '@/components/ContentItem'
import { TestID } from '@/resources/TestID'
import { ContentType } from '@/types'
import { withContentItemProps } from './utils'

const renderComponent = (props: ContentItemProps) => {
  return render(<ContentItem {...props} />)
}

describe('<ContentItem />', () => {
  it('renders correctly', () => {
    const props = withContentItemProps(ContentType.DIR)
    const component = renderComponent(withContentItemProps(ContentType.DIR))
    expect(component).toBeTruthy()

    const testElement = component.getByTestId(TestID.CONTENT_ITEM)
    expect(testElement).toHaveTextContent(props.content.name)
    expect(testElement).toMatchSnapshot()
  })

  it('is a directory', () => {
    const { container } = renderComponent(withContentItemProps(ContentType.DIR))
    expect(
      container.querySelector(`[data-icon=${ContentType.DIR}]`)
    ).toBeVisible()
  })

  it('is a file', () => {
    const { container } = renderComponent(
      withContentItemProps(ContentType.FILE)
    )
    expect(
      container.querySelector(`[data-icon=${ContentType.FILE}]`)
    ).toBeVisible()
  })

  it('is a symlink', () => {
    const { container } = renderComponent(
      withContentItemProps(ContentType.SYMLINK)
    )
    expect(
      container.querySelector(`[data-icon=${ContentType.SYMLINK}]`)
    ).toBeVisible()
  })

  it('is a submodule', () => {
    const { container } = renderComponent(
      withContentItemProps(ContentType.SUBMODULE)
    )
    expect(
      container.querySelector(`[data-icon=${ContentType.SUBMODULE}]`)
    ).toBeVisible()
  })
})
