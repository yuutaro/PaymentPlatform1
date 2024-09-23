import type { NextPage } from 'next'
import Link from 'next/link'
import useSWR from 'swr'
import { fetcher } from '@/utils'

type ItemProps = {
  name: string
  min_price: number
  id: number
  images: string
}

const Index: NextPage = () => {
  const url = 'http://localhost:3001/api/v1/items'

  const { data, error } = useSWR(url, fetcher)
  if (error) return <div>Failed to load</div>
  if (!data) return
  ;<>
    <span className="loading loading-ring loading-lg"></span>
    <p>Loading...</p>
  </>
  console.log(data)

  return (
    <>
      <div className="w-full flex justify-center mb-48">
        <div className="w-10/12 max-w-[1000px] pt-12">
          {/* 人気の作品 */}
          {/* いいね数や入札数、閲覧数が多い作品を表示 */}
          <div className="">
            <p className="text-3xl font-serif py-8">人気の絵画作品</p>
            <div className="flex flex-wrap justify-center">
              {data.map((item: ItemProps, i: number) => (
                <Link href={'/item/' + item.id} key={i}>
                  <div className="flex flex-col">
                    <div className="h-[300px] w-[300px] aspect-square flex relative justify-center items-center bg-zinc-100 shadow">
                      <img
                        src={`http://localhost:3001${item.images[1]?.url ? item.images[1].url : item.images[0].url}`}
                        alt={item.name}
                        className="h-[300px] w-[300px] object-contain"
                      />

                      <div className="right-0 bottom-0 w-24 h-6 bg-black absolute m-1 bg-opacity-75">
                        <p className="text-white font-thin flex justify-end mr-2 ">
                          ¥{item.min_price}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 ml-4">{item.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
