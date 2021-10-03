import { Repo } from '@/types'
import React from 'react'
import { FiStar } from 'react-icons/fi'
import { FiGitBranch } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Badge } from './Badge'

export type UserRouteProps = {
  repo: Repo
}

export const RepoItem: React.FC<UserRouteProps> = ({ repo }) => {
  return (
    <div className="py-3 px-5 rounded shadow hover:shadow-md transition transform hover:scale-105">
      <Link
        to={`/${repo.owner.login}/${repo.name}`}
        className="block text-2xl text-indigo-500"
      >
        {repo.name}
      </Link>
      {repo.description && <p>{repo.description}</p>}
      <div className="flex mt-5 space-x-3">
        <Badge>
          <FiStar className="mr-2" />
          {repo.stargazers_count}
        </Badge>
        <Badge>
          <FiGitBranch className="mr-2" />
          {repo.forks_count}
        </Badge>
      </div>
    </div>
  )
}
