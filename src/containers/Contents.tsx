import { ContentItem } from '@/components/ContentItem'
import { ContentLink } from '@/components/ContentLink'
import { EmptyState } from '@/components/EmptyState'
import { LabelText } from '@/resources/LabelText'
import { contentsState } from '@/selectors'
import { getContents } from '@/slices/contents'
import { Content, GetContentsPayload } from '@/types'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'

export const Contents: React.FC = () => {
  // State
  const { userName, repoName, path }: GetContentsPayload = useParams()
  const { contents, loading, error } = useSelector(contentsState)

  // Hooks
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getContents({ userName, repoName, path }))
  }, [userName, repoName, path, dispatch])

  // Computed
  const parentPath = path ? path.substring(0, path.lastIndexOf('/')) : null
  const parentContent: Content | null =
    parentPath != null ? { name: '..', path: parentPath, type: 'dir' } : null
  const sortedContents = useMemo(() => {
    const compareType = (a: Content, b: Content) => {
      if (a.type < b.type) return -1
      if (a.type > b.type) return 1
      return 0
    }

    return [...contents].sort((a, b) => compareType(a, b))
  }, [contents])

  const parentContentLink = parentContent ? (
    <ContentLink repoUrl={`/${userName}/${repoName}`} content={parentContent}>
      <ContentItem content={parentContent} />
    </ContentLink>
  ) : null
  const listContents = sortedContents.map((content) => (
    <ContentLink
      repoUrl={`/${userName}/${repoName}`}
      content={content}
      key={content.name}
    >
      <ContentItem content={content} />
    </ContentLink>
  ))

  return (
    <div className="mt-10 rounded border">
      {listContents.length ? (
        <div className="flex flex-col">
          {parentContentLink}
          {listContents}
        </div>
      ) : error ? (
        <EmptyState>{error}</EmptyState>
      ) : loading ? (
        <EmptyState>{LabelText.LOADING}...</EmptyState>
      ) : (
        LabelText.EMPTY_CONTENTS
      )}
    </div>
  )
}
