import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserState, User } from '@/types'

export const initialState: UserState = {
  user: null,
  error: '',
  loading: false,
  searching: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // eslint-disable-next-line no-empty-pattern, @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    searchUser: (state, {}: PayloadAction<string>) => {},

    // eslint-disable-next-line no-empty-pattern, @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    getUser: (state, {}: PayloadAction<string>) => {},

    searching: (state) => {
      state.searching = true
    },

    searched: (state) => {
      state.searching = false
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

    setUser: (state, { payload }: PayloadAction<User | null>) => {
      state.user = payload
    }
  }
})

export const {
  searchUser,
  getUser,
  loading,
  loaded,
  setError,
  setUser,
  searching,
  searched
} = userSlice.actions

export default userSlice.reducer
