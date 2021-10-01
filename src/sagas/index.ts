import { all, call, put, takeLatest } from 'redux-saga/effects'
import { getUserRequest } from '@/api'
import { getUser, getUserError, getUserSuccess } from '@/slices/user'
import { User } from '@/types'
import { PayloadAction } from '@reduxjs/toolkit'

// Get user from API
function* getUserHandler({ payload: userName }: PayloadAction<string>) {
  try {
    const payload: User = yield call(getUserRequest, userName)
    yield put({ type: getUserSuccess.type, payload })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const payload: string = error.message
    yield put({ type: getUserError.type, payload })
  }
}

// If any of these functions are dispatched, invoke the appropriate saga
function* rootSaga() {
  yield all([takeLatest(getUser.type, getUserHandler)])
}

export default rootSaga
