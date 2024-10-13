import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import BackButton from '@/components/BackButton'
import SubImage from '@/components/SubImage'
import { useUserState } from '@/hooks/useGlobalState'
import { fetcher } from '@/utils'

//商品詳細ページ
const ItemDetail: NextPage = () => {
  const router = useRouter()
  const [user] = useUserState()
  const [number, setNumber] = useState(0) // 初期値を0に設定
  //URLからidの値を取得
  const { id } = router.query
  const url = `http://localhost:3001/api/v1/items/${id}`

  //指定したidのitemを取得
  const { data, error } = useSWR(url, fetcher)
  if (error) return <div>Failed to load</div>
  if (!data) return
  ;<>
    <span className="loading loading-ring loading-lg"></span>
    <p>Loading...</p>
  </>

  const updateNumber = (e) => {
    setNumber(e)
  }
  // const updateNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNumber(Number(e.target.value))
  // }

  return (
    <>
      <BackButton />
      <div className="w-full flex sticky">
        {/* image */}
        <div className="w-6/12 h-screen bg-zinc-800 pt-16 sticky top-16">
          <div className="flex flex-col items-center justify-center ">
            {/* main */}
            <div className="w-[500px] h-[500px] object-center my-2">
              <img
                src={data.images[number].url}
                alt="画像１"
                className="w-[500px] h-[500px] object-cover "
              />
            </div>
            {/* sub */}
            <div className="my-4 w-[500px]">
              <div className="flex items-center justify-start w-full">
                {data.images.slice(0, 4).map((image: string, i: number) => (
                  <div
                    key={i}
                    onClick={() => updateNumber(i)}
                    className={` ${number === i ? 'bg-red-500' : ''}`}
                  >
                    <SubImage n={image.url} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-6/12 font-thin  min-h-screen bg-slate-100  pt-16 px-8  border-red-500 flex flex-col sticky top-16">
          {/* タイトル */}
          <div className="flex items-center  py-2">
            <p className="text-2xl font-extralight">{data.name}</p>
          </div>

          {/* 商品詳細 */}
          <div className="flex flex-col justify-center  py-12 text-xl">
            <div className="flex items-center">
              <p className="text-sm">在庫数 {data.amount}</p>
              <div className="ml-8 badge badge-secondary badge-outline">
                ユニーク作品
              </div>
              <p className="ml-12 font-extralight text-3xl">
                ¥ {data.min_price.toLocaleString()}
              </p>
            </div>
            {/* オークション期日 */}
            <div className="flex items-center  my-12">
              <p className="text-sm">販売方式</p>
              <div className="ml-8 badge badge-primary badge-outline">
                オークション
              </div>
              <div className="ml-12 flex items-center font-extralight">
                <div className="flex flex-col items-center">
                  <p className="text-sm">2024/11/15</p>
                  <p className="">17:00</p>
                </div>
                <p className="px-4">ー</p>

                <div className="flex flex-col items-center">
                  <p className="text-sm">2024/11/22</p>
                  <p className="">20:00</p>
                </div>
              </div>
            </div>
            {/* 作品紹介 */}
            <div className="">
              <p className="text-sm">作品紹介</p>
              <p className="text-[16px] ">{data.discription}</p>
            </div>
            {/* 情報 */}
            <div className="mt-6 flex  text-[16px]">
              {/* left */}
              <div className="w-5/12  flex flex-col justify-center">
                <p className="">発送される都道府県</p>
                <p className="">発送までにかかる日数</p>
                <p className="">購入証明書の発行</p>
                <p className="">その他</p>
                <p className="">その他</p>
                <p className="">その他</p>
                <p className="">その他</p>
                <p className="">その他</p>
              </div>
              {/* right */}
              <div className="w-7/12  flex flex-col justify-center">
                <p className=" ">東京都</p>
                <p className=" ">2〜4日</p>
                <p className=" ">発行可能</p>
                <p className=" ">/</p>
                <p className=" ">/</p>
                <p className=" ">/</p>
                <p className=" ">/</p>
                <p className=" ">/</p>
              </div>
            </div>

            {/* 作家情報 */}
            <div className="flex px-8 py-8 my-12 bg-white rounded-xl drop-shadow-md hover:bg-amber-100  duration-500">
              <div className="w-1/4 flex items-center justify-center avatar">
                <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>

              <div className="w-3/4 px-12 flex flex-col items-start justify-center">
                <p className="text-sm ">芝浦工業大学 メディアアートサークル</p>
                <p className="text-xl font-semibold">{data.user.name}</p>
                <div className="pt-2 flex items-center">
                  <div className="-ml-2  scale-75 flex rating ">
                    <input
                      type="radio"
                      name="rating-1"
                      className="mask mask-star"
                      defaultChecked
                    />
                    <p>100</p>
                  </div>
                  <div className="flex pl-28">
                    <img
                      src="/sns/x_black.png"
                      alt="x"
                      className="h-6 w-6 mr-6"
                    />
                    <img
                      src="/sns/insta_black.png"
                      alt="x"
                      className="h-6 w-6 mr-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 作品紹介 */}
            <div className="">
              <p className="text-sm">作品への想い</p>
              <p className="text-[16px] ">{data.discription}</p>
            </div>
          </div>

          <div className="sticky bottom-12 w-full flex justify-center ">
            {data.user_id === user.id ? (
              <Link
                href={`/current/item/edit/${data.id}`}
                className="w-[500px] btn rounded-full bg-red-400 text-white shadow-xl"
              >
                編集
              </Link>
            ) : (
              <Link
                href={'/order/' + data.id}
                className="w-[500px] btn rounded-full bg-zinc-600 text-white shadow-xl "
              >
                入札 ¥ {data.min_price.toLocaleString()}
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ItemDetail

/*
商品情報入力して、データベースに反映、商品情報を閲覧できるところまでやる
*/
