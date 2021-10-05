import { Repo } from '@/types'
import React from 'react'
import { Link } from 'react-router-dom'

export type RepoInfoProps = {
  dataTestID?: string
  repo: Repo
}

export const RepoInfo: React.FC<RepoInfoProps> = ({ dataTestID, repo }) => {
  return (
    <Link
      data-testid={dataTestID}
      to={`/${repo.owner.login}/${repo.name}`}
      className="group block"
    >
      <span
        data-testid="repo-info-name"
        className="inline-flex pb-1 mb-2 text-2xl text-indigo-500 border-b border-transparent group-hover:border-indigo-300"
      >
        {repo.name}
      </span>
      {repo.description && (
        <p data-testid="repo-info-description" className="mb-5">
          {repo.description}
        </p>
      )}
    </Link>
  )
}
