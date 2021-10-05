import { TestID } from '@/resources/TestID'
import { User } from '@/types'
import React from 'react'
import { Link } from 'react-router-dom'

export type UserInfoProps = {
  dataTestID?: string
  user: User
}

export const UserInfo: React.FC<UserInfoProps> = ({ dataTestID, user }) => {
  if (!user) {
    return <></>
  }

  return (
    <div data-testid={dataTestID} className="flex">
      <Link
        data-testid={TestID.USER_INFO_AVATAR}
        to={`/${user.login}`}
        className="overflow-hidden mr-5 w-14 h-14 bg-white rounded border"
      >
        <img src={user.avatar_url} className="object-cover w-full h-full" />
      </Link>
      <div className="flex-1">
        <Link
          data-testid={TestID.USER_INFO_NAME}
          to={`/${user.login}`}
          className="text-2xl"
        >
          {user.name || user.login}
        </Link>
        <div data-testid={TestID.USER_INFO_HTML_URL} className="text-gray-500">
          {user.html_url}
        </div>
      </div>
    </div>
  )
}
