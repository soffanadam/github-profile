import { combineReducers, Reducer } from 'redux'
import userReducer from '@/slices/user'
import reposReducer from '@/slices/repos'
import repoReducer from '@/slices/repo'
import contentsReducer from '@/slices/contents'
import { RootState } from '@/types'

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  userState: userReducer,
  reposState: reposReducer,
  repoState: repoReducer,
  contentsState: contentsReducer
})

export default rootReducer
