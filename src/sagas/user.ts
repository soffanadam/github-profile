import { all, call, put, takeLatest } from 'redux-saga/effects'
import { getUserRequest } from '@/api'
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

import { PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/types'

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

// If any of these functions are dispatched, invoke the appropriate saga
function* userSaga() {
  yield all([
    takeLatest(getUser.type, getUserHandler),
    takeLatest(searchUser.type, searchUserHandler)
  ])
}

export default userSaga
