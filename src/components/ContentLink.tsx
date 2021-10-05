import { Content, ContentType, PlainObject } from '@/types'
import React from 'react'
import { Link } from 'react-router-dom'

export type ContentLinkProps = {
  dataTestID?: string
  repoUrl: string
  content: Content
}

export const ContentLink: React.FC<ContentLinkProps & PlainObject> = ({
  dataTestID,
  repoUrl,
  content,
  children,
  ...rest
}) => {
  if (content.type === ContentType.DIR) {
    return (
      <Link
        data-testid={dataTestID}
        to={`${repoUrl}/${content.path}`}
        {...rest}
      >
        {children}
      </Link>
    )
  }

  if (content.html_url) {
    return (
      <a
        data-testid={dataTestID}
        href={content.html_url}
        target="_blank"
        rel="noreferrer"
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <div data-testid={dataTestID} {...rest}>
      {children}
    </div>
  )
}
