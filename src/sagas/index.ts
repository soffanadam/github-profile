import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { getReposRequest, getUserRequest } from '@/api'
import {
  searchUser,
  searched,
  getUser,
  loading,
  loaded,
  setError,
  setUser,
  searching
} from '@/slices/user'
import { Repo, User } from '@/types'
import { PayloadAction } from '@reduxjs/toolkit'
import { getRepos, getReposError, getReposSuccess } from '@/slices/repos'
import { userState } from '@/selectors'

// Get user from API
function* searchUserHandler({ payload: userName }: PayloadAction<string>) {
  try {
    yield put({ type: setUser.type, payload: null })
    yield put({ type: searching.type })
    const user: User = yield call(getUserRequest, userName)
    yield put({ type: setUser.type, payload: user })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message: string = error.message
    yield put({ type: setError.type, payload: message })
  }

  yield put({ type: searched.type })
}

function* getUserHandler({ payload: userName }: PayloadAction<string>) {
  try {
    yield put({ type: setUser.type, payload: null })
    yield put({ type: loading.type })
    const user: User = yield call(getUserRequest, userName)
    yield put({ type: setUser.type, payload: user })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message: string = error.message
    yield put({ type: setError.type, payload: message })
  }

  yield put({ type: loaded.type })
}

// Get repos from API
function* getReposHandler() {
  try {
    const { user }: User = yield select(userState)
    const payload: Repo[] = yield call(getReposRequest, user.login)
    yield put({ type: getReposSuccess.type, payload })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const payload: string = error.message
    yield put({ type: getReposError.type, payload })
  }
}

// If any of these functions are dispatched, invoke the appropriate saga
function* rootSaga() {
  yield all([
    takeLatest(getUser.type, getUserHandler),
    takeLatest(searchUser.type, searchUserHandler),
    takeLatest(getRepos.type, getReposHandler)
  ])
}

export default rootSaga
