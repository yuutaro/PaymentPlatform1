import { ConnectAccountOnboarding, ConnectComponentsProvider } from '@stripe/react-connect-js'
import { useState } from 'react'
import { useStripeConnect } from '../hooks/useStripeConnect'

const LinkedAccount = () => {
  // ローカルステートの定義
  // アカウントの作成処理が実行中かどうか (true: 実行中, false: 未実行)
  const [accountCreatePending, setAccountCreatePending] = useState(false)
  // アカウント作成後、オンボーディング（アカウント情報の入力）が完了したかどうか (true: 完了, false: 未完了)
  const [onboardingExited, setOnboardingExited] = useState(false)
  // エラーが発生したかどうか (true: エラーあり, false: エラーなし)
  const [error, setError] = useState(false)
  // 連携アカウントのID (string)
  const [connectedAccountId, setConnectedAccountId] = useState()
  // connectedAccountIdに値がセットされたら、useStripeConnectフックを使ってStripe Connectのインスタンスを取得
  // 内部でuseEffectを用いているため、connectedAccountIdの値が変更された際にStripe Connectのインスタンスを再取得する
  const stripeConnectInstance = useStripeConnect(connectedAccountId)

  return (
    <div>
      <h1>Linked Account</h1>

      {/* stripe連結アカウント作成ボタン */}
      <div>
        {/* アカウント作成処理が未実行、かつ、連結アカウントIDがないときにボタンを表示*/}
        {!accountCreatePending && !connectedAccountId && (
          <div>
            <button
              className="btn btn-primary"
              onClick={async () => {
                setAccountCreatePending(true)
                setError(false)
                fetch(process.env.NEXT_PUBLIC_BACK + '/account', {
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
              Sign up
            </button>
          </div>
        )}
      </div>

      {/* stripe連結アカウントオンボーディング */}
      <div>
        {stripeConnectInstance && (
          <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
            <ConnectAccountOnboarding onExit={() => setOnboardingExited(true)} />
          </ConnectComponentsProvider>
        )}
      </div>
    </div>
  )
}

export default LinkedAccount
