import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Repo, ReposState } from '@/types'

export const initialState: ReposState = {
  repos: [],
  page: 1,
  error: '',
  loading: false
}

const reposSlice = createSlice({
  name: 'repos',
  initialState,
  reducers: {
    // eslint-disable-next-line no-empty-pattern
    getRepos: (state) => {
      state.page = 1
      state.error = ''
      state.loading = true
    },

    getMoreRepos: (state) => {
      state.page += 1
      state.error = ''
      state.loading = true
    },

    getReposError: (state, { payload }: PayloadAction<string>) => {
      state.loading = false
      state.error = payload
    },

    getReposSuccess: (state, { payload }: PayloadAction<Repo[]>) => {
      state.repos = payload
      state.loading = false
    }
  }
})

export const { getRepos, getReposError, getReposSuccess } = reposSlice.actions

export default reposSlice.reducer
