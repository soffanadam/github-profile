// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface PlainObject<T = any> {
  [key: string]: T
}

//==============================================================================
// Model
//==============================================================================

export interface User {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [anyProp: string]: any
}

export interface Repo {
  id: number
  name: string
  description?: string
  stargazers_count: number
  forks_count: number
  owner: User
}

export interface Content {
  name: string
  path: string
  type: string
  html_url?: string
}

export interface ReadMe {
  name: string
  content: string
  encoding: string
}

//==============================================================================
// State
//==============================================================================

export interface UserState {
  user: User | null
  error: string
  loading: boolean
  searching: boolean
}

export interface ReposState {
  repos: Repo[]
  page: number
  hasMore: boolean
  error: string
  loading: boolean
}

export interface RepoState {
  repo: Repo | null
  error: string
  loading: boolean
}

export interface ContentsState {
  path: string
  contents: Content[]
  readMe: ReadMe | null
  error: string
  loading: boolean
}

export interface RootState {
  userState: UserState
  reposState: ReposState
  repoState: RepoState
  contentsState: ContentsState
}

//==============================================================================
// Actions Payload
//==============================================================================

export interface GetRepoPayload {
  userName: string
  repoName: string
}

//==============================================================================
// API
//==============================================================================

export class ApiError extends Error {
  response: ApiErrorResponse | null

  constructor(message: string, response: ApiErrorResponse | null = null) {
    super(message)
    this.response = response
  }
}

export interface ApiErrorResponse {
  status?: number
  body?: unknown
}
