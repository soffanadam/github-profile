import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'

import { App } from '@/containers/App'
import rootSaga from '@/sagas'
import rootReducer from '@/slices'
import history from '@/utils/history'

import 'tailwindcss/tailwind.css'

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
})

sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
