
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
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
