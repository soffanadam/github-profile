import React from 'react'
import { Route } from 'react-router'

export type UserRouteProps = {
  title: React.FC
  [key: string]: unknown
}

export const UserRoute: React.FC<UserRouteProps> = ({
  title: Title,
  children,
  ...rest
}) => {
  return (
    <Route {...rest}>
      <div className="bg-gray-100 shadow">
        <div className="container py-5 max-w-2xl">
          <Title />
        </div>
      </div>
      <div className="container py-10 max-w-2xl">{children}</div>
    </Route>
  )
}
