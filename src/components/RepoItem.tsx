import { Repo } from '@/types'
import React from 'react'
import { RepoBadges } from './RepoBadges'
import { RepoInfo } from './RepoInfo'

export type RepoItemProps = {
  repo: Repo
}

export const RepoItem: React.FC<RepoItemProps> = ({ repo }) => {
  return (
    <div className="py-3 px-5 rounded shadow hover:shadow-md">
      <RepoInfo repo={repo} />
      <RepoBadges repo={repo} />
    </div>
  )
}
