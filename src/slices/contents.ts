import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Content, ContentsState, ReadMe } from '@/types'

export const initialState: ContentsState = {
  path: '',
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
    getContents: (state, { payload }: PayloadAction<string | undefined>) => {
      state.path = payload ? payload : ''
      state.contents = []
      state.readMe = null
      state.loading = true
    },

    getContentsSuccess: (state, { payload }: PayloadAction<Content[]>) => {
      state.contents = payload
      state.loading = false
    },

    getContentsError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload
      state.loading = false
    },

    setReadMe: (state, { payload }: PayloadAction<ReadMe>) => {
      state.readMe = payload
    }
  }
})

export const { getContents, getContentsSuccess, getContentsError, setReadMe } =
  contentsSlice.actions

export default contentsSlice.reducer
