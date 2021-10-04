import { all } from 'redux-saga/effects'
import userSaga from './user'
import reposSaga from './repos'
import repoSaga from './repo'
import contentsSaga from './contents'

function* rootSaga() {
  yield all([userSaga(), reposSaga(), repoSaga(), contentsSaga()])
}

export default rootSaga
