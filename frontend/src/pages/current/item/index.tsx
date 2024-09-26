import type { NextPage } from 'next'

import Link from 'next/link'
import useSWR from 'swr'
import { fetcher } from '@/utils'

type ItemProps = {
  name: string
  images: string
  min_price: number
  state: number
  created_at: string
  id: number
}

const Index: NextPage = () => {
  const url = 'http://localhost:3001/api/v1/current/items'

  const { data, error } = useSWR(url, fetcher)
  if (error) return <div>Failed to load</div>
  if (!data) return
  ;<>
    <span className="loading loading-ring loading-lg"></span>
    <p>Loading...</p>
  </>

  console.log(data)

  console.log(data.items)

  return (
    <div className="w-full flex justify-center mb-48">
      <div className="w-10/12 max-w-[1000px] pt-12">
        <p className="text-3xl w-full flex justify-center py-12">出品一覧</p>
        <div className="">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th>作品名</th>
                  <th>作成日</th>
                  <th>いいね数</th>
                  <th>公開状況</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((item: ItemProps, i: number) => (
                  <>
                    <tr key={i}>
                      <th>
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </th>
                      <td>
                        <Link href={'/item/' + item.id}>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className=" h-16 w-16">
                                <img src={item.images[0].url} alt={item.name} />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{item.name}</div>
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className=" h-16 w-16">
                              <p>{item.created_at}</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                          12
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-ghost badge-md">
                          {item.state === 10 && <p>下書き保存</p>}
                          {item.state === 20 && <p>非公開</p>}
                          {item.state === 30 && <p>公開済み</p>}
                        </span>
                      </td>
                      <th>
                        <button className="btn btn-ghost btn-md">編集</button>
                      </th>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
