import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Repo, RepoState } from '@/types'

export const initialState: RepoState = {
  repo: null,
  error: '',
  loading: false
}

const reposSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function, no-empty-pattern, @typescript-eslint/no-unused-vars
    getRepo: (state, {}: PayloadAction<string>) => {},

    loading: (state) => {
      state.loading = true
    },

    loaded: (state) => {
      state.loading = false
    },

    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
    },

    setRepo: (state, { payload }: PayloadAction<Repo>) => {
      state.repo = payload
    }
  }
})

export const { getRepo, loading, loaded, setError, setRepo } =
  reposSlice.actions

export default reposSlice.reducer
