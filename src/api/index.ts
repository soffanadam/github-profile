import { PlainObject, User } from '@/types'
import { get } from './rest'

export const getUserRequest = (userName: string) =>
  get<User>(`users/${userName}`)

export const getReposRequest = (userName: string, params: PlainObject = {}) =>
  get<User>(`users/${userName}/repos`, params)
