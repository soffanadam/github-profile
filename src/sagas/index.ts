import { all } from 'redux-saga/effects'
import userSaga from './user'
import reposSaga from './repos'

function* rootSaga() {
  yield all([userSaga(), reposSaga()])
}

export default rootSaga
