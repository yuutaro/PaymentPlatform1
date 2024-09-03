import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useUserState } from '@/hooks/useGlobalState'

const Header = () => {
  const router = useRouter()
  //GlobalStateUserを取得
  const [user] = useUserState()

  //SignUp,SignInページ遷移用関数
  const toSignUpPage = () => {
    //第1引数に本来のリンクを入れ、第2引数にダミーURL
    router.push('/auth')
  }
  const toSignInPage = () => {
    router.push('/auth/sign_in')
  }

  return (
    <>
      <div className="navbar bg-base-100 flex sticky top-0 shadow z-40">
        <div className="flex-1">
          <Link href="/">
            <p className="btn btn-ghost text-xl">Art Square</p>
          </Link>
        </div>

        <div className="flex-none gap-2">
          {/* 検索表示 */}
          <Link href="/search">
            <div>
              <button className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </Link>

          {/* 通知 */}
          {user.isSignedIn && (
            <div>
              <button className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* アカウント */}
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
                  //ユーザーが設定したアバター画像を表示
                  <Image
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    width={50}
                    height={50}
                    alt="Tailwind CSS Navbar component"
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
                  <Link href="/">
                    <li>ログアウト</li>
                  </Link>
                </>
              )}
              {!user.isSignedIn && (
                <>
                  <button onClick={toSignUpPage}>
                    <li>
                      <a>会員登録</a>
                    </li>
                  </button>
                  <button onClick={toSignInPage}>
                    <li>
                      <a>ログイン</a>
                    </li>
                  </button>
                </>
              )}
            </ul>
          </div>

          {/* ハンバーガーメニュー */}
          <div className="drawer">
            <input
              id="my-drawer-2"
              type="checkbox"
              className="drawer-toggle "
            />
            <div>
              <label htmlFor="my-drawer-2" className="btn drawer-button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-5 w-5 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="drawer-side mt-16">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 z-10">
                {/* Sidebar content here */}
                <li>
                  <a className="text-zinc-800 text-[20px] mt-4">作品を出品</a>
                </li>
                <li>
                  <a className="ml-4">絵画 Painting</a>
                </li>
                <li>
                  <a className="ml-4">彫刻 Sculpture</a>
                </li>
                <li>
                  <a className="ml-4">版画 Printmaking</a>
                </li>
                <li>
                  <a className="ml-4">写真 Photography</a>
                </li>

                <li>
                  <a className="text-zinc-800 text-[20px] mt-4">作品を探す</a>
                </li>
                <li>
                  <a className="ml-4">絵画 Painting</a>
                </li>
                <li>
                  <a className="ml-4">彫刻 Sculpture</a>
                </li>
                <li>
                  <a className="ml-4">版画 Printmaking</a>
                </li>
                <li>
                  <a className="ml-4">写真 Photography</a>
                </li>

                <li>
                  <a className="text-zinc-800 text-[20px] mt-4">
                    アーティストを探す
                  </a>
                </li>
                <li>
                  <a className="ml-4">絵画 Painting</a>
                </li>
                <li>
                  <a className="ml-4">彫刻 Sculpture</a>
                </li>
                <li>
                  <a className="ml-4">版画 Printmaking</a>
                </li>
                <li>
                  <a className="ml-4">写真 Photography</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
