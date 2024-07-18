import type { NextPage } from 'next'
import Link from 'next/link'

const SendMail: NextPage = () => {
  return (
    <>
      <div className="w-full h-screen flex flex-col">
        <p className="pt-24 text-3xl flex justify-center">認証確認メール送信</p>
        <p className="pt-48 pb-4 text-xl flex justify-center">
          ご登録されたメールアドレスに、認証確認メールを送信しました
        </p>
        <p className=" text-xl flex justify-center">
          メールが受信されない場合は、下のボタンから再送信をお願いします
        </p>
        <Link href="/" className="flex justify-center">
          <input
            type="submit"
            value="認証メールを再送信"
            className="mt-8 btn w-1/2  bg-white"
          />
        </Link>
      </div>
    </>
  )
}

export default SendMail
