import { RepoBadges } from '@/components/RepoBadges'
import { RepoInfo } from '@/components/RepoInfo'
import { useError } from '@/hooks'
import { LabelText } from '@/resources/LabelText'
import { repoState } from '@/selectors'
import { getRepo } from '@/slices/repo'
import { PlainObject } from '@/types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useRouteMatch } from 'react-router'
import { Route } from 'react-router-dom'
import { Contents } from './Contents'
import { ReadMe } from './ReadMe'

export const Repo: React.FC = () => {
  // Router
  const { path } = useRouteMatch()
  const { userName, repoName }: PlainObject = useParams()

  // State
  const { repo, loading, error } = useSelector(repoState)

  // Handler
  const dispatch = useDispatch()

  // Hooks
  useEffect(() => {
    dispatch(getRepo({ userName, repoName }))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useError(error)

  return (
    <div className="px-5">
      <div className="container py-5 max-w-2xl">
        {loading ? (
          LabelText.LOADING + '...'
        ) : repo ? (
          <>
            <RepoInfo repo={repo} />
            <RepoBadges repo={repo} />
            <Route path={[`${path}/:path*`]}>
              <Contents />
              <ReadMe />
            </Route>
          </>
        ) : null}
      </div>
    </div>
  )
}
