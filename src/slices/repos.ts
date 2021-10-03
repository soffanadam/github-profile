import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Repo, ReposState } from '@/types'

export const initialState: ReposState = {
  repos: [],
  page: 0,
  hasMore: true,
  error: '',
  loading: false
}

const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    getRepos: () => {},

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    getMoreRepos: () => {},

    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload
    },

    loading: (state) => {
      state.loading = true
    },

    loaded: (state) => {
      state.loading = false
    },

    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
    },

    setRepos: (state, { payload }: PayloadAction<Repo[]>) => {
      state.repos = payload
    },

    pushRepos: (state, { payload }: PayloadAction<Repo[]>) => {
      state.repos = state.repos.concat(payload)
    },

    more: (state) => {
      state.hasMore = true
    },

    noMore: (state) => {
      state.hasMore = false
    }
  }
})

export const {
  getRepos,
  getMoreRepos,
  setPage,
  loading,
  loaded,
  setError,
  setRepos,
  pushRepos,
  more,
  noMore
} = reposSlice.actions

export default reposSlice.reducer
