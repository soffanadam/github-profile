import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Content, ContentsState, GetContentsPayload, ReadMe } from '@/types'

export const initialState: ContentsState = {
  contents: [],
  readMe: null,
  error: '',
  loading: false
}

const contentsSlice = createSlice({
  name: 'contents',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    getContents: (state, { payload }: PayloadAction<GetContentsPayload>) => {},

    loading: (state) => {
      state.loading = true
    },

    loaded: (state) => {
      state.loading = false
    },

    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
    },

    setContents: (state, { payload }: PayloadAction<Content[]>) => {
      state.contents = payload
    },

    setReadMe: (state, { payload }: PayloadAction<ReadMe>) => {
      state.readMe = payload
    }
  }
})

export const {
  getContents,
  loading,
  loaded,
  setError,
  setContents,
  setReadMe
} = contentsSlice.actions

export default contentsSlice.reducer
