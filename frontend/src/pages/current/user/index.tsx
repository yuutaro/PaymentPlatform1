import type { NextPage } from 'next'

import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { useUserState } from '@/hooks/useGlobalState'
import { fetcher } from '@/utils'

const MyPage: NextPage = () => {
  const [user] = useUserState()
  /*
  const url = `http://localhost:3001/api/v1/current/user/${user.id}`

  const { data, error } = useSWR(url, fetcher)
  if (error) return <div>Failed to load</div>
  if (!data) return
  ;<>
    <span className="loading loading-ring loading-lg"></span>
    <p>Loading...</p>
  </>


  */

  return (
    <>
      <div className="w-full h-[1500px] flex flex-col items-center">
        <div className="w-1/2 ">
          {/* アバター */}
          <div className="my-8">
            <div className="flex items-center justify-center w-full">
              {user.avatar === '0' && (
                <>
                  <img
                    src="/user/user_blue.svg"
                    alt="サンプル"
                    className="w-full h-[400px] object-contain"
                  />
                </>
              )}
              {!user.avatar === '0' && (
                <>
                  <img
                    src="/user/user_orange.svg"
                    alt="サンプル"
                    className="w-full h-[400px] object-contain"
                  />
                </>
              )}
            </div>
          </div>

          {/* ユーザー名 */}
          <div className="my-8 flex items-center">
            <p className="mr-12">ユーザー名</p>
            <p className="text-2xl ">{user.name}</p>
          </div>

          <Link
            href={'/current/user/' + user.id}
            className="mt-12 btn bg-zinc-600 text-white w-full"
          >
            編集
          </Link>
        </div>
      </div>
    </>
  )
}

export default MyPage
