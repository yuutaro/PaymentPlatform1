import crypto from 'crypto'
import axios from 'axios'

import Link from 'next/link'
import { useState, useEffect } from 'react'

import Image from '../../../node_modules/next/image'
import { useUserState } from '@/hooks/useGlobalState'

const AccountMenu = () => {
  const [user] = useUserState()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    const email = 'yuutaro.mikasa@gmail.com'

    // MD5ハッシュを生成
    const emailHash = crypto
      .createHash('md5')
      .update(email.trim().toLowerCase())
      .digest('hex')

    // GravatarのURLを作成
    const url = 'https://www.gravatar.com/avatar/' + emailHash

    // 画像を取得して状態に保存
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          setAvatarUrl(url)
        }
      })
      .catch((error) => {
        console.error('Error fetching Gravatar:', error)
      })
  }, [])

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
              <>
                {!user.avatar && <img src={avatarUrl} />}
                {user.avatar && <img src={avatarUrl} />}
                <Image
                  src="/user/user_orange.svg"
                  width={14}
                  height={14}
                  alt="default-user"
                />
              </>
            )}
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow -mr-16"
        >
          {user.isFetched && (
            <>
              {user.isSignedIn && (
                <>
                  <Link href="/current/user">
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
