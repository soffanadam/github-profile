import { Content, PlainObject, ReadMe, Repo, User } from '@/types'
import { get } from './rest'

export const getUserRequest = (userName: string) =>
  get<User>(`users/${userName}`)

export const getReposRequest = (userName: string, params: PlainObject = {}) =>
  get<Repo[]>(`users/${userName}/repos`, params)

export const getRepoRequest = (userName: string, repoName: string) =>
  get<Repo>(`repos/${userName}/${repoName}`)

export const getRepoContentsRequest = (
  userName: string,
  repoName: string,
  path?: string
) =>
  get<Content[]>(
    `repos/${userName}/${repoName}/contents${path ? '/' + path : ''}`
  )

export const getRepoContentsReadMeRequest = (
  userName: string,
  repoName: string,
  path?: string
) =>
  get<ReadMe[]>(`repos/${userName}/${repoName}/readme${path ? '/' + path : ''}`)
