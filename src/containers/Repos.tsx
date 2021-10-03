import { LabelText } from '@/resources/LabelText'
import { reposState } from '@/selectors'
import { getMoreRepos, getRepos } from '@/slices/repos'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RepoItem } from '../components/RepoItem'
import useInfiniteScroll from 'react-infinite-scroll-hook'

export const Repos: React.FC = () => {
  // State
  const { repos, hasMore, loading, error } = useSelector(reposState)

  // Handlers
  const dispatch = useDispatch()
  const loadMoreHandler = () => {
    dispatch(getMoreRepos())
  }

  // Hooks
  useEffect(() => {
    dispatch(getRepos())
  }, [dispatch])

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
      <h1 className="mb-10 text-3xl">{LabelText.REPOSITORIES}</h1>
      {listRepos.length ? (
        <div className="flex flex-col space-y-4">{listRepos}</div>
      ) : null}
      <div className="py-3 px-5 mt-4 rounded shadow">
        {error ? (
          error
        ) : loading || (hasMore && listRepos.length) ? (
          <div ref={sentryRef}>{LabelText.LOADING}...</div>
        ) : listRepos.length ? (
          LabelText.END_OF_RESULTS
        ) : (
          LabelText.EMPTY_REPOSITORIES
        )}
      </div>
    </div>
  )
}
