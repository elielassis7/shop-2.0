import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { cartDetails } = req.body

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = Object.entries(cartDetails).map((item: any) => {
    return {
      price: item[1].id,
      quantity: item[1].quantity,
    }
  })

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: items,
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
