import axios, { AxiosResponse, AxiosError } from 'axios'
import Link from 'next/link'
import { useState } from 'react'
import useSWR from 'swr'
import Image from '../../../node_modules/next/image'
import { useUserState } from '@/hooks/useGlobalState'
import { fetcher } from '@/utils'

const AccountMenu = () => {
  const [user] = useUserState()

  const url = 'http://localhost:3001/api/v1/current/user'

  return (
    <>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            {!user.isSignedIn && (
              <Image
                src="/user/user_green.svg"
                width={14}
                height={14}
                alt="default-user"
              />
            )}
            {user.isSignedIn && (
              <Image
                src="/user/user_orange.svg"
                width={14}
                height={14}
                alt="default-user"
              />
            )}
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow -mr-16"
        >
          {user.isSignedIn && (
            <>
              <Link href="/">
                <li>アカウント設定</li>
              </Link>
              <Link href="/auth/sign_out">
                <li>ログアウト</li>
              </Link>
              <Link href="/current/item">
                <li>商品管理</li>
              </Link>
            </>
          )}

          {!user.isSignedIn && (
            <>
              <Link href="/auth">
                <li>会員登録</li>
              </Link>
              <Link href="/auth/sign_in">
                <li>ログイン</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </>
  )
}

export default AccountMenu
