
import '@/styles/globals.css'
import { AppProps } from 'next/app'
//import * as React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'



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
