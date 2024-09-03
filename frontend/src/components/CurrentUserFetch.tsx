import axios, { AxiosResponse, AxiosError } from 'axios'
import { useEffect } from 'react'
import { useUserState } from '@/hooks/useGlobalState'

const CurrentUserFetch = () => {
  const [user, setUser] = useUserState()

  useEffect(() => {
    if (user.isFetched) {
      return
    }

    //localStorageに認証情報が保存されている場合、データフェッチを行う
    if (localStorage.getItem('access-token')) {
      //ログインユーザー情報を取得するAPIにリクエストを送信して、データフェッチ
      const url = process.env.NEXT_PUBLIC_BACK + '/current/user'
      axios
        .get(url, {
          headers: {
            'Content-Type': 'application/json',
            'access-token': localStorage.getItem('access-token'),
            client: localStorage.getItem('client'),
            uid: localStorage.getItem('uid'),
          },
        })
        .then((res: AxiosResponse) => {
          setUser({
            ...user,
            ...res.data,
            isSignedIn: true,
            isFetched: true,
          })
        })
        .catch((err: AxiosError<{ error: string }>) => {
          console.log(err.message)
          setUser({
            ...user,
            isFetched: true,
          })
        })
    } else {
      setUser({
        ...user,
        isFetched: true,
      })
    }
  }, [user, setUser])

  return <></>
}

export default CurrentUserFetch
