import type { NextPage } from 'next'
import Image from 'next/image'
import useSWR from 'swr'
import { fetcher } from '@/utils'

const Index: NextPage = () => {
  const url = 'http://localhost:3001/api/v1/health_check'
  const { data, error } = useSWR(url, fetcher)

  /* FrontEnd作成のため一時的にコメントアウト
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  */
  return (
    <>
      <div className="w-full flex justify-center mb-48">
        <div className="w-10/12 max-w-[1000px] pt-12">
          {/* セレクト */}
          <div role="tablist" className="tabs tabs-bordered">
            <a role="tab" className="tab tab-active">
              絵画
            </a>
            <a role="tab" className="tab">
              陶芸
            </a>
            <a role="tab" className="tab">
              彫刻
            </a>
            <a role="tab" className="tab">
              版画
            </a>
            <a role="tab" className="tab">
              デジタルアート
            </a>
          </div>

          {/* 人気の作品 */}
          {/* いいね数や入札数、閲覧数が多い作品を表示 */}
          <div className="">
            <p className="text-3xl font-serif py-8">人気の絵画作品</p>
            <div className="flex flex-wrap justify-center">
              <div className="h-[300px] w-[300px] aspect-square flex relative justify-center items-center bg-zinc-100 shadow">
                <Image
                  src="/sample.jpg"
                  width={200}
                  height={200}
                  alt="sample_img"
                  className="p-1"
                />
                <div className="right-0 bottom-0 w-24 h-6 bg-black absolute m-1 bg-opacity-75">
                  <p className="text-white font-thin flex justify-end mr-2 ">
                    ¥10,000
                  </p>
                </div>
              </div>
              <div className="h-[300px] w-[300px] aspect-square flex relative justify-center items-center bg-zinc-100 shadow">
                <Image
                  src="/sample.jpg"
                  width={200}
                  height={200}
                  alt="sample_img"
                  className="p-1"
                />
                <div className="right-0 bottom-0 w-24 h-6 bg-black absolute m-1 bg-opacity-75">
                  <p className="text-white font-thin flex justify-end mr-2 ">
                    ¥10,000
                  </p>
                </div>
              </div>
              <div className="h-[300px] w-[300px] aspect-square flex relative justify-center items-center bg-zinc-100 shadow">
                <Image
                  src="/sample.jpg"
                  width={200}
                  height={200}
                  alt="sample_img"
                  className="p-1"
                />
                <div className="right-0 bottom-0 w-24 h-6 bg-black absolute m-1 bg-opacity-75">
                  <p className="text-white font-thin flex justify-end mr-2 ">
                    ¥10,000
                  </p>
                </div>
              </div>
              <div className="h-[300px] w-[300px] aspect-square flex relative justify-center items-center bg-zinc-100 shadow">
                <Image
                  src="/sample.jpg"
                  width={200}
                  height={200}
                  alt="sample_img"
                  className="p-1"
                />
                <div className="right-0 bottom-0 w-24 h-6 bg-black absolute m-1 bg-opacity-75">
                  <p className="text-white font-thin flex justify-end mr-2 ">
                    ¥10,000
                  </p>
                </div>
              </div>
              <div className="h-[300px] w-[300px] aspect-square flex relative justify-center items-center bg-zinc-100 shadow">
                <Image
                  src="/sample.jpg"
                  width={200}
                  height={200}
                  alt="sample_img"
                  className="p-1"
                />
                <div className="right-0 bottom-0 w-24 h-6 bg-black absolute m-1 bg-opacity-75">
                  <p className="text-white font-thin flex justify-end mr-2 ">
                    ¥10,000
                  </p>
                </div>
              </div>
              <div className="h-[300px] w-[300px] aspect-square flex relative justify-center items-center bg-zinc-100 shadow">
                <Image
                  src="/sample.jpg"
                  width={200}
                  height={200}
                  alt="sample_img"
                  className="p-1"
                />
                <div className="right-0 bottom-0 w-24 h-6 bg-black absolute m-1 bg-opacity-75">
                  <p className="text-white font-thin flex justify-end mr-2 ">
                    ¥10,000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FrontEnd作成のため一時的にコメントアウト */}
      {/* <h1>Health Check</h1> */}
      {/* <p>{data.message}</p> */}
    </>
  )
}

export default Index
