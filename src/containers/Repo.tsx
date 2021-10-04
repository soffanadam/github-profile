import { RepoBadges } from '@/components/RepoBadges'
import { RepoInfo } from '@/components/RepoInfo'
import { LabelText } from '@/resources/LabelText'
import { repoState } from '@/selectors'
import { getRepo } from '@/slices/repo'
import { PlainObject } from '@/types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, useRouteMatch } from 'react-router'
import { Route } from 'react-router-dom'
import { Contents } from './Contents'
import { ReadMe } from './ReadMe'

export const Repo: React.FC = () => {
  // Router
  const history = useHistory()
  const { path } = useRouteMatch()
  const { repoName }: PlainObject = useParams()

  // State
  const { repo, loading, error } = useSelector(repoState)

  // Handler
  const dispatch = useDispatch()

  // Hooks
  useEffect(() => {
    dispatch(getRepo(repoName))
  }, [dispatch, repoName])

  /**
   * Any error redirect to /
   */
  useEffect(() => {
    if (error) history.push('/')
  }, [error, history])

  return (
    <div className="px-5">
      <div className="container py-5 max-w-2xl">
        {loading
          ? LabelText.LOADING + '...'
          : repo && (
              <>
                <RepoInfo repo={repo} />
                <RepoBadges repo={repo} />
              </>
            )}
        <Route path={[`${path}/:path*`]}>
          <Contents />
          <ReadMe />
        </Route>
      </div>
    </div>
  )
}
