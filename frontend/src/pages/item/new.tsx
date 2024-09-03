import axios, { AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, ChangeEvent } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'

//入力フォームの型定義
type ItemData = {
  name: string
  discription: string
  min_price: number
  amount: number
  state: number
}

const ItemCreate: NextPage = () => {
  const router = useRouter()

  //初期値の定義
  const { handleSubmit, control } = useForm<ItemData>({
    defaultValues: {
      name: '',
      discription: '',
      min_price: 0,
      amount: 0,
    },
  })

  //フォームのバリデーション定義
  const validationRules = {
    name: {},
    discription: {},
    min_price: {},
    amount: {},

    /*
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

*/
  }

  const [selectedValue, setSelectedValue] = useState('')

  //Base64を用いた画像→テキスト変換
  const [base64, setBase64] = useState('')
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      alert('ファイルが選択されていません。')
      return
    }

    const file = event.target.files[0]
    //拡張子の検証
    if (file && file.type.startsWith('image/')) {
      //ファイルを読み取り変換するAPI
      const reader = new FileReader()

      //ファイル読み取り完了後のイベント
      reader.onloadend = () => {
        const base64String = reader.result // 結果を取得
        if (typeof base64String === 'string') {
          setBase64(base64String) // Base64形式の文字列を状態に保存
        } else {
          alert('読み取りに失敗しました。')
        }
      }

      reader.readAsDataURL(file) // ファイルを Base64 形式のデータ URL として読み取る
    } else {
      alert('Please upload a valid image file.')
    }
  }

  //登録ボタン押した後の処理
  const onSubmit: SubmitHandler<ItemData> = (data) => {
    const SendItem = async (data: ItemData) => {
      //モックサーバー環境用URL
      //const url = "https://f1362c02-c99e-4551-bf6f-4d07f3832ef3.mock.pstmn.io/item"

      //Railsサーバー環境用URL
      const url = process.env.NEXT_PUBLIC_BACK + '/items'

      //ヘッダー情報
      const headers = { 'Content-Type': 'application/json' }

      //認証用URL(メール文に添付するURL)
      //const confirmSuccessUrl =
      //  process.env.NEXT_PUBLIC_FRONT + '/auth/confirm_mail'

      await axios({
        method: 'POST',
        url: url,
        data: { ...data, image: base64, state: selectedValue },
        headers: headers,
      }).then((res: AxiosResponse) => {
        console.log(res.data)
        //Railsサーバーからレスポンス来た後の遷移先
        router.push('/')
      })
    }
    SendItem(data)
  }

  return (
    <>
      <div className="w-full h-[1500px] flex flex-col">
        <p className="pt-24 pb-12 text-3xl flex justify-center">作品を出品</p>
        <div className="h-[450px] flex flex-col items-center">
          <form className="w-1/2" noValidate onSubmit={handleSubmit(onSubmit)}>
            {/* 作品画像 */}
            <div className="my-8">
              <p>作品画像アップロード</p>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-[400px]  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  {!base64 ? (
                    <>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{' '}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                    </>
                  ) : (
                    <img
                      src={base64}
                      className="w-full h-[400px] object-contain"
                    />
                  )}

                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      handleFileChange(e) // Base64 変換処理を実行
                    }}
                  />
                </label>
              </div>
            </div>

            {/* タイトル */}
            <div className="my-8">
              <p>タイトル</p>
              <div className="flex items-center justify-center">
                <Controller
                  name="name"
                  control={control}
                  rules={validationRules.name}
                  render={({ field, fieldState }) => (
                    <>
                      <div className="mt-2 w-full">
                        <label className="input input-bordered flex items-center gap-2">
                          <input
                            {...field}
                            name="name"
                            type="text"
                            className="grow"
                            placeholder="(例)　オリジナルプラモデル"
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
              </div>
            </div>

            {/* 作品紹介 */}
            <div className="my-8 ">
              <p>作品紹介</p>
              <div className="flex items-center justify-center">
                <Controller
                  name="discription"
                  control={control}
                  rules={validationRules.discription}
                  render={({ field, fieldState }) => (
                    <>
                      <div className="mt-2 w-full">
                        <label className="h-40 input input-bordered flex items-center gap-2">
                          <textarea
                            {...field}
                            name="discription"
                            className="grow h-36 outline-none resize-none"
                            placeholder="(例) サークル活動で制作した作品になります！期間限定で販売しております"
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
              </div>
            </div>

            {/* 価格・個数 */}
            <div className="flex ">
              <div className="w-1/3 ">
                <p>価格</p>
                <div className="flex items-center justify-center">
                  <Controller
                    name="min_price"
                    control={control}
                    rules={validationRules.min_price}
                    render={({ field, fieldState }) => (
                      <>
                        <div className="mt-2 w-full">
                          <label className="input input-bordered flex items-center gap-2">
                            <input
                              {...field}
                              name="min_price"
                              type="number"
                              className="grow "
                              placeholder="¥ 3000"
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
                </div>
              </div>

              <div className="w-1/3 ml-12">
                <p>個数</p>
                <div className="flex items-center justify-center">
                  <Controller
                    name="amount"
                    control={control}
                    rules={validationRules.amount}
                    render={({ field, fieldState }) => (
                      <>
                        <div className="mt-2 w-full">
                          <label className="input input-bordered flex items-center gap-2">
                            <input
                              {...field}
                              name="amount"
                              type="number"
                              className="grow "
                              placeholder=""
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
                </div>
              </div>
            </div>

            {/* 公開設定 */}
            <div className="my-8">
              <p>公開設定</p>
              <select
                className="mt-4 select select-bordered w-full"
                value={selectedValue} // valueを使って制御
                onChange={(e) => setSelectedValue(e.target.value)}
              >
                <option value="" disabled>
                  選択してください
                </option>
                <option value={10}>下書き保存</option>
                <option value={20}>非公開</option>
                <option value={30}>公開</option>
              </select>
            </div>

            <input
              type="submit"
              value="完了"
              className="mt-12 btn bg-zinc-600 text-white w-full"
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default ItemCreate

/*
商品情報入力して、データベースに反映、商品情報を閲覧できるところまでやる
*/
