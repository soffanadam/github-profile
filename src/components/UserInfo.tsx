import { User } from '@/types'
import React from 'react'
import { Link } from 'react-router-dom'

export type UserInfoProps = {
  user: User
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  if (!user) {
    return <></>
  }

  return (
    <div className="flex">
      <Link
        to={`/${user.login}`}
        className="overflow-hidden mr-5 w-14 h-14 bg-white rounded border"
      >
        <img src={user.avatar_url} className="object-cover w-full h-full" />
      </Link>
      <div className="flex-1">
        <h1 className="text-2xl">{user.name || user.login}</h1>
        <div className="text-gray-500">{user.html_url}</div>
      </div>
    </div>
  )
}
