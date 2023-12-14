import {
  SuccessContainer,
  ImageContainer,
  ImageDetails,
} from '../styles/pages/success'
import Link from 'next/link'
import { GetServerSideProps } from 'next'
import { stripe } from '../lib/stripe'
import Image from 'next/image'
import Head from 'next/head'
import { useShoppingCart } from 'use-shopping-cart'
import { useEffect } from 'react'

interface SuccessProps {
  customerName: string
  product: {
    name: string
    images: string
  }[]
}

export default function Success({ customerName, product }: SuccessProps) {
  const cart = useShoppingCart()
  useEffect(() => {
    cart.clearCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Head>
        <title>Compra Efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra Efetuada</h1>
        <ImageContainer>
          {product &&
            product.map((item) => {
              return (
                <ImageDetails key={item.name}>
                  <Image src={item.images[0]} alt="" width={120} height={110} />
                </ImageDetails>
              )
            })}
        </ImageContainer>
        {product.length > 1 ? (
          <p>
            Uhull <strong>{customerName}</strong>, seus{' '}
            <strong>produtos</strong> já está a caminho de sua casa
          </p>
        ) : (
          <p>
            Uhull <strong>{customerName}</strong>, sua{' '}
            <strong>{product[0].name}</strong> já está a caminho de sua casa
          </p>
        )}

        <Link href={'/'}>Voltar ao catalogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details?.name
  // const productData = session.line_items?.data.price.product as Stripe.Product
  const product = session.line_items?.data.map((item) => item.price?.product)
  // const product = session.line_items?.data as unknown as Stripe.Product

  return {
    props: {
      customerName,
      product,
    },
  }
}
