import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import * as React from 'react'
import useSWR from 'swr'
import { fetcher } from '@/utils'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '')

export default function Index() {
  const url = process.env.NEXT_PUBLIC_BACK + '/stripe/checkout/create_checkout_session'
  const { data, error } = useSWR(url, fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return
  ;<>
    <span className="loading loading-ring loading-lg"></span>
    <p>Loading...</p>
  </>

  const options = { clientSecret: data.clientSecret }
  console.log(stripePromise)
  console.log(options)

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  )
}
