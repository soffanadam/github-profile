import { call, put, takeLatest, select } from 'redux-saga/effects'
import { getRepoContentsRequest, getRepoContentsReadMeRequest } from '@/api'
import {
  getContents,
  getContentsSuccess,
  getContentsError,
  setReadMe
} from '@/slices/contents'
import { Content, ContentsState, ReadMe } from '@/types'
import { contentsState, repoState, userState } from '@/selectors'

function* getContentsHandler() {
  try {
    const { user } = yield select(userState)
    const { repo } = yield select(repoState)
    const { path } = yield select(contentsState)
    const contents: Content[] = yield call(
      getRepoContentsRequest,
      user.login,
      repo.name,
      path
    )
    yield put({ type: getContentsSuccess.type, payload: contents })
    yield findReadMe()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const payload: string = error.message
    yield put({ type: getContentsError.type, payload })
  }
}

function* findReadMe() {
  try {
    const { contents, path }: ContentsState = yield select(contentsState)

    if (contents.findIndex((content) => content.name === 'README.md') < 0)
      return

    const { user } = yield select(userState)
    const { repo } = yield select(repoState)

    yield put({ type: setReadMe.type, payload: null })
    const readMe: ReadMe = yield call(
      getRepoContentsReadMeRequest,
      user.login,
      repo.name,
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
  yield takeLatest(getContents.type, getContentsHandler)
}

export default contentsSaga
