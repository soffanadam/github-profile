import { LabelText } from '@/resources/LabelText'
import { userState } from '@/selectors'
import { getUser } from '@/slices/user'
import { PlainObject } from '@/types'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch
} from 'react-router'

export const User: React.FC = () => {
  // Router
  const history = useHistory()
  const { userName }: PlainObject = useParams()
  const { path } = useRouteMatch()

  // State
  const { user, searching, loading, error } = useSelector(userState)

  // Handler
  const dispatch = useDispatch()

  // Hooks

  /**
   * Load user data if unloaded, to handle these scenario:
   * - direct url visit
   * - refresh action scenario
   * - research another user
   */
  useEffect(() => {
    if (!user && !searching && !loading) dispatch(getUser(userName))
  }, [dispatch, searching, loading, user, userName])

  /**
   * Error like not found / etc, redirect to /
   */
  useEffect(() => {
    if (error) history.push('/')
  }, [error, history])

  return (
    <>
      {loading ? (
        <div className="container p-5 max-w-2xl">{LabelText.LOADING}...</div>
      ) : (
        user && (
          <>
            <div className="bg-gray-200">
              <div className="container p-5 max-w-2xl">
                <h1 className="text-2xl">{user.name}</h1>
                <div className="text-gray-500">
                  {LabelText.GITHUB_REPOSITORIES}
                </div>
              </div>
            </div>
            <div className="container p-5 max-w-2xl">
              <Switch>
                <Route exact path={path}>
                  repositories
                </Route>
                <Route path={`${path}/laravel`}>laravel</Route>
              </Switch>
            </div>
          </>
        )
      )}
    </>
  )
}
