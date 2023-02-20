import '../styles/globals.css'
import React from 'react'
import Head from 'next/head'
import { UserProvider } from '@auth0/nextjs-auth0/client'

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head>
        <title>Smart Wheelchair</title>
        <link rel='icon' href='/logo.png' />
      </Head>
      <Component {...pageProps} />
    </UserProvider>
  )
}
