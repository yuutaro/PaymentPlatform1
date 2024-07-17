import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <>
      <footer className="footer bg-neutral text-neutral-content p-10">
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
        <nav>
          <h6 className="footer-title">Help & Guide</h6>
          <a className="link link-hover">Art Squareとは</a>
          <a className="link link-hover">オークション販売について</a>
          <a className="link link-hover">抽選販売について</a>
          <a className="link link-hover">一般販売について</a>
          <a className="link link-hover">ポートフォリオについて</a>
          <a className="link link-hover">一般販売について</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">運営会社</a>
          <a className="link link-hover">プレスリリース</a>
          <a className="link link-hover">Cookie policy</a>
          <div className="mt-12">
            {/* X */}
            <div className="mb-2 flex items-center">
              <div className="h-6 w-6 mr-6 flex justify-center items-center bg-none rounded-full">
                <Image
                  className="bg-none"
                  src="/sns/x_white.png"
                  width={14}
                  height={14}
                  alt="x-icon"
                />
              </div>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                Twitter
              </a>
            </div>
            {/* Instagram */}
            <div className="mb-2 flex items-center">
              <div className="h-6 w-6 mr-6 flex justify-center items-center bg-none rounded-full">
                <Image
                  className="bg-none"
                  src="/sns/insta_color.png"
                  width={16}
                  height={16}
                  alt="x-icon"
                />
              </div>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </div>
            {/* Facebook */}
            <div className="mb-2 flex items-center">
              <div className="h-6 w-6 mr-6 flex justify-center items-center  bg-none rounded-full">
                <Image
                  className="bg-none"
                  src="/sns/fb_white.png"
                  width={18}
                  height={18}
                  alt="x-icon"
                />
              </div>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                Facebook
              </a>
            </div>
          </div>
        </nav>
      </footer>
    </>
  )
}

export default Footer
