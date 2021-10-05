import { Repo } from '@/types'
import React from 'react'
import { FiStar, FiGitBranch } from 'react-icons/fi'
import { Badge } from './Badge'

export type RepoBadgesProps = {
  repo: Repo
}

export const RepoBadges: React.FC<RepoBadgesProps> = ({ repo }) => {
  return (
    <div className="flex mt-2 space-x-3">
      <Badge>
        <FiStar className="mr-2" />
        <span data-stargazers-count>{repo.stargazers_count}</span>
      </Badge>
      <Badge>
        <FiGitBranch className="mr-2" />
        <span data-forks-count>{repo.forks_count}</span>
      </Badge>
    </div>
  )
}
