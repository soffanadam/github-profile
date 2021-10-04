import { Repo } from '@/types'
import React from 'react'
import { Link } from 'react-router-dom'

export type RepoInfoProps = {
  repo: Repo
}

export const RepoInfo: React.FC<RepoInfoProps> = ({ repo }) => {
  return (
    <Link to={`/${repo.owner.login}/${repo.name}`} className="group block">
      <span className="inline-flex pb-1 mb-2 text-2xl text-indigo-500 border-b border-transparent group-hover:border-indigo-300">
        {repo.name}
      </span>
      {repo.description && <p className="mb-5">{repo.description}</p>}
    </Link>
  )
}
