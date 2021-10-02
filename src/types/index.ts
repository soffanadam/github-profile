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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [anyProp: string]: any
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
  error: string
  loading: boolean
}

export interface RootState {
  userState: UserState
  reposState: ReposState
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
