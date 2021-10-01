import { User } from '@/types'
import { get } from './rest'

export const getUserRequest = (userName: string) =>
  get<User>(`users/${userName}`)
