import { ConnectAccountOnboarding, ConnectComponentsProvider } from '@stripe/react-connect-js'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useStripeConnect } from './useStripeConnect'

export default function Index() {
  const router = useRouter()

  // アカウント作成中かどうか
  const [accountCreatePending, setAccountCreatePending] = useState(false)
  // アカウント作成中のオンボーディングが終了したかどうか
  const [onboardingExited, setOnboardingExited] = useState(false)
  const [error, setError] = useState(false)
  // アカウントIDの状態を管理
  const [connectedAccountId, setConnectedAccountId] = useState()
  // IDがセットされたら、useStripeConnectを使ってstripeConnectInstanceを取得
  // 内部でuseEffectを使用しているため、connectedAccountの値が変わるたびにstripeConnectInstanceが再取得される
  const stripeConnectInstance = useStripeConnect(connectedAccountId)

  return (
    <>
      <div>
        {/* アカウント未作成かつアカウントIDがない場合  */}
        {!accountCreatePending && !connectedAccountId && (
          <div>
            <button
              className="btn btn-primary w-full my-32"
              onClick={async () => {
                setAccountCreatePending(true)
                setError(false)
                fetch(process.env.NEXT_PUBLIC_BACK + '/stripe/account', {
                  method: 'POST',
                })
                  .then((response) => response.json())
                  .then((json) => {
                    setAccountCreatePending(false)
                    const { account, error } = json

                    if (account) {
                      setConnectedAccountId(account)
                    }

                    if (error) {
                      setError(true)
                    }
                  })
              }}
            >
              連結アカウント作成
            </button>
          </div>
        )}
      </div>
      <div>
        {/* stripeのインスタンスがある時 */}
        {stripeConnectInstance && (
          <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
            <ConnectAccountOnboarding onExit={() => setOnboardingExited(true)} />
          </ConnectComponentsProvider>
        )}
      </div>
      <Link href="/stripe/checkout">
        <button className="btn btn-primary w-full my-32">購入画面へ</button>
      </Link>
    </>
  )
}
