import { call, put, takeLatest } from 'redux-saga/effects'
import { getRepoRequest } from '@/api'
import { getRepo, getRepoSuccess, getRepoError } from '@/slices/repo'
import { GetRepoPayload, Repo } from '@/types'
import { PayloadAction } from '@reduxjs/toolkit'

function* getRepoHandler({
  payload: { userName, repoName }
}: PayloadAction<GetRepoPayload>) {
  try {
    const payload: Repo = yield call(getRepoRequest, userName, repoName)
    yield put(getRepoSuccess(payload))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const payload: string = error.message
    yield put(getRepoError(payload))
  }
}

// If any of these functions are dispatched, invoke the appropriate saga
function* repoSaga() {
  yield takeLatest(getRepo.type, getRepoHandler)
}

export default repoSaga
