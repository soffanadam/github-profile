import { LabelText } from '@/resources/LabelText'
import { userState } from '@/selectors'
import React from 'react'
import { useSelector } from 'react-redux'

export const UserInfo: React.FC = () => {
  // State
  const { user } = useSelector(userState)

  if (!user) {
    return <></>
  }

  return (
    <div className="flex">
      <div className="overflow-hidden mr-5 w-14 h-14 bg-white rounded border">
        <img src={user.avatar_url} className="object-cover w-full h-full" />
      </div>
      <div className="flex-1">
        <div className="text-gray-500">{LabelText.GITHUB_USER}</div>
        <h1 className="text-2xl">{user.name || user.login}</h1>
      </div>
    </div>
  )
}
