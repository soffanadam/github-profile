import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LabelText } from '@/resources/LabelText'
import { Header } from './Header'
import { Route, Switch } from 'react-router'
import { User } from './User'

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{LabelText.TITLE}</title>
      </Helmet>
      <Header />
      <Switch>
        <Route path="/:userName">
          <User />
        </Route>
      </Switch>
      <ToastContainer autoClose={3000} position="bottom-center" />
    </HelmetProvider>
  )
}
