import { combineReducers, Reducer } from 'redux'

import userReducer from '@/slices/user'
import reposReducer from '@/slices/repos'
import { RootState } from '@/types'

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  userState: userReducer,
  reposState: reposReducer
})

export default rootReducer
