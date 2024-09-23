import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import useSWR from 'swr'
import { fetcher } from '@/utils'

const ItemDetail: NextPage = () => {
  const router = useRouter()
  //URLからidの値を取得
  const { id } = router.query
  const url = `http://localhost:3001/api/v1/items/${id}`

  //戻るボタン
  const handleBack = () => {
    router.back()
  }

  //指定したidのitemを取得
  const { data, error } = useSWR(url, fetcher)
  if (error) return <div>Failed to load</div>
  if (!data) return
  ;<>
    <span className="loading loading-ring loading-lg"></span>
    <p>Loading...</p>
  </>

  //data.images配列の格納されている個数を取得
  const imagesLength = data.images.length
  console.log(imagesLength)
  return (
    <>
      <button onClick={handleBack} className="ml-12 mt-12 text-3xl">
        ＜
      </button>
      <div className="w-full flex flex-col items-center">
        <div className="w-8/12 flex justify-between">
          {/* サブ作品画像 */}
          <div className="my-8 w-1/4 mx-2">
            <div className="flex flex-col items-center justify-center w-full">
              {data.images.map((image: string, i: number) => (
                <div
                  key={i + 1}
                  className="w-[200px] h-[200px] object-center my-2"
                >
                  <img
                    src={image.url}
                    alt={`画像${i + 1}`}
                    className="w-[200px] h-[200px] object-cover "
                  />
                </div>
              ))}
            </div>
          </div>
          {/* メイン作品画像 */}
          <div className="my-8 w-3/4 mx-2">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="w-[500px] h-[500px] object-center my-2">
                <img
                  src={data.images[0].url}
                  alt="画像１"
                  className="w-[500px] h-[500px] object-cover "
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 border ">
          {/* タイトル */}
          <div className="my-8 flex items-center">
            <p className="mr-12">作品名</p>
            <p className="text-2xl ">{data.name}</p>
          </div>

          {/* 作品紹介 */}
          <div className="my-8 ">
            <p>作品紹介</p>
            <p>{data.discription}</p>
          </div>

          {/* 価格・個数 */}
          <div className="flex ">
            <div className="w-1/3 ">
              <p>価格</p>

              <p>¥{data.min_price}</p>
            </div>

            <div className="w-1/3 ml-12">
              <p>個数</p>
              <p>{data.amount}</p>
            </div>
          </div>

          {/* 公開設定 */}
          <div className="my-8">
            <p>公開設定</p>
            <p>
              {data.state === 10 && <p>下書き保存</p>}
              {data.state === 20 && <p>非公開</p>}
              {data.state === 30 && <p>公開済み</p>}
            </p>
          </div>
          <Link
            href={'/order/' + data.id}
            className="mt-12 btn bg-zinc-600 text-white w-full"
          >
            購入 ¥{data.min_price}
          </Link>
        </div>
      </div>
    </>
  )
}

export default ItemDetail

/*
商品情報入力して、データベースに反映、商品情報を閲覧できるところまでやる
*/
