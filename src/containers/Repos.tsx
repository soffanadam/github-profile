import { LabelText } from '@/resources/LabelText'
import { reposState, userState } from '@/selectors'
import { getMoreRepos } from '@/slices/repos'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RepoItem } from '../components/RepoItem'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { EmptyState } from '@/components/EmptyState'
import { TestID } from '@/resources/TestID'

export const Repos: React.FC = () => {
  // State
  const { user } = useSelector(userState)
  const { repos, hasMore, loading, error } = useSelector(reposState)

  // Handlers
  const dispatch = useDispatch()
  const loadMoreHandler = () => {
    dispatch(getMoreRepos())
  }

  // Hooks
  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage: hasMore,
    onLoadMore: loadMoreHandler,
    disabled: !!error,
    rootMargin: '0px 0px 400px 0px'
  })

  const listRepos = repos.map((repo) => <RepoItem repo={repo} key={repo.id} />)

  return (
    <div className="container py-10 max-w-2xl">
      <h1 className="mb-10 text-3xl">
        {user && <span className="mr-2">{user.public_repos}</span>}
        {LabelText.REPOSITORIES}
      </h1>
      {listRepos.length ? (
        <div
          data-testid={TestID.REPOS_LIST}
          className="flex flex-col space-y-4"
        >
          {listRepos}
        </div>
      ) : null}
      <EmptyState className="mt-4">
        {error ? (
          error
        ) : loading || (hasMore && listRepos.length) ? (
          <div data-testid={TestID.REPOS_LOADING} ref={sentryRef}>
            {LabelText.LOADING}...
          </div>
        ) : listRepos.length ? (
          LabelText.END_OF_RESULTS
        ) : (
          LabelText.EMPTY_REPOSITORIES
        )}
      </EmptyState>
    </div>
  )
}
