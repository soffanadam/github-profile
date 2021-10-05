import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LabelText } from '@/resources/LabelText'
import { SearchBar } from './SearchBar'
import { Route } from 'react-router'
import { User } from './User'

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{LabelText.TITLE}</title>
      </Helmet>
      <SearchBar />
      <Route path="/:userName">
        <User />
      </Route>
      <ToastContainer autoClose={3000} position="bottom-center" />
    </HelmetProvider>
  )
}
