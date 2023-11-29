import { AppProps } from 'next/app'
import { GlobalStyle } from '../styles/global'
import { HandBag } from './components/HandBag'
import LogoImg from '../assets/logo.svg'
import { Container, Header } from '@/styles/pages/app'
import Image from 'next/image'
import { CartProvider } from 'use-shopping-cart'
import Link from 'next/link'

GlobalStyle()

const stripeKey = process.env.STRIPE_PUBLIC_KEY

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      shouldPersist
      cartMode="checkout-session"
      stripe={String(stripeKey)}
      currency="BRL"
    >
      <Container>
        <Header>
          <Link href={'/'}>
            <Image src={LogoImg} alt="" />
          </Link>

          <HandBag />
        </Header>
        <Component {...pageProps} />
      </Container>
    </CartProvider>
  )
}
