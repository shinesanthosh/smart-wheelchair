import '../styles/globals.css'
import React, { useEffect } from 'react'
import Head from 'next/head'
import { UserProvider } from '@auth0/nextjs-auth0/client'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    window.OneSignal = window.OneSignal || []
    OneSignal.push(function () {
      OneSignal.init({
        appId: '69411556-f3fa-44a1-8bbd-7b4c6c5c6bfe',
        safari_web_id:
          'web.onesignal.auto.6b1e0125-c07a-4d4d-8123-db80df1063df',
        notifyButton: {
          enable: false,
        },
      })
    })
  }, [])

  return (
    <UserProvider>
      <Head>
        <title>Smart Wheelchair</title>
        <link rel='icon' href='/logo.png' />
        <script
          src='https://cdn.onesignal.com/sdks/OneSignalSDK.js'
          async=''></script>
      </Head>
      <Component {...pageProps} />
    </UserProvider>
  )
}
