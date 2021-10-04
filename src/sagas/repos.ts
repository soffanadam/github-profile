import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { getReposRequest } from '@/api'
import {
  getRepos,
  getMoreRepos,
  setPage,
  loading,
  loaded,
  setError,
  setRepos,
  pushRepos,
  noMore,
  more
} from '@/slices/repos'
import { Repo } from '@/types'
import { userState, reposState } from '@/selectors'
import { LabelText } from '@/resources/LabelText'

function* getReposHandler() {
  try {
    // Reset
    yield put({ type: setRepos.type, payload: [] })
    yield put({ type: more.type })

    yield put({ type: loading.type })
    const { user } = yield select(userState)
    const payload: Repo[] = yield call(getReposRequest, user.login)
    yield put({ type: setPage.type, payload: 1 })
    yield put({ type: setRepos.type, payload })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const payload: string = error.message
    yield put({ type: setError.type, payload })
  }

  yield put({ type: loaded.type })
}

function* getMoreReposHandler() {
  try {
    const { user } = yield select(userState)
    const { page, hasMore } = yield select(reposState)

    if (!hasMore) throw new Error(LabelText.END_OF_RESULTS)

    yield put({ type: loading.type })
    const nextPage = page + 1
    const payload: Repo[] = yield call(getReposRequest, user.login, {
      page: nextPage
    })
    yield put({ type: setPage.type, payload: nextPage })
    yield put({ type: pushRepos.type, payload })

    if (payload.length == 0) {
      yield put({ type: noMore.type })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const payload: string = error.message
    yield put({ type: setError.type, payload })
  }

  yield put({ type: loaded.type })
}

// If any of these functions are dispatched, invoke the appropriate saga
function* reposSaga() {
  yield all([
    takeLatest(getRepos.type, getReposHandler),
    takeLatest(getMoreRepos.type, getMoreReposHandler)
  ])
}

export default reposSaga
