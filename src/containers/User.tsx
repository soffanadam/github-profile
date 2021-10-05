import { Repos } from '@/containers/Repos'
import { UserInfo } from '@/components/UserInfo'
import { LabelText } from '@/resources/LabelText'
import { userState } from '@/selectors'
import { getUser } from '@/slices/user'
import { PlainObject } from '@/types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useParams, useRouteMatch } from 'react-router'
import { Repo } from './Repo'

export const User: React.FC = () => {
  // Router
  const { userName }: PlainObject = useParams()
  const { path } = useRouteMatch()

  // State
  const { user, loading } = useSelector(userState)

  // Handlers
  const dispatch = useDispatch()

  // Hooks

  /**
   * Load user data if unloaded, to handle these scenario:
   * - direct url visit
   * - refresh scenario
   */
  useEffect(() => {
    if (!user && !loading) dispatch(getUser(userName))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {loading ? (
        <div className="container p-5 max-w-2xl">{LabelText.LOADING}...</div>
      ) : user ? (
        <>
          <div className="px-5 bg-gray-100 shadow">
            <div className="container py-5 max-w-2xl">
              <UserInfo user={user} />
            </div>
          </div>
          <Switch>
            <Route exact path={path}>
              <Repos />
            </Route>
            <Route path={`${path}/:repoName`}>
              <Repo />
            </Route>
          </Switch>
        </>
      ) : null}
    </>
  )
}
