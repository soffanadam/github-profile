import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GetRepoPayload, Repo, RepoState } from '@/types'

export const initialState: RepoState = {
  repo: null,
  error: '',
  loading: false
}

const reposSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getRepo: (state, payloadAction: PayloadAction<GetRepoPayload>) => {
      state.repo = null
      state.loading = true
    },

    getRepoSuccess: (state, { payload }: PayloadAction<Repo>) => {
      state.repo = payload
      state.loading = false
    },

    getRepoError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.loading = false
    }
  }
})

export const { getRepo, getRepoSuccess, getRepoError } = reposSlice.actions

export default reposSlice.reducer
