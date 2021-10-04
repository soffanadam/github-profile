import { all, fork, call, put, takeLatest } from 'redux-saga/effects'
import { getRepoContentsRequest, getRepoContentsReadMeRequest } from '@/api'
import {
  getContents,
  loading,
  loaded,
  setError,
  setContents,
  setReadMe
} from '@/slices/contents'
import { PayloadAction } from '@reduxjs/toolkit'
import { Content, GetContentsPayload, ReadMe } from '@/types'

function* getContentsAndReadMeHandler({
  payload
}: PayloadAction<GetContentsPayload>) {
  yield all([getContentsHandler(payload), getReadMeHandler(payload)])
}

function* getContentsHandler({ userName, repoName, path }: GetContentsPayload) {
  try {
    // Reset
    yield put({ type: setContents.type, payload: [] })

    yield put({ type: loading.type })
    const contents: Content[] = yield call(
      getRepoContentsRequest,
      userName,
      repoName,
      path
    )
    yield put({ type: setContents.type, payload: contents })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const payload: string = error.message
    yield put({ type: setError.type, payload })
  }

  yield put({ type: loaded.type })
}

function* getReadMeHandler({ userName, repoName, path }: GetContentsPayload) {
  yield put({ type: setReadMe.type, payload: null })
  try {
    const readMe: ReadMe = yield call(
      getRepoContentsReadMeRequest,
      userName,
      repoName,
      path
    )
    yield put({ type: setReadMe.type, payload: readMe })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // sstt
  }
}

// If any of these functions are dispatched, invoke the appropriate saga
function* contentsSaga() {
  yield takeLatest(getContents.type, getContentsAndReadMeHandler)
}

export default contentsSaga
