import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { UserState, User } from '@/types'

export const initialState: UserState = {
  user: null,
  error: '',
  loading: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // eslint-disable-next-line no-empty-pattern
    getUser: (state, {}: PayloadAction<string>) => {
      state.loading = true
      state.error = ''
    },

    getUserError: (state, { payload }: PayloadAction<string>) => {
      state.loading = false
      state.error = payload
    },

    getUserSuccess: (state, { payload }: PayloadAction<User>) => {
      state.user = payload
      state.loading = false
    },

    resetUserError: (state) => {
      state.error = ''
    }
  }
})

export const { getUser, getUserError, getUserSuccess, resetUserError } =
  userSlice.actions

export default userSlice.reducer
