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
    getUser: (state, { payload }: PayloadAction<string>) => {
      state.loading = true
      state.error = ''
    },

    getUserSuccess: (state, { payload }: PayloadAction<User>) => {
      state.user = payload
      state.loading = false
    },

    getUserError: (state, { payload }: PayloadAction<string>) => {
      state.user = null
      state.error = payload
      state.loading = false
    }
  }
})

export const { getUser, getUserSuccess, getUserError } = userSlice.actions

export default userSlice.reducer
