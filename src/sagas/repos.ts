import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { getReposRequest } from '@/api'
import {
  getRepos,
  getReposSuccess,
  getMoreReposSuccess,
  getReposError,
  getMoreRepos
} from '@/slices/repos'
import { Repo } from '@/types'
import { reposState, userState } from '@/selectors'
import { LabelText } from '@/resources/LabelText'

function* getReposHandler() {
  try {
    const { user } = yield select(userState)
    const payload: Repo[] = yield call(getReposRequest, user.login)
    yield put(getReposSuccess(payload))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const payload: string = error.message
    yield put(getReposError(payload))
  }
}

function* getMoreReposHandler() {
  try {
    const { user } = yield select(userState)
    const { page, hasMore } = yield select(reposState)

    if (!hasMore) throw new Error(LabelText.END_OF_RESULTS)

    const nextPage = page + 1
    const payload: Repo[] = yield call(getReposRequest, user.login, {
      page: nextPage
    })
    yield put(getMoreReposSuccess(payload))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const payload: string = error.message
    yield put(getReposError(payload))
  }
}

// If any of these functions are dispatched, invoke the appropriate saga
function* reposSaga() {
  yield all([
    takeLatest(getRepos.type, getReposHandler),
    takeLatest(getMoreRepos.type, getMoreReposHandler)
  ])
}

export default reposSaga
