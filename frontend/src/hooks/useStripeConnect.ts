import { loadConnectAndInitialize } from '@stripe/connect-js'
import { useEffect, useState } from 'react'

export const useStripeConnect = (connectedAccountId: string) => {
  const [stripeConnectInstance, setStripeConnectInstance] = useState<any>(null)

  useEffect(() => {
    if (connectedAccountId) {
      const fetchClientSecret = async () => {
        const response = await fetch(process.env.NEXT_PUBLIC_BACK + '/account_session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ account: connectedAccountId }),
        })

        if (!response.ok) {
          // Handle errors on the client side here
          const { error } = await response.json()
          throw ('An error occurred: ', error)
          // throw new Error(`An error occurred: ${error}`)
        } else {
          const { client_secret: clientSecret } = await response.json()
          return clientSecret
        }
      }

      setStripeConnectInstance(
        loadConnectAndInitialize({
          publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
          fetchClientSecret: fetchClientSecret,
          appearance: {
            overlays: 'dialog',
            variables: {
              colorPrimary: '#635BFF',
            },
          },
        }),
      )
    }
  }, [connectedAccountId])

  return stripeConnectInstance
}

export default useStripeConnect
