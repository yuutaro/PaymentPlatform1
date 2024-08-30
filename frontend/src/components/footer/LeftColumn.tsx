import Link from "../../../node_modules/next/link"
const LeftColumn = () => {
  return (
    <>
      <nav>
        <h6 className="footer-title">SERVICE</h6>
        <Link href="/">
          <p className="link link-hover">作品を探す</p>
        </Link>
        <Link href="/">
          <p className="link link-hover">オークション作品を探す</p>
        </Link>
        <Link href="/">
          <p className="link link-hover">アーティストを探す</p>
        </Link>
        <Link href="/">
          <p className="link link-hover">作品を出品する</p>
        </Link>

        <Link href="/">
          <p className="link link-hover">展示会・個展のお知らせ</p>
        </Link>

        <a className="link link-hover">アーティストランキング</a>
        <a className="link link-hover">利用規約</a>
      </nav>
    </>
  )
}

export default LeftColumn
