import type { NextPage } from 'next'
import Link from 'next/link'

const ConfirmMail: NextPage = () => {
  return (
    <>
      <div className="w-full h-screen flex flex-col">
        <p className="pt-24 text-3xl flex justify-center">アカウント認証完了</p>
        <p className="pt-48 pb-4 text-xl flex justify-center">
          アカウントの認証が完了しました
        </p>
        <p className=" text-xl flex justify-center">
          引き続き、Art Squareをお楽しみください
        </p>
        <Link href="/" className="flex justify-center">
          <input
            type="submit"
            value="Art Squareを始める"
            className="mt-8 btn w-1/2  bg-white"
          />
        </Link>
      </div>
    </>
  )
}

export default ConfirmMail
