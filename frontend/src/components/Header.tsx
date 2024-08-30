import ToDraft from './header/ToDraft'
import AccountMenu from './header/AccountMenu'
import ToAnnounce from './header/ToAnnounce'
import ToSearch from './header/ToSearch'
import Hamburger from './header/Hamburger'
import Link from 'next/link'


const Header = () => {


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
          <ToSearch />
          {/* 出品ページリンク */}
          <ToDraft />
          {/* 通知 */}
          <ToAnnounce />
          {/* アカウントメニュー */}      
          <AccountMenu />
          {/* ハンバーガーメニュー */}
          <Hamburger />
        </div>
      </div>
    </>
  )
}

export default Header
