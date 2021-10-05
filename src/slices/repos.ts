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
    getRepos: (state) => {
      state.repos = []
      state.hasMore = true
      state.loading = true
    },

    getReposSuccess: (state, { payload }: PayloadAction<Repo[]>) => {
      state.page = 1
      state.repos = payload
      state.loading = false
    },

    getReposError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.loading = false
    },

    getMoreRepos: (state) => {
      state.loading = true
    },

    getMoreReposSuccess: (state, { payload }: PayloadAction<Repo[]>) => {
      state.page++
      state.repos = state.repos.concat(payload)
      state.hasMore = payload.length != 0
      state.loading = false
    }
  }
})

export const {
  getRepos,
  getReposSuccess,
  getReposError,
  getMoreRepos,
  getMoreReposSuccess
} = reposSlice.actions

export default reposSlice.reducer
