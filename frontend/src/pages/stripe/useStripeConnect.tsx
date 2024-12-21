import { loadConnectAndInitialize } from '@stripe/connect-js'
import { useState, useEffect } from 'react'

export const useStripeConnect = (connectedAccountId: string) => {
  const [stripeConnectInstance, setStripeConnectInstance] = useState<any>()

  useEffect(() => {
    if (connectedAccountId) {
      const fetchClientSecret = async () => {
        const response = await fetch(process.env.NEXT_PUBLIC_BACK + '/stripe/account_session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            account: connectedAccountId,
          }),
        })

        if (!response.ok) {
          // Handle errors on the client side here
          const { error } = await response.json()
          throw new Error(error)
        } else {
          const { client_secret: clientSecret } = await response.json()
          return clientSecret
        }
      }

      setStripeConnectInstance(
        loadConnectAndInitialize({
          publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '',
          fetchClientSecret,
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
