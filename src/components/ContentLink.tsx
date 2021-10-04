import { Content, PlainObject } from '@/types'
import React from 'react'
import { Link } from 'react-router-dom'

type ContentLinkProps = {
  repoUrl: string
  content: Content
}

export const ContentLink: React.FC<ContentLinkProps & PlainObject> = ({
  repoUrl,
  content,
  children,
  ...rest
}) => {
  if (content.type === 'dir') {
    return (
      <Link to={`${repoUrl}/${content.path}`} {...rest}>
        {children}
      </Link>
    )
  }

  if (content.html_url) {
    return (
      <a href={content.html_url} target="_blank" rel="noreferrer" {...rest}>
        {children}
      </a>
    )
  }

  return <div {...rest}>{children}</div>
}
