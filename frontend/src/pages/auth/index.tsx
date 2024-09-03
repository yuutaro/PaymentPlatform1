import axios, { AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'

//入力フォームの型定義
type SignUpFormData = {
  name: string
  email: string
  password: string
}

const SignUp: NextPage = () => {
  const [openAuthWindow, setOpenAuthWindow] = useState<Window | null>(null)
  const router = useRouter()

  const handleGoogleAuth = () => {
    const authWindow = window.open(
      'http://localhost:3001/api/v1/auth/google_oauth2',
      '_blank',
      'width=600,height=400',
    )
    setOpenAuthWindow(authWindow)
  }

  useEffect(() => {
    if (!openAuthWindow) return

    const handleMessage = (e: MessageEvent) => {
      const data = e.data as { [key: string]: string }
      const authParamKeys = ['authToken', 'clientId', 'uid']
      if (!authParamKeys.every((key) => Object.keys(data).includes(key))) {
        return
      }

      // 認証情報をlocalStorageなどに保存
      localStorage.setItem('access-token', data.authToken)
      localStorage.setItem('client', data.clientId)
      localStorage.setItem('uid', data.uid)

      // ユーザー情報を更新または取得

      openAuthWindow.close()
      setOpenAuthWindow(null)
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [openAuthWindow])

  //初期値の定義
  const { handleSubmit, control } = useForm<SignUpFormData>({
    defaultValues: { name: '', email: '', password: '' },
  })

  //フォームのバリデーション定義
  const validationRules = {
    email: {
      required: 'メールアドレスを入力してください',
      pattern: {
        value:
          /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
        message: '正しい形式のメールアドレスを入力してください',
      },
    },
    password: {
      required: 'パスワードを入力してください',
    },
    name: {
      required: 'ユーザー名を入力してください',
    },
  }

  //登録ボタン押した後の処理
  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    const SignUp = async (data: SignUpFormData) => {
      //モックサーバー環境用URL
      const url = process.env.NEXT_PUBLIC_BACK_TEST + '/sign_up'

      //Railsサーバー環境用URL
      //const url = process.env.NEXT_PUBLIC_BACK + '/auth'

      //ヘッダー情報
      const headers = { 'Content-Type': 'application/json' }

      //認証用URL(メール文に添付するURL)
      const confirmSuccessUrl =
        process.env.NEXT_PUBLIC_FRONT + '/auth/confirm_mail'

      await axios({
        method: 'POST',
        url: url,
        data: { ...data, confirm_success_url: confirmSuccessUrl },
        headers: headers,
      }).then((res: AxiosResponse) => {
        //localStrageにユーザー情報を保存
        localStorage.setItem('access-token', res.headers['access-token'] || '')
        localStorage.setItem('client', res.headers['client'] || '')
        localStorage.setItem('uid', res.headers['uid'] || '')

        console.log(res.data)
        //Railsサーバーからレスポンス来た後の遷移先
        router.push('/auth/send_mail')
      })
    }
    SignUp(data)
  }

  return (
    <>
      <div className="w-full flex flex-col">
        <p className="pt-24 pb-12 text-3xl flex justify-center">会員登録</p>
        <div className="h-[450px] flex flex-col items-center">
          <form className="w-1/2" noValidate onSubmit={handleSubmit(onSubmit)}>
            {/* userフォーム */}
            <Controller
              name="name"
              control={control}
              rules={validationRules.name}
              render={({ field, fieldState }) => (
                <>
                  <div className="mb-8">
                    <label className="input input-bordered flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                      </svg>
                      <input
                        {...field}
                        name="name"
                        type="text"
                        className="grow"
                        placeholder="ユーザー名"
                      />
                    </label>
                    {fieldState.invalid && (
                      <p className="text-red-500 mt-2">
                        {fieldState.error?.message}
                      </p>
                    )}
                  </div>
                </>
              )}
            />
            {/* Emailフォーム */}
            <Controller
              name="email"
              control={control}
              rules={validationRules.email}
              render={({ field, fieldState }) => (
                <>
                  <div className="mb-8">
                    <label className="input input-bordered flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                      >
                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                      </svg>
                      <input
                        {...field}
                        name="email"
                        type="text"
                        className="grow"
                        placeholder="Eメール"
                      />
                    </label>
                    {fieldState.invalid && (
                      <p className="text-red-500 mt-2">
                        {fieldState.error?.message}
                      </p>
                    )}
                  </div>
                </>
              )}
            />
            {/* Passwordフォーム */}
            <Controller
              name="password"
              control={control}
              rules={validationRules.password}
              render={({ field, fieldState }) => (
                <>
                  <div className="mb-8">
                    <label className="input input-bordered flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <input
                        {...field}
                        name="password"
                        type="password"
                        className="grow"
                        placeholder="パスワード"
                      />
                    </label>
                    {fieldState.invalid && (
                      <p className="text-red-500 mt-2">
                        {fieldState.error?.message}
                      </p>
                    )}
                  </div>
                </>
              )}
            />
            <input
              type="submit"
              value="登録完了"
              className="mt-12 btn w-full"
            />
          </form>
        </div>

        <div className="flex justify-center h-[400px] border-t border-zinc-400 ">
          <div className="w-1/2">
            <button
              onClick={handleGoogleAuth}
              className="mt-12 btn w-full bg-green-300"
            >
              Googleで登録
            </button>

            <p className="mt-16 flex justify-center">アカウントをお持ちの方</p>
            <Link href="/auth/sign_in">
              <input
                type="submit"
                value="ログイン"
                className="mt-8 btn w-full bg-white"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp

/*
コードの変更点
・Next.js/Rails/AWS講座のsignupページとほぼ同じ
・SnackbarやisLodingは入れていない
・muiを使用しないため、TextFieldコンポーネントの代わりにinputタグを使用
・同様の理由で、Stackコンポーネントの代わりにformタグを使用
・同様の理由で、LoadingButtonコンポーネントの代わりにinputタグを使用

検証内容
・JSONファイルの送信確認
Branchの都合上、backendでJSONを返すシステムを作るのが面倒なため
Postmanでモックサーバーを作成し、フロントエンドフォームで入力
送信後に指定したアドレスに遅れているか確認した
結果：Postmanで送信したJSONを確認。PostmanからNext.jsにmessageを送信できている。
    受け取ったJSONでpasswordが見れるのでSelializerで隠す必要あり
*/
