import axios, { AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'

//入力フォームの型定義
type ItemData = {
  name: string;
  image: File;
  discription: string;
  min_price: number;
  amount: number;

}

const ItemCreate: NextPage = () => {
  const router = useRouter()

  //初期値の定義
  const { handleSubmit, control } = useForm<ItemData>({
    defaultValues: {
      name: "",
      image: "",
      discription: "",
      min_price: "",
      amount: "",

    },
  })

  //フォームのバリデーション定義
  const validationRules = {
    name: {},
    image: {},
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

  //登録ボタン押した後の処理
  const onSubmit: SubmitHandler<ItemData> = (data) => {
    const SendItem = async (data: ItemData) => {
      //モックサーバー環境用URL
      //const url = "https://f1362c02-c99e-4551-bf6f-4d07f3832ef3.mock.pstmn.io/item"

      //Railsサーバー環境用URL
      const url = process.env.NEXT_PUBLIC_BACK + '/item'

      //ヘッダー情報
      const headers = { 'Content-Type': 'application/json' }

      //認証用URL(メール文に添付するURL)
      //const confirmSuccessUrl =
      //  process.env.NEXT_PUBLIC_FRONT + '/auth/confirm_mail'

      await axios({
        method: 'POST',
        url: url,
        data: { ...data },
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
      <div className="w-full flex flex-col">
        <p className="pt-24 pb-12 text-3xl flex justify-center">作品を出品</p>
        <div className="h-[450px] flex flex-col items-center">
          <form className="w-1/2" noValidate onSubmit={handleSubmit(onSubmit)}>
            
            <Controller
              name="image"
              control={control}
              rules={validationRules.image}
              render={({ field, fieldState }) => (
                <>
                  <div className="mb-8">
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                        {...field}
                        name="image"
                        type="file"
                        className="grow"
                        placeholder="作品画像"
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

            <Controller
              name="name"
              control={control}
              rules={validationRules.name}
              render={({ field, fieldState }) => (
                <>
                  <div className="mb-8">
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                        {...field}
                        name="name"
                        type="text"
                        className="grow"
                        placeholder="タイトル"
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

            <Controller
              name="discription"
              control={control}
              rules={validationRules.discription}
              render={({ field, fieldState }) => (
                <>
                  <div className="mb-8">
                    <label className="h-40 input input-bordered flex items-center gap-2">
                      <input
                        {...field}
                        name="discription"
                        type="text"
                        className="grow"
                        placeholder="作品紹介"
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

            <Controller
              name="min_price"
              control={control}
              rules={validationRules.min_price}
              render={({ field, fieldState }) => (
                <>
                  <div className="mb-8">
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                        {...field}
                        name="min_price"
                        type="number"
                        className="grow"
                        placeholder="価格"
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
            <Controller
              name="amount"
              control={control}
              rules={validationRules.amount}
              render={({ field, fieldState }) => (
                <>
                  <div className="mb-8">
                    <label className="input input-bordered flex items-center gap-2">
                      <input
                        {...field}
                        name="amount"
                        type="number"
                        className="grow"
                        placeholder="個数"
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
              value="出品する"
              className="mt-12 btn w-full"
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
