import '@/styles/globals.css'
import { AppProps } from 'next/app'
//import * as React from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/*localStorageに認証情報がある場合、データフェッチする機能*/}
      {/*未実装<CurrentUserFetch />*/}
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}
