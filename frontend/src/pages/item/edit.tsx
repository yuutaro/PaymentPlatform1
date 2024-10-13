import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import useSWR from 'swr'
import { useRequireSignedIn } from '@/hooks/useRequireSignedIn'
import { fetcher } from '@/utils'

//入力フォームの型定義
type ItemData = {
  name: string
  discription: string
  min_price: number
  amount: number
  state: number
  images: FileList
}

const ItemEdit: NextPage = () => {
  useRequireSignedIn()
  const router = useRouter()

  const { id } = router.query
  const url = `http://localhost:3001/api/v1/items/${id}`
  //指定したidのitemを取得
  const { data, error } = useSWR(url, fetcher)

  //初期値の定義
  const { handleSubmit, control } = useForm<ItemData>({
    defaultValues: {
      name: '',
      discription: '',
      min_price: 0,
      amount: 0,
      images: [],
    },
  })

  console.log(data)

  //フォームのバリデーション定義
  const validationRules = {
    name: {},
    discription: {},
    min_price: {},
    amount: {},
  }
  //公開設定state
  const [selectedValue, setSelectedValue] = useState('')

  //登録ボタン押した後の処理
  const onSubmit: SubmitHandler<ItemData> = async (data) => {
    const url = process.env.NEXT_PUBLIC_BACK + '/items'
    const formData = new FormData()

    // item フィールドを作成
    const itemData = {
      name: data.name,
      discription: data.discription,
      min_price: data.min_price.toString(),
      amount: data.amount.toString(),
      state: selectedValue,
    }

    // item フィールドをFormDataに追加
    formData.append('item[name]', itemData.name)
    formData.append('item[discription]', itemData.discription)
    formData.append('item[min_price]', itemData.min_price)
    formData.append('item[amount]', itemData.amount)
    formData.append('item[state]', itemData.state)

    // images フィールドにファイルを追加
    if (data.images.length > 0) {
      Array.from(data.images).forEach((file: File) => {
        formData.append('item[images][]', file) // 配列形式で追加
      })
    }

    // APIリクエスト
    try {
      const res = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client'),
          uid: localStorage.getItem('uid'),
        },
      })
      console.log(res.data)
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="w-full h-[1500px] flex flex-col">
        <p className="pt-24 pb-12 text-3xl flex justify-center">編集画面</p>
        <div className="h-[450px] flex flex-col items-center">
          <form className="w-1/2" noValidate onSubmit={handleSubmit(onSubmit)}>
            <p>作品画像アップロード</p>
            <Controller
              name="images" // images フィールドを指定
              control={control}
              render={({ field }) => (
                <div className="mt-2 w-full">
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      multiple // 複数ファイルを選択可能
                      onChange={(e) => {
                        if (e.target.files) {
                          const filesArray = Array.from(e.target.files)
                          field.onChange(filesArray) // 選択したファイルを images フィールドに設定
                        } else {
                          field.onChange([]) // ファイルが選択されなかった場合
                        }
                      }}
                    />
                  </label>
                </div>
              )}
            />

            {/* 作品画像 */}
            {/* <div className="my-8">
              
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-[400px]  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
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
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>

                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div> */}

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

export default ItemEdit

/*
商品情報入力して、データベースに反映、商品情報を閲覧できるところまでやる
*/
