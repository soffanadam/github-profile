import { call, put, takeLatest } from 'redux-saga/effects'
import { getUserRequest } from '@/api'
import { getUser, getUserSuccess, getUserError } from '@/slices/user'

import { PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/types'
import { getRepos } from '@/slices/repos'

function* getUserHandler({ payload: userName }: PayloadAction<string>) {
  try {
    const user: User = yield call(getUserRequest, userName)
    yield put({ type: getUserSuccess.type, payload: user })
    yield put({ type: getRepos.type })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message: string = error.message
    yield put({ type: getUserError.type, payload: message })
  }
}

// If any of these functions are dispatched, invoke the appropriate saga
function* userSaga() {
  yield takeLatest(getUser.type, getUserHandler)
}

export default userSaga
