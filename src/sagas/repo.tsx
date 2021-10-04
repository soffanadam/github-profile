import { call, put, select, takeLatest } from 'redux-saga/effects'
import { getRepoRequest } from '@/api'
import { getRepo, loading, loaded, setError, setRepo } from '@/slices/repo'
import { Repo } from '@/types'
import { userState } from '@/selectors'
import { PayloadAction } from '@reduxjs/toolkit'

function* getRepoHandler({ payload: repoName }: PayloadAction<string>) {
  try {
    // Reset
    yield put({ type: setRepo.type, payload: null })

    yield put({ type: loading.type })
    const { user } = yield select(userState)
    const payload: Repo[] = yield call(getRepoRequest, user.login, repoName)
    yield put({ type: setRepo.type, payload })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const payload: string = error.message
    yield put({ type: setError.type, payload })
  }

  yield put({ type: loaded.type })
}

// If any of these functions are dispatched, invoke the appropriate saga
function* repoSaga() {
  yield takeLatest(getRepo.type, getRepoHandler)
}

export default repoSaga
